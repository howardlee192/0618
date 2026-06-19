import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { motion, useSpring, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AsciiArtHover } from "./components/ui/ascii-art";

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
        <span className="text-[0.6rem] text-[#888] font-['Geist_Mono'] normal-case tracking-normal">image placeholder</span>
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
  const itemVariant = useBlur ? staggerItemBlur : staggerItem;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      className="columns-1 md:columns-2 lg:columns-3 gap-[30px] space-y-[30px]"
    >
      <div className="break-inside-avoid">
        <Link to="/artwork/unsorted" className="block group cursor-pointer">
          <motion.div variants={itemVariant} className="mb-[15px]">
            <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal group-hover:opacity-60 transition-opacity">Unsorted</h3>
            <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">PERFORMANCE / LIVE VISUAL</div>
          </motion.div>
          <motion.div variants={itemVariant} className="w-full h-auto aspect-square bg-[#E0E0E0] flex items-center justify-center overflow-hidden">
            <span className="font-['Geist_Mono'] text-[#888] text-[0.6rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">Click to View</span>
          </motion.div>
        </Link>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={itemVariant} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Nike Swoosh 1</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">CAMPAIGN / POP-UP</div>
        </motion.div>
        <motion.div variants={itemVariant} className="w-full h-auto aspect-[4/5] bg-[#E0E0E0]"></motion.div>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={itemVariant} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Journey To Edge</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">EXPERIENCE DESIGN / CONTENT CREATION</div>
        </motion.div>
        <motion.div variants={itemVariant} className="w-full h-auto aspect-[16/9] bg-[#E0E0E0]"></motion.div>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={itemVariant} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Illuminarium</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">EXPERIENCE DESIGN / CONTENT CREATION</div>
        </motion.div>
        <motion.div variants={itemVariant} className="w-full h-auto aspect-[3/4] bg-[#E0E0E0]"></motion.div>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={itemVariant} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Cosmic Flow</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">MOTION / VISUAL DESIGN</div>
        </motion.div>
        <motion.div variants={itemVariant} className="w-full h-auto aspect-square bg-[#E0E0E0]"></motion.div>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={itemVariant} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Digital Architecture</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">BRANDING / INTERACTION</div>
        </motion.div>
        <motion.div variants={itemVariant} className="w-full h-auto aspect-[4/5] bg-[#E0E0E0]"></motion.div>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={itemVariant} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">The Metaverse</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">3D ANIMATION / INTERACTIVE</div>
        </motion.div>
        <motion.div variants={itemVariant} className="w-full h-auto aspect-[16/9] bg-[#E0E0E0]"></motion.div>
      </div>
    </motion.div>
  );
}



function Home() {
  useEffect(() => { document.title = "Howard Lee - Home"; }, []);

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
        <motion.section style={{ y, opacity }} className="flex flex-col relative">
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
                <HoverReveal><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">ARTWORK</Text3DFlip></HoverReveal>
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
        </motion.section>
      </div>

      <section className="relative z-10 bg-[#F0F0F0] pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk'] text-[3.5rem] mb-[60px] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          Featured
        </motion.h2>
        <ProjectsGrid useBlur={true} />
      </section>
    </>
  );
}

