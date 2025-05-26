import { useState } from "react";
import { useGameStore } from "../lib/stores/useGameStore";
import { valuesAdventureData } from "../data/gameContent";

interface ValuesAdventureProps {
  onBack: () => void;
}

const ValuesAdventure = ({ onBack }: ValuesAdventureProps) => {
  const { addStars, playSuccessSound, playClickSound, incrementCompletedLessons } = useGameStore();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completedStories, setCompletedStories] = useState<number[]>([]);

  const currentStory = valuesAdventureData[currentStoryIndex];

  const handleChoiceSelect = (choiceIndex: number) => {
    if (selectedChoice !== null) return;

    playClickSound();
    setSelectedChoice(choiceIndex);
    setShowResult(true);

    const choice = currentStory.choices[choiceIndex];
    if (choice.isCorrect) {
      playSuccessSound();
      addStars(choice.stars);
      incrementCompletedLessons();
      setCompletedStories([...completedStories, currentStoryIndex]);
    }

    setTimeout(() => {
      setShowResult(false);
      setSelectedChoice(null);
    }, 4000);
  };

  const handleNext = () => {
    playClickSound();
    if (currentStoryIndex < valuesAdventureData.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      setCurrentStoryIndex(0);
    }
    setSelectedChoice(null);
    setShowResult(false);
  };

  const handlePrevious = () => {
    playClickSound();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      setCurrentStoryIndex(valuesAdventureData.length - 1);
    }
    setSelectedChoice(null);
    setShowResult(false);
  };

  const isCompleted = completedStories.includes(currentStoryIndex);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 arabic-text">
          🧩 مغامرات القيم
        </h1>
        <p className="text-xl text-white/90 arabic-text">
          اختر القرار الصحيح حسب تعاليم الإسلام
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-4xl w-full shadow-2xl bounce-in">
        {/* Story Scene */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-6">{currentStory.icon}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 arabic-text">
            {currentStory.title}
          </h2>
          <div className="bg-blue-50 p-6 rounded-2xl mb-8 border-r-4 border-blue-500">
            <p className="text-lg md:text-xl text-gray-800 arabic-text leading-relaxed">
              {currentStory.scenario}
            </p>
          </div>
        </div>

        {/* Choices */}
        {!showResult && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 arabic-text text-center">
              ماذا ستفعل؟
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentStory.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceSelect(index)}
                  disabled={isCompleted}
                  className={`
                    game-button p-6 rounded-xl text-lg font-medium text-right
                    ${isCompleted
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-purple-100 hover:bg-purple-200 text-gray-800'
                    }
                    border-2 border-purple-300 hover:border-purple-400
                  `}
                >
                  <div className="text-3xl mb-2">{choice.icon}</div>
                  <p className="arabic-text">{choice.text}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="text-center mb-6">
          <p className="text-gray-600 arabic-text">
            المغامرة {currentStoryIndex + 1} من {valuesAdventureData.length}
          </p>
          <div className="flex justify-center mt-2">
            {valuesAdventureData.map((_, index) => (
              <div
                key={index}
                className={`
                  w-3 h-3 rounded-full mx-1
                  ${index === currentStoryIndex ? 'bg-purple-500' : 'bg-gray-300'}
                  ${completedStories.includes(index) ? 'bg-green-500' : ''}
                `}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="game-button bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl"
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
            className="game-button bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl"
          >
            التالي ⏭️
          </button>
        </div>
      </div>

      {/* Result Animation */}
      {showResult && selectedChoice !== null && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-center bounce-in max-w-2xl mx-4">
            <div className={`text-9xl mb-4 ${currentStory.choices[selectedChoice].isCorrect ? 'star-collect' : ''}`}>
              {currentStory.choices[selectedChoice].isCorrect ? '⭐' : '💭'}
            </div>
            <div className={`p-6 rounded-2xl ${
              currentStory.choices[selectedChoice].isCorrect 
                ? 'bg-green-500' 
                : 'bg-blue-500'
            }`}>
              <p className="text-2xl font-bold text-white arabic-text mb-4">
                {currentStory.choices[selectedChoice].feedback}
              </p>
              <p className="text-lg text-white/90 arabic-text">
                {currentStory.choices[selectedChoice].islamicTeaching}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValuesAdventure;
