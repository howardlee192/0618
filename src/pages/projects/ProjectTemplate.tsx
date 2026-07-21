import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ChevronDown, VolumeX, Volume2 } from "lucide-react";
import { LanguageToggle } from "../../components/ui/LanguageToggle";
import { CoverSlideshow } from "../../components/ui/CoverSlideshow";
import { useLanguage } from "../../contexts/LanguageContext";
import { client, previewClient, urlFor } from "../../lib/sanity";

export function ProjectTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const fromPage = location.state?.from;
  const { lang } = useLanguage();
  const [project, setProject] = useState<any>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<any[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  
  const searchParams = new URLSearchParams(window.location.search);
  const isPreview = searchParams.get('preview') === 'true';

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    setIsLoading(true);
    const query = `*[_type == "project" && slug.current == $slug][0]{
      ...,
      coverSlideshowImages[] { asset->{url} },
      coverVideoFile { asset->{url} },
      contentBlocks[] {
        ...,
        _type == 'masonryGridBlock' => {
          ...,
          mediaItems[] {
            ...,
            videoFile { asset->{url} }
          }
        },
        _type == 'standardGridBlock' => {
          ...,
          mediaItems[] {
            ...,
            videoFile { asset->{url} }
          }
        }
      }
    }`;

    const clientToUse = isPreview && (import.meta as any).env.VITE_SANITY_TOKEN ? previewClient : client;

    clientToUse.fetch(query, { slug }).then(data => {
      setProject(data);
      setIsLoading(false);
      if (data) {
        document.title = `Howard Lee - ${data.title}`;
        
        // Extract all media in order for the lightbox
        const media: any[] = [];
        if (data.coverType === 'image' && data.coverImage) {
          media.push({ type: 'image', image: data.coverImage, isCover: true });
        } else if (data.coverType === 'slideshow' && data.coverSlideshowImages) {
          data.coverSlideshowImages.forEach((img: any) => media.push({ type: 'image', image: img, isCover: true }));
        } else if (data.coverType === 'videoUrl' && data.coverVideoUrl) {
          media.push({ type: 'videoUrl', videoUrl: data.coverVideoUrl, isCover: true });
        } else if (data.coverType === 'videoFile' && data.coverVideoFile) {
          media.push({ type: 'videoFile', videoFile: data.coverVideoFile, isCover: true });
        }
        
        data.contentBlocks?.forEach((block: any) => {
          if (block._type === 'highlightBlock' && block.images) {
             block.images.forEach((img: any) => media.push({ type: 'image', image: img }));
          }
          if (block._type === 'slideshowBlock' && block.images) {
             block.images.forEach((img: any) => media.push({ type: 'image', image: img }));
          }
          if ((block._type === 'masonryGridBlock' || block._type === 'standardGridBlock') && block.mediaItems) {
             block.mediaItems.forEach((item: any) => {
               media.push(item);
             });
          }
        });
        
        setLightboxImages(media);
      }
    }).catch(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-['Space_Grotesk'] text-2xl uppercase tracking-widest">Loading...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center font-['Space_Grotesk'] text-2xl uppercase tracking-widest">Project Not Found</div>;

  const title = lang === 'ENG' ? project.title : (project.titleZh || project.title);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % lightboxImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length);
    }
  };

  const getGlobalIndex = (target: any) => {
    return lightboxImages.findIndex(m => {
       if (m === target) return true;
       if (m.image === target) return true;
       if (m.videoFile === target) return true;
       if (m.videoUrl === target) return true;
       if (m.image?.asset?._ref && target.asset?._ref && m.image.asset._ref === target.asset._ref) return true;
       return false;
    });
  };

  if (project.isUnderConstruction && !isPreview) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative pt-[60px] pb-[100px]">
        <div className="absolute top-0 left-0 w-full flex justify-between items-start px-0 pt-0 md:pt-0">
          <Link to={project.category === 'work' ? "/work" : "/personal"} className="inline-flex items-center gap-1 hover:opacity-50 transition-opacity font-['Mozilla_Text'] text-xs uppercase tracking-[1px]">
            <ChevronLeft size={16} className="-ml-1" />
            Back
          </Link>
          <LanguageToggle />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-20"
        >
          <div className="font-['Space_Grotesk'] text-[clamp(2rem,5vw,5rem)] mb-4 leading-[1.1] tracking-[-1px] uppercase text-balance">
            {title}
          </div>
          <div className="font-['Space_Grotesk'] text-[clamp(1rem,2vw,2rem)] opacity-40 uppercase tracking-[2px] mb-8">
            {lang === 'ENG' ? 'Coming Soon' : '頁面建置中'}
          </div>
          <div className="font-['Mozilla_Text'] text-[0.75rem] md:text-sm opacity-40 uppercase tracking-[1px]">
            {lang === 'ENG' ? 'This project is currently being documented.' : '此專案正在整理與上傳中，敬請期待。'}
          </div>
        </motion.div>
      </div>
    );
  }

  const renderBlocks = () => {
    return project.contentBlocks?.map((block: any, index: number) => {
      // 1. Highlight Block
      if (block._type === 'highlightBlock') {
        if (!block.images || block.images.length === 0) return null;
        const isSingle = block.images.length === 1;
        return (
          <div key={block._key || index} className={`grid ${isSingle ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-[30px] mb-20`}>
            {block.images.map((img: any, i: number) => (
              <div 
                key={i}
                onClick={() => setLightboxIndex(getGlobalIndex(img))}
                className="w-full bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
              >
                <img src={urlFor(img).url()} alt={`Highlight ${i}`} className="w-full h-auto object-cover block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:scale-[1.05]" />
              </div>
            ))}
          </div>
        );
      }

      // 1.5 Slideshow Block
      if (block._type === 'slideshowBlock') {
        if (!block.images || block.images.length === 0) return null;
        return <SlideshowBlock key={block._key || index} images={block.images} setLightboxIndex={setLightboxIndex} getGlobalIndex={getGlobalIndex} />;
      }

      // 2. Separator Block
      if (block._type === 'separatorBlock') {
        if (block.style === 'left-aligned') {
          return (
            <div key={block._key || index} className="w-full border-t border-black/10 pt-4 mb-8">
              <h3 className="font-['Mozilla_Text'] text-sm uppercase tracking-[2px] opacity-50">
                {lang === 'ENG' ? (block.en || block.zh) : (block.zh || block.en)}
              </h3>
            </div>
          );
        }
        
        return (
          <div key={block._key || index} className="border-t border-black/10 pt-10 mb-10 text-center font-['Mozilla_Text'] text-sm tracking-[2px] opacity-40 uppercase">
            {lang === 'ENG' ? (block.en || block.zh) : (block.zh || block.en)}
          </div>
        );
      }

      // 3. Masonry Grid Block
      if (block._type === 'masonryGridBlock') {
        const colClass = block.columns === 3 ? 'md:columns-3' : 'md:columns-2';
        return (
          <div key={block._key || index} className={`columns-1 ${colClass} gap-[20px] mb-20`}>
            {block.mediaItems?.map((item: any, i: number) => {
              const isSpan2 = item.span2 ? 'break-inside-avoid w-full mb-[20px]' : 'break-inside-avoid w-full mb-[20px]';
              
              if (item.type === 'image' && item.image) {
                return (
                  <div key={i} className={isSpan2}>
                    <div 
                      onClick={() => setLightboxIndex(getGlobalIndex(item.image))}
                      className="w-full bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                    >
                      <img src={urlFor(item.image).url()} alt={`Gallery ${i}`} className="w-full h-auto object-cover" />
                    </div>
                  </div>
                );
              }

              if (item.type === 'videoUrl' && item.videoUrl) {
                return (
                  <div key={i} className={isSpan2}>
                    <div className="w-full aspect-video bg-[#E0E0E0] relative group">
                      <iframe
                        src={item.videoUrl}
                        title={`Video ${i}`}
                        className="w-full h-full pointer-events-none"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <div 
                        onClick={() => setLightboxIndex(getGlobalIndex(item))}
                        className="absolute inset-0 cursor-pointer bg-transparent hover:bg-black/10 transition-colors"
                      />
                    </div>
                  </div>
                );
              }

              if (item.type === 'videoFile' && item.videoFile?.asset?.url) {
                return (
                  <div key={i} className={isSpan2}>
                    <div 
                      onClick={() => setLightboxIndex(getGlobalIndex(item))}
                      className="w-full bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <video 
                        src={item.videoFile.asset.url} 
                        className="w-full h-auto object-cover pointer-events-none" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                      />
                    </div>
                  </div>
                );
              }
              
              return null;
            })}
          </div>
        );
      }

      // 4. Standard Grid Block
      if (block._type === 'standardGridBlock') {
        const gridColClass = block.columns === 3 ? 'md:grid-cols-3' : block.columns === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';
        return (
          <div key={block._key || index} className={`grid grid-cols-1 ${gridColClass} gap-[30px] mb-20 items-start`}>
            {block.mediaItems?.map((item: any, i: number) => {
              const isSpan2 = item.span2 ? 'col-span-1 md:col-span-2 w-full' : 'w-full';
              
              if (item.type === 'image' && item.image) {
                return (
                  <div key={i} className={`${isSpan2} bg-[#E0E0E0] overflow-hidden`}>
                    <div 
                      onClick={() => setLightboxIndex(getGlobalIndex(item.image))}
                      className="w-full cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <img src={urlFor(item.image).url()} alt={`Gallery ${i}`} className="w-full h-auto object-cover block" />
                    </div>
                  </div>
                );
              }

              if (item.type === 'videoUrl' && item.videoUrl) {
                return (
                  <div key={i} className={`${isSpan2} aspect-video bg-[#E0E0E0] relative group overflow-hidden`}>
                    <iframe
                      src={item.videoUrl}
                      title={`Video ${i}`}
                      className="w-full h-full pointer-events-none"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div 
                      onClick={() => setLightboxIndex(getGlobalIndex(item))}
                      className="absolute inset-0 cursor-pointer bg-transparent hover:bg-black/10 transition-colors"
                    />
                  </div>
                );
              }

              if (item.type === 'videoFile' && item.videoFile?.asset?.url) {
                return (
                  <div key={i} className={`${isSpan2} bg-[#E0E0E0] overflow-hidden`}>
                    <div 
                      onClick={() => setLightboxIndex(getGlobalIndex(item))}
                      className="w-full cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <video 
                        src={item.videoFile.asset.url} 
                        className="w-full h-auto object-cover pointer-events-none block" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                      />
                    </div>
                  </div>
                );
              }
              
              return null;
            })}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="pt-[40px] md:pt-[60px] pb-[100px] min-h-screen relative">
      {/* --- Top Metadata & Cover --- */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-20">
        {/* Left Column: Info */}
        <div className="w-full md:w-1/3 md:sticky md:top-[100px] self-start">
          <div className="flex justify-between items-start mb-8 md:mb-12">
            <Link to={project.category === 'work' ? "/work" : "/personal"} className="inline-flex items-center gap-1 hover:opacity-50 transition-opacity font-['Mozilla_Text'] text-xs uppercase tracking-[1px]">
              <ChevronLeft size={16} className="-ml-1" />
              Back
            </Link>
            <LanguageToggle />
          </div>
          
          <h1 
            className="font-['Space_Grotesk'] text-[12vw] sm:text-[3rem] md:text-[4rem] leading-[1.1] tracking-[-2px] mb-16 md:mb-20 -ml-[0.04em] max-w-full"
            style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
          >
            {title}
          </h1>
          
          <div className="flex flex-col gap-6 font-['Mozilla_Text'] text-base uppercase tracking-[1px] mb-8 pb-8 border-b border-black/10">
            {project.year && (
              <div className="flex">
                <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Year' : '年份'}</span>
                <span>{project.year}</span>
              </div>
            )}
            {project.medium && (project.medium.en || project.medium.zh) && (
              <div className="flex">
                <span className="opacity-50 w-28 shrink-0 md:w-32">
                  {lang === 'ENG' 
                    ? (fromPage === 'work' || (fromPage !== 'personal' && project.category === 'work') ? 'Type' : 'Medium') 
                    : (fromPage === 'work' || (fromPage !== 'personal' && project.category === 'work') ? '種類' : '媒介')}
                </span>
                <span>{lang === 'ENG' ? project.medium.en : project.medium.zh}</span>
              </div>
            )}
            {project.materials && (project.materials.en || project.materials.zh) && (
              <div className="flex">
                <span className="opacity-50 w-28 shrink-0 md:w-32">
                  {lang === 'ENG' 
                    ? (project.materialsLabel === 'both' 
                        ? (fromPage === 'work' || (fromPage !== 'personal' && project.category === 'work') ? 'Tools' : 'Materials')
                        : project.materialsLabel === 'tools' ? 'Tools' : 'Materials') 
                    : (project.materialsLabel === 'both' 
                        ? (fromPage === 'work' || (fromPage !== 'personal' && project.category === 'work') ? '工具' : '媒材')
                        : project.materialsLabel === 'tools' ? '工具' : '媒材')}
                </span>
                <span className="flex-1">{lang === 'ENG' ? project.materials.en : project.materials.zh}</span>
              </div>
            )}
            {project.hasCourse && project.course && (project.course.en || project.course.zh) && (
              <div className="flex">
                <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Course' : '課程'}</span>
                <span className="flex-1">{lang === 'ENG' ? project.course.en : project.course.zh}</span>
              </div>
            )}
            {project.awards?.showAwards !== false && (
              (project.awards?.list && project.awards.list.length > 0) || 
              project.awards?.en || 
              project.awards?.zh
            ) && (
              project.awards.isExpandable ? (
                <details className="group cursor-pointer">
                  <summary className="flex items-center list-none outline-none [&::-webkit-details-marker]:hidden">
                    <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Awards' : '獎項'}</span>
                    <span className="flex-1 flex items-center justify-between">
                      <span>{lang === 'ENG' ? 'View Details' : '展開查看'}</span>
                      <ChevronDown size={16} className="transition-transform group-open:rotate-180 opacity-50" />
                    </span>
                  </summary>
                  <div className="pl-28 md:pl-32 pt-4 text-sm opacity-80 leading-relaxed whitespace-pre-wrap">
                    {project.awards.list && project.awards.list.length > 0 ? (
                      project.awards.list.map((award: any, index: number) => (
                        <div key={index} className="mb-3 last:mb-0">
                          {lang === 'ENG' ? (award.en || award.zh) : (award.zh || award.en)}
                        </div>
                      ))
                    ) : (
                      lang === 'ENG' ? project.awards.en : project.awards.zh
                    )}
                  </div>
                </details>
              ) : (
                <div className="flex">
                  <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Awards' : '獎項'}</span>
                  <div className="flex-1 whitespace-pre-wrap">
                    {project.awards.list && project.awards.list.length > 0 ? (
                      project.awards.list.map((award: any, index: number) => (
                        <div key={index} className="mb-3 last:mb-0">
                          {lang === 'ENG' ? (award.en || award.zh) : (award.zh || award.en)}
                        </div>
                      ))
                    ) : (
                      lang === 'ENG' ? project.awards.en : project.awards.zh
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {project.description && (project.description.en || project.description.zh) && (
            <div className={`font-['Mozilla_Text'] opacity-80 text-base whitespace-pre-wrap ${lang === 'ENG' ? 'leading-[1.8]' : 'leading-[2.2] tracking-[0.08em]'}`}>
              {(lang === 'ENG' ? project.description.en : project.description.zh).replace(/\\n/g, '\n')}
            </div>
          )}
        </div>

        {/* Right Column: Cover Media */}
        <div className="w-full md:w-2/3">
          {project.coverType === 'image' && project.coverImage && (
            <div 
              onClick={() => setLightboxIndex(getGlobalIndex(project.coverImage))}
              className="w-full bg-[#E0E0E0] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity overflow-hidden mb-20"
            >
              <img src={urlFor(project.coverImage).url()} alt={title} className="w-full h-auto object-cover" />
            </div>
          )}

          {project.coverType === 'slideshow' && project.coverSlideshowImages && project.coverSlideshowImages.length > 0 && (
            <div 
              onClick={() => setLightboxIndex(getGlobalIndex(project.coverSlideshowImages[0]))}
              className="w-full mb-20 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <CoverSlideshow images={project.coverSlideshowImages} speed={project.coverSlideshowSpeed} />
            </div>
          )}
          
          {project.coverType === 'videoUrl' && project.coverVideoUrl && (
            <div className="w-full aspect-video bg-[#E0E0E0] mb-20 relative group">
              <iframe
                src={project.coverVideoUrl}
                title={title}
                className="w-full h-full pointer-events-none"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div 
                onClick={() => {
                  const target = lightboxImages.find(m => m.type === 'videoUrl' && m.isCover);
                  if (target) setLightboxIndex(getGlobalIndex(target));
                }}
                className="absolute inset-0 cursor-pointer bg-transparent hover:bg-black/10 transition-colors"
              />
            </div>
          )}

          {project.coverType === 'videoFile' && project.coverVideoFile?.asset?.url && (
            <div className="w-full bg-[#E0E0E0] mb-20 relative group">
              <div 
                onClick={() => {
                  const target = lightboxImages.find(m => m.type === 'videoFile' && m.isCover);
                  if (target) setLightboxIndex(getGlobalIndex(target));
                }}
                className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
              >
                <video 
                  ref={(el) => { if (el) el.volume = 0.65; }}
                  src={project.coverVideoFile.asset.url} 
                  className="w-full h-auto object-cover pointer-events-none" 
                  autoPlay 
                  loop 
                  muted={isMuted}
                  playsInline 
                />
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          )}

          {/* Right Side Scroll Mode: Blocks stay inside the right column */}
          {project.layoutStyle === 'split' && (
            <div className="mt-20">
              {renderBlocks()}
            </div>
          )}
        </div>
      </div>

      {/* Full Width Mode: Blocks go outside the flex container */}
      {(!project.layoutStyle || project.layoutStyle === 'fullWidth') && (
        <div className="w-full mt-20">
          {renderBlocks()}
        </div>
      )}

      {/* Back to Work / Personal */}
      <div className="mt-32 flex justify-center border-t border-black/10 pt-16">
        <Link 
          to={fromPage === 'work' || (fromPage !== 'personal' && project.category === 'work') ? "/work" : "/personal"} 
          className="font-['Space_Grotesk'] text-[2rem] uppercase hover:opacity-50 transition-opacity"
        >
          {lang === 'ENG' 
            ? (fromPage === 'work' || (fromPage !== 'personal' && project.category === 'work') ? 'Back to Work' : 'Back to Personal') 
            : (fromPage === 'work' || (fromPage !== 'personal' && project.category === 'work') ? '返回商業專案' : '返回個人作品')}
        </Link>
      </div>

      {/* --- Lightbox --- */}
      {createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && lightboxImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            >
              <button 
                className="absolute top-6 right-6 text-white hover:opacity-50 transition-opacity z-50"
                onClick={() => setLightboxIndex(null)}
              >
                <X size={32} />
              </button>

              {lightboxImages.length > 1 && (
                <button 
                  className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white hover:opacity-50 transition-opacity p-2 z-50"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={48} />
                </button>
              )}

              <div 
                className="w-full h-full flex items-center justify-center cursor-default relative"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={lightboxIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {lightboxImages[lightboxIndex].type === 'image' && (
                      <img 
                        src={urlFor(lightboxImages[lightboxIndex].image).url()} 
                        alt="Enlarged view" 
                        className="w-full h-full object-contain" 
                      />
                    )}
                    {lightboxImages[lightboxIndex].type === 'videoUrl' && (
                      <iframe
                        src={lightboxImages[lightboxIndex].videoUrl}
                        className="w-[90vw] h-[90vh] md:w-[80vw] md:h-[80vh]"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    )}
                    {lightboxImages[lightboxIndex].type === 'videoFile' && (
                      <video 
                        ref={(el) => { if (el) el.volume = 0.65; }}
                        src={lightboxImages[lightboxIndex].videoFile.asset.url} 
                        className="w-full h-full object-contain"
                        controls
                        controlsList="nodownload noplaybackrate"
                        disablePictureInPicture
                        autoPlay
                        playsInline
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {lightboxImages.length > 1 && (
                <button 
                  className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white hover:opacity-50 transition-opacity p-2 z-50"
                  onClick={handleNext}
                >
                  <ChevronRight size={48} />
                </button>
              )}
              
              {lightboxImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-['Mozilla_Text'] tracking-[2px] text-sm z-50">
                  {lightboxIndex + 1} / {lightboxImages.length}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

// Separate component for the Slideshow block to use its own state
function SlideshowBlock({ images, setLightboxIndex, getGlobalIndex }: { images: any[], setLightboxIndex: (idx: number) => void, getGlobalIndex: (img: any) => number }) {
  const [coverIndex, setCoverIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCoverIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div 
      onClick={() => setLightboxIndex(getGlobalIndex(images[coverIndex]))}
      className="w-full flex items-center justify-center cursor-pointer group overflow-hidden mb-20 bg-[#E0E0E0]"
    >
      <AnimatePresence mode="wait">
        <motion.img 
          key={coverIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          src={urlFor(images[coverIndex]).url()}
          alt={`Slideshow ${coverIndex}`}
          className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[1.05]" 
        />
      </AnimatePresence>
    </div>
  );
}
