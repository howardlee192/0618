import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react";
import { LanguageToggle } from "../../components/ui/LanguageToggle";
import { useLanguage } from "../../contexts/LanguageContext";

export function ProjectUnsorted() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Howard Lee - Unsorted";
  }, []);

  const { lang } = useLanguage();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [
    { id: 0, src: "/projects/unsorted/unsorted_cover.jpg" },
    { id: 1, src: "/projects/unsorted/highlight1.jpg" },
    { id: 2, src: "/projects/unsorted/highlight2.jpg" },
    { id: 3, src: "/projects/unsorted/highlight3.jpg" },
    { id: 4, src: "/projects/unsorted/process1.jpg" },
    { id: 5, src: "/projects/unsorted/process4.jpg" },
    { id: 6, src: "/projects/unsorted/process3.jpg" },
    { id: 7, src: "/projects/unsorted/process5.jpg" },
    { id: 8, src: "/projects/unsorted/process2.jpg" },
    { id: 9, src: "/projects/unsorted/process6.jpg" }
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
            Unsorted
          </h1>
          
          <div className="flex flex-col gap-6 font-['Geist_Mono'] text-base uppercase tracking-[1px] mb-8 pb-8 border-b border-black/10">
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Year' : '年份'}</span>
              <span>2026</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Medium' : '媒介'}</span>
              <span>{lang === 'ENG' ? 'Audio Visual Performance' : '即時音像演出'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Materials' : '媒材'}</span>
              <span className="flex-1 leading-[1.8]">{lang === 'ENG' ? 'Touchdesigner, Ableton, Cardboard, Newspapers, Receipts, Shredded Paper, Cans' : 'Touchdesigner、Ableton、廢紙箱、廢報紙、發票、碎紙條、罐頭'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Course' : '課程'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Design Fundamental' : '創作基礎'}</span>
            </div>
            <details className="group cursor-pointer">
              <summary className="flex items-center list-none outline-none [&::-webkit-details-marker]:hidden">
                <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Awards' : '獎項'}</span>
                <span className="flex-1 flex items-center justify-between">
                  <span>{lang === 'ENG' ? 'View Details' : '展開查看'}</span>
                  <ChevronDown size={16} className="transition-transform group-open:rotate-180 opacity-50" />
                </span>
              </summary>
              <div className="pl-28 md:pl-32 pt-4 text-sm opacity-80 leading-relaxed whitespace-pre-wrap">
                {lang === 'ENG' 
                  ? 'Tung Ming Award, 24th Digital Content Competition, Shih Chien University\nJury Award by Artist Yu Cheng-Ta' 
                  : '實踐大學第24屆東閔盃數位內容競賽\n評審獎 藝術家余政達'}
              </div>
            </details>
          </div>

          <div className={`font-['Geist_Mono'] opacity-80 text-base whitespace-pre-wrap ${lang === 'ENG' ? 'leading-[1.8]' : 'leading-[2.2] tracking-[0.08em]'}`}>
            {lang === 'ENG' 
              ? "Using daily waste such as discarded newspapers, receipts, paper shreds, cardboard boxes, and cans as materials. These used, ignored, and easily accumulated objects are like long-unfaced psychological burdens. Through the repetitive acts of crumpling, organizing, and stacking these objects,\nI transform accumulated internal emotions into an installation and live audio-visual performance, manifesting the internal state into a viewable landscape. It also invites the viewer to look upon and rediscover their own unorganized emotions and internal space."
              : "以廢報紙、發票、碎紙條、紙箱與罐頭等日常廢棄物作為材料。\n這些被使用、被忽略、最容易堆積的物件，如同長期未被面對的心理負擔。透過揉搓、整理與堆疊物件的反覆行為，我將內在的情緒堆積轉化為裝置與現場音像表演，使內在狀態被具象化為可被觀看的視角，也邀請觀者在觀看的同時，重新看見自身未被整理的情緒與內在空間。"}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div className="w-full aspect-video bg-[#E0E0E0]">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/59k37VQ5rKo?autoplay=1&vq=hd1080" 
              title="Unsorted Cover Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[30px] mb-20">
        {/* Top large image */}
        <div 
          onClick={() => setLightboxIndex(1)}
          className="w-full bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
        >
          <img src={images[1].src} alt="Highlight 1" className="w-full h-auto object-cover" />
        </div>
        
        {/* Bottom two images side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          <div 
            onClick={() => setLightboxIndex(2)}
            className="w-full bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
          >
            <img src={images[2].src} alt="Highlight 2" className="w-full h-auto object-cover" />
          </div>
          <div 
            onClick={() => setLightboxIndex(3)}
            className="w-full bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
          >
            <img src={images[3].src} alt="Highlight 3" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>

      {/* Minimalist Process Separator */}
      <div className="border-t border-black/10 pt-10 mb-10 text-center font-['Geist_Mono'] text-sm tracking-[2px] opacity-40 uppercase">
        Process
      </div>

      <div className="columns-1 md:columns-3 gap-[20px] space-y-[20px]">
        {images.slice(4).map((img) => (
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

      <div 
        onClick={() => setLightboxIndex(0)}
        className="w-full bg-[#E0E0E0] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity overflow-hidden mt-20"
      >
        <img src={images[0].src} alt="Unsorted Original Cover" className="w-full h-auto object-cover" />
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
