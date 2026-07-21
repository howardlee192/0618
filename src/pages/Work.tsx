import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import { CoverSlideshow } from "../components/ui/CoverSlideshow";
import { useLanguage } from "../contexts/LanguageContext";
import { staggerContainer, staggerItem } from "../utils/Animations";
import { client } from "../lib/sanity";

export function Work() {
  const { lang } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    document.title = "Howard Lee - Work"; 
    window.scrollTo(0, 0);

    const query = `*[_type == "project" && category in ["work", "both"]] | order(sortOrder desc, year desc, _createdAt desc) {
      _id,
      title,
      titleZh,
      slug,
      category,
      year,
      medium,
      thumbnailSize,
      coverType,
      coverImage { asset->{url} },
      coverSlideshowImages[] { asset->{url} },
      coverSlideshowSpeed,
      coverVideoUrl,
      coverVideoFile { asset->{url} }
    }`;

    client.fetch(query).then(data => {
      setProjects(data);
      setIsLoading(false);
    }).catch(console.error);

  }, []);

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

  const years = ['ALL', ...Array.from(new Set(projects.map(p => p.year).filter(Boolean)))];
  years.sort((a, b) => {
    if (a === 'ALL') return -1;
    if (b === 'ALL') return 1;
    return parseInt(b) - parseInt(a);
  });

  const mediumsSet = new Set<string>();
  projects.forEach(p => {
    if (p.medium?.en) {
      const tags = p.medium.en.split(/[,/、，]/).map((t: string) => t.trim()).filter(Boolean);
      tags.forEach((tag: string) => mediumsSet.add(tag.toUpperCase()));
    }
  });
  const mediums = ['ALL', ...Array.from(mediumsSet).sort()];

  const filteredProjects = projects.filter(project => {
    const yearMatch = activeYear === 'ALL' || project.year === activeYear;
    
    let mediumMatch = activeMedium === 'ALL';
    if (activeMedium !== 'ALL' && project.medium?.en) {
      const tags = project.medium.en.split(/[,/、，]/).map((t: string) => t.trim().toUpperCase());
      mediumMatch = tags.includes(activeMedium);
    }

    return yearMatch && mediumMatch;
  });

  const translateMedium = (m: string) => {
    if (lang === 'ENG') return m;
    const dict: Record<string, string> = {
      'ALL': '全部', 'CGI': 'CGI', '3D': '3D', 'SIMULATION': '物理模擬', 'EXPERIMENTAL': '實驗影像', 
      'PHYSICAL': '實體裝置', 'MIXED MEDIA': '複合媒材', 'GRAPHIC DESIGN': '平面設計', 
      'EDITORIAL DESIGN': '圖文設計', 'DRAWING': '素描', 'AUDIO VISUAL': '音像演出', 
      'INSTALLATION': '裝置作品', '3D ANIMATION': '3D動畫', 'MASK DESIGN': '面具設計',
      'POSTER DESIGN': '海報設計', 'RELATIONAL DESIGN': '關係設計', 'WEB DESIGN': '網頁設計',
      'AUDIO VISUAL PERFORMANCE': '即時音像演出'
    };
    return dict[m] || m;
  };

  if (isLoading) {
    return <div className="min-h-[80vh] flex items-center justify-center font-['Space_Grotesk'] text-2xl uppercase tracking-widest">Loading...</div>;
  }

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] border-b border-black/10 min-h-[80vh]">
      <div className="flex justify-between items-start mb-8 md:mb-12">
        <Link to="/" className="inline-flex items-center gap-1 hover:opacity-50 transition-opacity font-['Mozilla_Text'] text-xs uppercase tracking-[1px]">
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
          {lang === 'ENG' ? 'Work' : '工作專案'}
        </motion.h2>
      </div>

      <div className="mb-12 md:mb-20 border-t border-b border-black/10 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-black/10">
          <button
            onClick={() => setOpenFilter(openFilter === 'YEAR' ? null : 'YEAR')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-8 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Mozilla_Text'] text-sm tracking-[1px] uppercase">
              {lang === 'ENG' ? 'Filter by Year' : '依年份篩選'} {activeYear !== 'ALL' && <span className="ml-2 opacity-50">[{activeYear}]</span>}
            </span>
            <span className="font-['Mozilla_Text'] text-xl font-light">{openFilter === 'YEAR' ? '−' : '+'}</span>
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
                      className={`font-['Mozilla_Text'] text-[0.85rem] tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeYear === y ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'} ${lang === 'ENG' ? 'uppercase' : ''}`}
                    >
                      {lang === 'CHN' && y === 'ALL' ? '全部' : y}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full md:w-1/2 pl-0 md:pl-8">
          <button
            onClick={() => setOpenFilter(openFilter === 'MEDIUM' ? null : 'MEDIUM')}
            className="w-full py-5 flex justify-between items-center pr-4 md:pr-0 hover:opacity-70 transition-opacity"
          >
            <span className="font-['Mozilla_Text'] text-sm tracking-[1px] uppercase">
              {lang === 'ENG' ? 'Filter by Type' : '依種類篩選'} {activeMedium !== 'ALL' && <span className="ml-2 opacity-50">[{translateMedium(activeMedium)}]</span>}
            </span>
            <span className="font-['Mozilla_Text'] text-xl font-light">{openFilter === 'MEDIUM' ? '−' : '+'}</span>
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
                    const translatedMedium = translateMedium(m);
                    return (
                      <button
                        key={m}
                        onClick={() => handleMediumClick(m)}
                        className={`font-['Mozilla_Text'] text-[0.85rem] tracking-[0.5px] px-4 py-2 border rounded-full transition-colors ${activeMedium === m ? 'border-black bg-black text-[#F0F0F0]' : 'border-black/20 hover:border-black'} ${lang === 'ENG' ? 'uppercase' : ''}`}
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
          filteredProjects.map((project) => {
            const title = lang === 'ENG' ? project.title : (project.titleZh || project.title);
            
            let gridClass = "";
            if (project.thumbnailSize === 'tall') gridClass = "md:row-span-2 h-full";
            if (project.thumbnailSize === 'wide') gridClass = "md:col-span-2";

            return (
              <div key={project._id} className={`min-w-0 w-full ${gridClass}`}>
                <Link to={`/project/${project.slug?.current}`} state={{ from: 'work' }} className="group flex flex-col cursor-pointer min-w-0 w-full">
                  <motion.div variants={staggerItem} className="mb-[15px] min-w-0 w-full">
                    <h3 className="font-['Space_Grotesk'] text-[7vw] sm:text-[1.8rem] md:text-[2.2rem] mb-[5px] tracking-[-1px] -ml-[0.02em] font-normal leading-[1.15] group-hover:opacity-60 transition-opacity max-w-full break-all md:break-words whitespace-normal">
                      {title}
                    </h3>
                    <div className="text-[0.85rem] uppercase tracking-[1px] opacity-50">
                      {lang === 'ENG' ? project.medium?.en : (project.medium?.zh || project.medium?.en)}
                    </div>
                  </motion.div>
                  <motion.div variants={staggerItem} className="w-full relative bg-[#E0E0E0] overflow-hidden group">
                    
                    {project.coverType === 'image' && project.coverImage?.asset?.url && (
                      <img src={project.coverImage.asset.url} alt={title} className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-105" />
                    )}
                    {project.coverType === 'slideshow' && project.coverSlideshowImages && project.coverSlideshowImages.length > 0 && (
                      <CoverSlideshow images={project.coverSlideshowImages} speed={project.coverSlideshowSpeed} />
                    )}
                    {project.coverType === 'videoUrl' && project.coverVideoUrl && (
                      <div className="w-full aspect-video pointer-events-none transition-transform duration-700 group-hover:scale-105 bg-[#E0E0E0]">
                        <iframe src={project.coverVideoUrl} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" />
                      </div>
                    )}
                    {project.coverType === 'videoFile' && project.coverVideoFile?.asset?.url && (
                      <video src={project.coverVideoFile.asset.url} autoPlay loop muted playsInline className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-105 pointer-events-none" />
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <span className="font-['Mozilla_Text'] text-white text-[0.85rem] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                        {lang === 'ENG' ? 'Click to View' : '點擊查看'}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center font-['Mozilla_Text'] text-sm uppercase tracking-[2px] opacity-50">
            {lang === 'ENG' ? 'No projects match the selected filters.' : '沒有符合篩選條件的作品。'}
          </div>
        )}
      </motion.div>
    </section>
  );
}
