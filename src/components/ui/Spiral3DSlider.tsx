import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

interface Spiral3DSliderProps {
  images: { src: string; alt: string; aspect?: string }[];
}

export function Spiral3DSlider({ images }: Spiral3DSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);

  // We want a dense ring, so we duplicate the images to have enough items to form a large circle.
  const displayImages = [...images, ...images, ...images];
  const total = displayImages.length;
  const radius = window.innerWidth > 768 ? 800 : 400; // Larger radius for desktop

  useAnimationFrame((_, delta) => {
    // Auto-rotate the carousel like a marquee (跑馬燈)
    rotationRef.current += delta * 0.015; // Speed of rotation
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
  });

  return (
    <div className="relative w-full h-[100vh] bg-[#09090b] overflow-hidden flex items-center justify-center" style={{ perspective: '1500px' }}>
      
      {/* 3D Container that rotates */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {displayImages.map((img, i) => {
          // Distribute evenly around the 360 degree circle
          const angle = (i / total) * 360;
          
          // Create a wave or scattered effect on the Y-axis to match the reference image's spiral/scattered look
          // We use sine wave based on index to create an elegant up-and-down spiral pattern
          const yOffset = Math.sin((i / total) * Math.PI * 6) * 200; 
          
          // Slight X and Z rotations to make it look more chaotic and dynamic, like the reference
          const rotateX = Math.sin((i / total) * Math.PI * 4) * 10;
          const rotateZ = Math.cos((i / total) * Math.PI * 4) * 5;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-md overflow-hidden bg-white/5 border border-white/10 shadow-2xl group cursor-pointer"
              style={{
                width: img.aspect === 'aspect-square' ? '250px' : '300px',
                height: img.aspect === 'aspect-square' ? '250px' : '200px',
                // Center the transform origin
                marginLeft: img.aspect === 'aspect-square' ? '-125px' : '-150px',
                marginTop: img.aspect === 'aspect-square' ? '-125px' : '-100px',
                transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOffset}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible', // allow seeing the back of the cards as they rotate
              }}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          );
        })}
      </div>

      {/* Dramatic Vignette Overlay to hide edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#09090b_80%)] z-10"></div>
    </div>
  );
}
