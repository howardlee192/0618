import React, { useEffect, useId } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';

export const GlassRefractionWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const scrollVelocity = useMotionValue(0);
  
  // Spring physics: stiffness: 100, damping: 25 as requested
  const smoothedVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 25 });
  
  // Base subtle animation (time based)
  const time = useMotionValue(0);
  useAnimationFrame((t) => {
    time.set(t);
  });
  
  // Base state: subtle constant movement (oscillation from 10 to 20 displacement)
  const baseDisplacement = useTransform(time, (t) => Math.sin(t / 800) * 5 + 15);
  
  // Down scroll (deltaY > 0) -> Increase Displacement (liquid refraction)
  // Maps downward scroll to extra displacement scale (0 to 60)
  const scrollDisplacement = useTransform(smoothedVelocity, [0, 150], [0, 60], { clamp: false });
  
  // Combine base and scroll displacement. Only add if scrolling down.
  const totalDisplacement = useTransform(
    [baseDisplacement, scrollDisplacement, smoothedVelocity],
    ([base, scroll, vel]) => {
      const v = vel as number;
      if (v > 0) return (base as number) + (scroll as number);
      return base as number;
    }
  );

  // Up scroll (deltaY < 0) -> Increase Blur
  // Maps upward scroll to blur (0 to 15px)
  const blurAmount = useTransform(smoothedVelocity, [-150, 0], [15, 0], { clamp: true });
  const filterStyle = useTransform(blurAmount, (blur) => `blur(${blur}px)`);

  useEffect(() => {
    let resetTimeout: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      // Add current delta to velocity, simulating scroll intensity
      scrollVelocity.set(e.deltaY);
      
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        // Return to base state gracefully
        scrollVelocity.set(0);
      }, 150);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(resetTimeout);
    };
  }, [scrollVelocity]);

  const filterId = useId().replace(/:/g, "");

  return (
    <div className={`relative ${className}`}>
      <svg className="hidden">
        <defs>
          <filter id={`glass-refraction-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            {/* baseFrequency X=0.08 Y=0.002 creates vertical ribbed glass streaks */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.08 0.002" 
              numOctaves="2" 
              result="noise" 
            />
            <motion.feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale={totalDisplacement} 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      {/* Wrapping div that applies the dynamic blur and SVG displacement */}
      <motion.div 
        style={{ filter: filterStyle }}
        className="w-full h-full"
      >
        <div style={{ filter: `url(#glass-refraction-${filterId})` }} className="w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
