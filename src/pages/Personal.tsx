import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { staggerContainer, staggerItem } from "../utils/Animations";

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

const PROJECTS_DATA = [
  {
    id: "unsorted",
    link: "/personal/unsorted",
    title: { en: "Unsorted", cn: "Unsorted" },
    category: { en: "AUDIO VISUAL PERFORMANCE", cn: "即時音像演出" },
    year: "2026",
    mediums: ["AUDIO VISUAL", "INSTALLATION"],
    preview: <img src="/projects/unsorted/unsorted_cover.jpg" alt="Unsorted" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />,
    className: ""
  },
  {
    id: "frame-by-frame",
    link: "/personal/frame-by-frame",
    title: { en: "Frame by Frame", cn: "Frame by Frame" },
    category: { en: "3D INSTALLATION", cn: "立體裝置" },
    year: "2025",
    mediums: ["INSTALLATION", "3D"],
    preview: <img src="/projects/framebyframe/cover.jpg" alt="Frame by Frame" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />,
    className: ""
  },
  {
    id: "who-decides",
    link: "/personal/who-decides",
    title: { en: "Who decides your needs?", cn: "Who decides your needs?" },
    category: { en: "POSTER DESIGN / RELATIONAL DESIGN", cn: "海報設計 / 關係設計" },
    year: "2026",
    mediums: ["GRAPHIC DESIGN"],
    preview: <video src="/projects/whodecides/Postercoverloop.mp4" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105 pointer-events-none" autoPlay loop muted playsInline />,
    className: "md:row-span-2 h-full"
  },
  {
    id: "egggy-planet",
    link: "/personal/egggy-planet",
    title: { en: "Eggbys Planet", cn: "蛋寶星球記" },
    category: { en: "MIXED MEDIA / STOP MOTION", cn: "複合媒材 / 定格動畫" },
    year: "2025",
    mediums: ["MIXED MEDIA", "EXPERIMENTAL"],
    preview: <img src="/projects/eggplanet/cover.jpg" alt="Eggbys Planet" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />,
    className: "md:col-span-2"
  },
  {
    id: "bamboo",
    link: "/personal/bamboo-theatre",
    title: { en: "Cantonese Bamboo Theatre", cn: "神功戲棚" },
    category: { en: "POSTER DESIGN", cn: "海報設計" },
    year: "2026",
    mediums: ["GRAPHIC DESIGN"],
    preview: <img src="/projects/bamboo/poster_cover.jpg" alt="Bamboo Theatre" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />,
    className: "md:row-span-2 h-full"
  },
  {
    id: "thesis-sketching",
    link: "/personal/thesis-sketching",
    title: { en: "Architectural Thesis Drawing", cn: "2026實踐建築系畢製作品素描" },
    category: { en: "DRAWING", cn: "素描" },
    year: "2026",
    mediums: ["DRAWING"],
    preview: <SlideshowPreview images={['/projects/yen/drawing4cover.jpg', '/projects/yen/drawing1.jpg', '/projects/yen/drawing2.jpg', '/projects/yen/drawing3.jpg', '/projects/yen/drawing4.jpg']} intervalMs={1200} />,
    className: ""
  },
  {
    id: "endowing",
    link: "/personal/endowing-objects",
    title: { en: "The Endowing of Objects", cn: "物體的賦予" },
    category: { en: "EDITORIAL DESIGN", cn: "圖文設計" },
    year: "2026",
    mediums: ["EDITORIAL DESIGN"],
    preview: <img src="/projects/endowing/book_cover.jpg" alt="The Endowing of Objects" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />,
    className: ""
  },
  {
    id: "culture-identity",
    link: "/personal/culture-identity-boundary",
    title: { en: "Culture_Identity_Boundary", cn: "文化_身分_邊界" },
    category: { en: "EDITORIAL DESIGN", cn: "圖文設計" },
    year: "2026",
    mediums: ["EDITORIAL DESIGN"],
    preview: <img src="/projects/culture/book_cover.jpg" alt="Culture_Identity_Boundary" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />,
    className: ""
  },
  {
    id: "digital-twin",
    link: "/personal/digital-twin",
    title: { en: "Digital Twin", cn: "數位孿生" },
    category: { en: "MASK DESIGN / 3D ANIMATION", cn: "面具設計、3D動畫" },
    year: "2025",
    mediums: ["3D"],
    preview: <video src="/projects/gear/1_igpost loop8s.mp4" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105 pointer-events-none" autoPlay loop muted playsInline />,
    className: "md:row-span-2 h-full"
  },
  {
    id: "happy-horse",
    link: "/personal/happy-horse-year-2026",
    title: { en: "Happy Horse Year 2026", cn: "2026馬力全開" },
    category: { en: "3D ANIMATION", cn: "3D動畫" },
    year: "2026",
    mediums: ["3D"],
    preview: <video src="/projects/horseyear/horseig01.mp4" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105 pointer-events-none" autoPlay loop muted playsInline />,
    className: "md:row-span-2 h-full"
  },
  {
    id: "life-drawing",
    link: "/personal/life-drawing",
    title: { en: "Life Drawing", cn: "人體素描" },
    category: { en: "DRAWING", cn: "素描" },
    year: "2025",
    mediums: ["DRAWING"],
    preview: <SlideshowPreview images={['/projects/drawing/drawing02.jpg', '/projects/drawing/drawing01.jpg', '/projects/drawing/drawing03.jpg', '/projects/drawing/drawing04.jpg']} intervalMs={1200} objectPosition="object-top" />,
    className: ""
  }
];

