import { useGameStore } from "../lib/stores/useGameStore";

const ProgressBoard = () => {
  const { stars, completedLessons, getProgressPercentage, soundEnabled, toggleSound } = useGameStore();

  const progressPercentage = getProgressPercentage();

  return (
    <div className="fixed top-4 left-4 z-50 flex gap-4">
      {/* Progress Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border-2 border-green-200">
        <div className="flex flex-col gap-2">
          {/* Stars */}
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-pulse">⭐</span>
            <span className="text-lg font-bold text-gray-800 arabic-text">
              {stars}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 arabic-text mt-1">
              دروس مكتملة: {completedLessons}
            </p>
          </div>
        </div>
      </div>

      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        className={`
          rounded-full p-3 shadow-lg transition-all duration-200
          ${soundEnabled 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-gray-400 hover:bg-gray-500 text-white'
          }
        `}
        title={soundEnabled ? 'إيقاف الصوت' : 'تشغيل الصوت'}
      >
        <span className="text-xl">
          {soundEnabled ? '🔊' : '🔇'}
        </span>
      </button>
    </div>
  );
};

export default ProgressBoard;