import { useState } from "react";
import { useGameStore } from "../lib/stores/useGameStore";
import { hadithData } from "../data/gameContent";

interface HadithQuizProps {
  onBack: () => void;
}

const HadithQuiz = ({ onBack }: HadithQuizProps) => {
  const { addStars, playSuccessSound, playClickSound } = useGameStore();
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedHadiths, setCompletedHadiths] = useState<number[]>([]);

  const currentHadith = hadithData[currentHadithIndex];

  const handleStartQuiz = () => {
    playClickSound();
    setShowQuiz(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    playClickSound();
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentHadith.quiz.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSuccessSound();
      addStars(1);
      setCompletedHadiths([...completedHadiths, currentHadithIndex]);
    }

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      setShowQuiz(false);
    }, 3000);
  };

  const handleNext = () => {
    playClickSound();
    if (currentHadithIndex < hadithData.length - 1) {
      setCurrentHadithIndex(currentHadithIndex + 1);
    } else {
      setCurrentHadithIndex(0);
    }
    setShowQuiz(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handlePrevious = () => {
    playClickSound();
    if (currentHadithIndex > 0) {
      setCurrentHadithIndex(currentHadithIndex - 1);
    } else {
      setCurrentHadithIndex(hadithData.length - 1);
    }
    setShowQuiz(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCompleted = completedHadiths.includes(currentHadithIndex);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 arabic-text">
          📚 أحاديث نبوية
        </h1>
        <p className="text-xl text-white/90 arabic-text">
          تعلم من أحاديث الرسول ﷺ
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-4xl w-full shadow-2xl bounce-in">
        {!showQuiz ? (
          /* Hadith Display */
          <div className="text-center">
            <div className="text-6xl mb-6">📖</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 arabic-text">
              الحديث الشريف
            </h2>
            <div className="bg-green-50 p-6 rounded-2xl mb-6 border-r-4 border-green-500">
              <p className="text-lg md:text-xl text-gray-800 arabic-text leading-relaxed mb-4">
                {currentHadith.text}
              </p>
              <p className="text-md text-gray-600 arabic-text">
                — {currentHadith.narrator}
              </p>
            </div>

            {/* Kid-friendly explanation */}
            {currentHadith.explanation && (
              <div className="bg-blue-50 p-4 rounded-xl mb-8 border-r-4 border-blue-400">
                <h3 className="text-lg font-bold text-blue-800 mb-2 arabic-text">
                  🌟 شرح للأطفال
                </h3>
                <p className="text-md text-blue-700 arabic-text leading-relaxed">
                  {currentHadith.explanation}
                </p>
              </div>
            )}

            <button
              onClick={handleStartQuiz}
              disabled={isCompleted}
              className={`
                game-button px-8 py-4 rounded-2xl text-xl font-bold text-white mb-6
                ${isCompleted 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
                }
              `}
            >
              {isCompleted ? '✅ تم الإجابة' : '🧩 ابدأ الاختبار'}
            </button>
          </div>
        ) : (
          /* Quiz Display */
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 arabic-text">
              {currentHadith.quiz.question}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentHadith.quiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`
                    game-button p-4 rounded-xl text-lg font-medium
                    ${selectedAnswer === null
                      ? 'bg-blue-100 hover:bg-blue-200 text-gray-800'
                      : selectedAnswer === index
                        ? index === currentHadith.quiz.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : index === currentHadith.quiz.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                    }
                    border-2 border-transparent
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="text-center mb-6">
          <p className="text-gray-600 arabic-text mb-3">
            الحديث {currentHadithIndex + 1} من {hadithData.length}
          </p>
          <div className="flex justify-center mt-2 mb-4">
            {hadithData.map((_, index) => (
              <div
                key={index}
                className={`
                  w-4 h-4 rounded-full mx-1 transition-all duration-300
                  ${index === currentHadithIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300'}
                  ${completedHadiths.includes(index) ? 'bg-green-500 animate-pulse' : ''}
                `}
              />
            ))}
          </div>
          
          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-100 to-green-100 p-3 rounded-xl">
            <p className="text-sm text-gray-700 arabic-text">
              🌟 أحاديث مكتملة: {completedHadiths.length} / {hadithData.length}
            </p>
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

      {/* Result Animation */}
      {showResult && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-center bounce-in max-w-lg mx-4">
            <div className={`text-9xl mb-4 ${isCorrect ? 'star-collect' : ''}`}>
              {isCorrect ? '⭐' : '💭'}
            </div>
            <div className={`p-6 rounded-2xl shadow-2xl ${
              isCorrect ? 'bg-green-500' : 'bg-blue-500'
            }`}>
              <p className="text-2xl font-bold text-white arabic-text mb-2">
                {isCorrect ? 'بارك الله فيك!' : 'لا بأس، تعلمنا شيئاً جديداً!'}
              </p>
              <p className="text-lg text-white/90 arabic-text mb-3">
                {isCorrect ? 'إجابة صحيحة! نجمة جديدة!' : 'الإجابة الصحيحة هي:'}
              </p>
              {!isCorrect && (
                <div className="bg-white/20 p-3 rounded-xl">
                  <p className="text-white font-medium arabic-text">
                    {currentHadith.quiz.options[currentHadith.quiz.correctAnswer]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HadithQuiz;
