import { useTranslations } from "../lib/translations";
import { useGameStore } from "../lib/stores/useGameStore";

const TopBar = () => {
  const { 
    stars, 
    completedLessons, 
    getProgressPercentage, 
    soundEnabled, 
    toggleSound 
  } = useGameStore();
  
  const { translations, toggleLanguage, isRTL, language } = useTranslations();

  const progressPercentage = getProgressPercentage();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        
        {/* Right Side - Stars Counter (أقصى اليمين) */}
        <div className={`flex items-center gap-3 ${isRTL ? 'order-1' : 'order-3'}`}>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-pulse">⭐</span>
              <div className="text-white">
                <span className="text-lg font-bold">{stars}</span>
                <div className="text-xs opacity-90">
                  {isRTL ? 'دروس مكتملة' : 'Completed'}: {completedLessons}
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="hidden sm:flex flex-col items-center min-w-[60px]">
            <div className="w-12 h-12 relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${progressPercentage}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Language Toggle (وسط الشريط العلوي) */}
        <div className="order-2 flex items-center">
          <button
            onClick={toggleLanguage}
            className="
              bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
              text-white rounded-2xl px-6 py-3 shadow-lg
              transition-all duration-200 hover:scale-105 hover:shadow-xl
              flex items-center gap-3 font-medium
            "
            title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          >
            <span className="text-2xl">
              {language === 'ar' ? '🇺🇸' : '🇸🇦'}
            </span>
            <span className="hidden sm:inline">
              {language === 'ar' ? 'English' : 'عربي'}
            </span>
            <div className="flex flex-col text-xs leading-none">
              <span className="opacity-75">
                {language === 'ar' ? 'EN' : 'عر'}
              </span>
            </div>
          </button>
        </div>

        {/* Left Side - Sound Toggle (أقصى اليسار) */}
        <div className={`flex items-center ${isRTL ? 'order-3' : 'order-1'}`}>
          <button
            onClick={toggleSound}
            className={`
              rounded-2xl px-4 py-3 shadow-lg transition-all duration-200 
              hover:scale-105 hover:shadow-xl flex items-center gap-2
              ${soundEnabled 
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white' 
                : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white'
              }
            `}
            title={soundEnabled ? translations.soundOff : translations.soundOn}
          >
            <span className="text-xl">
              {soundEnabled ? '🔊' : '🔇'}
            </span>
            <span className="hidden sm:inline text-sm font-medium">
              {soundEnabled ? 
                (isRTL ? 'تشغيل' : 'ON') : 
                (isRTL ? 'إيقاف' : 'OFF')
              }
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Progress Bar (visible only on small screens) */}
      <div className="sm:hidden px-4 pb-2">
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 text-center mt-1">
          {isRTL ? 'التقدم' : 'Progress'}: {Math.round(progressPercentage)}%
        </p>
      </div>
    </div>
  );
};

export default TopBar;