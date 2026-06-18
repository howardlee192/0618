import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { motion, useSpring, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

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

function ProjectsGrid() {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      className="columns-1 md:columns-2 lg:columns-3 gap-[30px] space-y-[30px]"
    >
      <div className="break-inside-avoid">
        <motion.div variants={staggerItem} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Nike Swoosh 1</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">CAMPAIGN / POP-UP</div>
        </motion.div>
        <motion.div variants={staggerItem} className="w-full h-auto aspect-[4/5] bg-[#E0E0E0]"></motion.div>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={staggerItem} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Journey To Edge</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">EXPERIENCE DESIGN / CONTENT CREATION</div>
        </motion.div>
        <motion.div variants={staggerItem} className="w-full h-auto aspect-[16/9] bg-[#E0E0E0]"></motion.div>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={staggerItem} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Illuminarium</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">EXPERIENCE DESIGN / CONTENT CREATION</div>
        </motion.div>
        <motion.div variants={staggerItem} className="w-full h-auto aspect-[3/4] bg-[#E0E0E0]"></motion.div>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={staggerItem} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Cosmic Flow</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">MOTION / VISUAL DESIGN</div>
        </motion.div>
        <motion.div variants={staggerItem} className="w-full h-auto aspect-square bg-[#E0E0E0]"></motion.div>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={staggerItem} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Digital Architecture</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">BRANDING / INTERACTION</div>
        </motion.div>
        <motion.div variants={staggerItem} className="w-full h-auto aspect-[4/5] bg-[#E0E0E0]"></motion.div>
      </div>
      <div className="break-inside-avoid">
        <motion.div variants={staggerItem} className="mb-[15px]">
          <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">The Metaverse</h3>
          <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">3D ANIMATION / INTERACTIVE</div>
        </motion.div>
        <motion.div variants={staggerItem} className="w-full h-auto aspect-[16/9] bg-[#E0E0E0]"></motion.div>
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
              <HoverReveal><Text3DFlip className="bg-[#F4F3ED]" textClassName="bg-[#F4F3ED] text-[#0A0A0A]" flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">VISUAL</Text3DFlip></HoverReveal>
              <HoverReveal><Text3DFlip className="bg-[#F4F3ED]" textClassName="bg-[#F4F3ED] text-[#0A0A0A]" flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">MOTION</Text3DFlip></HoverReveal>
            </div>
            <div className="flex items-center flex-wrap uppercase mt-2 md:mt-4 gap-10 md:gap-20">
              <HoverReveal><Text3DFlip className="bg-[#F4F3ED]" textClassName="bg-[#F4F3ED] text-[#0A0A0A]" flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">ANIMATION</Text3DFlip></HoverReveal>
              <HoverReveal><Text3DFlip className="bg-[#F4F3ED]" textClassName="bg-[#F4F3ED] text-[#0A0A0A]" flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">INTERACTION</Text3DFlip></HoverReveal>
            </div>
            <div className="flex items-center flex-wrap uppercase mt-2 md:mt-4 gap-10 md:gap-20">
              <HoverReveal><Text3DFlip className="bg-[#F4F3ED]" textClassName="bg-[#F4F3ED] text-[#0A0A0A]" flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">ARTWORK</Text3DFlip></HoverReveal>
            </div>
            <div className="mt-12 md:mt-16 flex items-center gap-4">
              <span>FROM</span>
              <HoverReveal><Text3DFlip className="bg-[#F4F3ED]" textClassName="bg-[#F4F3ED] text-[#0A0A0A]" flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">HONG KONG</Text3DFlip></HoverReveal>
            </div>
            <div className="mt-2 md:mt-4 flex items-center gap-4">
              <span>BASED IN</span>
              <HoverReveal><Text3DFlip className="bg-[#F4F3ED]" textClassName="bg-[#F4F3ED] text-[#0A0A0A]" flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">TAIWAN</Text3DFlip></HoverReveal>
            </div>
            <div className="mt-2 md:mt-4">WORKING GLOBALLY.</div>
          </div>
        </div>
        </motion.section>
      </div>

      <section className="relative z-10 bg-[#F4F3ED] pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk'] text-[3.5rem] mb-[60px] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          Featured
        </motion.h2>
        <ProjectsGrid />
      </section>
    </>
  );
}

function Work() {
  useEffect(() => { document.title = "Howard Lee - Work"; }, []);
  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10 min-h-[80vh]">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1.5, bounce: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        className="font-['Space_Grotesk'] text-[3.5rem] mb-[60px] tracking-[-1px] -ml-[0.05em] font-normal"
      >
        Work
      </motion.h2>
      <ProjectsGrid />
    </section>
  );
}

