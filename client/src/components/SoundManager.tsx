import { useEffect } from "react";
import { useGameStore } from "../lib/stores/useGameStore";

const SoundManager = () => {
  const { initializeSounds } = useGameStore();

  useEffect(() => {
    initializeSounds();
  }, [initializeSounds]);

  return null; // This component doesn't render anything
};

export default SoundManager;
