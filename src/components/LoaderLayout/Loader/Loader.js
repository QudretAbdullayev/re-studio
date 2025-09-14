"use client";
import { useEffect, useRef } from 'react';
import { useSoundContext } from '../../../contexts/SoundContext';
import styles from './Loader.module.scss';

const Loader = ({ isReversed = false }) => {
  const { isSoundEnabled } = useSoundContext();
  const loaderAudioRef = useRef(null);
  const hasPlayedSoundRef = useRef(false);

  useEffect(() => {
    // isReversed true olduğunda ses çalmalı
    if (isReversed && isSoundEnabled && !hasPlayedSoundRef.current) {
      hasPlayedSoundRef.current = true;
      
      try {
        loaderAudioRef.current = new Audio('/sounds/load.mp3');
        loaderAudioRef.current.volume = 0.7;
        loaderAudioRef.current.loop = false;
        loaderAudioRef.current.muted = false;
        
        const playPromise = loaderAudioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn('Loader sound failed to play:', error);
          });
        }
      } catch (error) {
        console.warn('Failed to create loader audio:', error);
      }
    }

    // Cleanup function
    return () => {
      if (loaderAudioRef.current) {
        loaderAudioRef.current.pause();
        loaderAudioRef.current.currentTime = 0;
        loaderAudioRef.current.src = '';
        loaderAudioRef.current = null;
      }
    };
  }, [isReversed, isSoundEnabled]);

  // Reset sound flag when component unmounts or isReversed changes
  useEffect(() => {
    hasPlayedSoundRef.current = false;
  }, [isReversed]);

  return (
    <div className={styles.loader}>
      <div className={styles.background}></div>
      <div className={styles.stairs}>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`${styles.step} ${isReversed ? styles.reversed : ''}`}
            style={{
              animationDelay: `${i * 0.07}s`,
              left: `${i * 10}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