export function Personal() {
  useEffect(() => { 
    document.title = "Howard Lee - Personal"; 
    window.scrollTo(0, 0);
  }, []);
  const { lang } = useLanguage();
  const [openFilter, setOpenFilter] = useState<'YEAR' | 'MEDIUM' | null>(null);

  const [activeYear, setActiveYear] = useState('ALL');
  const [activeMedium, setActiveMedium] = useState('ALL');

  const handleYearClick = (y: string) => {
    if (y === 'ALL') {
      setActiveYear('ALL');
      setActiveMedium('ALL');
    } else {
      setActiveYear(y);
    }
  };

  const handleMediumClick = (m: string) => {
    if (m === 'ALL') {
      setActiveYear('ALL');
      setActiveMedium('ALL');
    } else {
      setActiveMedium(m);
    }
  };

  // Derive dynamic years and mediums from PROJECTS_DATA
  const years = ['ALL', ...Array.from(new Set(PROJECTS_DATA.map(p => p.year))).sort((a, b) => parseInt(b) - parseInt(a))];
  const mediumsSet = new Set<string>();
  PROJECTS_DATA.forEach(p => p.mediums.forEach(m => mediumsSet.add(m)));
  const mediums = ['ALL', ...Array.from(mediumsSet).sort()];

  // Filter projects based on activeYear and activeMedium
  const filteredProjects = PROJECTS_DATA.filter(project => {
    const yearMatch = activeYear === 'ALL' || project.year === activeYear;
    const mediumMatch = activeMedium === 'ALL' || project.mediums.includes(activeMedium);
    return yearMatch && mediumMatch;
  });

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10 min-h-[80vh]">
      <div className="flex justify-between items-start mb-8 md:mb-12">
        <Link to="/" className="inline-flex items-center gap-1 hover:opacity-50 transition-opacity font-['Geist_Mono'] text-xs uppercase tracking-[1px]">
          <ChevronLeft size={16} className="-ml-1" />
          Back
        </Link>
        <LanguageToggle />
      </div>
      <div className="mb-[40px] md:mb-[60px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[3.5rem] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          {lang === 'ENG' ? 'Personal' : '個人作品'}
        </motion.h2>
      </div>

      {/* Filter Accordions */}
      <div className="mb-12 md:mb-20 border-t border-b border-black/10 flex flex-col md:flex-row">
        {/* YEAR Toggle */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-black/10">
          <button
            onClick={() => setOpenFilter(openFilter === 'YEAR' ? null : 'YEAR')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-8 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Geist_Mono'] text-sm tracking-[1px] uppercase">
              {lang === 'ENG' ? 'Filter by Year' : '依年份篩選'} {activeYear !== 'ALL' && <span className="ml-2 opacity-50">[{activeYear}]</span>}
            </span>
            <span className="font-['Geist_Mono'] text-xl font-light">{openFilter === 'YEAR' ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {openFilter === 'YEAR' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 flex flex-wrap gap-2 pr-4 md:pr-8">
                  {years.map(y => (
                    <button
                      key={y}
                      onClick={() => handleYearClick(y)}
                      className={`font-['Geist_Mono'] text-[0.85rem] tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeYear === y ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'} ${lang === 'ENG' ? 'uppercase' : ''}`}
                    >
                      {lang === 'CHN' && y === 'ALL' ? '全部' : y}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MEDIUM Toggle */}
        <div className="w-full md:w-1/2 pl-0 md:pl-8">
          <button
            onClick={() => setOpenFilter(openFilter === 'MEDIUM' ? null : 'MEDIUM')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-0 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Geist_Mono'] text-sm tracking-[1px] uppercase">
              {lang === 'ENG' ? 'Filter by Medium' : '依媒介篩選'} {activeMedium !== 'ALL' && <span className="ml-2 opacity-50">[{activeMedium}]</span>}
            </span>
            <span className="font-['Geist_Mono'] text-xl font-light">{openFilter === 'MEDIUM' ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {openFilter === 'MEDIUM' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 flex flex-wrap gap-2">
                  {mediums.map(m => {
                    const translatedMedium = lang === 'ENG' ? m :
                      ({ 'ALL': '全部', 'CGI': 'CGI', '3D': '3D', 'SIMULATION': '物理模擬', 'EXPERIMENTAL': '實驗影像', 'PHYSICAL': '實體裝置', 'MIXED MEDIA': '複合媒材', 'GRAPHIC DESIGN': '平面設計', 'EDITORIAL DESIGN': '圖文設計', 'DRAWING': '素描', 'AUDIO VISUAL': '音像演出', 'INSTALLATION': '裝置作品' })[m] || m;
                    return (
                      <button
                        key={m}
                        onClick={() => handleMediumClick(m)}
                        className={`font-['Geist_Mono'] text-[0.85rem] tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeMedium === m ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'} ${lang === 'ENG' ? 'uppercase' : ''}`}
                      >
                        {translatedMedium}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        key={activeYear + activeMedium}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] grid-flow-row-dense items-start"
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className={`${project.className || ''}`}>
              <Link to={project.link} className="block group cursor-pointer h-full flex flex-col">
                <motion.div variants={staggerItem} className="mb-[15px]">
                  <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal group-hover:opacity-60 transition-opacity">
                    {lang === 'ENG' ? project.title.en : project.title.cn}
                  </h3>
                  <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">
                    {lang === 'ENG' ? project.category.en : project.category.cn}
                  </div>
                </motion.div>
                <motion.div variants={staggerItem} className="w-full relative bg-[#E0E0E0] overflow-hidden group">
                  {project.preview}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <span className="font-['Geist_Mono'] text-white text-[0.85rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                      {lang === 'ENG' ? 'Click to View' : '點擊查看'}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center font-['Geist_Mono'] text-sm uppercase tracking-[2px] opacity-50">
            {lang === 'ENG' ? 'No projects match the selected filters.' : '沒有符合篩選條件的作品。'}
          </div>
        )}
      </motion.div>
    </section>
  );
}