function Work() {
  useEffect(() => { document.title = "Howard Lee - Work"; }, []);
  const [openFilter, setOpenFilter] = useState<'YEAR' | 'TYPE' | null>(null);

  const years = ['ALL', '2024', '2023', '2022', '2021'];
  const types = ['ALL', 'MOTION', 'VISUAL', 'CGI', 'INTERACTION'];

  const [activeYear, setActiveYear] = useState('ALL');
  const [activeType, setActiveType] = useState('ALL');

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10 min-h-[80vh]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1.5, bounce: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        className="font-['Space_Grotesk'] text-[3.5rem] mb-[40px] md:mb-[60px] tracking-[-1px] -ml-[0.05em] font-normal"
      >
        Work
      </motion.h2>

      {/* Filter Accordions */}
      <div className="mb-12 md:mb-20 border-t border-b border-black/10 flex flex-col md:flex-row">
        {/* YEAR Toggle */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-black/10">
          <button 
            onClick={() => setOpenFilter(openFilter === 'YEAR' ? null : 'YEAR')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-8 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Geist_Mono'] text-sm tracking-[1px] uppercase">
              Filter by Year {activeYear !== 'ALL' && <span className="ml-2 opacity-50">[{activeYear}]</span>}
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
                      className={`font-['Geist_Mono'] text-[0.7rem] uppercase tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeYear === y ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'}`}
                    >
                      {y}
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
              Filter by Type {activeType !== 'ALL' && <span className="ml-2 opacity-50">[{activeType}]</span>}
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
                  {types.map(t => (
                    <button 
                      key={t}
                      onClick={() => setActiveType(t)}
                      className={`font-['Geist_Mono'] text-[0.7rem] uppercase tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeType === t ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'}`}
                    >
                      {t}
                    </button>
                  ))}
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

function Artwork() {
  useEffect(() => { document.title = "Howard Lee - Artwork"; }, []);
  const [openFilter, setOpenFilter] = useState<'YEAR' | 'MEDIUM' | null>(null);

  const years = ['ALL', '2024', '2023', '2022', '2021'];
  const mediums = ['ALL', 'CGI', '3D', 'SIMULATION', 'EXPERIMENTAL', 'PHYSICAL', 'MIXED MEDIA'];

  const [activeYear, setActiveYear] = useState('ALL');
  const [activeMedium, setActiveMedium] = useState('ALL');

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10 min-h-[80vh]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1.5, bounce: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        className="font-['Space_Grotesk'] text-[3.5rem] mb-[40px] md:mb-[60px] tracking-[-1px] -ml-[0.05em] font-normal"
      >
        Artwork
      </motion.h2>

      {/* Filter Accordions */}
      <div className="mb-12 md:mb-20 border-t border-b border-black/10 flex flex-col md:flex-row">
        {/* YEAR Toggle */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-black/10">
          <button 
            onClick={() => setOpenFilter(openFilter === 'YEAR' ? null : 'YEAR')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-8 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Geist_Mono'] text-sm tracking-[1px] uppercase">
              Filter by Year {activeYear !== 'ALL' && <span className="ml-2 opacity-50">[{activeYear}]</span>}
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
                      className={`font-['Geist_Mono'] text-[0.7rem] uppercase tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeYear === y ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'}`}
                    >
                      {y}
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
              Filter by Medium {activeMedium !== 'ALL' && <span className="ml-2 opacity-50">[{activeMedium}]</span>}
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
                  {mediums.map(m => (
                    <button 
                      key={m}
                      onClick={() => setActiveMedium(m)}
                      className={`font-['Geist_Mono'] text-[0.7rem] uppercase tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeMedium === m ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'}`}
                    >
                      {m}
                    </button>
                  ))}
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
          <motion.div variants={staggerItem} className="mb-[15px]">
            <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Abstract Form 01</h3>
            <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">CGI / EXPERIMENTAL</div>
          </motion.div>
          <motion.div variants={staggerItem} className="w-full h-auto aspect-[3/4] bg-[#E0E0E0]"></motion.div>
        </div>
        <div className="break-inside-avoid">
          <motion.div variants={staggerItem} className="mb-[15px]">
            <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Light Study</h3>
            <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">RENDERING / 3D</div>
          </motion.div>
          <motion.div variants={staggerItem} className="w-full h-auto aspect-square bg-[#E0E0E0]"></motion.div>
        </div>
        <div className="break-inside-avoid">
          <motion.div variants={staggerItem} className="mb-[15px]">
            <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Fluid Dynamics</h3>
            <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">SIMULATION</div>
          </motion.div>
          <motion.div variants={staggerItem} className="w-full h-auto aspect-[4/5] bg-[#E0E0E0]"></motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  useEffect(() => { document.title = "Howard Lee - About"; }, []);
  const [lang, setLang] = useState<'ENG' | 'CHN'>('ENG');
  const [openSection, setOpenSection] = useState<string | null>(null);

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
          { left: '2025 - Present', right: 'BFA in Communications Design, Shih Chien University, Taiwan (Animation & Moving Image Design)' },
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
          { left: '2025', right: 'Live Performance, "Unsorted", Shih Chien University, Taiwan' }
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
          { left: '2026', right: 'Young Ones ADC: Design for Good, Bronze Cube, NYC' },
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
          { left: '2025', right: '現場視覺演出「Unsorted」, 實踐大學, 台灣' }
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
          { left: '2026', right: 'Young Ones ADC: Design for Good, 銅立方獎, 紐約' },
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
          className="flex gap-4 text-xs md:text-sm font-['Geist_Mono'] pb-3 md:pb-4 uppercase tracking-[1px]"
        >
          <button
            onClick={() => setLang('CHN')}
            className={`transition-opacity hover:opacity-100 ${lang === 'CHN' ? 'opacity-100 font-bold' : 'opacity-40'}`}
          >
            CHN
          </button>
          <span className="opacity-20">/</span>
          <button
            onClick={() => setLang('ENG')}
            className={`transition-opacity hover:opacity-100 ${lang === 'ENG' ? 'opacity-100 font-bold' : 'opacity-40'}`}
          >
            ENG
          </button>
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
          <div ref={containerRef} className="w-[180px] md:w-[240px] max-w-full mb-[40px] md:mb-[60px]">
            <motion.div style={{ y }} className="w-full bg-[#E0E0E0]">
              <AsciiArtHover 
                src="/about_bioprofile.jpg" 
                className="w-full h-auto block"
              />
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
                <span key={skill} className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[0.85rem] tracking-[0.1em]" : "text-[0.75rem] tracking-[0.5px]"} uppercase px-4 py-2 border border-black/20 rounded-full hover:bg-black hover:text-[#F0F0F0] transition-colors cursor-default`}>
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
                          <div key={itemIdx} className={`w-full ${itemIdx !== 0 ? 'pt-4' : ''} border-b border-black/10 pb-2`}>
                            <span className="font-['Geist_Mono'] text-[0.8rem] tracking-[1px] uppercase opacity-40">
                              {item.title}
                            </span>
                          </div>
                        ) : (
                          <div key={itemIdx} className="flex flex-col md:flex-row justify-between md:items-start gap-2 md:gap-0">
                            <span className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] tracking-[0.05em] text-[1.1rem]" : "text-[1.2rem]"} w-full md:w-1/3`}>
                              {item.left}
                            </span>
                            <span className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] tracking-[0.05em] text-[0.85rem]" : "tracking-[0.5px] text-sm"} opacity-70 uppercase text-left w-full md:w-2/3`}>
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
                  <Link to="/" className="font-normal -ml-[0.05em] hover:opacity-70 transition-opacity">HOWARD LEE</Link>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="hover:opacity-60 transition-opacity">
                  <X size={20} />
                </button>
              </header>

              <div className="flex-1 flex flex-col justify-center items-center gap-10">
                {['HOME', 'WORK', 'ARTWORK', 'ABOUT'].map((item, index) => (
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
            <a href="/" className="font-normal -ml-[0.05em] hover:opacity-70 transition-opacity">HOWARD LEE</a>
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

function HomeTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[1000] bg-[#F0F0F0] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
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

  return (
    <div className="pt-[40px] md:pt-[60px] pb-[100px] min-h-screen">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-20">
        <div className="w-full md:w-1/3">
          <h1 className="font-['Space_Grotesk'] text-[3.5rem] md:text-[4rem] leading-[1] tracking-[-2px] mb-8 -ml-[0.04em]">
            Unsorted
          </h1>
          
          <div className="flex flex-col gap-4 font-['Geist_Mono'] text-sm uppercase tracking-[1px] mb-8 pb-8 border-b border-black/10">
            <div className="flex">
              <span className="opacity-50 w-24">Year</span>
              <span>2025</span>
            </div>
            <div className="flex">
              <span className="opacity-50 w-24">Medium</span>
              <span>Live Visual / Performance</span>
            </div>
          </div>

          <div className="font-['Geist_Mono'] text-sm leading-[1.8] opacity-80">
            A live visual performance project exploring the unorganized, chaotic yet structured nature of contemporary youth. Blending generative graphics with sound-reactive elements, the piece creates an immersive environment that bridges digital aesthetics with physical spatial experiences.
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div className="w-full aspect-[4/3] bg-[#E0E0E0] flex items-center justify-center">
            <span className="font-['Geist_Mono'] text-[#888] uppercase tracking-[1px] text-sm">Cover Image Placeholder</span>
          </div>
        </div>
      </div>

      <div className="columns-1 md:columns-2 gap-[30px] space-y-[30px]">
        <div className="break-inside-avoid">
          <div className="w-full aspect-[16/9] bg-[#E0E0E0] flex items-center justify-center">
            <span className="font-['Geist_Mono'] text-[#888] uppercase tracking-[1px] text-[0.7rem]">Process Image Placeholder 01</span>
          </div>
        </div>
        <div className="break-inside-avoid">
          <div className="w-full aspect-[3/4] bg-[#E0E0E0] flex items-center justify-center">
            <span className="font-['Geist_Mono'] text-[#888] uppercase tracking-[1px] text-[0.7rem]">Process Image Placeholder 02</span>
          </div>
        </div>
        <div className="break-inside-avoid">
          <div className="w-full aspect-square bg-[#E0E0E0] flex items-center justify-center">
            <span className="font-['Geist_Mono'] text-[#888] uppercase tracking-[1px] text-[0.7rem]">Process Image Placeholder 03</span>
          </div>
        </div>
        <div className="break-inside-avoid">
          <div className="w-full aspect-[4/5] bg-[#E0E0E0] flex items-center justify-center">
            <span className="font-['Geist_Mono'] text-[#888] uppercase tracking-[1px] text-[0.7rem]">Process Image Placeholder 04</span>
          </div>
        </div>
        <div className="break-inside-avoid">
          <div className="w-full aspect-[16/9] bg-[#E0E0E0] flex items-center justify-center">
            <span className="font-['Geist_Mono'] text-[#888] uppercase tracking-[1px] text-[0.7rem]">Process Image Placeholder 05</span>
          </div>
        </div>
      </div>
      
      <div className="mt-32 flex justify-center border-t border-black/10 pt-16">
        <Link to="/artwork" className="font-['Space_Grotesk'] text-[2rem] uppercase hover:opacity-50 transition-opacity">
          Back to Artwork
        </Link>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeTransition><Home /></HomeTransition>} />
        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/artwork" element={<PageTransition><Artwork /></PageTransition>} />
        <Route path="/artwork/unsorted" element={<PageTransition><ProjectUnsorted /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}
