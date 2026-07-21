import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Lenis from "lenis";
import { globalIntroDone } from "../ui/PageTransitions";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState(location.pathname === '/' && !globalIntroDone);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 250, damping: 25, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 250, damping: 25, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 50); // 100px diameter, offset by 50px
      cursorY.set(e.clientY - 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleIntroStatus = (e: any) => {
      setIsIntroActive(e.detail.isIntroActive);
    };
    window.addEventListener('introStatusChanged', handleIntroStatus);
    return () => window.removeEventListener('introStatusChanged', handleIntroStatus);
  }, []);

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
    <div className="min-h-screen bg-[#F0F0F0] text-[#0A0A0A] overflow-hidden md:overflow-visible">
      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[100px] h-[100px] bg-[#0A0A0A] text-[#F0F0F0] rounded-full flex items-center justify-center z-[99999] uppercase tracking-[1px] text-[0.75rem] font-medium"
        style={{
          x: springX,
          y: springY,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: cursorText ? 1 : 0, 
          opacity: cursorText ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      >
        {cursorText}
      </motion.div>

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

      {/* Fixed Global Header */}
      <AnimatePresence>
        {!isIntroActive && (
          <motion.header 
            initial={{ filter: "blur(20px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="fixed top-0 left-0 w-full z-[100] bg-[#F0F0F0] p-5 md:px-10 md:py-5 flex justify-between items-start text-[0.75rem] uppercase tracking-[0.5px]"
          >
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
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content Group */}
      <div className={`relative z-20 bg-[#F0F0F0] flex flex-col min-h-screen ${!isIntroActive ? 'pt-[60px] md:pt-[60px]' : ''}`}>
        <div className="flex-1 px-5 md:px-10">
          {children}
        </div>
      </div>

      {/* Sticky Parallax Footer */}
      <div
        className="relative h-[100vh] z-10"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 left-0 w-full h-[100vh] p-5 md:px-10 pb-[20px] pt-[80px] md:pt-[100px] flex flex-col justify-between bg-[#F0F0F0]">
          <div>
            <div className="text-[0.75rem] uppercase mb-10 tracking-[0.5px]">GET IN TOUCH</div>
            <div className="flex flex-col gap-[15px]">
              {[
                { label: "LET'S TALK", text: <>LEEHOKAN<br className="block lg:hidden" />192@GMAIL.COM</>, href: "mailto:leehokan192@gmail.com" },
                { label: "FOLLOW", text: "INSTAGRAM", href: "https://www.instagram.com/howard_lhk/", target: "_blank" },
                { label: "VIEW", text: "BEHANCE", href: "https://www.behance.net/hokanlee", target: "_blank" },
                { label: "VIEW", text: "VIMEO", href: "https://vimeo.com/user177460868", target: "_blank" }
              ].map((item, i) => (
                <div key={i} className="flex items-start max-w-full">
                  <a
                    href={item.href}
                    target={item.target}
                    rel={item.target ? "noopener noreferrer" : undefined}
                    onMouseEnter={() => setCursorText(item.label)}
                    onMouseLeave={() => setCursorText(null)}
                    className="font-['Space_Grotesk'] text-[clamp(2rem,8vw,7rem)] leading-[1] tracking-[-2px] -ml-[0.04em] hover:opacity-70 transition-opacity break-all md:break-normal cursor-none"
                  >
                    {item.text}
                  </a>
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
  );
}
