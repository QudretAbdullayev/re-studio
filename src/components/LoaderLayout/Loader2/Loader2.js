"use client"

import { useEffect, useState, useRef } from 'react';
import { useSoundContext } from '../../../contexts/SoundContext';
import styles from './Loader.module.scss';

export default function LoadingScreen() {
  const [step, setStep] = useState(0);
  const { isSoundEnabled } = useSoundContext();
  const loaderAudioRef = useRef(null);
  const hasPlayedSoundRef = useRef(false);

  useEffect(() => {
    if (isSoundEnabled && !hasPlayedSoundRef.current) {
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

    return () => {
      if (loaderAudioRef.current) {
        loaderAudioRef.current.pause();
        loaderAudioRef.current.currentTime = 0;
        loaderAudioRef.current.src = '';
        loaderAudioRef.current = null;
      }
    };
  }, [isSoundEnabled]);

  useEffect(() => {
    hasPlayedSoundRef.current = false;
  }, []);

  useEffect(() => {
    const timers = [];

    timers.push(setTimeout(() => setStep(1), 100)); 
    timers.push(setTimeout(() => setStep(2), 200));
    timers.push(setTimeout(() => setStep(3), 300));
    timers.push(setTimeout(() => setStep(4), 800));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={styles.screen}>
      <div
        className={`${styles.box} ${step >= 1 ? styles.up : ''} ${step === 4 ? styles.white : ''}`}
        style={{ transitionDelay: '0s' }}
      >
        LOADING
      </div>
      <div
        className={`${styles.box} ${step >= 2 ? styles.up : ''} ${step === 4 ? styles.white : ''}`}
        style={{ transitionDelay: '0.1s' }}
      >
        PLS
      </div>
      <div
        className={`${styles.box} ${step >= 3 ? styles.up : ''} ${step === 4 ? styles.white : ''}`}
        style={{ transitionDelay: '0.2s' }}
      >
        WAIT
      </div>
    </div>
  );
}

