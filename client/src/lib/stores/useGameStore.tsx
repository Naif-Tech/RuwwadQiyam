import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  stars: number;
  soundEnabled: boolean;
  clickSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  completedLessons: number;
  totalGameSessions: number;
  lastPlayDate: string;

  // Actions
  addStars: (amount: number) => void;
  toggleSound: () => void;
  initializeSounds: () => void;
  playClickSound: () => void;
  playSuccessSound: () => void;
  incrementCompletedLessons: () => void;
  updateLastPlayDate: () => void;
  getProgressPercentage: () => number;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      stars: 0,
      soundEnabled: true,
      clickSound: null,
      successSound: null,
      completedLessons: 0,
      totalGameSessions: 0,
      lastPlayDate: new Date().toISOString().split('T')[0],

      addStars: (amount: number) => {
        set((state) => ({ stars: state.stars + amount }));
      },

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },

      initializeSounds: () => {
        try {
          const basePath = import.meta.env.MODE === 'production' ? '/RuwwadQiyam/sound/' : '/sound/';
          const clickSound = new Audio(`${basePath}hit.mp3`);
          const successSound = new Audio(`${basePath}success.mp3`);

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

      incrementCompletedLessons: () => {
        set((state) => ({
          completedLessons: state.completedLessons + 1,
          totalGameSessions: state.totalGameSessions + 1
        }));
      },

      updateLastPlayDate: () => {
        const today = new Date().toISOString().split('T')[0];
        set({ lastPlayDate: today });
      },

      getProgressPercentage: () => {
        const { completedLessons } = get();
        const totalAvailableLessons = 25; // Approximate total lessons across all sections
        return Math.min((completedLessons / totalAvailableLessons) * 100, 100);
      },
    }),
    {
      name: 'ruwwad-al-qiyam-game',
      partialize: (state) => ({
        stars: state.stars,
        soundEnabled: state.soundEnabled,
        completedLessons: state.completedLessons,
        totalGameSessions: state.totalGameSessions,
        lastPlayDate: state.lastPlayDate
      }),
    }
  )
);
