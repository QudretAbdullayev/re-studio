import { useCallback } from 'react';

export const useSound = () => {
  const playClickSound = useCallback(() => {
    try {
      const audio = new Audio('/sounds/click.mp3');
      audio.volume = 0.7;
      audio.play().catch((error) => {
        console.warn('Sound could not be played:', error);
      });
    } catch (error) {
      console.warn('Sound initialization failed:', error);
    }
  }, []);

  return { playClickSound };
};
