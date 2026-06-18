import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { motion, useSpring } from "framer-motion";

const HoverReveal = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // offset so cursor does not cover the image
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

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
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

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F3ED] text-[#0A0A0A]">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col p-5 md:px-10 md:py-5 relative border-b border-black/10">
        <header className="flex justify-between items-start text-[0.75rem] uppercase tracking-[0.5px]">
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-normal -ml-[0.05em]">HOWARD LEE</span>
            <span className="opacity-60 ml-0 md:ml-[clamp(40px,15vw,200px)]">MOTION / VISUAL DESIGNER</span>
          </div>
        </header>

        <div className="flex-1 flex flex-col justify-start items-start py-[12vh]">
          <div className="font-['Space_Grotesk'] text-[clamp(1.8rem,4.5vw,4.95rem)] leading-[0.95] tracking-[-2px] max-w-[80%] -ml-[0.04em]">
            <div className="flex items-center flex-wrap uppercase gap-10 md:gap-20">
              <HoverReveal>
                <Text3DFlip
                  className="bg-[#F4F3ED]"
                  textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  rotateDirection="top"
                  staggerDuration={0.03}
                  staggerFrom="center"
                >
                  VISUAL
                </Text3DFlip>
              </HoverReveal>
              <HoverReveal>
                <Text3DFlip
                  className="bg-[#F4F3ED]"
                  textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  rotateDirection="top"
                  staggerDuration={0.03}
                  staggerFrom="center"
                >
                  MOTION
                </Text3DFlip>
              </HoverReveal>
            </div>
            <div className="flex items-center flex-wrap uppercase mt-2 md:mt-4 gap-10 md:gap-20">
              <HoverReveal>
                <Text3DFlip
                  className="bg-[#F4F3ED]"
                  textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  rotateDirection="top"
                  staggerDuration={0.03}
                  staggerFrom="center"
                >
                  ANIMATION
                </Text3DFlip>
              </HoverReveal>
              <HoverReveal>
                <Text3DFlip
                  className="bg-[#F4F3ED]"
                  textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  rotateDirection="top"
                  staggerDuration={0.03}
                  staggerFrom="center"
                >
                  INTERACTION
                </Text3DFlip>
              </HoverReveal>
            </div>
            <div className="flex items-center flex-wrap uppercase mt-2 md:mt-4 gap-10 md:gap-20">
              <HoverReveal>
                <Text3DFlip
                  className="bg-[#F4F3ED]"
                  textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  rotateDirection="top"
                  staggerDuration={0.03}
                  staggerFrom="center"
                >
                  ARTWORK
                </Text3DFlip>
              </HoverReveal>
            </div>
            <div className="mt-12 md:mt-16 flex items-center gap-4">
              <span>FROM</span>
              <HoverReveal>
                <Text3DFlip
                  className="bg-[#F4F3ED]"
                  textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  rotateDirection="top"
                  staggerDuration={0.03}
                  staggerFrom="center"
                >
                  HONG KONG
                </Text3DFlip>
              </HoverReveal>
            </div>
            <div className="mt-2 md:mt-4 flex items-center gap-4">
              <span>BASED IN</span>
              <HoverReveal>
                <Text3DFlip
                  className="bg-[#F4F3ED]"
                  textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                  rotateDirection="top"
                  staggerDuration={0.03}
                  staggerFrom="center"
                >
                  TAIWAN
                </Text3DFlip>
              </HoverReveal>
            </div>
            <div className="mt-2 md:mt-4">WORKING GLOBALLY.</div>
          </div>
        </div>

        <footer className="flex justify-between text-[0.75rem] uppercase tracking-[0.5px] opacity-60">
          <div>AVAILABLE FOR WORK</div>
          <a href="#projects" onClick={(e) => scrollTo(e, 'projects')} className="hover:opacity-100 transition-opacity">↓ SCROLL TO VIEW MORE ↓</a>
        </footer>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="projects" className="px-5 md:px-10 pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk'] text-[3.5rem] mb-[60px] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          Featured
        </motion.h2>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-[30px] items-start"
        >
          {/* Project 1 */}
          <div className="mb-10 md:mb-0">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Nike Swoosh 1</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">CAMPAIGN / POP-UP</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full aspect-square bg-[#E0E0E0] mb-5"></motion.div>
          </div>

          {/* Project 2 */}
          <div className="mb-10 md:mb-0 md:mt-[100px]">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Journey To Edge</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">EXPERIENCE DESIGN / CONTENT CREATION</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full aspect-[4/5] bg-[#E0E0E0] mb-5"></motion.div>
          </div>

          {/* Project 3 */}
          <div className="mb-10 md:mb-0">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Illuminarium</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">EXPERIENCE DESIGN / CONTENT CREATION</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full aspect-[3/4] bg-[#E0E0E0] mb-5"></motion.div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="pt-[100px] px-5 md:px-10 pb-[20px]">
        <div className="text-[0.75rem] uppercase mb-10 tracking-[0.5px]">GET IN TOUCH</div>
        
        <div className="flex flex-col gap-[15px] mb-[120px]">
          {[
            { label: "MAIL", text: "LEEHOKAN192@GMAIL.COM", href: "mailto:leehokan192@gmail.com" },
            { label: "FOLLOW", text: "INSTAGRAM", href: "https://www.instagram.com/howard_lhk/", target: "_blank" },
            { label: "VIEW", text: "BEHANCE", href: "https://www.behance.net/hokanlee", target: "_blank" },
            { label: "VIEW", text: "VIMEO", href: "https://vimeo.com/user177460868", target: "_blank" }
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <a 
                href={item.href}
                target={item.target}
                rel={item.target ? "noopener noreferrer" : undefined}
                className="font-['Space_Grotesk'] text-[clamp(3rem,7vw,7rem)] leading-[1] tracking-[-2px] -ml-[0.04em] hover:opacity-70 transition-opacity"
              >
                {item.text}
              </a>
              <span className="text-[0.5rem] uppercase opacity-50 mt-[5px] ml-[10px]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-[0.75rem] uppercase tracking-[0.5px]">
          <div>AVAILABLE FOR WORK</div>
        </div>
      </footer>
    </div>
  );
}
