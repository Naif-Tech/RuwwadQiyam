import { useState, useEffect } from "react";
import { useGameStore } from "./lib/stores/useGameStore";
import { useTranslations } from "./lib/translations";
import GameMenu from "./components/GameMenu";
import GoodDeeds from "./components/GoodDeeds";
import HadithQuiz from "./components/HadithQuiz";
import ValuesAdventure from "./components/ValuesAdventure";
import MosqueCorner from "./components/MosqueCorner";
import StarCounter from "./components/StarCounter";
import SoundManager from "./components/SoundManager";
import ProgressBoard from "./components/ProgressBoard";
import LanguageToggle from "./components/LanguageToggle";
import TopBar from "./components/TopBar";

export type GameSection = 'menu' | 'goodDeeds' | 'hadith' | 'values' | 'mosque';

function App() {
  const [currentSection, setCurrentSection] = useState<GameSection>('menu');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'evening'>('morning');
  const { isRTL, fontFamily } = useTranslations();

  // Change background based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 18 || hour < 6 ? 'evening' : 'morning');
  }, []);

  // Apply font family and direction based on language
  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [fontFamily, isRTL]);

  const backgroundGradient = timeOfDay === 'morning' 
    ? 'linear-gradient(135deg, #87CEEB 0%, #2E8B57 100%)'
    : 'linear-gradient(135deg, #2E8B57 0%, #1e5f3f 100%)';

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'goodDeeds':
        return <GoodDeeds onBack={() => setCurrentSection('menu')} />;
      case 'hadith':
        return <HadithQuiz onBack={() => setCurrentSection('menu')} />;
      case 'values':
        return <ValuesAdventure onBack={() => setCurrentSection('menu')} />;
      case 'mosque':
        return <MosqueCorner onBack={() => setCurrentSection('menu')} />;
      default:
        return <GameMenu onSectionSelect={setCurrentSection} />;
    }
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: backgroundGradient }}
    >
      {/* Stars and decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-300 opacity-60 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Top Bar with all controls */}
      <TopBar />

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {renderCurrentSection()}
      </div>

      {/* Sound Manager */}
      <SoundManager />
    </div>
  );
}

export default App;
