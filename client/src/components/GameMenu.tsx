import { GameSection } from "../App";
import { useGameStore } from "../lib/stores/useGameStore";
import { useTranslations } from "../lib/translations";

interface GameMenuProps {
  onSectionSelect: (section: GameSection) => void;
}

const GameMenu = ({ onSectionSelect }: GameMenuProps) => {
  const { playClickSound } = useGameStore();
  const { translations, isRTL } = useTranslations();

  const menuItems = [
    {
      id: 'goodDeeds' as GameSection,
      title: translations.goodDeeds.title,
      subtitle: translations.goodDeeds.subtitle,
      icon: '⭐',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'hadith' as GameSection,
      title: translations.hadith.title,
      subtitle: translations.hadith.subtitle,
      icon: '📚',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'values' as GameSection,
      title: translations.values.title,
      subtitle: translations.values.subtitle,
      icon: '🧩',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      id: 'mosque' as GameSection,
      title: translations.mosque.title,
      subtitle: translations.mosque.subtitle,
      icon: '🕋',
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600'
    }
  ];

  const handleMenuClick = (sectionId: GameSection) => {
    playClickSound();
    onSectionSelect(sectionId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Game Title */}
      <div className="text-center mb-12 bounce-in">
        <h1 className={`text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg ${isRTL ? 'arabic-text' : ''}`}>
          {translations.gameTitle}
        </h1>
        <p className={`text-xl md:text-2xl text-white/90 ${isRTL ? 'arabic-text' : ''}`}>
          {translations.gameSubtitle}
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`
              game-button ${item.color} ${item.hoverColor}
              text-white p-8 rounded-3xl shadow-2xl
              flex flex-col items-center justify-center
              min-h-[200px] relative overflow-hidden
              bounce-in
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl opacity-30">
                {item.icon}
              </div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-2 arabic-text">
                {item.title}
              </h3>
              <p className="text-lg opacity-90 arabic-text">
                {item.subtitle}
              </p>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-white/80 arabic-text text-lg">
          اجمع النجوم وتعلم القيم الإسلامية الجميلة
        </p>
      </div>
    </div>
  );
};

export default GameMenu;
