"use client";
import External from '@/assets/icons/External';
import styles from './Custom404.module.scss';
import SafeImage from '../SafeImage/SafeImage';
import Link from 'next/link';
import { useSoundContext } from '@/contexts/SoundContext';

export default function Custom404() {
  const { playClickSound } = useSoundContext();
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>WELL, THIS IS AWKWARD</div>
        <div className={styles.errorCode}>404</div>
      </div>
      <div className={styles.mainTexts}>
        <div className={styles.description}>The page you are looking for<br/>can&apos;t be found.</div>
      </div>
      <div className={styles.buttonContainer}>
          <button 
            className={styles.homeButton}
            onMouseEnter={playClickSound}
          >
            GO TO HOME
          </button>
          <button 
            className={styles.reButton}
            onMouseEnter={playClickSound}
          >
            <Link href="/" className={styles.reProfile}>
              <span><SafeImage fill src="/re.svg" alt="Re Studio"/></span>
            </Link>
            <span>GO TO RE STUDIO</span>
            <span className={styles.externalIcon}><External/></span>
          </button>
        </div>
    </div>
  );
}
