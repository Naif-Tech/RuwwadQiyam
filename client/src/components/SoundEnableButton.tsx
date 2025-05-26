import { useState, useEffect } from "react";
import { useGameStore } from "../lib/stores/useGameStore";

const SoundEnableButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const { soundEnabled, initializeSounds } = useGameStore();

  useEffect(() => {
    // Check if user has already interacted with the page
    const hasInteracted = localStorage.getItem('sound-interaction');
    if (!hasInteracted && !isInteracted) {
      setShowButton(true);
    }
  }, [isInteracted]);

  const handleEnableSound = async () => {
    try {
      // Create a silent audio element to test audio context
      const audio = new Audio();
      audio.volume = 0;
      
      // Try to play a silent sound to enable audio context
      await audio.play();
      
      // Initialize game sounds
      initializeSounds();
      
      // Mark as interacted
      setIsInteracted(true);
      localStorage.setItem('sound-interaction', 'true');
      setShowButton(false);
      
      // Show success message
      alert('تم تفعيل الصوت! استمتع باللعب 🎉');
      
    } catch (error) {
      console.log('Could not enable sound:', error);
      alert('لا يمكن تشغيل الصوت في الوقت الحالي. حاول مرة أخرى.');
    }
  };

  if (!showButton) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleEnableSound}
        className="
          bg-green-500 hover:bg-green-600 text-white
          font-bold py-3 px-6 rounded-2xl shadow-lg
          text-xl arabic-text game-button
          border-2 border-green-400 hover:border-green-500
          flex items-center gap-2
        "
        style={{
          fontSize: '20px',
          padding: '10px 20px'
        }}
      >
        اضغط هنا لتشغيل الصوت 🔊
      </button>
    </div>
  );
};

export default SoundEnableButton;