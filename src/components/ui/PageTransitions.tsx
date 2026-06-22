import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntroScreen } from "../../pages/IntroScreen";

export function HomeTransition({ children }: { children: React.ReactNode }) {
  const isReturnVisit = React.useRef(sessionStorage.getItem('introDone') === 'true').current;
  const [introDone, setIntroDone] = useState(isReturnVisit);
  const [isReversing, setIsReversing] = useState(false);
  const [hasReturned, setHasReturned] = useState(false);

  useEffect(() => {
    const handleReset = () => {
      if (introDone && !isReversing) {
        setIsReversing(true);
        setTimeout(() => {
          setHasReturned(true);
          setIntroDone(false);
          sessionStorage.setItem('introDone', 'false');
          setIsReversing(false);
        }, 800);
      } else if (!introDone) {
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
    sessionStorage.setItem('introDone', 'true');
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
            initial={{ opacity: isReturnVisit ? 0 : 1 }}
            animate={{ opacity: isReversing ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <motion.div
            initial={{ filter: isReturnVisit ? "blur(0px)" : "blur(20px)", opacity: isReturnVisit ? 1 : 0 }}
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

export function PageTransition({ children }: { children: React.ReactNode }) {
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
