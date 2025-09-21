"use client";
import External from '@/assets/icons/External';
import styles from './Custom404.module.scss';
import SafeImage from '../SafeImage/SafeImage';
import Link from 'next/link';
import { useSoundContext } from '@/contexts/SoundContext';
import AnimatedCards from '../AnimatedCards/AnimatedCards';

export default function Custom404({data}) {
  const { playClickSound } = useSoundContext();
  return (
    <>
      <AnimatedCards data={data} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>WELL, THIS IS AWKWARD</div>
          <div className={styles.errorCode}>404</div>
        </div>
        <div className={styles.mainTexts}>
          <div className={styles.description}>{`The page you are looking for can’t be found.`}</div>
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
              <Link href="https://heats.az" target="_blank" rel="noopener noreferrer" className={styles.reProfile}>
                <span className={styles.reProfileImage}><SafeImage fill src="/Heats.svg" alt="Heats"/></span>
              </Link>
              <span className={styles.reButtonText}>GO TO HEATS</span>
              <span className={styles.externalIcon}><External/></span>
            </button>
          </div>
      </div>
    </>
  );
}
