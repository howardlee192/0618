import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Text3DFlip from "../components/ui/text-3d-flip";
import { HoverReveal } from "../components/ui/HoverReveal";
import { ScrambleText } from "../components/ui/ScrambleText";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import { ProjectsGrid } from "../components/ui/ProjectsGrid";
import { useLanguage } from "../contexts/LanguageContext";

export function Home() {
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
