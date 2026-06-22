import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { ScrambleText } from "../components/ui/ScrambleText";

export function ComingSoon() {
  const [displayLang, setDisplayLang] = useState<'ENG' | 'CHN'>('ENG');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayLang(prev => prev === 'ENG' ? 'CHN' : 'ENG');
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 relative pt-[40px] md:pt-[60px]">
      <div className="absolute top-[40px] md:top-[60px] left-0">
        <Link to="/" className="inline-flex items-center gap-1 hover:opacity-50 transition-opacity font-['Geist_Mono'] text-xs uppercase tracking-[1px]">
          <ChevronLeft size={16} className="-ml-1" />
          Back
        </Link>
      </div>
      <h1 className="font-['Space_Grotesk'] text-[clamp(2.5rem,6vw,4rem)] tracking-[-2px] uppercase">
        Coming Soon
      </h1>
      <p className="font-['Geist_Mono'] text-sm md:text-base tracking-[1px] opacity-50 uppercase min-h-[1.5rem] flex items-center justify-center">
        <ScrambleText text={displayLang === 'ENG' ? 'Under Construction' : '頁 面 準 備 中'} />
      </p>
    </div>
  );
}
