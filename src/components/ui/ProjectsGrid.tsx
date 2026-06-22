import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { staggerContainer, staggerItem, staggerItemBlur } from "../../utils/Animations";

const renderMixedTitle = (text: string) => {
  return text.split(/([\u4e00-\u9fa5]+)/).map((part, index) => {
    if (/[\u4e00-\u9fa5]/.test(part)) {
      return <span key={index} className="font-['Swei_Bow_Sans'] text-[2rem] tracking-[1px]">{part}</span>;
    }
    return part;
  });
};

const renderMixedCategory = (text: string) => {
  return text.split(/([\u4e00-\u9fa5]+)/).map((part, index) => {
    if (/[\u4e00-\u9fa5]/.test(part)) {
      return <span key={index} className="font-['Swei_Bow_Sans']">{part}</span>;
    }
    return part;
  });
};

const SlideshowPreview = ({ images, intervalMs = 600, objectPosition = "object-center" }: { images: string[], intervalMs?: number, objectPosition?: string }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <img
      src={images[index]}
      alt="Preview"
      className={`w-full aspect-[4/3] object-cover block transition-transform duration-700 group-hover:scale-105 ${objectPosition}`}
    />
  );
};

export function ProjectsGrid({ useBlur = false }: { useBlur?: boolean }) {
  const { lang } = useLanguage();
  const itemVariant = useBlur ? staggerItemBlur : staggerItem;

  const projects = [
    {
      title: lang === 'ENG' ? "Unsorted" : "Unsorted",
      category: lang === 'ENG' ? "AUDIO VISUAL PERFORMANCE" : "即時音像演出",
      link: "/personal/unsorted",
      preview: <img src="/projects/unsorted/unsorted_cover.jpg" alt="Unsorted" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
    },
    {
      title: lang === 'ENG' ? "Digital Twin" : "數位孿生",
      category: lang === 'ENG' ? "MASK DESIGN / 3D ANIMATION" : "面具設計、3D動畫",
      link: "/personal/digital-twin",
      preview: <video src="/projects/gear/1_igpost loop8s.mp4" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105 pointer-events-none" autoPlay loop muted playsInline />
    },
    {
      title: lang === 'ENG' ? "The Endowing of Objects" : "物體的賦予",
      category: lang === 'ENG' ? "EDITORIAL DESIGN" : "圖文設計",
      link: "/personal/endowing-objects",
      preview: <img src="/projects/endowing/book_cover.jpg" alt="The Endowing of Objects" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
    },
    {
      title: lang === 'ENG' ? "Architectural Thesis Drawing" : "2026實踐建築系畢製作品素描",
      category: lang === 'ENG' ? "DRAWING" : "素描",
      link: "/personal/thesis-sketching",
      preview: <SlideshowPreview images={['/projects/yen/drawing4cover.jpg', '/projects/yen/drawing1.jpg', '/projects/yen/drawing2.jpg', '/projects/yen/drawing3.jpg', '/projects/yen/drawing4.jpg']} intervalMs={1200} />
    },
    {
      title: lang === 'ENG' ? "Who decides your needs?" : "Who decides your needs?",
      category: lang === 'ENG' ? "POSTER DESIGN / RELATIONAL DESIGN" : "海報設計 / 關係設計",
      link: "/personal/who-decides",
      preview: <video src="/projects/whodecides/Postercoverloop.mp4" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105 pointer-events-none" autoPlay loop muted playsInline />
    }
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      className="columns-1 md:columns-2 lg:columns-3 gap-[30px] space-y-[30px]"
    >
      {projects.map((p, i) => (
        <div key={i} className="break-inside-avoid mb-[30px]">
          <Link to={p.link} className="group block">
            <motion.div variants={itemVariant} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal leading-none">
                {lang === 'CHN' ? renderMixedTitle(p.title) : p.title}
              </h3>
              <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50 font-['Geist_Mono']">
                {lang === 'CHN' ? renderMixedCategory(p.category) : p.category}
              </div>
            </motion.div>
            <motion.div variants={itemVariant} className="w-full overflow-hidden bg-[#F0F0F0]">
              {p.preview}
            </motion.div>
          </Link>
        </div>
      ))}
    </motion.div>
  );
}
