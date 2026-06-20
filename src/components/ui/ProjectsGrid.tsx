import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { staggerContainer, staggerItem, staggerItemBlur } from "../../utils/Animations";

export function ProjectsGrid({ useBlur = false }: { useBlur?: boolean }) {
  const { lang } = useLanguage();
  const itemVariant = useBlur ? staggerItemBlur : staggerItem;

  const projects = [
    {
      title: lang === 'ENG' ? "Nike Swoosh 1" : "Nike Swoosh 1",
      category: lang === 'ENG' ? "CAMPAIGN / POP-UP" : "廣告活動 / 快閃店",
      aspect: "aspect-[4/5]"
    },
    {
      title: lang === 'ENG' ? "Journey To Edge" : "邊緣之旅",
      category: lang === 'ENG' ? "EXPERIENCE DESIGN / CONTENT CREATION" : "體驗設計 / 內容創作",
      aspect: "aspect-[16/9]"
    },
    {
      title: lang === 'ENG' ? "Illuminarium" : "幻光空間",
      category: lang === 'ENG' ? "EXPERIENCE DESIGN / CONTENT CREATION" : "體驗設計 / 內容創作",
      aspect: "aspect-[3/4]"
    },
    {
      title: lang === 'ENG' ? "Cosmic Flow" : "宇宙流",
      category: lang === 'ENG' ? "MOTION / VISUAL DESIGN" : "動態 / 視覺設計",
      aspect: "aspect-square"
    },
    {
      title: lang === 'ENG' ? "Digital Architecture" : "數位建築",
      category: lang === 'ENG' ? "BRANDING / INTERACTION" : "品牌設計 / 互動體驗",
      aspect: "aspect-[4/5]"
    },
    {
      title: lang === 'ENG' ? "The Metaverse" : "元宇宙",
      category: lang === 'ENG' ? "3D ANIMATION / INTERACTIVE" : "3D 動畫 / 互動體驗",
      aspect: "aspect-[16/9]"
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
        <div key={i} className="break-inside-avoid">
          <motion.div variants={itemVariant} className="mb-[15px]">
            <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal">{p.title}</h3>
            <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">{p.category}</div>
          </motion.div>
          <motion.div variants={itemVariant} className={`w-full h-auto ${p.aspect} bg-[#E0E0E0]`}></motion.div>
        </div>
      ))}
    </motion.div>
  );
}
