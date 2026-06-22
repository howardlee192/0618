import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { LanguageToggle } from "../../components/ui/LanguageToggle";
import { useLanguage } from "../../contexts/LanguageContext";

export function ProjectWhoDecides() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Howard Lee - Who decides your needs?";
  }, []);

  const { lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [
    { id: 0, src: "/projects/whodecides/Postercoverloop.mp4", type: "video" },
    { id: 1, src: "/projects/whodecides/Poster2.jpg" },
    { id: 2, src: "/projects/whodecides/Poster3.jpg" },
    { id: 3, src: "/projects/whodecides/MainProcessCover.jpg" },
    { id: 4, src: "/projects/whodecides/Mainprocess1.jpg" },
    { id: 5, src: "/projects/whodecides/Mainprocess2.jpg" },
    { id: 6, src: "/projects/whodecides/Mainprocess3.jpg" },
    { id: 7, src: "/projects/whodecides/Mainprocess4.jpg" },
    { id: 8, src: "/projects/whodecides/Process1.jpg" },
    { id: 9, src: "/projects/whodecides/Process2.jpg" },
    { id: 10, src: "/projects/whodecides/Process3.jpg" },
    { id: 11, src: "/projects/whodecides/Process4.jpg" },
    { id: 12, src: "/projects/whodecides/Process5.jpg" },
    { id: 13, src: "/projects/whodecides/Process6.jpg" },
    { id: 14, src: "/projects/whodecides/Process7.jpg" },
    { id: 15, src: "/projects/whodecides/IG record1.jpg" },
    { id: 16, src: "/projects/whodecides/IG record2.jpg" }
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

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
          
          <h1 className="font-['Space_Grotesk'] text-[3.5rem] md:text-[4rem] leading-[1] tracking-[-2px] mb-16 md:mb-20 -ml-[0.04em]">
            Who decides your needs?
          </h1>
          
          <div className="flex flex-col gap-6 font-['Geist_Mono'] text-base uppercase tracking-[1px] mb-8 pb-8 border-b border-black/10">
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Year' : '年份'}</span>
              <span>2026</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Medium' : '媒介'}</span>
              <span>{lang === 'ENG' ? 'Poster Design / Relational Design' : '海報設計 / 關係設計'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Materials' : '媒材'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Blender, Nano Banana, Midjourney, Photoshop, Illustrator, Fabric, Magazine Collage, Number Stickers' : 'Blender、Nano Banana、Midjourney、Photoshop、Illustrator、布料、雜誌拼貼、數字貼紙'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Course' : '課程'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Design Fundamental' : '創作基礎'}</span>
            </div>
          </div>

          <div className={`font-['Geist_Mono'] opacity-80 text-base whitespace-pre-wrap ${lang === 'ENG' ? 'leading-[1.8]' : 'leading-[2.2] tracking-[0.08em]'}`}>
            {lang === 'ENG' 
              ? "This series critiques consumerism’s manipulation of desire. From canned fashion waste to bodies bound by fabric and production lines refilling hollowed mannequins, it exposes a manufactured cycle of \"needs,\" addressing how the system replaces autonomy by engineering demand.\n\nIn a profit-driven world, who decides your needs?"
              : "本系列海報作品是批判消費主義操縱我們慾望的機制。視覺從罐頭揭開的快時尚廢料、受廢料束縛而扭曲的人體，到生產線回填掏空的假體，揭露了被精密設計的「需求」循環，回應體制藉由「製造需求」來取代自主權。\n\n在利潤至上的世界，究竟是誰在替你決定需求？"}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div 
            onClick={() => setLightboxIndex(0)}
            className="w-full flex items-center justify-center cursor-pointer group overflow-hidden"
          >
            <video 
              src={images[0].src} 
              className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-105 pointer-events-none" 
              autoPlay loop muted playsInline 
            />
          </div>
        </div>
      </div>

      {/* Highlights (stacked) */}
      <div className="flex flex-col gap-[30px] mb-20">
        <div 
          onClick={() => setLightboxIndex(1)}
          className="w-full cursor-pointer group overflow-hidden flex justify-center"
        >
          <img src={images[1].src} alt="Poster 2" className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[0.8]" />
        </div>
        <div 
          onClick={() => setLightboxIndex(2)}
          className="w-full cursor-pointer group overflow-hidden flex justify-center"
        >
          <img src={images[2].src} alt="Poster 3" className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[0.8]" />
        </div>
      </div>

      {/* Main Process Separator */}
      <div className="border-t border-black/10 pt-10 mb-10 text-center font-['Geist_Mono'] text-sm tracking-[2px] opacity-40 uppercase">
        {lang === 'ENG' ? 'Material & Form Exploration' : '議題關係媒材&形式探索'}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-[20px] space-y-[20px] mb-20">
        {images.slice(3, 8).map((img) => (
          <div key={img.id} className="break-inside-avoid">
            <div 
              onClick={() => setLightboxIndex(img.id)}
              className="w-full bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
            >
              <img src={img.src} alt={`Process ${img.id}`} className="w-full h-auto object-cover" />
            </div>
          </div>
        ))}
      </div>

      {/* Second Process Separator */}
      <div className="border-t border-black/10 pt-10 mb-10 text-center font-['Geist_Mono'] text-sm tracking-[2px] opacity-40 uppercase">
        {lang === 'ENG' ? 'Ideation & Process' : '發想與紀錄'}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-[20px] space-y-[20px]">
        {images.slice(8).map((img) => (
          <div key={img.id} className="break-inside-avoid">
            <div 
              onClick={() => setLightboxIndex(img.id)}
              className="w-full bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
            >
              <img src={img.src} alt={`Ideation ${img.id}`} className="w-full h-auto object-cover" />
            </div>
          </div>
        ))}
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
              className="absolute top-6 right-6 text-white hover:opacity-50 transition-opacity z-50"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={32} />
            </button>

            <button 
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white hover:opacity-50 transition-opacity p-2 z-50"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} />
            </button>

            <div 
              className="w-full h-full flex items-center justify-center cursor-default relative"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {(images[lightboxIndex] as any).type === 'video' ? (
                  <motion.video
                    key={lightboxIndex}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                    src={images[lightboxIndex].src}
                    className="w-full h-full object-contain"
                    autoPlay loop playsInline controls controlsList="nodownload" disablePictureInPicture
                  />
                ) : (
                  <motion.img
                    key={lightboxIndex}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                    src={images[lightboxIndex].src}
                    alt="Enlarged view"
                    className="w-full h-full object-contain"
                  />
                )}
              </AnimatePresence>
            </div>

            <button 
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white hover:opacity-50 transition-opacity p-2 z-50"
              onClick={handleNext}
            >
              <ChevronRight size={48} />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-['Geist_Mono'] tracking-[2px] text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
