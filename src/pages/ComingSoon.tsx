import { useState, useEffect } from "react";
import { ScrambleText } from "../components/ui/ScrambleText";

export function ComingSoon() {
  const [displayLang, setDisplayLang] = useState<'ENG' | 'CHN'>('ENG');

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayLang(prev => prev === 'ENG' ? 'CHN' : 'ENG');
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-5 md:px-10 gap-4">
      <h1 className="font-['Space_Grotesk'] text-[clamp(2.5rem,6vw,4rem)] tracking-[-2px] uppercase">
        Coming Soon
      </h1>
      <p className="font-['Geist_Mono'] text-sm md:text-base tracking-[1px] opacity-50 uppercase min-h-[1.5rem] flex items-center justify-center">
        <ScrambleText text={displayLang === 'ENG' ? 'Under Construction' : '頁 面 準 備 中'} />
      </p>
    </div>
  );
}
