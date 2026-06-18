import React from "react";
import Text3DFlip from "@/components/ui/text-3d-flip";

export default function App() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F3ED] text-[#0A0A0A]">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col p-5 md:px-10 md:py-5 relative border-b border-black/10">
        <header className="flex justify-between items-start text-[0.75rem] uppercase tracking-[0.5px]">
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-bold">HOWARD LEE</span>
            <span className="opacity-60 ml-0 md:ml-[clamp(40px,15vw,200px)]">MOTION / VISUAL DESIGNER</span>
          </div>
        </header>

        <div className="flex-1 flex flex-col justify-start items-start py-[12vh]">
          <div className="font-['Space_Grotesk'] text-[clamp(1.8rem,4.5vw,4.95rem)] leading-[1.1] tracking-[-2px] max-w-[80%] -ml-[0.04em]">
            <div className="flex items-center flex-wrap uppercase">
              <Text3DFlip
                className="bg-[#F4F3ED]"
                textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                rotateDirection="top"
                staggerDuration={0.03}
                staggerFrom="center"
              >
                VISUAL
              </Text3DFlip>
              <span className="gray-box px-2">160x80</span>
              <Text3DFlip
                className="bg-[#F4F3ED]"
                textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                rotateDirection="top"
                staggerDuration={0.03}
                staggerFrom="center"
              >
                MOTION
              </Text3DFlip>
            </div>
            <div className="flex items-center flex-wrap uppercase mt-2">
              <Text3DFlip
                className="bg-[#F4F3ED]"
                textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                rotateDirection="top"
                staggerDuration={0.03}
                staggerFrom="center"
              >
                ANIMATION
              </Text3DFlip>
              <span className="gray-box px-2">140x90</span>
              <Text3DFlip
                className="bg-[#F4F3ED]"
                textClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                flipTextClassName="bg-[#F4F3ED] text-[#0A0A0A]"
                rotateDirection="top"
                staggerDuration={0.03}
                staggerFrom="center"
              >
                INTERACTION
              </Text3DFlip>
            </div>
            <div className="mt-2">FROM HONG KONG</div>
            <div className="mt-2">BASED IN TAIWAN</div>
            <div className="mt-2">WORKING GLOBALLY.</div>
          </div>
        </div>

        <footer className="flex justify-between text-[0.75rem] uppercase tracking-[0.5px] opacity-60">
          <div>AVAILABLE FOR WORK</div>
          <a href="#projects" onClick={(e) => scrollTo(e, 'projects')} className="hover:opacity-100 transition-opacity">↓ SCROLL TO VIEW MORE ↓</a>
        </footer>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="projects" className="px-5 md:px-10 py-[100px] border-b border-black/10">
        <h2 className="font-['Space_Grotesk'] text-[3.5rem] mb-[60px] tracking-[-1px] -ml-[0.05em] font-normal">Featured</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] items-start">
          {/* Project 1 */}
          <div className="mb-10 md:mb-0">
            <div className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Nike Swoosh 1</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">CAMPAIGN / POP-UP</div>
            </div>
            <div className="w-full aspect-square bg-[#E0E0E0] mb-5"></div>
          </div>

          {/* Project 2 */}
          <div className="mb-10 md:mb-0 md:mt-[100px]">
            <div className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Journey To Edge</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">EXPERIENCE DESIGN / CONTENT CREATION</div>
            </div>
            <div className="w-full aspect-[4/5] bg-[#E0E0E0] mb-5"></div>
          </div>

          {/* Project 3 */}
          <div className="mb-10 md:mb-0">
            <div className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">Illuminarium</h3>
              <div className="text-[0.6rem] uppercase tracking-[1px] opacity-50">EXPERIENCE DESIGN / CONTENT CREATION</div>
            </div>
            <div className="w-full aspect-[3/4] bg-[#E0E0E0] mb-5"></div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="pt-[100px] px-5 md:px-10 pb-[20px]">
        <div className="text-[0.75rem] uppercase mb-10 tracking-[0.5px]">GET IN TOUCH</div>
        
        <div className="flex flex-col gap-[15px] mb-[120px]">
          {[
            { label: "MAIL", text: "LEEHOKAN192@GMAIL.COM", href: "mailto:leehokan192@gmail.com" },
            { label: "FOLLOW", text: "INSTAGRAM", href: "https://www.instagram.com/howard_lhk/", target: "_blank" },
            { label: "VIEW", text: "BEHANCE", href: "https://www.behance.net/hokanlee", target: "_blank" },
            { label: "VIEW", text: "VIMEO", href: "https://vimeo.com/user177460868", target: "_blank" }
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <a 
                href={item.href}
                target={item.target}
                rel={item.target ? "noopener noreferrer" : undefined}
                className="font-['Space_Grotesk'] text-[clamp(3rem,7vw,7rem)] leading-[1] tracking-[-2px] -ml-[0.04em] hover:opacity-70 transition-opacity"
              >
                {item.text}
              </a>
              <span className="text-[0.5rem] uppercase opacity-50 mt-[5px] ml-[10px]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-[0.75rem] uppercase tracking-[0.5px]">
          <div>AVAILABLE FOR WORK</div>
        </div>
      </footer>
    </div>
  );
}
