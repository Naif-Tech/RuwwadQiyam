import { useState } from "react";
import { useGameStore } from "../lib/stores/useGameStore";
import { mosqueData } from "../data/gameContent";

interface MosqueCornerProps {
  onBack: () => void;
}

type Section = 'menu' | 'wudu' | 'adhan' | 'etiquette';

const MosqueCorner = ({ onBack }: MosqueCornerProps) => {
  const { addStars, playSuccessSound, playClickSound, incrementCompletedLessons } = useGameStore();
  const [currentSection, setCurrentSection] = useState<Section>('menu');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showReward, setShowReward] = useState(false);

  const sections = [
    {
      id: 'wudu' as Section,
      title: 'خطوات الوضوء',
      icon: '🚿',
      color: 'bg-blue-500',
      data: mosqueData.wudu
    },
    {
      id: 'adhan' as Section,
      title: 'الأذان',
      icon: '🔊',
      color: 'bg-green-500',
      data: mosqueData.adhan
    },
    {
      id: 'etiquette' as Section,
      title: 'آداب المسجد',
      icon: '🕌',
      color: 'bg-purple-500',
      data: mosqueData.etiquette
    }
  ];

  const getCurrentData = () => {
    const section = sections.find(s => s.id === currentSection);
    return section?.data || [];
  };

  const handleStepComplete = () => {
    if (completedSteps.includes(currentStepIndex)) {
      return;
    }

    playSuccessSound();
    addStars(1);
    incrementCompletedLessons();
    setCompletedSteps([...completedSteps, currentStepIndex]);
    setShowReward(true);

    setTimeout(() => {
      setShowReward(false);
    }, 2000);
  };

  const handleNext = () => {
    playClickSound();
    const data = getCurrentData();
    if (currentStepIndex < data.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setCurrentStepIndex(0);
    }
  };

  const handlePrevious = () => {
    playClickSound();
    const data = getCurrentData();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      setCurrentStepIndex(data.length - 1);
    }
  };

  const handleSectionSelect = (sectionId: Section) => {
    playClickSound();
    setCurrentSection(sectionId);
    setCurrentStepIndex(0);
    setCompletedSteps([]);
  };

  const handleBackToMenu = () => {
    playClickSound();
    setCurrentSection('menu');
    setCurrentStepIndex(0);
    setCompletedSteps([]);
  };

  const renderMenu = () => (
    <div className="text-center">
      <div className="text-8xl mb-6">🕋</div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 arabic-text">
        اختر ما تريد تعلمه
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionSelect(section.id)}
            className={`
              game-button ${section.color} hover:opacity-90
              text-white p-6 rounded-2xl shadow-xl
              flex flex-col items-center justify-center
              min-h-[150px]
            `}
          >
            <div className="text-4xl mb-4">{section.icon}</div>
            <h3 className="text-xl font-bold arabic-text">
              {section.title}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    const data = getCurrentData();
    const currentItem = data[currentStepIndex];
    const isCompleted = completedSteps.includes(currentStepIndex);
    
    if (!currentItem) return null;

    return (
      <div className="text-center">
        <div className="text-8xl mb-6">{currentItem.icon}</div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 arabic-text">
          {currentItem.title}
        </h2>
        
        <div className="bg-amber-50 p-6 rounded-2xl mb-8 border-r-4 border-amber-500">
          <p className="text-lg md:text-xl text-gray-800 arabic-text leading-relaxed mb-4">
            {currentItem.description}
          </p>
          {currentItem.dua && (
            <div className="bg-white p-4 rounded-xl border-2 border-amber-200">
              <p className="text-lg text-gray-700 arabic-text font-medium">
                {currentItem.dua}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleStepComplete}
          disabled={isCompleted}
          className={`
            game-button px-8 py-4 rounded-2xl text-xl font-bold text-white mb-6
            ${isCompleted 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-amber-500 hover:bg-amber-600'
            }
            ${showReward ? 'star-collect' : ''}
          `}
        >
          {isCompleted ? '✅ تم الإنجاز' : '⭐ أنجز الخطوة'}
        </button>

        {/* Progress Indicator */}
        <div className="text-center mb-6">
          <p className="text-gray-600 arabic-text">
            الخطوة {currentStepIndex + 1} من {data.length}
          </p>
          <div className="flex justify-center mt-2">
            {data.map((_, index) => (
              <div
                key={index}
                className={`
                  w-3 h-3 rounded-full mx-1
                  ${index === currentStepIndex ? 'bg-amber-500' : 'bg-gray-300'}
                  ${completedSteps.includes(index) ? 'bg-green-500' : ''}
                `}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="game-button bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl"
          >
            ⏮️ السابق
          </button>
          
          <button
            onClick={handleBackToMenu}
            className="game-button bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
          >
            📋 القائمة
          </button>

          <button
            onClick={handleNext}
            className="game-button bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl"
          >
            التالي ⏭️
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 arabic-text">
          🕋 ركن المسجد
        </h1>
        <p className="text-xl text-white/90 arabic-text">
          تعلم آداب المسجد والوضوء والأذان
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-4xl w-full shadow-2xl bounce-in">
        {currentSection === 'menu' ? renderMenu() : renderContent()}
        
        {/* Back to Main Menu */}
        {currentSection === 'menu' && (
          <div className="text-center">
            <button
              onClick={onBack}
              className="game-button bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl text-lg"
            >
              🏠 القائمة الرئيسية
            </button>
          </div>
        )}
      </div>

      {/* Reward Animation */}
      {showReward && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-center bounce-in">
            <div className="text-9xl mb-4 star-collect">⭐</div>
            <p className="text-3xl font-bold text-yellow-300 arabic-text drop-shadow-lg">
              بارك الله فيك! نجمة جديدة!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MosqueCorner;
