import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  stars: number;
  soundEnabled: boolean;
  clickSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  
  // Actions
  addStars: (amount: number) => void;
  toggleSound: () => void;
  initializeSounds: () => void;
  playClickSound: () => void;
  playSuccessSound: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      stars: 0,
      soundEnabled: true,
      clickSound: null,
      successSound: null,

      addStars: (amount: number) => {
        set((state) => ({ stars: state.stars + amount }));
      },

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },

      initializeSounds: () => {
        try {
          const clickSound = new Audio('/sounds/hit.mp3');
          const successSound = new Audio('/sounds/success.mp3');
          
          clickSound.volume = 0.3;
          successSound.volume = 0.5;
          
          // Preload sounds
          clickSound.load();
          successSound.load();
          
          set({ clickSound, successSound });
        } catch (error) {
          console.log('Failed to initialize sounds:', error);
        }
      },

      playClickSound: () => {
        const { clickSound, soundEnabled } = get();
        if (clickSound && soundEnabled) {
          clickSound.currentTime = 0;
          clickSound.play().catch(() => {
            // Ignore autoplay restrictions
          });
        }
      },

      playSuccessSound: () => {
        const { successSound, soundEnabled } = get();
        if (successSound && soundEnabled) {
          successSound.currentTime = 0;
          successSound.play().catch(() => {
            // Ignore autoplay restrictions
          });
        }
      },
    }),
    {
      name: 'ruwwad-al-qiyam-game',
      partialize: (state) => ({ stars: state.stars, soundEnabled: state.soundEnabled }),
    }
  )
);
