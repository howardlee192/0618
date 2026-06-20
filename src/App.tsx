import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { motion, useSpring, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { AsciiArtHover } from "./components/ui/ascii-art";
import { WebGLFluidDistortion } from "./components/WebGLFluidDistortion";

type Language = 'ENG' | 'CHN';
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}
const LanguageContext = createContext<LanguageContextType>({ lang: 'ENG', setLang: () => {} });
const useLanguage = () => useContext(LanguageContext);

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('ENG');
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
};

const LanguageToggle = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useLanguage();
  return (
    <div className={`flex gap-4 text-xs md:text-sm font-['Geist_Mono'] uppercase tracking-[1px] items-center mb-2 md:mb-0 ${className}`}>
      <button
        onClick={() => setLang('CHN')}
        className={`transition-opacity hover:opacity-100 ${lang === 'CHN' ? 'opacity-100 font-bold' : 'opacity-40'}`}
      >
        <span className="font-['Space_Grotesk',_'Swei_Bow_Sans']">中</span>
      </button>
      <span className="opacity-20">/</span>
      <button
        onClick={() => setLang('ENG')}
        className={`transition-opacity hover:opacity-100 ${lang === 'ENG' ? 'opacity-100 font-bold' : 'opacity-40'}`}
      >
        ENG
      </button>
    </div>
  );
};

const HoverReveal = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  return (
    <div
      className="relative inline-flex items-center justify-center py-2 -my-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeIn", delay: isHovered ? 0.3 : 0 }}
        style={{
          x,
          y,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
          pointerEvents: "none"
        }}
        className="w-[260px] h-[180px] bg-[#D1D1D1] flex items-center justify-center overflow-hidden"
      >
        <span className="text-[0.85rem] text-[#888] font-['Geist_Mono'] normal-case tracking-normal">image placeholder</span>
      </motion.div>
    </div>
  );
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 2,
      bounce: 0,
    }
  },
};

const staggerItemBlur = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      duration: 2,
      bounce: 0,
    }
  },
};

function ProjectsGrid({ useBlur = false }: { useBlur?: boolean }) {
  const { lang } = useLanguage();
  const itemVariant = useBlur ? staggerItemBlur : staggerItem;

  const projects = [
    {
      title: lang === 'ENG' ? "Nike Swoosh 1" : "Nike Swoosh 1",
      category: lang === 'ENG' ? "CAMPAIGN / POP-UP" : "廣告活動 / 快閃店",
      aspect: "aspect-[4/5]"
    },
    {
      title: lang === 'ENG' ? "Journey To Edge" : "邊緣之旅",
      category: lang === 'ENG' ? "EXPERIENCE DESIGN / CONTENT CREATION" : "體驗設計 / 內容創作",
      aspect: "aspect-[16/9]"
    },
    {
      title: lang === 'ENG' ? "Illuminarium" : "幻光空間",
      category: lang === 'ENG' ? "EXPERIENCE DESIGN / CONTENT CREATION" : "體驗設計 / 內容創作",
      aspect: "aspect-[3/4]"
    },
    {
      title: lang === 'ENG' ? "Cosmic Flow" : "宇宙流",
      category: lang === 'ENG' ? "MOTION / VISUAL DESIGN" : "動態 / 視覺設計",
      aspect: "aspect-square"
    },
    {
      title: lang === 'ENG' ? "Digital Architecture" : "數位建築",
      category: lang === 'ENG' ? "BRANDING / INTERACTION" : "品牌設計 / 互動體驗",
      aspect: "aspect-[4/5]"
    },
    {
      title: lang === 'ENG' ? "The Metaverse" : "元宇宙",
      category: lang === 'ENG' ? "3D ANIMATION / INTERACTIVE" : "3D 動畫 / 互動體驗",
      aspect: "aspect-[16/9]"
    }
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      className="columns-1 md:columns-2 lg:columns-3 gap-[30px] space-y-[30px]"
    >
      {projects.map((p, i) => (
        <div key={i} className="break-inside-avoid">
          <motion.div variants={itemVariant} className="mb-[15px]">
            <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">{p.title}</h3>
            <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">{p.category}</div>
          </motion.div>
          <motion.div variants={itemVariant} className={`w-full h-auto ${p.aspect} bg-[#E0E0E0]`}></motion.div>
        </div>
      ))}
    </motion.div>
  );
}
const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/~';
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (index < iteration) return char;
        if (char === ' ' || char === '↖' || char === '↑' || char === '[' || char === ']') return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      iteration += 1 / 2;
      
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};



