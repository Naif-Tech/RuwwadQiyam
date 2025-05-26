import { useTranslations } from "../lib/translations";

const LanguageToggle = () => {
  const { language, toggleLanguage, isRTL } = useTranslations();

  return (
    <div className={`fixed top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
      <button
        onClick={toggleLanguage}
        className="
          bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg 
          border-2 border-blue-200 hover:border-blue-400
          transition-all duration-200 hover:scale-105
          flex items-center gap-2
        "
        title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
      >
        <span className="text-2xl">
          {language === 'ar' ? '🇺🇸' : '🇸🇦'}
        </span>
        <span className="font-bold text-gray-800">
          {language === 'ar' ? 'EN' : 'عر'}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;