import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { AsciiArtHover } from "../components/ui/ascii-art";
import { ScrambleText } from "../components/ui/ScrambleText";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

export function About() {
  useEffect(() => { document.title = "Howard Lee - About"; }, []);
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

  const resumeData = {
    ENG: [
      {
        title: 'Education',
        items: [
          { left: '2025 - Present', right: <React.Fragment>BFA in Communications Design,<br/>Shih Chien University, Taiwan (Animation & Moving Image Design)</React.Fragment> },
          { left: '2024 - 2025', right: 'BFA in Media Design, Tatung University, Taiwan (Interaction Design)' },
          { left: '2023 - 2024', right: 'BFA in Digital Media Design, Ming Chuan University, Taiwan' },
          { left: '2020 - 2023', right: 'Diploma, HKICC Lee Shau Kee School of Creativity, Hong Kong (Film and Video Arts)' }
        ]
      },
      {
        title: 'Experience',
        items: [
          { isCategory: true, title: 'Concert Visual' },
          { left: '2026', right: <React.Fragment>Hsinchu "ON LOOP" 2026 New Year’s Eve Concert, Taiwan<br/><span className="text-sm opacity-60 mt-1 inline-block">Animation Design (TRASH & Hsu Wei-Hsiang) & Visual Execution</span></React.Fragment> },
          { left: '2025', right: <React.Fragment>2025 20th KKBOX Music Awards Concert, Taiwan<br/><span className="text-sm opacity-60 mt-1 inline-block">Animation Design (Together Lonely & Forever)</span></React.Fragment> },
          { left: '2024', right: <React.Fragment>Cyndi Wang "SUGAR HIGH 2.0" World Tour, Taipei, Taiwan<br/><span className="text-sm opacity-60 mt-1 inline-block">Animation Visual Design (Miss You Most & Wedding Dress of Flowers)</span></React.Fragment> },
          { left: '2024', right: <React.Fragment>Xu Song "Breath of the Wild" 2024 World Tour, China<br/><span className="text-sm opacity-60 mt-1 inline-block">Animation Visual Design (Nemesis)</span></React.Fragment> },
          { isCategory: true, title: 'Commercial' },
          { left: '2024', right: <React.Fragment>General Air-Conditioner Commercial 2024 "Fabulous 50, Number One Achievement", Hong Kong<br/><span className="text-sm opacity-60 mt-1 inline-block">Motion Graphic Designer & Illustration</span></React.Fragment> },
          { isCategory: true, title: 'Immersive Video' },
          { left: '2023', right: <React.Fragment>BOC (Hong Kong) Private Banking Presents "No.1 Cultural Grotto" Immersive Art Installation, Hong Kong<br/><span className="text-sm opacity-60 mt-1 inline-block">2D Motion Designer / Editor / Compositor: "Heavenly Sound" Chapter</span></React.Fragment> },
          { isCategory: true, title: 'Performance' },
          { left: '2026', right: <React.Fragment>Audio Visual Performance, "Unsorted",<br/>Shih Chien University, Taiwan</React.Fragment> }
        ]
      },
      {
        title: 'Exhibitions',
        items: [
          { left: '2025', right: 'Taoyuan International Design Award, Taoyuan Arts Center, Taiwan' },
          { left: '2023', right: 'HKSC Graduation Show 2023: undefined, Hong Kong' }
        ]
      },
      {
        title: 'Awards',
        items: [
          { left: '2026', right: <React.Fragment>Tung Ming Award, 24th Digital Content Competition, Shih Chien University<br/>Jury Award by Artist Yu Cheng-Ta</React.Fragment> },
          { left: '2026', right: <React.Fragment>Young Ones ADC: Design for Good,<br/>Bronze Cube, NYC</React.Fragment> },
          { left: '2025', right: 'Taiwan International Student Design Competition (TISDC), Bronze Prize, Taiwan' },
          { left: '2025', right: 'Taoyuan Design Award (Visual and Commercial Design), Excellence Award, Taiwan' },
          { left: '2025', right: 'Taiwan Golden Star Design Award (Poster Design), Gold Award, Taiwan' },
          { left: '2021, 2023', right: 'Bright Future Creativity Scholarship (Animation & Sculpture), Hong Kong' }
        ]
      }
    ],
    CHN: [
      {
        title: '學歷',
        items: [
          { left: '2025 - 迄今', right: '實踐大學 媒體傳達設計學系, 台灣 (動畫影像設計組)' },
          { left: '2024 - 2025', right: '大同大學 媒體設計學系, 台灣 (互動設計組)' },
          { left: '2023 - 2024', right: '銘傳大學 數位媒體設計學系, 台灣' },
          { left: '2020 - 2023', right: '香港兆基創意書院, 香港 (電影與錄像藝術)' }
        ]
      },
      {
        title: '工作經歷',
        items: [
          { isCategory: true, title: '演唱會視覺設計' },
          { left: '2026', right: <React.Fragment>「新竹ON LOOP 不斷電」2026大新竹跨年晚會, 台灣<br/><span className="text-sm opacity-60 mt-1 inline-block">動畫設計（TRASH & 徐暐翔）& 視訊執行</span></React.Fragment> },
          { left: '2025', right: <React.Fragment>2025第20屆KKBOX風雲榜演唱會, 高雄, 台灣<br/><span className="text-sm opacity-60 mt-1 inline-block">動畫設計（一起寂寞 & 永遠永遠）</span></React.Fragment> },
          { left: '2024', right: <React.Fragment>王心凌「SUGAR HIGH 2.0世界巡迴演唱會」, 台北, 台灣<br/><span className="text-sm opacity-60 mt-1 inline-block">動畫視覺設計（最想你的 & 花的嫁紗）</span></React.Fragment> },
          { left: '2024', right: <React.Fragment>許嵩「呼吸之野」2024巡迴演唱會, 中國<br/><span className="text-sm opacity-60 mt-1 inline-block">動畫視覺設計（宿敵）</span></React.Fragment> },
          { isCategory: true, title: '商業廣告' },
          { left: '2024', right: <React.Fragment>珍寶冷氣廣告2024 精彩50 成就第一, 香港<br/><span className="text-sm opacity-60 mt-1 inline-block">Motion Graphic Designer & Illustration</span></React.Fragment> },
          { isCategory: true, title: '沉浸式影像製作' },
          { left: '2023', right: <React.Fragment>中國銀行(香港)私人銀行呈獻《第一號文化洞窟—萬籟有聲：天籟 • 地籟 • 人籟》沉浸式展演藝術裝置, 香港<br/><span className="text-sm opacity-60 mt-1 inline-block">2D 動態設計 / 剪輯 / 合成：「天籟」章節</span></React.Fragment> },
          { isCategory: true, title: '個人演出' },
          { left: '2026', right: '即時音像演出「Unsorted」, 實踐大學, 台灣' }
        ]
      },
      {
        title: '參展經歷',
        items: [
          { left: '2025', right: '桃園國際設計獎, 桃園展演中心, 台灣' },
          { left: '2023', right: '香港兆基創意書院 畢業展 2023：未定義, 香港' }
        ]
      },
      {
        title: '獎項',
        items: [
          { left: '2026', right: <React.Fragment>實踐大學第24屆東閔盃數位內容競賽<br/>評審獎 藝術家余政達</React.Fragment> },
          { left: '2026', right: <React.Fragment>Young Ones ADC: Design for Good,<br/>銅立方獎, 紐約</React.Fragment> },
          { left: '2025', right: '臺灣國際學生創意設計大賽 (TISDC), 銅獎, 台灣' },
          { left: '2025', right: '桃園設計獎 (視覺與商業設計類), 特優獎, 台灣' },
          { left: '2025', right: '台灣金星設計獎 (海報設計類), 金獎, 台灣' },
          { left: '2021, 2023', right: '鵬程創意獎學金 (動畫與雕塑), 香港' }
        ]
      }
    ]
  };

  const content = {
    ENG: {
      name: "Howard Lee",
      bio: "An artist and motion designer from Hong Kong, currently based in Taiwan. Lee's work revolves around the interpersonal relationships and emotional issues of contemporary youth. He has participated in numerous stage and performance visual designs. Excelling at breaking through medium constraints, he uses motion storytelling and design strategies to lead audiences through the ups and downs of life across visual and physical spaces.",
      role: "Motion & Visual Designer / Artist",
      title1: "01. Spatial Motion Visuals",
      desc1: "I excel at employing design strategies to accurately analyze project directions while considering the overall spatial presentation. Whether for stages or exhibitions, I use visuals and digital animation to create immersive experiences, ensuring the design resonates deeply with the audience.",
      title2: "02. Core Capabilities",
      skills: ['Motion Design', 'Projection Mapping', 'Concert Visuals', '3D Animation', 'Interaction Design', 'Visual Identity'],
      title3: "03. Core Direction",
      desc3: "My creations focus on contemporary interpersonal relationships, conveying my observations on social connections across various mediums. The goal is to touch and inspire audiences through concise and impactful motion visuals."
    },
    CHN: {
      name: <React.Fragment>李浩勤 <span className="tracking-[-1.5px]">Howard Lee</span></React.Fragment>,
      bio: "來自香港、現居台灣的藝術家與動態影像設計師。李氏的創作圍繞著當代青年的人際關係與情感議題，曾參與多場舞台與展演影像設計。他擅長打破載體限制，運用動態敘事與設計策略，帶領觀眾在影像與場域中體驗人生起伏。",
      role: "動態與視覺設計師 / 藝術家",
      title1: "01. 場域型動態視覺",
      desc1: "我擅長運用設計策略，精準分析專案方向，並將整體的空間呈現納入考量。在舞台或展演，我都透過影像與數位動畫，為觀眾打造具沉浸感的體驗，讓設計與受眾產生深刻共鳴。",
      title2: "02. 核心技能領域",
      skills: ['動態設計', '光雕投影', '演唱會影像', '3D 動畫', '互動設計', '視覺識別'],
      title3: "03. 核心方向",
      desc3: "我的創作關注當代人與人之間的關係，在不同載體中傳達我對社會關係的觀察。目標是透過簡練、具張力的動態視覺，觸動觀眾並帶來啟發。"
    }
  };

  const text = content[lang];

  return (
    <section className="pt-[40px] md:pt-[60px] pb-[100px] min-h-[80vh]">
      <div className="flex justify-between items-start mb-8 md:mb-12">
        <Link to="/" className="inline-flex items-center gap-1 hover:opacity-50 transition-opacity font-['Geist_Mono'] text-xs uppercase tracking-[1px]">
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
                className="absolute -bottom-8 left-0 font-['Geist_Mono'] text-[0.75rem] md:text-[0.85rem] uppercase tracking-[1px] pointer-events-none opacity-80 whitespace-nowrap"
              >
                <ScrambleText text={hintLang === 'ENG' ? '↑ [ Hover to reveal ]' : '↑ [ 滑動游標預覽 ]'} />
              </motion.div>
            </motion.div>
          </div>

          <h3 className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.5] tracking-[0.05em]" : "text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] tracking-[-1.5px]"} mb-2`}>
            {text.name}
          </h3>
          <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[0.9rem] tracking-[0.1em]" : "text-sm tracking-[0.5px]"} opacity-50 uppercase mb-6`}>
            {text.role}
          </p>
          <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[1rem] leading-[2] tracking-[0.05em]" : "text-[0.9rem] leading-[1.6]"} opacity-70`}>
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
            <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[1rem] leading-[2] tracking-[0.05em]" : "text-[0.9rem] leading-[1.6]"} opacity-70`}>
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
              {text.skills.map(skill => (
                <span key={skill} className={`font-['Geist_Mono'] ${lang === 'CHN' ? "text-[1rem] tracking-[0.1em]" : "text-[0.9rem] tracking-[0.5px]"} uppercase px-5 py-2.5 border border-black/20 rounded-full hover:bg-black hover:text-[#F0F0F0] transition-colors cursor-default`}>
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
            <p className={`font-['Geist_Mono'] ${lang === 'CHN' ? "font-['Space_Grotesk',_'Swei_Bow_Sans'] text-[1rem] leading-[2] tracking-[0.05em]" : "text-[0.9rem] leading-[1.6]"} opacity-70`}>
              {text.desc3}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Accordion Resume Section */}
      <div className="mt-32 w-full">
        {resumeData[lang].map((section, idx) => (
          <div key={idx} className="border-t border-black/10 first:border-t-0">
            <button
              onClick={() => setOpenSection(openSection === section.title ? null : section.title)}
              className="w-full py-8 md:py-12 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
            >
              <h4 className="font-['Space_Grotesk'] text-2xl md:text-4xl tracking-[-1px] uppercase">
                {section.title}
              </h4>
              <span className="font-['Geist_Mono'] text-2xl font-light">
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
                      {section.items.map((item, itemIdx) => {
                        const isCategory = (item as any).isCategory;
                        const title = (item as any).title;
                        const left = (item as any).left;
                        const right = (item as any).right;
                        return isCategory ? (
                          <div key={itemIdx} className={`w-full ${itemIdx !== 0 ? 'pt-6' : ''} border-b border-black/10 pb-3`}>
                            <span className="font-['Geist_Mono'] text-[1rem] tracking-[1px] uppercase opacity-40">
                              {title}
                            </span>
                          </div>
                        ) : (
                          <div key={itemIdx} className="flex flex-col md:flex-row justify-between md:items-start gap-3 md:gap-0">
                            <span className={`font-['Space_Grotesk'] ${lang === 'CHN' ? "tracking-[0.05em] text-[1.4rem]" : "text-[1.5rem]"} w-full md:w-1/3`}>
                              {left}
                            </span>
                            <span className={`font-['Geist_Mono'] ${lang === 'CHN' ? "tracking-[0.05em] text-[1.1rem] leading-[1.7] break-keep" : "tracking-[0.5px] text-[1.1rem] leading-[1.6]"} opacity-70 uppercase text-left w-full md:w-2/3`}>
                              {right}
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
