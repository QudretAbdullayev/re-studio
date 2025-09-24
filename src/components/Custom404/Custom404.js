"use client";
import External from '@/assets/icons/External';
import styles from './Custom404.module.scss';
import SafeImage from '../SafeImage/SafeImage';
import Link from 'next/link';
import { useSoundContext } from '@/contexts/SoundContext';
import AnimatedCards from '../AnimatedCards/AnimatedCards';
import SafeLink from '../SafeLink/SafeLink';
import { TextStaggerHover, TextStaggerHoverActive, TextStaggerHoverHidden } from '@/components/TextStaggerHover/TextStaggerHover';
import { useState } from 'react';

export default function Custom404({data}) {
  const { playClickSound } = useSoundContext();
  const [homeHovered, setHomeHovered] = useState(false);
  const [heatsHovered, setHeatsHovered] = useState(false);

  return (
    <>
      <AnimatedCards data={data} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>WELL, THIS IS AWKWARD</div>
          <div className={styles.errorCode}>404</div>
        </div>
        <div className={styles.mainTexts}>
          <div className={styles.description}>{`The page you are looking for can't be found.`}</div>
        </div>
        <div className={styles.buttonContainer}>
            <SafeLink 
              href="/"
              className={styles.homeButton}
              onMouseEnter={() => {
                playClickSound();
                setHomeHovered(true);
              }}
              onMouseLeave={() => setHomeHovered(false)}
            >
              <TextStaggerHover
                as="span"
                className={styles.homeButtonContent}
                isMouseIn={homeHovered}
              >
                <TextStaggerHoverActive animation="top" text="GO TO HOME" />
                <TextStaggerHoverHidden animation="bottom" text="GO TO HOME" />
              </TextStaggerHover>
            </SafeLink>
            <button 
              className={styles.reButton}
              onMouseEnter={() => {
                playClickSound();
                setHeatsHovered(true);
              }}
              onMouseLeave={() => setHeatsHovered(false)}
            >
              <Link href="https://heats.az" target="_blank" rel="noopener noreferrer" className={styles.reProfile}>
                <span className={styles.reProfileImage}><SafeImage fill src="/Heats.svg" alt="Heats"/></span>
              </Link>
              <TextStaggerHover
                as="span"
                className={styles.heatsButtonContent}
                isMouseIn={heatsHovered}
              >
                <TextStaggerHoverActive animation="top" text="GO TO HEATS" />
                <TextStaggerHoverHidden animation="bottom" text="GO TO HEATS" />
              </TextStaggerHover>
              <span className={styles.externalIcon}><External/></span>
            </button>
          </div>
      </div>
    </>
  );
}
