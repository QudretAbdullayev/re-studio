"use client"

import { useEffect, useState } from 'react';
import styles from './Loader.module.scss';

export default function LoadingScreen() {
  const [step, setStep] = useState(0);

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