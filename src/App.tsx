import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[999]">
            {/* Curtains Background */}
            <div className="absolute inset-0 flex pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "-100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1], // Custom sophisticated curve
                    delay: i * 0.06,
                  }}
                  className="flex-1 bg-[#0A0A0A] h-full w-full"
                />
              ))}
            </div>

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="absolute inset-0 flex flex-col p-5 md:px-10 md:py-5 text-[#F4F3ED] z-10"
            >
              <header className="flex justify-between items-start text-[0.75rem] uppercase tracking-[0.5px]">
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-normal -ml-[0.05em]">HOWARD LEE</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="hover:opacity-60 transition-opacity">
                  <X size={20} />
                </button>
              </header>
              
              <div className="flex-1 flex flex-col justify-center items-center gap-10">
                {['WORK', 'ARTWORK', 'ABOUT'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.4 + index * 0.1,
                    }}
                  >
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => {
                        setIsMenuOpen(false);
                        scrollTo(e, item.toLowerCase());
                      }}
                      className="font-['Space_Grotesk'] text-[clamp(3rem,8vw,6rem)] leading-[1] tracking-[-2px] hover:opacity-70 transition-opacity"
                    >
                      {item}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col p-5 md:px-10 md:py-5 relative border-b border-black/10">
        <header className="flex justify-between items-start text-[0.75rem] uppercase tracking-[0.5px]">
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-normal -ml-[0.05em]">HOWARD LEE</span>
            <span className="opacity-60 ml-0 md:ml-[clamp(40px,15vw,200px)] hidden sm:block">MOTION / VISUAL DESIGNER</span>
          </div>
          <button onClick={() => setIsMenuOpen(true)} className="hover:opacity-60 transition-opacity">
            <Menu size={20} />
          </button>
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
          <a href="#work" onClick={(e) => scrollTo(e, 'work')} className="hover:opacity-100 transition-opacity">↓ SCROLL TO VIEW MORE ↓</a>
        </footer>
      </section>

      {/* WORK SECTION */}
      <section id="work" className="px-5 md:px-10 pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk'] text-[3.5rem] mb-[60px] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          Work
        </motion.h2>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="columns-1 md:columns-2 lg:columns-3 gap-[30px] space-y-[30px]"
        >
          {/* Project 1 */}
          <div className="break-inside-avoid">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Nike Swoosh 1</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">CAMPAIGN / POP-UP</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full h-auto aspect-[4/5] bg-[#E0E0E0]"></motion.div>
          </div>

          {/* Project 2 */}
          <div className="break-inside-avoid">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Journey To Edge</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">EXPERIENCE DESIGN / CONTENT CREATION</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full h-auto aspect-[16/9] bg-[#E0E0E0]"></motion.div>
          </div>

          {/* Project 3 */}
          <div className="break-inside-avoid">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Illuminarium</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">EXPERIENCE DESIGN / CONTENT CREATION</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full h-auto aspect-[3/4] bg-[#E0E0E0]"></motion.div>
          </div>

          {/* Project 4 */}
          <div className="break-inside-avoid">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Cosmic Flow</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">MOTION / VISUAL DESIGN</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full h-auto aspect-square bg-[#E0E0E0]"></motion.div>
          </div>

          {/* Project 5 */}
          <div className="break-inside-avoid">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Digital Architecture</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">BRANDING / INTERACTION</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full h-auto aspect-[4/5] bg-[#E0E0E0]"></motion.div>
          </div>

          {/* Project 6 */}
          <div className="break-inside-avoid">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">The Metaverse</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">3D ANIMATION / INTERACTIVE</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full h-auto aspect-[16/9] bg-[#E0E0E0]"></motion.div>
          </div>
        </motion.div>
      </section>

      {/* ARTWORK SECTION */}
      <section id="artwork" className="px-5 md:px-10 pt-[100px] pb-[100px] border-b border-black/10">
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

      {/* ABOUT SECTION */}
      <section id="about" className="px-5 md:px-10 pt-[100px] pb-[100px] border-b border-black/10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk'] text-[3.5rem] mb-[60px] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          About
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            className="w-full md:w-1/3 lg:w-1/4 h-auto aspect-[3/4] bg-[#E0E0E0]"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="w-full md:w-2/3 flex flex-col justify-center"
          >
            <div className="font-['Geist_Mono'] text-[1rem] md:text-[1.1rem] leading-[1.6] opacity-70 mb-8 max-w-[600px]">
              Hi, I'm Howard Lee. I am a motion and visual designer from Hong Kong, based in Taiwan, working globally. I specialize in creating immersive digital experiences, 3D animations, and interactive interfaces.
              <br/><br/>
              My design philosophy is rooted in minimalism, where less is more. I believe that elegant typography, smooth motion, and clean layouts are the keys to a timeless digital presence.
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="pt-[100px] px-5 md:px-10 pb-[20px]">
        <div className="text-[0.75rem] uppercase mb-10 tracking-[0.5px]">GET IN TOUCH</div>
        
        <div className="flex flex-col gap-[15px] mb-[120px]">
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

        <div className="flex justify-between text-[0.75rem] uppercase tracking-[0.5px]">
          <div>AVAILABLE FOR WORK</div>
        </div>
      </footer>
    </div>
  );
}
