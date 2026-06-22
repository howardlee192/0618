import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HoverRevealProps {
  children: React.ReactNode;
  imageSrc?: string;
  videoSrc?: string;
  images?: string[];
  intervalMs?: number;
}

export const HoverReveal = ({ children, imageSrc, videoSrc, images, intervalMs = 1200 }: HoverRevealProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(('ontouchstart' in window) || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  useEffect(() => {
    if (!isTouch) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsHovered(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isTouch]);

  useEffect(() => {
    if (!isHovered || !images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [isHovered, images, intervalMs]);

  // Determine what to render inside the box
  let content = null;
  const mediaClass = "w-auto h-auto max-w-[90vw] md:max-w-[400px] max-h-[35vh] md:max-h-[300px] pointer-events-none";
  
  if (videoSrc) {
    content = (
      <video 
        src={videoSrc} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={mediaClass}
      />
    );
  } else if (images && images.length > 0) {
    content = (
      <>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Preview"
            className={`${mediaClass} ${i === currentIndex ? "block" : "hidden"}`}
          />
        ))}
      </>
    );
  } else if (imageSrc) {
    content = (
      <img src={imageSrc} alt="Preview" className={mediaClass} />
    );
  }

  const mobileStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "8vh",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    pointerEvents: "none"
  };

  const desktopStyle: React.CSSProperties = {
    position: "fixed",
    top: mousePos.y,
    left: mousePos.x,
    zIndex: 100,
    pointerEvents: "none"
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center justify-center py-2 -my-2 cursor-pointer"
      onMouseEnter={(e) => {
        if (isTouch) return;
        setIsHovered(true);
        setCurrentIndex(0);
        setMousePos({ x: e.clientX + 20, y: e.clientY + 20 });
      }}
      onMouseLeave={() => {
        if (isTouch) return;
        setIsHovered(false);
      }}
      onMouseMove={(e) => {
        if (isTouch) return;
        setMousePos({ x: e.clientX + 20, y: e.clientY + 20 });
      }}
      onClick={() => {
        if (!isTouch) return;
        if (!isHovered) setCurrentIndex(0);
        setIsHovered(!isHovered);
      }}
    >
      {children}
      <AnimatePresence>
        {isHovered && content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            style={isTouch ? mobileStyle : desktopStyle}
            className="flex items-center justify-center pointer-events-none"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
