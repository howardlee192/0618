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
  
  // Base state: stronger constant movement for visible glass refraction
  const baseDisplacement = useTransform(time, (t) => Math.sin(t / 800) * 15 + 30);
  
  // Down scroll (deltaY > 0) -> Increase Displacement (liquid refraction)
  // Maps downward scroll to extra displacement scale (0 to 120)
  const scrollDisplacement = useTransform(smoothedVelocity, [0, 150], [0, 120], { clamp: false });
  
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
    <div className={`relative overflow-hidden ${className}`}>
      <svg className="hidden">
        <defs>
          <filter id={`glass-refraction-${filterId}`} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            {/* Generate column-based noise (changes along X, constant along Y) */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.04 0.0001" 
              numOctaves="1" 
              result="noise" 
            />
            {/* Step the noise to create sharp, discrete vertical glass panels and zero out horizontal displacement */}
            <feComponentTransfer in="noise" result="steppedNoise">
              {/* Stepping the G channel for sharp vertical displacement */}
              <feFuncG type="discrete" tableValues="0.1 0.4 0.2 0.8 0.5 0.9 0.3 0.7 0.6" />
              {/* Force R channel to 0.5 (neutral) so there is NO horizontal displacement */}
              <feFuncR type="linear" slope="0" intercept="0.5" />
            </feComponentTransfer>
            <motion.feDisplacementMap 
              in="SourceGraphic" 
              in2="steppedNoise" 
              scale={totalDisplacement} 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      {/* Wrapping div that applies the dynamic blur and SVG displacement */}
      {/* Absolute inset with larger negative margins completely prevents distorted black edges from showing up */}
      <motion.div 
        style={{ filter: filterStyle }}
        className="absolute -top-[20%] -bottom-[20%] -left-[20%] -right-[20%]"
      >
        <div style={{ filter: `url(#glass-refraction-${filterId})` }} className="w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
