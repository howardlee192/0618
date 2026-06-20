import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { LanguageToggle } from "../../components/ui/LanguageToggle";
import { useLanguage } from "../../contexts/LanguageContext";

export function ProjectYen() {
  const { lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [coverIndex, setCoverIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = lang === 'ENG' ? "Howard Lee - Architectural Thesis Drawing" : "Howard Lee - 2026實踐建築系畢製作品素描";
  }, [lang]);

  const images = [
    { src: '/projects/yen/drawing4cover.jpg', alt: 'Cover' },
    { src: '/projects/yen/drawing1.jpg', alt: 'Drawing 1' },
    { src: '/projects/yen/drawing2.jpg', alt: 'Drawing 2' },
    { src: '/projects/yen/drawing3.jpg', alt: 'Drawing 3' },
    { src: '/projects/yen/drawing4.jpg', alt: 'Drawing 4' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCoverIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

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

          <h1 className={`font-['Space_Grotesk'] ${lang === 'ENG' ? 'text-[2.2rem] md:text-[2.6rem]' : 'text-[2.6rem] md:text-[3rem]'} leading-[1.2] tracking-[-2px] mb-16 md:mb-20 -ml-[0.04em]`}>
            {lang === 'ENG' ? 'Architectural Thesis Drawing' : <>2026實踐建築系<span className="inline-block">畢製作品素描</span></>}
          </h1>
          
          <div className="flex flex-col gap-6 font-['Geist_Mono'] text-base uppercase tracking-[1px] mb-8 pb-8 border-b border-black/10">
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Year' : '年份'}</span>
              <span>2026</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Medium' : '媒介'}</span>
              <span>{lang === 'ENG' ? 'Drawing' : '素描'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Materials' : '媒材'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Photoshop, Illustrator' : 'Photoshop、Illustrator'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Course' : '課程'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Cross-Disciplinary Creative Thinking' : '跨域創作思考'}</span>
            </div>
          </div>

          <div className={`font-['Geist_Mono'] opacity-80 text-base ${lang === 'ENG' ? 'leading-[1.8]' : 'leading-[2.2] tracking-[0.08em]'}`}>
            {lang === 'ENG' 
              ? "This project analyzes architectural thesis works through drawing, focusing on social housing, material experimentation, and spatial reconstruction. By documenting these designs, I learned to integrate aesthetics and complex forms into spatial planning, deepening my understanding of bridging conceptual design with practical application."
              : "觀察建築系畢製作品，從中選擇去進行素描。我觀察作品議題涵蓋社會住宅議題、異材質實驗，以及場域空間的重構。從建築系學生作品學習到怎麼把美學和不同造型，用設計思考應用在空間規劃和設計上。"}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div 
            onClick={() => setLightboxIndex(coverIndex)}
            className="w-full flex items-center justify-center cursor-pointer group overflow-hidden mb-20 bg-[#E0E0E0]"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={coverIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={images[coverIndex].src}
                alt={images[coverIndex].alt}
                className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[1.05]" 
              />
            </AnimatePresence>
          </div>

          <div className="w-full border-t border-black/10 pt-4 mb-8">
            <h3 className="font-['Geist_Mono'] text-sm uppercase tracking-[2px] opacity-50">
              {lang === 'ENG' ? 'Sketches' : '素描作品'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            {images.slice(1).map((img, i) => (
              <div 
                key={i}
                onClick={() => setLightboxIndex(i + 1)}
                className={`w-full cursor-pointer overflow-hidden flex justify-center ${i === 0 || i === 3 ? 'md:col-span-2' : ''}`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:opacity-80" />
              </div>
            ))}
            <div 
              onClick={() => setLightboxIndex(0)}
              className="w-full cursor-pointer overflow-hidden flex justify-center md:col-span-2"
            >
              <img src={images[0].src} alt={images[0].alt} className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:opacity-80" />
            </div>
          </div>
        </div>
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
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 md:left-10 z-50"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => prev === null ? null : (prev < images.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 md:right-10 z-50"
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
