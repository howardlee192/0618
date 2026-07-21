import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { staggerContainer, staggerItem, staggerItemBlur } from "../../utils/Animations";
import { client, urlFor } from "../../lib/sanity";

const renderMixedTitle = (text: string) => {
  return text.split(/([\u4e00-\u9fa5]+)/).map((part, index) => {
    if (/[\u4e00-\u9fa5]/.test(part)) {
      return <span key={index} className="font-['Swei_Bow_Sans'] text-[2rem] tracking-[1px]">{part}</span>;
    }
    return part;
  });
};

const renderMixedCategory = (text: string) => {
  return text.split(/([\u4e00-\u9fa5]+)/).map((part, index) => {
    if (/[\u4e00-\u9fa5]/.test(part)) {
      return <span key={index} className="font-['Swei_Bow_Sans']">{part}</span>;
    }
    return part;
  });
};


export function ProjectsGrid({ useBlur = false }: { useBlur?: boolean }) {
  const { lang } = useLanguage();
  const itemVariant = useBlur ? staggerItemBlur : staggerItem;

  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client.fetch(`*[_type == "home"][0]{
      featuredProjects[]->{
        title,
        titleZh,
        slug,
        category,
        medium,
        thumbnailSize,
        coverType,
        coverImage,
        coverVideoUrl,
        coverVideoFile { asset->{url} }
      }
    }`).then(data => {
      if (data && data.featuredProjects) {
        setProjects(data.featuredProjects);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div className="min-h-[50vh]"></div>;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] grid-flow-row-dense items-start"
    >
      {projects.filter(p => p && p.slug).map((p, i) => {
        const catEn = p.medium?.en || '';
        const catZh = p.medium?.zh || '';

        const titleEn = p.title || '';
        const titleZh = p.titleZh || p.title || '';

        const renderPreview = () => {
          if (p.coverType === 'videoFile' && p.coverVideoFile?.asset?.url) {
            return (
              <video 
                src={p.coverVideoFile.asset.url} 
                className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-105 pointer-events-none" 
                autoPlay loop muted playsInline 
              />
            );
          } else if (p.coverType === 'videoUrl' && p.coverVideoUrl) {
            return (
              <div className="w-full aspect-video pointer-events-none transition-transform duration-700 group-hover:scale-105 bg-[#E0E0E0]">
                <iframe src={p.coverVideoUrl} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" />
              </div>
            );
          } else if (p.coverImage) {
            return (
              <img 
                src={urlFor(p.coverImage).width(800).url()} 
                alt={titleEn} 
                className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-105" 
              />
            );
          }
          return null;
        };

        let gridClass = "";
        if (p.thumbnailSize === 'tall') gridClass = "md:row-span-2 h-full";
        if (p.thumbnailSize === 'wide') gridClass = "md:col-span-2";

        return (
          <div key={i} className={`min-w-0 ${gridClass}`}>
            <Link to={`/project/${p.slug.current}`} className="group flex flex-col cursor-pointer">
              <motion.div variants={itemVariant} className="mb-[15px]">
                <h3 className="font-['Space_Grotesk'] text-[clamp(1.5rem,5vw,2.2rem)] md:text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal leading-[1.15] text-balance break-all md:break-words group-hover:opacity-60 transition-opacity">
                  {lang === 'CHN' ? renderMixedTitle(titleZh) : titleEn}
                </h3>
                <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50 font-['Mozilla_Text']">
                  {lang === 'CHN' ? renderMixedCategory(catZh) : catEn}
                </div>
              </motion.div>
              <motion.div variants={itemVariant} className="w-full relative bg-[#E0E0E0] overflow-hidden group">
                {renderPreview()}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <span className="font-['Mozilla_Text'] text-white text-[0.85rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                    {lang === 'ENG' ? 'Click to View' : '點擊查看'}
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        );
      })}
    </motion.div>
  );
}
