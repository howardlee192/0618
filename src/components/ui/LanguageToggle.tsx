import { useLanguage } from "../../contexts/LanguageContext";

export const LanguageToggle = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useLanguage();
  return (
    <div className={`flex gap-4 text-xs md:text-sm font-['Geist_Mono'] uppercase tracking-[1px] items-center mb-2 md:mb-0 ${className}`}>
      <button
        onClick={() => setLang('CHN')}
        className={`transition-opacity hover:opacity-100 ${lang === 'CHN' ? 'opacity-100 font-bold' : 'opacity-40'}`}
      >
        <span className="font-['Space_Grotesk',_'Swei_Bow_Sans']">中</span>
      </button>
      <span className="opacity-20">/</span>
      <button
        onClick={() => setLang('ENG')}
        className={`transition-opacity hover:opacity-100 ${lang === 'ENG' ? 'opacity-100 font-bold' : 'opacity-40'}`}
      >
        ENG
      </button>
    </div>
  );
};
