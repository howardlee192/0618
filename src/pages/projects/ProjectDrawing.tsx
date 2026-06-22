import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { LanguageToggle } from "../../components/ui/LanguageToggle";
import { useLanguage } from "../../contexts/LanguageContext";

export function ProjectDrawing() {
  const { lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [coverIndex, setCoverIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = lang === 'ENG' ? "Howard Lee - Life Drawing" : "Howard Lee - 人體素描";
  }, [lang]);

  const images = [
    { src: '/projects/drawing/drawing02.jpg', alt: 'Cover' },
    { src: '/projects/drawing/drawing01.jpg', alt: 'Drawing 1' },
    { src: '/projects/drawing/drawing03.jpg', alt: 'Drawing 3' },
    { src: '/projects/drawing/drawing04.jpg', alt: 'Drawing 4' },
    { src: '/projects/drawing/record1.jpg', alt: 'Record 1' },
    { src: '/projects/drawing/record2.jpg', alt: 'Record 2' },
    { src: '/projects/drawing/record3.jpg', alt: 'Record 3' },
    { src: '/projects/drawing/record4.jpg', alt: 'Record 4' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Only cycle through the first 4 images (the 'drawing' ones)
      setCoverIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

          <h1 className={`font-['Space_Grotesk'] ${lang === 'ENG' ? 'text-[2.2rem] md:text-[2.6rem]' : 'text-[2.6rem] md:text-[3rem]'} leading-[1.2] tracking-[-2px] mb-16 md:mb-20 -ml-[0.04em]`}>
            {lang === 'ENG' ? 'Life Drawing' : '人體素描'}
          </h1>

          <div className="flex flex-col gap-8 font-['Geist_Mono'] text-base uppercase tracking-[1px] mb-8 pb-8 border-b border-black/10">
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Year' : '年份'}</span>
              <span>2025</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Medium' : '媒介'}</span>
              <span>{lang === 'ENG' ? 'Drawing' : '素描'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Materials' : '媒材'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Oil pastels, wax crayons' : '油畫棒、兒童蠟筆'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Course' : '課程'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Design Drawing' : '設計繪畫'}</span>
            </div>
          </div>

          <div className={`font-['Geist_Mono'] opacity-80 text-base ${lang === 'ENG' ? 'leading-[1.8]' : 'leading-[2.2] tracking-[0.08em]'}`}>
            {lang === 'ENG'
              ? "I found myself bored in my Wednesday class, so I wandered into a design drawing session in early December just to de-stress. I was surprised when the instructor, Ms. Kristy Chu, specifically pointed out my work. Using A2-sized paper, I captured the model and the vibe of the room through my own creative lens, turning a simple sketching session into a moment of pure expression."
              : "上學期週三的課太無聊，十二月頭跑去設計繪畫旁聽並舒壓，很意外被曲老師點出。選用四開大小的畫紙，用自己屬於創作語彙，去呈現眼前模特與並感受環境中的意象。"}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div 
            onClick={() => setLightboxIndex(0)}
            className="w-full flex items-center justify-center cursor-pointer group overflow-hidden mb-10 bg-[#E0E0E0]"
          >
            <img 
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[1.05]" 
            />
          </div>
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
              {lang === 'ENG' ? 'Sketches & Process' : '素描作品與過程'}
            </h3>
          </div>

          <div className="columns-1 md:columns-2 gap-[30px] space-y-[30px]">
            {images.slice(1).map((img, i) => (
              <div
                key={i}
                onClick={() => setLightboxIndex(i + 1)}
                className="w-full cursor-pointer break-inside-avoid overflow-hidden"
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:opacity-80" />
              </div>
            ))}
            <div
              onClick={() => setLightboxIndex(0)}
              className="w-full cursor-pointer break-inside-avoid overflow-hidden"
            >
              <img src={images[0].src} alt={images[0].alt} className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:opacity-80" />
            </div>
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
