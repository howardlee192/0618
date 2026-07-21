import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CoverSlideshow({ images, speed = 6 }: { images: any[], speed?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, speed * 1000);
    return () => clearInterval(interval);
  }, [images, speed]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#E0E0E0]">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          src={images[index].asset.url}
          alt={`Slideshow ${index}`}
          className="w-full h-auto object-cover block transition-transform duration-[4s] group-hover:scale-105"
        />
      </AnimatePresence>
    </div>
  );
}
