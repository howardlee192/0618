import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { staggerContainer, staggerItem } from "../utils/Animations";

export function Personal() {
  useEffect(() => { document.title = "Howard Lee - Personal"; }, []);
  const { lang } = useLanguage();
  const [openFilter, setOpenFilter] = useState<'YEAR' | 'MEDIUM' | null>(null);

  const years = ['ALL', '2024', '2023', '2022', '2021'];
  const mediums = ['ALL', 'CGI', '3D', 'SIMULATION', 'EXPERIMENTAL', 'PHYSICAL', 'MIXED MEDIA'];

  const [activeYear, setActiveYear] = useState('ALL');
  const [activeMedium, setActiveMedium] = useState('ALL');

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10 min-h-[80vh]">
      <div className="flex justify-between items-end mb-[40px] md:mb-[60px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[3.5rem] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          {lang === 'ENG' ? 'Personal' : '個人作品'}
        </motion.h2>
        <LanguageToggle />
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
                      onClick={() => setActiveYear(y)}
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
                      ({'ALL': '全部', 'CGI': 'CGI', '3D': '3D', 'SIMULATION': '物理模擬', 'EXPERIMENTAL': '實驗影像', 'PHYSICAL': '實體裝置', 'MIXED MEDIA': '複合媒材'})[m] || m;
                    return (
                      <button 
                        key={m}
                        onClick={() => setActiveMedium(m)}
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
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        className="columns-1 md:columns-2 lg:columns-3 gap-[30px] space-y-[30px]"
      >
        <div className="break-inside-avoid">
          <Link to="/personal/unsorted" className="block group cursor-pointer">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal group-hover:opacity-60 transition-opacity">Unsorted</h3>
              <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">{lang === 'ENG' ? 'AUDIO VISUAL PERFORMANCE' : '即時音像演出'}</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full relative bg-[#E0E0E0] overflow-hidden">
              <img src="/projects/unsorted/unsorted_cover.jpg" alt="Unsorted" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-['Geist_Mono'] text-white text-[0.85rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'ENG' ? 'Click to View' : '點擊查看'}</span>
              </div>
            </motion.div>
          </Link>
        </div>
        <div className="break-inside-avoid">
          <Link to="/personal/frame-by-frame" className="block group cursor-pointer">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal group-hover:opacity-60 transition-opacity">Frame by Frame</h3>
              <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">{lang === 'ENG' ? '3D INSTALLATION' : '立體裝置'}</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full relative bg-[#E0E0E0] overflow-hidden">
              <img src="/projects/framebyframe/cover.jpg" alt="Frame by Frame" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-['Geist_Mono'] text-white text-[0.85rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'ENG' ? 'Click to View' : '點擊查看'}</span>
              </div>
            </motion.div>
          </Link>
        </div>
        <div className="break-inside-avoid">
          <Link to="/personal/who-decides" className="block group cursor-pointer">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal group-hover:opacity-60 transition-opacity">Who decides your needs?</h3>
              <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">{lang === 'ENG' ? 'POSTER DESIGN / RELATIONAL DESIGN' : '海報設計 / 關係設計'}</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full relative bg-[#E0E0E0] overflow-hidden">
              <img src="/projects/whodecides/Poster1+Cover.jpg" alt="Who decides your needs?" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-['Geist_Mono'] text-white text-[0.85rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'ENG' ? 'Click to View' : '點擊查看'}</span>
              </div>
            </motion.div>
          </Link>
        </div>
        <div className="break-inside-avoid">
          <Link to="/personal/bamboo-theatre" className="block group cursor-pointer mt-12 md:mt-24 lg:mt-32">
            <motion.div variants={staggerItem} className="mb-[15px]">
              <h3 className="font-['Space_Grotesk'] text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] group-hover:opacity-60 transition-opacity font-normal">{lang === 'ENG' ? 'Cantonese Bamboo Theatre' : '神功戲棚'}</h3>
              <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">{lang === 'ENG' ? 'POSTER DESIGN' : '平面海報設計'}</div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full relative bg-[#E0E0E0] overflow-hidden">
              <img src="/projects/bamboo/poster_cover.jpg" alt="Bamboo Theatre" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-['Geist_Mono'] text-white text-[0.85rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'ENG' ? 'Click to View' : '點擊查看'}</span>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