function Home() {
  useEffect(() => { document.title = "Howard Lee - Home"; }, []);
  const { lang } = useLanguage();
  const [hintLang, setHintLang] = useState<'ENG' | 'CHN'>(lang);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setHintLang(prev => prev === 'ENG' ? 'CHN' : 'ENG');
      }, 3000);
      return () => clearInterval(interval);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let touchStartY = 0;
    
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY <= 10 && e.deltaY < -10) {
        window.dispatchEvent(new Event('resetIntro'));
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY <= 10) {
        const currentY = e.touches[0].clientY;
        if (currentY - touchStartY > 30) {
          window.dispatchEvent(new Event('resetIntro'));
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Hero section moves down at half speed, fading out
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <div ref={heroRef} className="relative z-0 min-h-[95vh] flex flex-col justify-start pt-[5vh] md:pt-[8vh]">
        <motion.section style={{ y, opacity }} className="flex-1 w-full flex flex-col relative">
          <div className="flex-1 flex flex-col justify-start items-start">
            <div className="font-['Space_Grotesk'] text-[clamp(1.8rem,4.5vw,4.95rem)] leading-[0.95] tracking-[-2px] max-w-[80%] -ml-[0.04em]">
              <div className="flex items-center flex-wrap uppercase gap-10 md:gap-20">
                <HoverReveal><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">VISUAL</Text3DFlip></HoverReveal>
                <HoverReveal><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">MOTION</Text3DFlip></HoverReveal>
              </div>
              <div className="flex items-center flex-wrap uppercase mt-2 md:mt-4 gap-10 md:gap-20">
                <HoverReveal><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">ANIMATION</Text3DFlip></HoverReveal>
                <HoverReveal><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">INTERACTION</Text3DFlip></HoverReveal>
              </div>
              <div className="flex items-center flex-wrap uppercase mt-2 md:mt-4 gap-10 md:gap-20">
                <HoverReveal><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">PERSONAL</Text3DFlip></HoverReveal>
              </div>
              <div className="mt-12 md:mt-16 flex items-center gap-4">
                <span>FROM</span>
                <HoverReveal><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">HONG KONG</Text3DFlip></HoverReveal>
              </div>
              <div className="mt-2 md:mt-4 flex items-center gap-4">
                <span>BASED IN</span>
                <HoverReveal><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">TAIWAN</Text3DFlip></HoverReveal>
              </div>
              <div className="mt-2 md:mt-4">WORKING GLOBALLY.</div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-12 right-0 md:right-4 font-['Geist_Mono'] text-[0.85rem] md:text-sm uppercase tracking-[1px] pointer-events-none opacity-80"
          >
            <ScrambleText text={hintLang === 'ENG' ? '↖ [ Hover to reveal ]' : '↖ [ 滑動游標預覽影像 ]'} />
          </motion.div>
        </motion.section>
      </div>

      <section className="relative z-10 bg-[#F0F0F0] pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10">
        <div className="flex justify-between items-end mb-[40px] md:mb-[60px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            className="font-['Space_Grotesk'] text-[3.5rem] tracking-[-1px] -ml-[0.05em] font-normal"
          >
            Featured
          </motion.h2>
          <LanguageToggle />
        </div>
        <ProjectsGrid useBlur={true} />
      </section>
    </>
  );
}

