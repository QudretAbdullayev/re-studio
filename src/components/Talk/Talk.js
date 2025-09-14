"use client";

import Link from 'next/link';
import styles from './Talk.module.scss';
import { useState } from 'react';
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from '@/components/TextStaggerHover/TextStaggerHover';
import { useSoundContext } from '@/contexts/SoundContext';

const Talk = () => {
  const { playClickSound } = useSoundContext();
  const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);
  const [secondaryButtonHovered, setSecondaryButtonHovered] = useState(false);

  return (
    <div className={styles.productCard}>
      <div className={styles.letsTalk}>
        <div className={styles.container}>
          <div className={styles.title}>LET&apos;S TALK</div>
          <div className={styles.contentContainer}>
            <div className={styles.mainTitle}>
              Now tell us about your project
            </div>
            <div className={styles.description}>
              Explore our portfolio and discover what we can achieve for you. Let&apos;s create something extraordinary together.
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Link 
            href="/apply" 
            className={styles.primaryButton}
            onMouseEnter={() => {
              playClickSound();
              setPrimaryButtonHovered(true);
            }}
            onMouseLeave={() => setPrimaryButtonHovered(false)}
          >
            <TextStaggerHover
              as="span"
              className={styles.buttonText}
              isMouseIn={primaryButtonHovered}
            >
              <TextStaggerHoverActive animation="top" text="LET'S CONTACT" />
              <TextStaggerHoverHidden animation="bottom" text="LET'S CONTACT" />
            </TextStaggerHover>
          </Link>
          <Link 
            href="/case-studies" 
            className={styles.secondaryButton}
            onMouseEnter={() => {
              playClickSound();
              setSecondaryButtonHovered(true);
            }}
            onMouseLeave={() => setSecondaryButtonHovered(false)}
          >
            <TextStaggerHover
              as="span"
              className={styles.buttonText}
              isMouseIn={secondaryButtonHovered}
            >
              <TextStaggerHoverActive animation="top" text="SEE ALL WORKS" />
              <TextStaggerHoverHidden animation="bottom" text="SEE ALL WORKS" />
            </TextStaggerHover>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Talk;