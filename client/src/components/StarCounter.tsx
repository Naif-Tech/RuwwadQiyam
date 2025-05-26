import { useGameStore } from "../lib/stores/useGameStore";

const StarCounter = () => {
  const { stars } = useGameStore();

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border-2 border-yellow-300">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-pulse">⭐</span>
          <span className="text-2xl font-bold text-gray-800 arabic-text">
            {stars}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StarCounter;
