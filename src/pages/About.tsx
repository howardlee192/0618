import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { AsciiArtHover } from "../components/ui/ascii-art";
import { ScrambleText } from "../components/ui/ScrambleText";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { client } from "../lib/sanity";

export function About() {
  useEffect(() => { 
    document.title = "Howard Lee - About"; 
    window.scrollTo(0, 0);
  }, []);
  const { lang } = useLanguage();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [hintLang, setHintLang] = useState<'ENG' | 'CHN'>(lang);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setHintLang(prev => prev === 'ENG' ? 'CHN' : 'ENG');
      }, 3000);
      return () => clearInterval(interval);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const [aboutData, setAboutData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client.fetch(`*[_type == "about"][0]`).then(data => {
      setAboutData(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !aboutData) {
    return <div className="min-h-screen"></div>;
  }

  const text = {
    name: lang === 'ENG' ? aboutData.name?.en : aboutData.name?.zh,
    role: lang === 'ENG' ? aboutData.role?.en : aboutData.role?.zh,
    bio: lang === 'ENG' ? aboutData.bio?.en : aboutData.bio?.zh,
    title1: lang === 'ENG' ? aboutData.section1?.title?.en : aboutData.section1?.title?.zh,
    desc1: lang === 'ENG' ? aboutData.section1?.desc?.en : aboutData.section1?.desc?.zh,
    title2: lang === 'ENG' ? aboutData.section2?.title?.en : aboutData.section2?.title?.zh,
    skills: lang === 'ENG' ? (aboutData.section2?.skills?.en || []) : (aboutData.section2?.skills?.zh || []),
    title3: lang === 'ENG' ? aboutData.section3?.title?.en : aboutData.section3?.title?.zh,
    desc3: lang === 'ENG' ? aboutData.section3?.desc?.en : aboutData.section3?.desc?.zh,
  };

  const parsedResume = (aboutData.resumeSections || []).map((section: any) => ({
    title: lang === 'ENG' ? section.title?.en : section.title?.zh,
    items: (section.items || []).map((item: any) => {
      if (item._type === 'resumeCategory') {
        return { isCategory: true, title: lang === 'ENG' ? item.title?.en : item.title?.zh };
      }
      return {
        left: lang === 'ENG' ? item.year?.en : item.year?.zh,
        right: lang === 'ENG' ? item.description?.en : item.description?.zh
      };
    })
  }));

  const renderDescription = (desc: string) => {
    if (!desc) return null;
    return desc.split('\n').map((line, i, arr) => {
      if (line.includes('<small>')) {
        const content = line.replace(/<\/?small>/g, '');
        return <span key={i} className="text-sm opacity-60 mt-1 inline-block block">{content}</span>;
      }
      return <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>;
    });
  };

  const renderName = (nameStr: string) => {
    if (lang === 'CHN' && nameStr && nameStr.includes('Howard Lee')) {
      const parts = nameStr.split('Howard Lee');
      return <React.Fragment>{parts[0]}<span className="tracking-[-1.5px]">Howard Lee</span>{parts[1]}</React.Fragment>;
    }
    return nameStr;
  };

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] min-h-[80vh]">
      <div className="flex justify-between items-start mb-8 md:mb-12">
        <Link to="/" className="inline-flex items-center gap-1 hover:opacity-50 transition-opacity font-['Mozilla_Text'] text-xs uppercase tracking-[1px]">
          <ChevronLeft size={16} className="-ml-1" />
          Back
        </Link>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <LanguageToggle className="!mb-0" />
        </motion.div>
      </div>

      <div className="mb-[60px] md:mb-[100px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="font-['Space_Grotesk'] text-[3.5rem] tracking-[-1px] -ml-[0.05em] font-normal"
        >
          About
        </motion.h2>
      </div>

      <div className="flex flex-col md:flex-row gap-10 md:gap-24 relative">
        {/* Left Side: Large Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="w-full md:w-1/2 flex flex-col justify-start md:sticky md:top-[100px] h-fit"
        >
          {/* Profile Picture with Parallax */}
          <div ref={containerRef} className="w-[180px] md:w-[240px] max-w-full mb-[80px] md:mb-[120px]">
            <motion.div style={{ y }} className="w-full bg-[#E0E0E0] relative">
              <AsciiArtHover 
                src="/about_bioprofile.jpg" 
                className="w-full h-auto block"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute -bottom-8 left-0 font-['Mozilla_Text'] text-[0.75rem] md:text-[0.85rem] uppercase tracking-[1px] pointer-events-none opacity-80 whitespace-nowrap"
              >
                <ScrambleText text={hintLang === 'ENG' ? '↑ [ Hover to reveal ]' : '↑ [ 滑動游標預覽 ]'} />
              </motion.div>
            </motion.div>
          </div>

          <h3 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.5] tracking-[0.05em]" : "text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] tracking-[-1.5px]"} mb-2`}>
            {renderName(text.name)}
          </h3>
          <p className={`font-['Mozilla_Text'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[0.9rem] tracking-[0.1em]" : "text-sm tracking-[0.5px]"} opacity-50 uppercase mb-6`}>
            {text.role}
          </p>
          <p className={`font-['Mozilla_Text'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[1rem] leading-[2] tracking-[0.05em]" : "text-[0.9rem] leading-[1.6]"} opacity-70`}>
            {text.bio}
          </p>
        </motion.div>

        {/* Right Side: 1, 2, 3 List */}
        <div className="w-full md:w-1/2 flex flex-col mt-10 md:mt-0">
          {/* Item 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0, delay: 0.1 }}
            viewport={{ once: false, margin: "-100px" }}
            className="border-t border-black/10 py-8 md:py-12 flex flex-col"
          >
            <h4 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-xl md:text-2xl tracking-[0.05em]" : "text-xl md:text-2xl tracking-[-0.5px]"} mb-4`}>{text.title1}</h4>
            <p className={`font-['Mozilla_Text'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[1rem] leading-[2] tracking-[0.05em]" : "text-[0.9rem] leading-[1.6]"} opacity-70`}>
              {text.desc1}
            </p>
          </motion.div>

          {/* Item 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="border-t border-black/10 py-8 md:py-12 flex flex-col"
          >
            <h4 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-xl md:text-2xl tracking-[0.05em]" : "text-xl md:text-2xl tracking-[-0.5px]"} mb-6`}>{text.title2}</h4>
            <div className="flex flex-wrap gap-3">
              {text.skills.map((skill: string) => (
                <span key={skill} className={`font-['Mozilla_Text'] ${lang === 'CHN' ? "text-[1rem] tracking-[0.1em]" : "text-[0.9rem] tracking-[0.5px]"} uppercase px-5 py-2.5 border border-black/20 rounded-full hover:bg-black hover:text-[#F0F0F0] transition-colors cursor-default`}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Item 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0, delay: 0.3 }}
            viewport={{ once: false, margin: "-100px" }}
            className="border-t border-black/10 py-8 md:py-12 flex flex-col"
          >
            <h4 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-xl md:text-2xl tracking-[0.05em]" : "text-xl md:text-2xl tracking-[-0.5px]"} mb-4`}>{text.title3}</h4>
            <p className={`font-['Mozilla_Text'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[1rem] leading-[2] tracking-[0.05em]" : "text-[0.9rem] leading-[1.6]"} opacity-70`}>
              {text.desc3}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Accordion Resume Section */}
      <div className="mt-32 w-full">
        {parsedResume.map((section: any, idx: number) => (
          <div key={idx} className="border-t border-black/10 first:border-t-0">
            <button
              onClick={() => setOpenSection(openSection === section.title ? null : section.title)}
              className="w-full py-8 md:py-12 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
            >
              <h4 className="font-['Space_Grotesk'] text-2xl md:text-4xl tracking-[-1px] uppercase">
                {section.title}
              </h4>
              <span className="font-['Mozilla_Text'] text-2xl font-light">
                {openSection === section.title ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence>
              {openSection === section.title && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-12 flex flex-col md:flex-row gap-10 md:gap-24">
                    <div className="hidden md:block w-full md:w-1/2"></div>
                    <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
                      {section.items.map((item: any, itemIdx: number) => {
                        const isCategory = (item as any).isCategory;
                        const title = (item as any).title;
                        const left = (item as any).left;
                        const right = (item as any).right;
                        return isCategory ? (
                          <div key={itemIdx} className={`w-full ${itemIdx !== 0 ? 'pt-6' : ''} border-b border-black/10 pb-3`}>
                            <span className="font-['Mozilla_Text'] text-[1rem] tracking-[1px] uppercase opacity-40">
                              {title}
                            </span>
                          </div>
                        ) : (
                          <div key={itemIdx} className="flex flex-col md:flex-row justify-between md:items-start gap-3 md:gap-0">
                            <span className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "tracking-[0.05em] text-[1.4rem]" : "text-[1.5rem]"} w-full md:w-1/3`}>
                              {left}
                            </span>
                            <span className={`font-['Mozilla_Text'] ${lang === 'CHN' ? "tracking-[0.05em] text-[1.1rem] leading-[1.7] break-keep" : "tracking-[0.5px] text-[1.1rem] leading-[1.6]"} opacity-70 uppercase text-left w-full md:w-2/3`}>
                              {renderDescription(right)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
