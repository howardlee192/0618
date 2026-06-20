import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WebGLFluidDistortion } from "../components/WebGLFluidDistortion";
import { ScrambleText } from "../components/ui/ScrambleText";

export function IntroScreen({ onEnter, isReturning }: { onEnter: () => void, isReturning?: boolean }) {
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
      
      if (accumulatedScroll > 300) {
        setScrolled(true);
        setTimeout(onEnter, 2800);
      }
      
      if (accumulatedScroll < 0) {
        accumulatedScroll = 0;
      }
    };
    
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