function Artwork() {
  useEffect(() => { document.title = "Howard Lee - Artwork"; }, []);
  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10 min-h-[80vh]">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1.5, bounce: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        className="font-['Space_Grotesk'] text-[3.5rem] mb-[60px] tracking-[-1px] -ml-[0.05em] font-normal"
      >
        Artwork
      </motion.h2>
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

  const content = {
    ENG: {
      intro: "I've always believed that elegant motion and thoughtful visual design can elevate a digital experience from good to unforgettable.",
      role: "Howard Lee, Motion & Visual Designer",
      title1: "01. Storytelling through Motion",
      desc1: "I specialize in crafting narratives that guide users seamlessly. Every animation and interaction is purposefully designed to tell a compelling story, ensuring the design speaks directly and emotionally to the audience.",
      title2: "02. Core Capabilities",
      title3: "03. Design Philosophy",
      desc3: "My goal is to distill complex ideas into pure, minimalist forms. I strive to create timeless digital presences where less is truly more, focusing entirely on the essential to deliver maximum visual impact."
    },
    CHN: {
      intro: "我始終相信，優雅的動態與深思熟慮的視覺設計，能將數位體驗從優秀昇華至令人難忘的境界。",
      role: "李浩勤, 動態與視覺設計師",
      title1: "01. 透過動態述說故事",
      desc1: "我擅長打造流暢引導使用者的敘事體驗。每一個動畫與互動都經過精心設計，旨在講述引人入勝的故事，確保設計能與受眾產生直接且深刻的情感共鳴。",
      title2: "02. 核心技能領域",
      title3: "03. 核心設計理念",
      desc3: "我的目標是將複雜的概念淬鍊成純粹、極簡的型態。我致力於創造經得起時間考驗的數位樣貌，堅信「少即是多」，專注於最本質的元素，以帶來極致的視覺張力。"
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
          {/* Profile Picture Placeholder */}
          <div className="w-[180px] md:w-[240px] max-w-full aspect-[3/4] bg-[#E0E0E0] mb-[40px] md:mb-[60px]"></div>
          
          <h3 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Swei_Bow_Sans']" : ''} text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] tracking-[-1.5px] mb-6`}>
            {text.intro}
          </h3>
          <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Swei_Bow_Sans']" : ''} text-sm opacity-50 uppercase tracking-[0.5px]`}>
            {text.role}
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
            <h4 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Swei_Bow_Sans']" : ''} text-xl md:text-2xl mb-4 tracking-[-0.5px]`}>{text.title1}</h4>
            <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Swei_Bow_Sans']" : ''} text-[0.9rem] leading-[1.6] opacity-70`}>
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
            <h4 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Swei_Bow_Sans']" : ''} text-xl md:text-2xl mb-6 tracking-[-0.5px]`}>{text.title2}</h4>
            <div className="flex flex-wrap gap-3">
              {['3D Animation', 'Interaction Design', 'CGI', 'Visual Identity', 'UI/UX', 'Creative Direction'].map(skill => (
                <span key={skill} className="font-['Geist_Mono'] text-[0.75rem] uppercase tracking-[0.5px] px-4 py-2 border border-black/20 rounded-full hover:bg-black hover:text-[#F4F3ED] transition-colors cursor-default">
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
            <h4 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Swei_Bow_Sans']" : ''} text-xl md:text-2xl mb-4 tracking-[-0.5px]`}>{text.title3}</h4>
            <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Swei_Bow_Sans']" : ''} text-[0.9rem] leading-[1.6] opacity-70`}>
              {text.desc3}
            </p>
          </motion.div>
        </div>
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
    <div className="min-h-screen bg-[#F4F3ED] text-[#0A0A0A]">
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[999]">
            <div className="absolute inset-0 flex pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "-100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.06 }}
                  className="flex-1 bg-[#0A0A0A] h-full w-full"
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="absolute inset-0 flex flex-col p-5 md:px-10 md:py-5 text-[#F4F3ED] z-10"
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
            <Link to="/" className="font-normal -ml-[0.05em] hover:opacity-70 transition-opacity">HOWARD LEE</Link>
            <span className="opacity-60 ml-0 md:ml-[clamp(40px,15vw,200px)] hidden sm:block">MOTION / VISUAL DESIGNER</span>
          </div>
          <button onClick={() => setIsMenuOpen(true)} className="hover:opacity-60 transition-opacity">
            <Menu size={20} />
          </button>
        </header>

        <div className="flex-1 relative z-10 bg-[#F4F3ED]">
          {children}
        </div>

        {/* Sticky Parallax Footer */}
        <div 
          className="relative h-[80vh] md:h-[100vh]"
          style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
          <div className="fixed bottom-0 left-0 w-full h-[80vh] md:h-[100vh] p-5 md:px-10 pb-[20px] pt-[80px] md:pt-[100px] flex flex-col justify-between">
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

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/artwork" element={<Artwork />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}
