import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Text3DFlip from "../components/ui/text-3d-flip";
import { HoverReveal } from "../components/ui/HoverReveal";
import { Link } from "react-router-dom";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import { ProjectsGrid } from "../components/ui/ProjectsGrid";

export function Home() {
  useEffect(() => { document.title = "Howard Lee - Home"; }, []);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const visualImages = ['/homehighlights/1.Visual/jumphigh1.jpg', '/homehighlights/1.Visual/jumphigh2.jpg', '/homehighlights/1.Visual/jumphigh3.jpg', '/homehighlights/1.Visual/jumphigh4.jpg', '/homehighlights/1.Visual/jumphigh5.jpg'];
  const personalImages = ['/projects/unsorted/unsorted_cover.jpg', '/projects/unsorted/highlight1.jpg', '/projects/unsorted/highlight2.jpg', '/projects/unsorted/highlight3.jpg'];
  const hkImages = ['/homehighlights/6.HongKong/1.jpg', '/homehighlights/6.HongKong/2.jpg', '/homehighlights/6.HongKong/3.jpg', '/homehighlights/6.HongKong/4.jpg', '/homehighlights/6.HongKong/5.jpg', '/homehighlights/6.HongKong/6.jpg', '/homehighlights/6.HongKong/7.jpg', '/homehighlights/6.HongKong/8.jpg', '/homehighlights/6.HongKong/9.jpg'];
  const twImages = ['/homehighlights/7.taiwan/1.jpg', '/homehighlights/7.taiwan/2.jpg', '/homehighlights/7.taiwan/3.jpg', '/homehighlights/7.taiwan/4.jpg', '/homehighlights/7.taiwan/5.jpg', '/homehighlights/7.taiwan/6.jpg', '/homehighlights/7.taiwan/7.jpg'];


  return (
    <>
      <div ref={heroRef} className="relative z-0 min-h-[95vh] flex flex-col justify-start pt-[2vh] md:pt-[4vh]">
        <motion.section style={{ y, opacity }} className="flex-1 w-full flex flex-col relative">
          <div className="flex-1 flex flex-col justify-start items-start">
            <div className="font-['Space_Grotesk'] text-[clamp(1.8rem,4.5vw,4.95rem)] leading-[0.95] tracking-[-2px] max-w-[80%] -ml-[0.04em]">
              <div className="flex items-center flex-wrap uppercase gap-10 md:gap-20">
                <HoverReveal images={visualImages} intervalMs={600}><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">VISUAL</Text3DFlip></HoverReveal>
                <HoverReveal videoSrc="/homehighlights/2.Motion/journeyhighlightloop.mp4"><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">MOTION</Text3DFlip></HoverReveal>
              </div>
              <div className="flex items-center flex-wrap uppercase mt-2 md:mt-4 gap-10 md:gap-20">
                <HoverReveal videoSrc="/homehighlights/3.Animation/slavehighlightanimation.mp4"><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">ANIMATION</Text3DFlip></HoverReveal>
                <HoverReveal videoSrc="/homehighlights/4.Interaction/worthhighlightvideo.mp4"><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">INTERACTION</Text3DFlip></HoverReveal>
              </div>
              <div className="flex items-center flex-wrap uppercase mt-2 md:mt-4 gap-10 md:gap-20">
                <HoverReveal images={personalImages} intervalMs={800}><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">PERSONAL</Text3DFlip></HoverReveal>
              </div>
              <div className="mt-12 md:mt-16 flex items-center gap-4">
                <span>FROM</span>
                <HoverReveal images={hkImages} intervalMs={400}><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">HONG KONG</Text3DFlip></HoverReveal>
              </div>
              <div className="mt-2 md:mt-4 flex items-center gap-4">
                <span>BASED IN</span>
                <HoverReveal images={twImages} intervalMs={400}><Text3DFlip className="bg-[#F0F0F0]" textClassName="bg-[#F0F0F0] text-[#0A0A0A]" flipTextClassName="bg-[#F0F0F0] text-[#0A0A0A]" rotateDirection="top" staggerDuration={0.03} staggerFrom="center">TAIWAN</Text3DFlip></HoverReveal>
              </div>
              <div className="mt-2 md:mt-4">WORKING GLOBALLY.</div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-12 right-0 md:right-4 flex flex-col items-end gap-2 pointer-events-none"
          >
            <div className="relative h-[1.5rem] w-full flex justify-end items-center">
              <div className="absolute right-0 font-['Geist_Mono'] text-[0.75rem] md:text-xs uppercase tracking-[1px] whitespace-nowrap animate-hint-eng-40 opacity-0">
                ↑ [ Scroll up to view intro ]
              </div>
              <div className="absolute right-0 font-['Swei_Bow_Sans'] text-[0.8rem] md:text-[0.9rem] tracking-[1px] whitespace-nowrap animate-hint-chn-40 opacity-0">
                ↑ [ 再次往上滑動返回前導頁面 ]
              </div>
            </div>
            <div className="relative h-[1.5rem] w-full flex justify-end items-center">
              <div className="absolute right-0 font-['Geist_Mono'] text-[0.85rem] md:text-sm uppercase tracking-[1px] whitespace-nowrap animate-hint-eng-80 opacity-0">
                ↖ [ Hover to reveal ]
              </div>
              <div className="absolute right-0 font-['Swei_Bow_Sans'] text-[0.9rem] md:text-[1rem] tracking-[1px] whitespace-nowrap animate-hint-chn-80 opacity-0">
                ↖ [ 滑動游標預覽影像 ]
              </div>
            </div>
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

      <section className="relative z-10 bg-[#F0F0F0] py-[60px] md:py-[100px] border-b border-black/10">
        <div className="flex flex-col border-t border-black/10">
          <Link 
            to="/work" 
            onMouseEnter={() => setHoveredNav('work')}
            onMouseLeave={() => setHoveredNav(null)}
            className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-black/10"
          >
            <span className="font-['Space_Grotesk'] text-[3.5rem] md:text-[6rem] uppercase tracking-[-2px] leading-none group-hover:opacity-50 transition-opacity">
              Work
            </span>
            <div className="flex items-center md:justify-end gap-4 md:gap-8 mt-2 md:mt-0">
              <div className="flex items-center text-base md:text-lg opacity-40">
                <AnimatePresence mode="wait">
                  {hoveredNav === 'work' ? (
                    <motion.span
                      key="chn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-['Swei_Bow_Sans'] tracking-[2px]"
                    >
                      反映設計方法的精選作品
                    </motion.span>
                  ) : (
                    <motion.span
                      key="eng"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-['Geist_Mono'] uppercase tracking-[1.5px]"
                    >
                      Selected works reflecting my design approach
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="hidden md:block font-['Geist_Mono'] text-2xl md:text-4xl group-hover:animate-flicker">
                ↗
              </span>
            </div>
          </Link>
          <Link 
            to="/personal" 
            onMouseEnter={() => setHoveredNav('personal')}
            onMouseLeave={() => setHoveredNav(null)}
            className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-black/10"
          >
            <span className="font-['Space_Grotesk'] text-[3.5rem] md:text-[6rem] uppercase tracking-[-2px] leading-none group-hover:opacity-50 transition-opacity">
              Personal
            </span>
            <div className="flex items-center md:justify-end gap-4 md:gap-8 mt-2 md:mt-0">
              <div className="flex items-center text-base md:text-lg opacity-40">
                <AnimatePresence mode="wait">
                  {hoveredNav === 'personal' ? (
                    <motion.span
                      key="chn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-['Swei_Bow_Sans'] tracking-[2px]"
                    >
                      即興實驗與個人探索
                    </motion.span>
                  ) : (
                    <motion.span
                      key="eng"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-['Geist_Mono'] uppercase tracking-[1.5px]"
                    >
                      Side projects fueled by pure passion
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="hidden md:block font-['Geist_Mono'] text-2xl md:text-4xl group-hover:animate-flicker">
                ↗
              </span>
            </div>
          </Link>
          <Link 
            to="/about" 
            onMouseEnter={() => setHoveredNav('about')}
            onMouseLeave={() => setHoveredNav(null)}
            className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-black/10"
          >
            <span className="font-['Space_Grotesk'] text-[3.5rem] md:text-[6rem] uppercase tracking-[-2px] leading-none group-hover:opacity-50 transition-opacity">
              About
            </span>
            <div className="flex items-center md:justify-end gap-4 md:gap-8 mt-2 md:mt-0">
              <div className="flex items-center text-base md:text-lg opacity-40">
                <AnimatePresence mode="wait">
                  {hoveredNav === 'about' ? (
                    <motion.span
                      key="chn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-['Swei_Bow_Sans'] tracking-[2px]"
                    >
                      像素之外的自我
                    </motion.span>
                  ) : (
                    <motion.span
                      key="eng"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-['Geist_Mono'] uppercase tracking-[1.5px]"
                    >
                      Beyond the pixels, who I am
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="hidden md:block font-['Geist_Mono'] text-2xl md:text-4xl group-hover:animate-flicker">
                ↗
              </span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
