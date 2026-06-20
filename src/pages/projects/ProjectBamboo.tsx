import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { LanguageToggle } from "../../components/ui/LanguageToggle";
import { useLanguage } from "../../contexts/LanguageContext";

export function ProjectBamboo() {
  const { lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = lang === 'ENG' ? "Howard Lee - Cantonese Bamboo Theatre" : "Howard Lee - 神功戲棚";
  }, [lang]);

  const images = [
    { src: '/projects/bamboo/poster_cover.jpg', alt: 'Bamboo Theatre Cover' },
    { src: '/projects/bamboo/process1.jpg', alt: 'Process 1' },
    { src: '/projects/bamboo/process2.jpg', alt: 'Process 2' },
    { src: '/projects/bamboo/process3.jpg', alt: 'Process 3' }
  ];

  return (
    <div className="pt-[40px] md:pt-[60px] pb-[100px] min-h-screen relative">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-20">
        {/* Left Column: Metadata */}
        <div className="w-full md:w-1/3">
          <div className="flex justify-between items-start mb-8 md:mb-12">
            <Link to="/personal" className="inline-flex items-center gap-1 hover:opacity-50 transition-opacity font-['Geist_Mono'] text-xs uppercase tracking-[1px]">
              <ChevronLeft size={16} className="-ml-1" />
              Back
            </Link>
            <LanguageToggle />
          </div>

          <h1 className={`font-['Space_Grotesk'] ${lang === 'ENG' ? 'text-[2.5rem] md:text-[3rem]' : 'text-[3rem] md:text-[3.5rem]'} leading-[1] tracking-[-2px] mb-16 md:mb-20 -ml-[0.04em]`}>
            {lang === 'ENG' ? 'Cantonese Bamboo Theatre' : '神功戲棚'}
          </h1>

          <div className="flex flex-col gap-6 font-['Geist_Mono'] text-base uppercase tracking-[1px] mb-8 pb-8 border-b border-black/10">
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Year' : '年份'}</span>
              <span>2026</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Medium' : '媒介'}</span>
              <span>{lang === 'ENG' ? 'Graphic Design' : '平面設計'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Materials' : '媒材'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Photoshop, Illustrator' : 'Photoshop、Illustrator'}</span>
            </div>
          </div>

          <div className={`font-['Geist_Mono'] opacity-80 text-base ${lang === 'ENG' ? 'leading-[1.8]' : 'leading-[2.2] tracking-[0.08em]'}`}>
            {lang === 'ENG'
              ? "Bamboo theatres are not only carriers of Hong Kong's traditions but also the most vital dynamic landscapes on the streets. This cultural poster design calls for society's attention to bamboo theatre culture, allowing it to escape the old memories of museums and regain contemporary vitality. Visually, I modularized and simplified the bamboo structure, combining it with its iconic vibrant color palette. Reinterpreted through modern gradient mapping and form, it distills a strong Cantonese opera imagery and contemporary tension within a unified visual tone."
              : "竹製戲棚不僅是香港傳統的載體，更是街頭最具生命力的動態地景。本文化海報設計呼籲社會對戲棚文化的重視，讓其擺脫博物館的舊記憶，重現當代活力。視覺上，我將戲棚結構進行模組化簡化，結合其標誌性的鮮豔色調，透過現代漸變映射形式和造型重新詮釋，在統一的視覺基調中，凝練出濃厚的粵劇意象與當代張力。"}
          </div>
        </div>

        {/* Right Column: Images */}
        <div className="w-full md:w-2/3">
          {/* Main Visual */}
          <div
            onClick={() => setLightboxIndex(0)}
            className="w-full flex items-center justify-center cursor-pointer group overflow-hidden mb-20"
          >
            <img src={images[0].src} alt="Bamboo Theatre Cover" className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[0.8]" />
          </div>

          {/* Title separator */}
          <div className="w-full border-t border-black/10 pt-4 mb-8">
            <h3 className="font-['Geist_Mono'] text-sm uppercase tracking-[2px] opacity-50">
              {lang === 'ENG' ? 'Visual Elements & Process' : '視覺元素與過程'}
            </h3>
          </div>

          {/* Grid layout for process images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            <div
              onClick={() => setLightboxIndex(1)}
              className="w-full cursor-pointer group overflow-hidden flex justify-center"
            >
              <img src={images[1].src} alt="Process 1" className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)]" />
            </div>
            <div
              onClick={() => setLightboxIndex(2)}
              className="w-full cursor-pointer group overflow-hidden flex justify-center"
            >
              <img src={images[2].src} alt="Process 2" className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)]" />
            </div>
            <div
              onClick={() => setLightboxIndex(3)}
              className="w-full md:col-span-2 cursor-pointer group overflow-hidden flex justify-center"
            >
              <img src={images[3].src} alt="Process 3" className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
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
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-2"
            >
              <X size={32} />
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
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => prev === null ? null : (prev > 0 ? prev - 1 : images.length - 1));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 md:left-10"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => prev === null ? null : (prev < images.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 md:right-10"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-['Geist_Mono'] text-sm tracking-widest">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
