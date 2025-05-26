import { useState } from "react";
import { useGameStore } from "../lib/stores/useGameStore";
import { goodDeedsData } from "../data/gameContent";

interface GoodDeedsProps {
  onBack: () => void;
}

const GoodDeeds = ({ onBack }: GoodDeedsProps) => {
  const { stars, addStars, playSuccessSound, playClickSound, incrementCompletedLessons } = useGameStore();
  const [currentDeedIndex, setCurrentDeedIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [completedDeeds, setCompletedDeeds] = useState<number[]>([]);

  const currentDeed = goodDeedsData[currentDeedIndex];

  const handleDeedComplete = () => {
    if (completedDeeds.includes(currentDeedIndex)) {
      return; // Already completed
    }

    playSuccessSound();
    addStars(1);
    setCompletedDeeds([...completedDeeds, currentDeedIndex]);
    setShowReward(true);

    setTimeout(() => {
      setShowReward(false);
    }, 2000);
  };

  const handleNext = () => {
    playClickSound();
    if (currentDeedIndex < goodDeedsData.length - 1) {
      setCurrentDeedIndex(currentDeedIndex + 1);
    } else {
      setCurrentDeedIndex(0); // Loop back to first
    }
  };

  const handlePrevious = () => {
    playClickSound();
    if (currentDeedIndex > 0) {
      setCurrentDeedIndex(currentDeedIndex - 1);
    } else {
      setCurrentDeedIndex(goodDeedsData.length - 1); // Loop to last
    }
  };

  const isCompleted = completedDeeds.includes(currentDeedIndex);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 arabic-text">
          ⭐ عمل خيري
        </h1>
        <p className="text-xl text-white/90 arabic-text">
          قم بالأعمال الخيرة واكسب النجوم
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-2xl bounce-in">
        {/* Deed Content */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-6">{currentDeed.icon}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 arabic-text">
            {currentDeed.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 arabic-text leading-relaxed">
            {currentDeed.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleDeedComplete}
            disabled={isCompleted}
            className={`
              game-button px-8 py-4 rounded-2xl text-xl font-bold text-white
              ${isCompleted 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
              }
              ${showReward ? 'star-collect' : ''}
            `}
          >
            {isCompleted ? '✅ تم إنجازه' : '⭐ أنجز العمل الخيري'}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center mb-6">
          <p className="text-gray-600 arabic-text">
            العمل الخيري {currentDeedIndex + 1} من {goodDeedsData.length}
          </p>
          <div className="flex justify-center mt-2">
            {goodDeedsData.map((_, index) => (
              <div
                key={index}
                className={`
                  w-3 h-3 rounded-full mx-1
                  ${index === currentDeedIndex ? 'bg-blue-500' : 'bg-gray-300'}
                  ${completedDeeds.includes(index) ? 'bg-green-500' : ''}
                `}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="game-button bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            ⏮️ السابق
          </button>
          
          <button
            onClick={onBack}
            className="game-button bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
          >
            🏠 القائمة الرئيسية
          </button>

          <button
            onClick={handleNext}
            className="game-button bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            التالي ⏭️
          </button>
        </div>
      </div>

      {/* Reward Animation */}
      {showReward && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-center bounce-in">
            <div className="text-9xl mb-4 star-collect">⭐</div>
            <p className="text-3xl font-bold text-yellow-300 arabic-text drop-shadow-lg">
              أحسنت! نجمة جديدة!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoodDeeds;