function Work() {
  useEffect(() => { document.title = "Howard Lee - Work"; }, []);
  const { lang } = useLanguage();
  const [openFilter, setOpenFilter] = useState<'YEAR' | 'TYPE' | null>(null);

  const years = ['ALL', '2024', '2023', '2022', '2021'];
  const types = ['ALL', 'MOTION', 'VISUAL', 'CGI', 'INTERACTION'];

  const [activeYear, setActiveYear] = useState('ALL');
  const [activeType, setActiveType] = useState('ALL');

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10 min-h-[80vh]">
      <div className="flex justify-between items-end mb-[40px] md:mb-[60px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk'] text-[3.5rem] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          Work
        </motion.h2>
        <LanguageToggle />
      </div>

      {/* Filter Accordions */}
      <div className="mb-12 md:mb-20 border-t border-b border-black/10 flex flex-col md:flex-row">
        {/* YEAR Toggle */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-black/10">
          <button 
            onClick={() => setOpenFilter(openFilter === 'YEAR' ? null : 'YEAR')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-8 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Geist_Mono'] text-sm tracking-[1px] uppercase">
              {lang === 'ENG' ? 'Filter by Year' : '依年份篩選'} {activeYear !== 'ALL' && <span className="ml-2 opacity-50">[{activeYear}]</span>}
            </span>
            <span className="font-['Geist_Mono'] text-xl font-light">{openFilter === 'YEAR' ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {openFilter === 'YEAR' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 flex flex-wrap gap-2 pr-4 md:pr-8">
                  {years.map(y => (
                    <button 
                      key={y}
                      onClick={() => setActiveYear(y)}
                      className={`font-['Geist_Mono'] text-[0.85rem] tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeYear === y ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'} ${lang === 'ENG' ? 'uppercase' : ''}`}
                    >
                      {lang === 'CHN' && y === 'ALL' ? '全部' : y}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TYPE Toggle */}
        <div className="w-full md:w-1/2 pl-0 md:pl-8">
          <button 
            onClick={() => setOpenFilter(openFilter === 'TYPE' ? null : 'TYPE')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-0 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Geist_Mono'] text-sm tracking-[1px] uppercase">
              {lang === 'ENG' ? 'Filter by Type' : '依類型篩選'} {activeType !== 'ALL' && <span className="ml-2 opacity-50">[{activeType}]</span>}
            </span>
            <span className="font-['Geist_Mono'] text-xl font-light">{openFilter === 'TYPE' ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {openFilter === 'TYPE' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 flex flex-wrap gap-2">
                  {types.map(t => {
                    const translatedType = lang === 'ENG' ? t : 
                      ({'ALL': '全部', 'MOTION': '動態', 'VISUAL': '視覺', 'CGI': 'CGI', 'INTERACTION': '互動'})[t] || t;
                    return (
                      <button 
                        key={t}
                        onClick={() => setActiveType(t)}
                        className={`font-['Geist_Mono'] text-[0.85rem] tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeType === t ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'} ${lang === 'ENG' ? 'uppercase' : ''}`}
                      >
                        {translatedType}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProjectsGrid />
    </section>
  );
}

function Personal() {
  useEffect(() => { document.title = "Howard Lee - Personal"; }, []);
  const { lang } = useLanguage();
  const [openFilter, setOpenFilter] = useState<'YEAR' | 'MEDIUM' | null>(null);

  const years = ['ALL', '2024', '2023', '2022', '2021'];
  const mediums = ['ALL', 'CGI', '3D', 'SIMULATION', 'EXPERIMENTAL', 'PHYSICAL', 'MIXED MEDIA'];

  const [activeYear, setActiveYear] = useState('ALL');
  const [activeMedium, setActiveMedium] = useState('ALL');

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10 min-h-[80vh]">
      <div className="flex justify-between items-end mb-[40px] md:mb-[60px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[3.5rem] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          {lang === 'ENG' ? 'Personal' : '個人作品'}
        </motion.h2>
        <LanguageToggle />
      </div>

      {/* Filter Accordions */}
      <div className="mb-12 md:mb-20 border-t border-b border-black/10 flex flex-col md:flex-row">
        {/* YEAR Toggle */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-black/10">
          <button 
            onClick={() => setOpenFilter(openFilter === 'YEAR' ? null : 'YEAR')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-8 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Geist_Mono'] text-sm tracking-[1px] uppercase">
              {lang === 'ENG' ? 'Filter by Year' : '依年份篩選'} {activeYear !== 'ALL' && <span className="ml-2 opacity-50">[{activeYear}]</span>}
            </span>
            <span className="font-['Geist_Mono'] text-xl font-light">{openFilter === 'YEAR' ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {openFilter === 'YEAR' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 flex flex-wrap gap-2 pr-4 md:pr-8">
                  {years.map(y => (
                    <button 
                      key={y}
                      onClick={() => setActiveYear(y)}
                      className={`font-['Geist_Mono'] text-[0.85rem] tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeYear === y ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'} ${lang === 'ENG' ? 'uppercase' : ''}`}
                    >
                      {lang === 'CHN' && y === 'ALL' ? '全部' : y}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MEDIUM Toggle */}
        <div className="w-full md:w-1/2 pl-0 md:pl-8">
          <button 
            onClick={() => setOpenFilter(openFilter === 'MEDIUM' ? null : 'MEDIUM')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-0 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Geist_Mono'] text-sm tracking-[1px] uppercase">
              {lang === 'ENG' ? 'Filter by Medium' : '依媒介篩選'} {activeMedium !== 'ALL' && <span className="ml-2 opacity-50">[{activeMedium}]</span>}
            </span>
            <span className="font-['Geist_Mono'] text-xl font-light">{openFilter === 'MEDIUM' ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {openFilter === 'MEDIUM' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 flex flex-wrap gap-2">
                  {mediums.map(m => {
                    const translatedMedium = lang === 'ENG' ? m : 
                      ({'ALL': '全部', 'CGI': 'CGI', '3D': '3D', 'SIMULATION': '物理模擬', 'EXPERIMENTAL': '實驗影像', 'PHYSICAL': '實體裝置', 'MIXED MEDIA': '複合媒材'})[m] || m;
                    return (
                      <button 
                        key={m}
                        onClick={() => setActiveMedium(m)}
                        className={`font-['Geist_Mono'] text-[0.85rem] tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeMedium === m ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'} ${lang === 'ENG' ? 'uppercase' : ''}`}
                      >
                        {translatedMedium}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        className="columns-1 md:columns-2 lg:columns-3 gap-[30px] space-y-[30px]"
      >
        <div className="break-inside-avoid">
          <Link to="/personal/unsorted" className="block group cursor-pointer">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal group-hover:opacity-60 transition-opacity">Unsorted</h3>
              <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">{lang === 'ENG' ? 'AUDIO VISUAL PERFORMANCE' : '即時音像演出'}</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full relative bg-[#E0E0E0] overflow-hidden">
              <img src="/projects/unsorted/unsorted_cover.jpg" alt="Unsorted" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-['Geist_Mono'] text-white text-[0.85rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'ENG' ? 'Click to View' : '點擊查看'}</span>
              </div>
            </motion.div>
          </Link>
        </div>
        <div className="break-inside-avoid">
          <Link to="/personal/frame-by-frame" className="block group cursor-pointer">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal group-hover:opacity-60 transition-opacity">Frame by Frame</h3>
              <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">{lang === 'ENG' ? '3D INSTALLATION' : '立體裝置'}</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full relative bg-[#E0E0E0] overflow-hidden">
              <img src="/projects/framebyframe/cover.jpg" alt="Frame by Frame" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-['Geist_Mono'] text-white text-[0.85rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'ENG' ? 'Click to View' : '點擊查看'}</span>
              </div>
            </motion.div>
          </Link>
        </div>
        <div className="break-inside-avoid">
          <Link to="/personal/who-decides" className="block group cursor-pointer">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal group-hover:opacity-60 transition-opacity">Who decides your needs?</h3>
              <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">{lang === 'ENG' ? 'ISSUE POSTER DESIGN' : '議題海報設計'}</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full relative bg-[#E0E0E0] overflow-hidden">
              <img src="/projects/whodecides/Poster1+Cover.jpg" alt="Who decides your needs?" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-['Geist_Mono'] text-white text-[0.85rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'ENG' ? 'Click to View' : '點擊查看'}</span>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  useEffect(() => { document.title = "Howard Lee - About"; }, []);
  const { lang } = useLanguage();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const [hintLang, setHintLang] = useState<'ENG' | 'CHN'>(lang);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setHintLang(prev => prev === 'ENG' ? 'CHN' : 'ENG');
      }, 3000);
      return () => clearInterval(interval);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const resumeData = {
    ENG: [
      {
        title: 'Education',
        items: [
          { left: '2025 - Present', right: <>BFA in Communications Design,<br/>Shih Chien University, Taiwan (Animation & Moving Image Design)</> },
          { left: '2024 - 2025', right: 'BFA in Media Design, Tatung University, Taiwan (Interaction Design)' },
          { left: '2023 - 2024', right: 'BFA in Digital Media Design, Ming Chuan University, Taiwan' },
          { left: '2020 - 2023', right: 'Diploma, HKICC Lee Shau Kee School of Creativity, Hong Kong (Film and Video Arts)' }
        ]
      },
      {
        title: 'Experience',
        items: [
          { isCategory: true, title: 'Concert Visual' },
          { left: '2026', right: <>Hsinchu "ON LOOP" 2026 New Year’s Eve Concert, Taiwan<br/><span className="text-sm opacity-60 mt-1 inline-block">Animation Design (TRASH & Hsu Wei-Hsiang) & Visual Execution</span></> },
          { left: '2025', right: <>2025 20th KKBOX Music Awards Concert, Taiwan<br/><span className="text-sm opacity-60 mt-1 inline-block">Animation Design (Together Lonely & Forever)</span></> },
          { left: '2024', right: <>Cyndi Wang "SUGAR HIGH 2.0" World Tour, Taipei, Taiwan<br/><span className="text-sm opacity-60 mt-1 inline-block">Animation Visual Design (Miss You Most & Wedding Dress of Flowers)</span></> },
          { left: '2024', right: <>Xu Song "Breath of the Wild" 2024 World Tour, China<br/><span className="text-sm opacity-60 mt-1 inline-block">Animation Visual Design (Nemesis)</span></> },
          { isCategory: true, title: 'Commercial' },
          { left: '2024', right: <>General Air-Conditioner Commercial 2024 "Fabulous 50, Number One Achievement", Hong Kong<br/><span className="text-sm opacity-60 mt-1 inline-block">Motion Graphic Designer & Illustration</span></> },
          { isCategory: true, title: 'Immersive Video' },
          { left: '2023', right: <>BOC (Hong Kong) Private Banking Presents "No.1 Cultural Grotto" Immersive Art Installation, Hong Kong<br/><span className="text-sm opacity-60 mt-1 inline-block">2D Motion Designer / Editor / Compositor: "Heavenly Sound" Chapter</span></> },
          { isCategory: true, title: 'Performance' },
          { left: '2026', right: <>Audio Visual Performance, "Unsorted",<br/>Shih Chien University, Taiwan</> }
        ]
      },
      {
        title: 'Exhibitions',
        items: [
          { left: '2025', right: 'Taoyuan International Design Award, Taoyuan Arts Center, Taiwan' },
          { left: '2023', right: 'HKSC Graduation Show 2023: undefined, Hong Kong' }
        ]
      },
      {
        title: 'Awards',
        items: [
          { left: '2026', right: <>Young Ones ADC: Design for Good,<br/>Bronze Cube, NYC</> },
          { left: '2025', right: 'Taiwan International Student Design Competition (TISDC), Bronze Prize, Taiwan' },
          { left: '2025', right: 'Taoyuan Design Award (Visual and Commercial Design), Excellence Award, Taiwan' },
          { left: '2025', right: 'Taiwan Golden Star Design Award (Poster Design), Gold Award, Taiwan' },
          { left: '2021, 2023', right: 'Bright Future Creativity Scholarship (Animation & Sculpture), Hong Kong' }
        ]
      }
    ],
    CHN: [
      {
        title: '學歷',
        items: [
          { left: '2025 - 迄今', right: '實踐大學 媒體傳達設計學系, 台灣 (動畫影像設計組)' },
          { left: '2024 - 2025', right: '大同大學 媒體設計學系, 台灣 (互動設計組)' },
          { left: '2023 - 2024', right: '銘傳大學 數位媒體設計學系, 台灣' },
          { left: '2020 - 2023', right: '香港兆基創意書院, 香港 (電影與錄像藝術)' }
        ]
      },
      {
        title: '工作經歷',
        items: [
          { isCategory: true, title: '演唱會視覺設計' },
          { left: '2026', right: <>「新竹ON LOOP 不斷電」2026大新竹跨年晚會, 台灣<br/><span className="text-sm opacity-60 mt-1 inline-block">動畫設計（TRASH & 徐暐翔）& 視訊執行</span></> },
          { left: '2025', right: <>2025第20屆KKBOX風雲榜演唱會, 高雄, 台灣<br/><span className="text-sm opacity-60 mt-1 inline-block">動畫設計（一起寂寞 & 永遠永遠）</span></> },
          { left: '2024', right: <>王心凌「SUGAR HIGH 2.0世界巡迴演唱會」, 台北, 台灣<br/><span className="text-sm opacity-60 mt-1 inline-block">動畫視覺設計（最想你的 & 花的嫁紗）</span></> },
          { left: '2024', right: <>許嵩「呼吸之野」2024巡迴演唱會, 中國<br/><span className="text-sm opacity-60 mt-1 inline-block">動畫視覺設計（宿敵）</span></> },
          { isCategory: true, title: '商業廣告' },
          { left: '2024', right: <>珍寶冷氣廣告2024 精彩50 成就第一, 香港<br/><span className="text-sm opacity-60 mt-1 inline-block">Motion Graphic Designer & Illustration</span></> },
          { isCategory: true, title: '沉浸式影像製作' },
          { left: '2023', right: <>中國銀行(香港)私人銀行呈獻《第一號文化洞窟—萬籟有聲：天籟 • 地籟 • 人籟》沉浸式展演藝術裝置, 香港<br/><span className="text-sm opacity-60 mt-1 inline-block">2D 動態設計 / 剪輯 / 合成：「天籟」章節</span></> },
          { isCategory: true, title: '個人演出' },
          { left: '2026', right: '即時音像演出「Unsorted」, 實踐大學, 台灣' }
        ]
      },
      {
        title: '參展經歷',
        items: [
          { left: '2025', right: '桃園國際設計獎, 桃園展演中心, 台灣' },
          { left: '2023', right: '香港兆基創意書院 畢業展 2023：未定義, 香港' }
        ]
      },
      {
        title: '獎項',
        items: [
          { left: '2026', right: <>Young Ones ADC: Design for Good,<br/>銅立方獎, 紐約</> },
          { left: '2025', right: '臺灣國際學生創意設計大賽 (TISDC), 銅獎, 台灣' },
          { left: '2025', right: '桃園設計獎 (視覺與商業設計類), 特優獎, 台灣' },
          { left: '2025', right: '台灣金星設計獎 (海報設計類), 金獎, 台灣' },
          { left: '2021, 2023', right: '鵬程創意獎學金 (動畫與雕塑), 香港' }
        ]
      }
    ]
  };

  const content = {
    ENG: {
      name: "Howard Lee",
      bio: "An artist and motion designer from Hong Kong, currently based in Taiwan. Lee's work revolves around the interpersonal relationships and emotional issues of contemporary youth. He has participated in numerous stage and performance visual designs. Excelling at breaking through medium constraints, he uses motion storytelling and design strategies to lead audiences through the ups and downs of life across visual and physical spaces.",
      role: "Motion & Visual Designer / Artist",
      title1: "01. Spatial Motion Visuals",
      desc1: "I excel at employing design strategies to accurately analyze project directions while considering the overall spatial presentation. Whether for stages or exhibitions, I use visuals and digital animation to create immersive experiences, ensuring the design resonates deeply with the audience.",
      title2: "02. Core Capabilities",
      skills: ['Motion Design', 'Projection Mapping', 'Concert Visuals', '3D Animation', 'Interaction Design', 'Visual Identity'],
      title3: "03. Core Direction",
      desc3: "My creations focus on contemporary interpersonal relationships, conveying my observations on social connections across various mediums. The goal is to touch and inspire audiences through concise and impactful motion visuals."
    },
    CHN: {
      name: <>李浩勤 <span className="tracking-[-1.5px]">Howard Lee</span></>,
      bio: "來自香港、現居台灣的藝術家與動態影像設計師。李氏的創作圍繞著當代青年的人際關係與情感議題，曾參與多場舞台與展演影像設計。他擅長打破載體限制，運用動態敘事與設計策略，帶領觀眾在影像與場域中體驗人生起伏。",
      role: "動態與視覺設計師 / 藝術家",
      title1: "01. 場域型動態視覺",
      desc1: "我擅長運用設計策略，精準分析專案方向，並將整體的空間呈現納入考量。在舞台或展演，我都透過影像與數位動畫，為觀眾打造具沉浸感的體驗，讓設計與受眾產生深刻共鳴。",
      title2: "02. 核心技能領域",
      skills: ['動態設計', '光雕投影', '演唱會影像', '3D 動畫', '互動設計', '視覺識別'],
      title3: "03. 核心方向",
      desc3: "我的創作關注當代人與人之間的關係，在不同載體中傳達我對社會關係的觀察。目標是透過簡練、具張力的動態視覺，觸動觀眾並帶來啟發。"
    }
  };

  const text = content[lang];

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] min-h-[80vh]">
      <div className="flex justify-between items-end mb-[60px] md:mb-[100px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk'] text-[3.5rem] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          About
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="pb-3 md:pb-4"
        >
          <LanguageToggle className="!mb-0" />
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 md:gap-24 relative">
        {/* Left Side: Large Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="w-full md:w-1/2 flex flex-col justify-start md:sticky md:top-[100px] h-fit"
        >
          {/* Profile Picture with Parallax */}
          <div ref={containerRef} className="w-[180px] md:w-[240px] max-w-full mb-[80px] md:mb-[120px]">
            <motion.div style={{ y }} className="w-full bg-[#E0E0E0] relative">
              <AsciiArtHover 
                src="/about_bioprofile.jpg" 
                className="w-full h-auto block"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute -bottom-8 left-0 font-['Geist_Mono'] text-[0.75rem] md:text-[0.85rem] uppercase tracking-[1px] pointer-events-none opacity-80 whitespace-nowrap"
              >
                <ScrambleText text={hintLang === 'ENG' ? '↑ [ Hover to reveal ]' : '↑ [ 滑動游標預覽 ]'} />
              </motion.div>
            </motion.div>
          </div>

          <h3 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.5] tracking-[0.05em]" : "text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] tracking-[-1.5px]"} mb-2`}>
            {text.name}
          </h3>
          <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[0.9rem] tracking-[0.1em]" : "text-sm tracking-[0.5px]"} opacity-50 uppercase mb-6`}>
            {text.role}
          </p>
          <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[1rem] leading-[2] tracking-[0.05em]" : "text-[0.9rem] leading-[1.6]"} opacity-70`}>
            {text.bio}
          </p>
        </motion.div>

        {/* Right Side: 1, 2, 3 List */}
        <div className="w-full md:w-1/2 flex flex-col mt-10 md:mt-0">
          {/* Item 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0, delay: 0.1 }}
            viewport={{ once: false, margin: "-100px" }}
            className="border-t border-black/10 py-8 md:py-12 flex flex-col"
          >
            <h4 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-xl md:text-2xl tracking-[0.05em]" : "text-xl md:text-2xl tracking-[-0.5px]"} mb-4`}>{text.title1}</h4>
            <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[1rem] leading-[2] tracking-[0.05em]" : "text-[0.9rem] leading-[1.6]"} opacity-70`}>
              {text.desc1}
            </p>
          </motion.div>

          {/* Item 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="border-t border-black/10 py-8 md:py-12 flex flex-col"
          >
            <h4 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-xl md:text-2xl tracking-[0.05em]" : "text-xl md:text-2xl tracking-[-0.5px]"} mb-6`}>{text.title2}</h4>
            <div className="flex flex-wrap gap-3">
              {text.skills.map(skill => (
                <span key={skill} className={`font-['Geist_Mono'] ${lang === 'CHN' ? "text-[1rem] tracking-[0.1em]" : "text-[0.9rem] tracking-[0.5px]"} uppercase px-5 py-2.5 border border-black/20 rounded-full hover:bg-black hover:text-[#F0F0F0] transition-colors cursor-default`}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Item 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0, delay: 0.3 }}
            viewport={{ once: false, margin: "-100px" }}
            className="border-t border-black/10 py-8 md:py-12 flex flex-col"
          >
            <h4 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-xl md:text-2xl tracking-[0.05em]" : "text-xl md:text-2xl tracking-[-0.5px]"} mb-4`}>{text.title3}</h4>
            <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[1rem] leading-[2] tracking-[0.05em]" : "text-[0.9rem] leading-[1.6]"} opacity-70`}>
              {text.desc3}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Accordion Resume Section */}
      <div className="mt-32 w-full">
        {resumeData[lang].map((section, idx) => (
          <div key={idx} className="border-t border-black/10 first:border-t-0">
            <button
              onClick={() => setOpenSection(openSection === section.title ? null : section.title)}
              className="w-full py-8 md:py-12 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
            >
              <h4 className="font-['Space_Grotesk'] text-2xl md:text-4xl tracking-[-1px] uppercase">
                {section.title}
              </h4>
              <span className="font-['Geist_Mono'] text-2xl font-light">
                {openSection === section.title ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence>
              {openSection === section.title && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-12 flex flex-col md:flex-row gap-10 md:gap-24">
                    <div className="hidden md:block w-full md:w-1/2"></div>
                    <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
                      {section.items.map((item, itemIdx) => (
                        item.isCategory ? (
                          <div key={itemIdx} className={`w-full ${itemIdx !== 0 ? 'pt-6' : ''} border-b border-black/10 pb-3`}>
                            <span className="font-['Geist_Mono'] text-[1rem] tracking-[1px] uppercase opacity-40">
                              {item.title}
                            </span>
                          </div>
                        ) : (
                          <div key={itemIdx} className="flex flex-col md:flex-row justify-between md:items-start gap-3 md:gap-0">
                            <span className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "tracking-[0.05em] text-[1.4rem]" : "text-[1.5rem]"} w-full md:w-1/3`}>
                              {item.left}
                            </span>
                            <span className={`font-['Geist_Mono'] ${lang === 'CHN' ? "tracking-[0.05em] text-[1.1rem] leading-[1.7] break-keep" : "tracking-[0.5px] text-[1.1rem] leading-[1.6]"} opacity-70 uppercase text-left w-full md:w-2/3`}>
                              {item.right}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    // @ts-ignore
    window.lenis = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#0A0A0A]">
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[999]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[#0A0A0A]"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="absolute inset-0 flex flex-col p-5 md:px-10 md:py-5 text-[#F0F0F0] z-10"
            >
              <header className="flex justify-between items-start text-[0.75rem] uppercase tracking-[0.5px]">
                <div className="flex flex-col md:flex-row md:items-center">
                  <Link 
                    to="/" 
                    onClick={() => {
                      window.dispatchEvent(new Event('resetIntro'));
                    }}
                    className="font-normal -ml-[0.05em] hover:opacity-70 transition-opacity"
                  >
                    HOWARD LEE
                  </Link>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="hover:opacity-60 transition-opacity">
                  <X size={20} />
                </button>
              </header>

              <div className="flex-1 flex flex-col justify-center items-center gap-10">
                {['HOME', 'WORK', 'PERSONAL', 'ABOUT'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.4 + index * 0.1 }}
                  >
                    <Link
                      to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                      className="font-['Space_Grotesk'] text-[clamp(3rem,8vw,6rem)] leading-[1] tracking-[-2px] hover:opacity-70 transition-opacity"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="p-5 md:px-10 md:py-5 min-h-screen flex flex-col">
        <header className="flex justify-between items-start text-[0.75rem] uppercase tracking-[0.5px]">
          <div className="flex flex-col md:flex-row md:items-center">
            <a 
              href="/" 
              onClick={(e) => {
                window.dispatchEvent(new Event('resetIntro'));
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo(0, 0);
                }
              }}
              className="font-normal -ml-[0.05em] hover:opacity-70 transition-opacity"
            >
              HOWARD LEE
            </a>
            <span className="opacity-60 ml-0 md:ml-[clamp(40px,15vw,200px)] hidden sm:block">MOTION / VISUAL DESIGNER / ARTIST</span>
          </div>
          <button onClick={() => setIsMenuOpen(true)} className="hover:opacity-60 transition-opacity">
            <Menu size={20} />
          </button>
        </header>

        <div className="flex-1 relative z-10 bg-[#F0F0F0]">
          {children}
        </div>

        {/* Sticky Parallax Footer */}
        <div
          className="relative h-[100vh]"
          style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
          <div className="fixed bottom-0 left-0 w-full h-[100vh] p-5 md:px-10 pb-[20px] pt-[80px] md:pt-[100px] flex flex-col justify-between bg-[#F0F0F0]">
            <div>
              <div className="text-[0.75rem] uppercase mb-10 tracking-[0.5px]">GET IN TOUCH</div>
              <div className="flex flex-col gap-[15px]">
                {[
                  { label: "MAIL", text: <>LEEHOKAN<br className="block lg:hidden" />192@GMAIL.COM</>, href: "mailto:leehokan192@gmail.com" },
                  { label: "FOLLOW", text: "INSTAGRAM", href: "https://www.instagram.com/howard_lhk/", target: "_blank" },
                  { label: "VIEW", text: "BEHANCE", href: "https://www.behance.net/hokanlee", target: "_blank" },
                  { label: "VIEW", text: "VIMEO", href: "https://vimeo.com/user177460868", target: "_blank" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start max-w-full">
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.target ? "noopener noreferrer" : undefined}
                      className="font-['Space_Grotesk'] text-[clamp(2rem,8vw,7rem)] leading-[1] tracking-[-2px] -ml-[0.04em] hover:opacity-70 transition-opacity break-all md:break-normal"
                    >
                      {item.text}
                    </a>
                    <span className="text-[0.5rem] uppercase opacity-50 mt-[5px] ml-[10px] shrink-0">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-[0.75rem] uppercase tracking-[0.5px]">
              <div>AVAILABLE FOR WORK</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntroScreen({ onEnter, isReturning }: { onEnter: () => void, isReturning?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hintLang, setHintLang] = useState<'ENG' | 'CHN'>('ENG');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setHintLang(prev => prev === 'ENG' ? 'CHN' : 'ENG');
      }, 2000);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let accumulatedScroll = 0;
    
    const handleScroll = (e: WheelEvent) => {
      if (scrolled) return;
      
      accumulatedScroll += e.deltaY;
      
      // Enter site only if scrolled down past 300px threshold
      if (accumulatedScroll > 300) {
        setScrolled(true);
        setTimeout(onEnter, 2800); // 800ms fade + 2000ms pause on white
      }
      
      // Reset if scrolling up significantly
      if (accumulatedScroll < 0) {
        accumulatedScroll = 0;
      }
    };
    
    // For touch devices, similar accumulation could be added, but keeping it simple for now
    const handleTouch = () => {
      if (!scrolled) {
        setScrolled(true);
        setTimeout(onEnter, 2800);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleTouch, { once: true });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [scrolled, onEnter]);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] flex flex-col justify-end bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background Image with WebGL Flowmap and Chromatic Aberration */}
      <WebGLFluidDistortion 
        src="/websiteintrobg_1.jpg"
        type="image"
        className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
        cursorRadius={0.06}
        dissipationSpeed={0.92}
      />

      {/* Top Left Interaction Hint */}
      <motion.div 
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 z-10 p-5 md:px-10 md:py-10 font-['Geist_Mono'] text-[0.85rem] uppercase tracking-[1px] pointer-events-none"
      >
        <div className="flex flex-col items-start gap-1">
          <span className="font-['Space_Grotesk',_'Swei_Bow_Sans'] tracking-[0.1em] bg-[#0A0A0A] text-[#F0F0F0] px-2 py-1 leading-none flex items-center justify-center min-h-[1.5rem]">
            <ScrambleText text={hintLang === 'ENG' ? 'MOVE MOUSE TO FOCUS' : '移 動 鼠 標 聚 焦'} />
          </span>
        </div>
      </motion.div>

      {/* Bottom Right Scroll Prompt */}
      <motion.div 
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex justify-end items-end p-5 md:px-10 md:py-10 w-full font-['Geist_Mono'] text-[0.85rem] uppercase tracking-[1px] pointer-events-none"
      >
        <div className="flex flex-col items-end gap-1">
          <span className="animate-bounce text-xl leading-none bg-[#0A0A0A] text-[#F0F0F0] px-2 py-1">↓</span>
          <span className="font-['Space_Grotesk',_'Swei_Bow_Sans'] tracking-[0.1em] bg-[#0A0A0A] text-[#F0F0F0] px-2 py-1 leading-none flex items-center justify-center min-h-[1.5rem]">
            <ScrambleText text={hintLang === 'ENG' ? 'SCROLL TO ENTER' : '滑 動 進 入'} />
          </span>
        </div>
      </motion.div>

      {/* White Fade Overlay for Entering Home */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[#FFFFFF] z-20 pointer-events-none"
      />

      {/* White Fade Out Overlay for Returning from Home */}
      {isReturning && !scrolled && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[#FFFFFF] z-30 pointer-events-none"
        />
      )}
    </motion.div>
  );
}

function HomeTransition({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const [isReversing, setIsReversing] = useState(false);
  const [hasReturned, setHasReturned] = useState(false);

  useEffect(() => {
    const handleReset = () => {
      if (introDone && !isReversing) {
        setIsReversing(true);
        setTimeout(() => {
          setHasReturned(true);
          setIntroDone(false);
          setIsReversing(false);
        }, 800); // Match the fade to white duration
      } else if (!introDone) {
        // If already in intro, just reset return state
        setHasReturned(false);
      }
    };
    window.addEventListener('resetIntro', handleReset);
    return () => window.removeEventListener('resetIntro', handleReset);
  }, [introDone, isReversing]);

  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      // @ts-ignore
      if (window.lenis) window.lenis.stop();
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        // @ts-ignore
        if (window.lenis) {
          // @ts-ignore
          window.lenis.start();
          // @ts-ignore
          window.lenis.resize();
        }
        window.dispatchEvent(new Event('resize'));
        window.focus();
      }, 500);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        // @ts-ignore
        if (window.lenis) window.lenis.start();
        window.dispatchEvent(new Event('resize'));
      };
    }
  }, [introDone]);

  const handleEnter = () => {
    window.scrollTo(0, 0);
    setIntroDone(true);
    setHasReturned(false);
  };

  return (
    <>
      <AnimatePresence>
        {!introDone && <IntroScreen onEnter={handleEnter} isReturning={hasReturned} key="intro" />}
      </AnimatePresence>

      {introDone && (
        <>
          <motion.div
            className="fixed inset-0 z-[1000] bg-[#FFFFFF] pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: isReversing ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <motion.div
            initial={{ filter: "blur(20px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function ProjectUnsorted() {
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
    { id: 5, src: "/projects/unsorted/process4.jpg" }, // Swapped from process5
    { id: 6, src: "/projects/unsorted/process3.jpg" },
    { id: 7, src: "/projects/unsorted/process5.jpg" }, // Swapped from process4
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
        <div className="w-full md:w-1/3">
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
              <span className="flex-1">{lang === 'ENG' ? 'Cardboard, Newspapers, Receipts, Shredded Paper, Cans' : '廢紙箱、廢報紙、發票、碎紙條、罐頭'}</span>
            </div>
          </div>

          <div className={`font-['Geist_Mono'] opacity-80 text-base ${lang === 'ENG' ? 'leading-[1.8]' : 'leading-[2.2] tracking-[0.08em]'}`}>
            {lang === 'ENG' 
              ? "Using daily waste such as discarded newspapers, receipts, paper shreds, cardboard boxes, and cans as materials. These used, ignored, and easily accumulated objects are like long-unfaced psychological burdens. Through the repetitive acts of crumpling, organizing, and stacking these objects, I transform accumulated internal emotions into an installation and live audio-visual performance, manifesting the internal state into a viewable landscape. It also invites the viewer to look upon and rediscover their own unorganized emotions and internal space."
              : "以廢報紙、發票、碎紙條、紙箱與罐頭等日常廢棄物作為材料。這些被使用、被忽略、最容易堆積的物件，如同長期未被面對的心理負擔。透過揉搓、整理與堆疊物件的反覆行為，我將內在的情緒堆積轉化為裝置與現場音像表演，使內在狀態被具象化為可被觀看的視角，也邀請觀者在觀看的同時，重新看見自身未被整理的情緒與內在空間。"}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div 
            onClick={() => setLightboxIndex(0)}
            className="w-full bg-[#E0E0E0] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
          >
            <img src={images[0].src} alt="Unsorted Cover" className="w-full h-auto object-cover" />
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
              className="max-w-[90vw] max-h-[90vh] flex items-center justify-center cursor-default relative"
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
                  className="max-w-[90vw] max-h-[90vh] object-contain" 
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

function ProjectFrameByFrame() {
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
              className="max-w-[90vw] max-h-[90vh] flex items-center justify-center cursor-default relative"
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
                  className="max-w-[90vw] max-h-[90vh] object-contain" 
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

function ProjectWhoDecides() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Howard Lee - Who decides your needs?";
  }, []);

  const { lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [
    { id: 0, src: "/projects/whodecides/Poster1+Cover.jpg" },
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
        <div className="w-full md:w-1/3">
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
              <span>{lang === 'ENG' ? 'Issue Poster Design' : '議題海報設計'}</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-28 shrink-0 md:w-32">{lang === 'ENG' ? 'Materials' : '媒材'}</span>
              <span className="flex-1">{lang === 'ENG' ? 'Blender, Nano Banana, Midjourney, Fabric, Magazine Collage, Number Stickers' : 'Blender、Nano Banana、Midjourney、布料、雜誌拼貼、數字貼紙'}</span>
            </div>
          </div>

          <div className={`font-['Geist_Mono'] opacity-80 text-base whitespace-pre-wrap ${lang === 'ENG' ? 'leading-[1.8]' : 'leading-[2.2] tracking-[0.08em]'}`}>
            {lang === 'ENG' 
              ? "This series critiques consumerism’s manipulation of desire. From canned fashion waste to bodies bound by fabric and production lines refilling hollowed mannequins, it exposes a manufactured cycle of \"needs,\" addressing how the system replaces autonomy by engineering demand. In a profit-driven world, who decides your needs?"
              : "本系列海報作品是批判消費主義操縱我們慾望的機制。視覺從罐頭揭開的快時尚廢料、受廢料束縛而扭曲的人體，到生產線回填掏空的假體，揭露了被精密設計的「需求」循環，回應體制藉由「製造需求」來取代自主權。在利潤至上的世界，究竟是誰在替你決定需求？"}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div 
            onClick={() => setLightboxIndex(0)}
            className="w-full flex items-center justify-center cursor-pointer group overflow-hidden"
          >
            <img src={images[0].src} alt="Who decides your needs Cover" className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[0.5]" />
          </div>
        </div>
      </div>

      {/* Highlights (stacked) */}
      <div className="flex flex-col gap-[30px] mb-20">
        <div 
          onClick={() => setLightboxIndex(1)}
          className="w-full cursor-pointer group overflow-hidden flex justify-center"
        >
          <img src={images[1].src} alt="Poster 2" className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[0.5]" />
        </div>
        <div 
          onClick={() => setLightboxIndex(2)}
          className="w-full cursor-pointer group overflow-hidden flex justify-center"
        >
          <img src={images[2].src} alt="Poster 3" className="w-full h-auto block transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[0.5]" />
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
              className="max-w-[90vw] max-h-[90vh] flex items-center justify-center cursor-default relative"
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
                  className="max-w-[90vw] max-h-[90vh] object-contain" 
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

function ComingSoon() {
  const [displayLang, setDisplayLang] = useState<'ENG' | 'CHN'>('ENG');

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayLang(prev => prev === 'ENG' ? 'CHN' : 'ENG');
    }, 2500); // Set to 2.5s so it has time to read after scrambling
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-5 md:px-10 gap-4">
      <h1 className="font-['Space_Grotesk'] text-[clamp(2.5rem,6vw,4rem)] tracking-[-2px] uppercase">
        Coming Soon
      </h1>
      <p className="font-['Geist_Mono'] text-sm md:text-base tracking-[1px] opacity-50 uppercase min-h-[1.5rem] flex items-center justify-center">
        <ScrambleText text={displayLang === 'ENG' ? 'Under Construction' : '頁 面 準 備 中'} />
      </p>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeTransition><Home /></HomeTransition>} />
        {/* <Route path="/work" element={<PageTransition><Work /></PageTransition>} /> */}
        <Route path="/work" element={<PageTransition><ComingSoon /></PageTransition>} />
        <Route path="/personal" element={<PageTransition><Personal /></PageTransition>} />
        <Route path="/personal/unsorted" element={<PageTransition><ProjectUnsorted /></PageTransition>} />
        <Route path="/personal/frame-by-frame" element={<PageTransition><ProjectFrameByFrame /></PageTransition>} />
        <Route path="/personal/who-decides" element={<PageTransition><ProjectWhoDecides /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </LanguageProvider>
  );
}
