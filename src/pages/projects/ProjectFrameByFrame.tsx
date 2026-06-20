import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { LanguageToggle } from "../../components/ui/LanguageToggle";
import { useLanguage } from "../../contexts/LanguageContext";

export function ProjectFrameByFrame() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Howard Lee - Frame by Frame";
  }, []);

  const { lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [
    { id: 0, src: "/projects/framebyframe/cover.jpg" },
    { id: 1, src: "/projects/framebyframe/highlight1.jpg" },
    { id: 2, src: "/projects/framebyframe/highlight2.jpg" },
    { id: 3, src: "/projects/framebyframe/mainprocess.jpg" },
    { id: 4, src: "/projects/framebyframe/mainprocess2.jpg" },
    { id: 5, src: "/projects/framebyframe/mainprocess3.jpg" },
    { id: 6, src: "/projects/framebyframe/mainprocess4.jpg" },
    { id: 7, src: "/projects/framebyframe/secondprocess1.jpg" },
    { id: 8, src: "/projects/framebyframe/secondprocess2.jpg" },
    { id: 9, src: "/projects/framebyframe/sceondprocess3.jpg" },
    { id: 10, src: "/projects/framebyframe/secondprocess4.jpg" },
    { id: 11, src: "/projects/framebyframe/secondprocess5.jpg" },
    { id: 12, src: "/projects/framebyframe/secondprocess6.jpg" },
    { id: 13, src: "/projects/framebyframe/secondprocess7.jpg" },
    { id: 14, src: "/projects/framebyframe/sceondprocess8.jpg" }
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
        <div className="w-full md:w-1/3">
          <div className="flex justify-between items-start mb-8 md:mb-12">
            <Link to="/personal" className="inline-flex items-center gap-1 hover:opacity-50 transition-opacity font-['Geist_Mono'] text-xs uppercase tracking-[1px]">
              <ChevronLeft size={16} className="-ml-1" />
              Back
            </Link>
            <LanguageToggle />
          </div>
          
          <h1 className="font-['Space_Grotesk'] text-[3.5rem] md:text-[4rem] leading-[1] tracking-[-2px] mb-16 md:mb-20 -ml-[0.04em]">
            Frame by Frame
          </h1>
          
          <div className="flex flex-col gap-6 font-['Geist_Mono'] text-base uppercase tracking-[1px] mb-8 pb-8 border-b border-black/10">
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Year' : '年份'}</span>
              <span>2025</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Medium' : '媒介'}</span>
              <span>{lang === 'ENG' ? '3D Installation' : '立體裝置'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Materials' : '媒材'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Wood lumber, Camping pegs, Wire ropes' : '集合角材、露營釘、威亞鋼絲繩'}</span>
            </div>
          </div>

          <div className={`font-['Geist_Mono'] opacity-80 text-base whitespace-pre-wrap ${lang === 'ENG' ? 'leading-[1.8]' : 'leading-[2.2] tracking-[0.08em]'}`}>
            {lang === 'ENG' 
              ? "My parents' frames, once constraints, are now the nourishment for my work. I have learned to extend these frames, transforming regrets into new possibilities. A frame is not a cage, but a dimension of flexibility. This journey—shuttling between 3D and 2D—allows me to redefine the narrative bestowed upon me. Through this project, I also realized the need to further sharpen my material expertise and execution judgment."
              : "父母的框架曾是我的束縛，卻也成為我創作的養分。我學會將框架鬆綁、延伸，讓遺憾轉化為新的可能性，創作即是我與這些框架的和解。框架並非囚籠，而是賦予我彈性與維度的空間，讓我能在承載過往的同時，開啟自身的敘事。這是一場從立體裝置到平面維度的穿梭，在不同維度的交疊中，我重新定義了被賦予的形狀。\n\n透過這次專題意識到對媒材不熟悉和執行判斷需要加強。"}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div 
            onClick={() => setLightboxIndex(0)}
            className="w-full bg-[#E0E0E0] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
          >
            <img src={images[0].src} alt="Frame by Frame Cover" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>

      {/* Highlights (2 side by side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-20">
        <div 
          onClick={() => setLightboxIndex(1)}
          className="w-full bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
        >
          <img src={images[1].src} alt="Highlight 1" className="w-full h-auto object-cover" />
        </div>
        <div 
          onClick={() => setLightboxIndex(2)}
          className="w-full bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
        >
          <img src={images[2].src} alt="Highlight 2" className="w-full h-auto object-cover" />
        </div>
      </div>

      {/* Main Process Separator */}
      <div className="border-t border-black/10 pt-10 mb-10 text-center font-['Geist_Mono'] text-sm tracking-[2px] opacity-40 uppercase">
        {lang === 'ENG' ? 'Main Process' : '製作過程'}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-[20px] space-y-[20px] mb-20">
        {images.slice(3, 7).map((img) => (
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
        {lang === 'ENG' ? 'Ideation & Alternatives' : '發想與棄案'}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-[20px] space-y-[20px]">
        {images.slice(7).map((img) => (
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
              className="absolute top-6 right-6 text-white hover:opacity-50 transition-opacity"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={32} />
            </button>

            <button 
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white hover:opacity-50 transition-opacity p-2"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} />
            </button>

            <div 
              className="w-full h-full flex items-center justify-center cursor-default relative"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
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
              </AnimatePresence>
            </div>

            <button 
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white hover:opacity-50 transition-opacity p-2"
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
