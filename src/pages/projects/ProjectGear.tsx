import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX } from "lucide-react";
import { LanguageToggle } from "../../components/ui/LanguageToggle";
import { useLanguage } from "../../contexts/LanguageContext";

export function ProjectGear() {
  const { lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | 'cover' | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = lang === 'ENG' ? "Howard Lee - Digital Twin" : "Howard Lee - 數位孿生";
  }, [lang]);

  const media = [
    { src: '/projects/gear/4_igpost angle45_4.5_cover.jpg', type: 'image' },
    { src: '/projects/gear/7_igpost glassesloop.mp4', type: 'video' },
    { src: '/projects/gear/2_igpost front4.5.jpg', type: 'image' },
    { src: '/projects/gear/3_igpost left4.5.jpg', type: 'image' },
    { src: '/projects/gear/8_glassesfit.jpg', type: 'image' },
    { src: '/projects/gear/9_1_databar-v.mp4', type: 'video' },
    { src: '/projects/gear/9_2_databar.jpg', type: 'image' },
    { src: '/projects/gear/10_brain.jpg', type: 'image' },
    { src: '/projects/gear/11_1_backlight.mp4', type: 'video' },
    { src: '/projects/gear/11_2_backlight.jpg', type: 'image' },
    { src: '/projects/gear/12_face.jpg', type: 'image' },
    { src: '/projects/gear/record.mp4', type: 'video' }
  ];

  return (
    <div className="pt-[40px] md:pt-[60px] pb-[100px] min-h-screen relative">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-20">
        <div className="w-full md:w-1/3 md:sticky md:top-[100px] self-start">
          <div className="flex justify-between items-start mb-8 md:mb-12">
            <Link to="/personal" className="inline-flex items-center gap-1 hover:opacity-50 transition-opacity font-['Geist_Mono'] text-xs uppercase tracking-[1px]">
              <ChevronLeft size={16} className="-ml-1" />
              Back
            </Link>
            <LanguageToggle />
          </div>

          <h1 className={`font-['Space_Grotesk'] ${lang === 'ENG' ? 'text-[2.6rem] md:text-[3rem]' : 'text-[3rem] md:text-[3.5rem]'} leading-[1.2] tracking-[-2px] mb-16 md:mb-20 -ml-[0.04em]`}>
            {lang === 'ENG' ? 'Digital Twin' : '數位孿生'}
          </h1>
          
          <div className="flex flex-col gap-8 font-['Geist_Mono'] text-base uppercase tracking-[1px] mb-8 pb-8 border-b border-black/10">
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Year' : '年份'}</span>
              <span>2025</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Medium' : '媒介'}</span>
              <span className="flex-1 leading-[1.8]">{lang === 'ENG' ? <>Mask Design /<br />3D Animation</> : '面具設計、3D動畫'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Materials' : '媒材'}</span>
              <span className="flex-1 leading-[1.8]">{lang === 'ENG' ? <>Blender, UE5, Substance Painter,<br />3D Half-body Scan</> : <>Blender、UE5、Substance Painter、<br />3D半身掃描</>}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Course' : '課程'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Computer Aided Design' : '電腦輔助設計'}</span>
            </div>
          </div>

          <div className={`font-['Geist_Mono'] opacity-80 text-base whitespace-pre-wrap ${lang === 'ENG' ? 'leading-[1.8]' : 'leading-[2.2] tracking-[0.08em]'}`}>
            {lang === 'ENG' 
              ? "Reimagining The Happy Prince, this project introduces a 'Happiness Index' into the narrative. I depict a Seraphim as an all-seeing authority, using algorithms to monitor behavior and quantify happiness. By turning emotions into data, the work critically challenges how we define the value of life."
              : "本專題以未來博覽會為題，將『幸福指數』置入《快樂王子》的經典敘事。我將象徵最高權力的熾天使形象轉化為監控者，透過演算法分析生物行為並量化幸福值，以此審視生命價值。在童話的溫柔外衣下，探討當情感成為數據，生存的價值該如何被重新定義。"}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div 
            className="w-full relative mb-20 group overflow-hidden bg-[#E0E0E0] cursor-pointer"
            onClick={() => setLightboxIndex('cover')}
          >
            <video 
              src="/projects/gear/1_igpost loop8s.mp4" 
              autoPlay 
              loop 
              muted={isMuted} 
              playsInline
              className="w-full h-auto block pointer-events-none"
            />
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
              className="absolute bottom-4 right-4 bg-black/20 hover:bg-black/50 backdrop-blur-md text-white p-3 rounded-full transition-colors z-10"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          <div className="w-full border-t border-black/10 pt-4 mb-8">
            <h3 className="font-['Geist_Mono'] text-sm uppercase tracking-[2px] opacity-50">
              {lang === 'ENG' ? 'Visual Elements' : '視覺元素'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            {media.map((item, i) => (
              <div 
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`w-full cursor-pointer overflow-hidden flex justify-center ${i === 0 || i === 5 || i === 8 ? 'md:col-span-2' : ''}`}
              >
                {item.type === 'video' ? (
                  <video 
                    src={item.src} 
                    className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:opacity-80 pointer-events-none" 
                    autoPlay loop muted playsInline
                  />
                ) : (
                  <img src={item.src} alt={`Media ${i}`} className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:opacity-80 pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-32 flex justify-center border-t border-black/10 pt-16">
        <Link to="/personal" className="font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[2rem] uppercase hover:opacity-50 transition-opacity">
          {lang === 'ENG' ? 'Back to Personal' : '返回個人作品'}
        </Link>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-2 z-50"
            >
              <X size={32} />
            </button>

            <div 
              className="w-full h-full flex items-center justify-center cursor-default relative"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {lightboxIndex === 'cover' ? (
                  <motion.video 
                    key="cover"
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                    src="/projects/gear/1_igpost loop8s.mp4" 
                    className="w-full h-full object-contain"
                    autoPlay loop playsInline controls
                    controlsList="nodownload" disablePictureInPicture
                  />
                ) : lightboxIndex !== null && media[lightboxIndex].type === 'video' ? (
                  <motion.video 
                    key={lightboxIndex}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                    src={media[lightboxIndex].src} 
                    className="w-full h-full object-contain"
                    autoPlay loop playsInline controls
                    controlsList="nodownload" disablePictureInPicture
                  />
                ) : lightboxIndex !== null ? (
                  <motion.img 
                    key={lightboxIndex}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                    src={media[lightboxIndex].src} 
                    alt="Enlarged view" 
                    className="w-full h-full object-contain" 
                  />
                ) : null}
              </AnimatePresence>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (lightboxIndex === 'cover') setLightboxIndex(media.length - 1);
                else if (lightboxIndex !== null) setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : 'cover');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 md:left-10 z-50"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (lightboxIndex === 'cover') setLightboxIndex(0);
                else if (lightboxIndex !== null) setLightboxIndex(lightboxIndex < media.length - 1 ? lightboxIndex + 1 : 'cover');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 md:right-10 z-50"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-['Geist_Mono'] text-sm tracking-widest">
              {lightboxIndex === 'cover' ? '0' : lightboxIndex !== null ? lightboxIndex + 1 : ''} / {media.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
