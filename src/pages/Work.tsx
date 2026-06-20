import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import { ProjectsGrid } from "../components/ui/ProjectsGrid";
import { useLanguage } from "../contexts/LanguageContext";

export function Work() {
  useEffect(() => { document.title = "Howard Lee - Work"; }, []);
  const { lang } = useLanguage();
  const [openFilter, setOpenFilter] = useState<'YEAR' | 'TYPE' | null>(null);

  const years = ['ALL', '2024', '2023', '2022', '2021'];
  const types = ['ALL', 'MOTION', 'VISUAL', 'CGI', 'INTERACTION'];

  const [activeYear, setActiveYear] = useState('ALL');
  const [activeType, setActiveType] = useState('ALL');

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10 min-h-[80vh]">
      <div className="flex justify-between items-end mb-[40px] md:mb-[60px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk'] text-[3.5rem] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          Work
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

        {/* TYPE Toggle */}
        <div className="w-full md:w-1/2 pl-0 md:pl-8">
          <button 
            onClick={() => setOpenFilter(openFilter === 'TYPE' ? null : 'TYPE')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-0 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Geist_Mono'] text-sm tracking-[1px] uppercase">
              {lang === 'ENG' ? 'Filter by Type' : '依類型篩選'} {activeType !== 'ALL' && <span className="ml-2 opacity-50">[{activeType}]</span>}
            </span>
            <span className="font-['Geist_Mono'] text-xl font-light">{openFilter === 'TYPE' ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {openFilter === 'TYPE' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 flex flex-wrap gap-2">
                  {types.map(t => {
                    const translatedType = lang === 'ENG' ? t : 
                      ({'ALL': '全部', 'MOTION': '動態', 'VISUAL': '視覺', 'CGI': 'CGI', 'INTERACTION': '互動'})[t] || t;
                    return (
                      <button 
                        key={t}
                        onClick={() => setActiveType(t)}
                        className={`font-['Geist_Mono'] text-[0.85rem] tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeType === t ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'} ${lang === 'ENG' ? 'uppercase' : ''}`}
                      >
                        {translatedType}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProjectsGrid />
    </section>
  );
}
