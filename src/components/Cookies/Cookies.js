"use client";

import { useState, useEffect } from 'react';
import styles from './Cookies.module.scss';
import { useSoundContext } from '@/contexts/SoundContext';
import { playMobileClickSound } from '@/utils/playMobileClickSound';
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from '@/components/TextStaggerHover/TextStaggerHover';

export default function Cookies() {
  const [isVisible, setIsVisible] = useState(false);
  const [rejectHovered, setRejectHovered] = useState(false);
  const [acceptHovered, setAcceptHovered] = useState(false);
  const [privacyHovered, setPrivacyHovered] = useState(false);
  const { playClickSound } = useSoundContext();

  // Show cookie box on component mount (you can modify this logic)
  useEffect(() => {
    // Check if user has already made a choice for reject or privacy
    const rejectChoice = localStorage.getItem('cookieReject');
    const privacyChoice = localStorage.getItem('cookiePrivacy');
    
    // Only show if both values are null
    if (rejectChoice === null && privacyChoice === null) {
      // Small delay for smooth entrance
      setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    }
  }, []);

  const handleAccept = () => {
    playMobileClickSound(playClickSound);
    localStorage.setItem('cookieReject', 'false');
    setIsVisible(false);
  };

  const handleReject = () => {
    playMobileClickSound(playClickSound);
    localStorage.setItem('cookieReject', 'true');
    setIsVisible(false);
  };

  const handlePrivacyClick = () => {
    playMobileClickSound(playClickSound);
    localStorage.setItem('cookiePrivacy', 'true');
    setIsVisible(false);
  };

  // Don't render anything if not visible
  if (!isVisible) {
    return null;
  }

  return (
    <div className={`${styles.cookieBox} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.textContainer}>
        <h3 className={styles.heading}>We use Cookies</h3>
        <p className={styles.subheading}>
          We use cookies to make your visit sweet and seamless. By using our site, you agree to this. Read our{' '}
          <a 
            href="/privacy-policy" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={handlePrivacyClick}
            onMouseEnter={() => { setPrivacyHovered(true); playClickSound(); }}
            onMouseLeave={() => setPrivacyHovered(false)}
            className={styles.privacyLink}
          >
            <TextStaggerHover
              as="span"
              className={styles.privacyContent}
              isMouseIn={privacyHovered}
            >
              <TextStaggerHoverActive animation="top" text="Privacy Policy" />
              <TextStaggerHoverHidden animation="bottom" text="Privacy Policy" />
            </TextStaggerHover>
          </a>{' '}
          for more details.
        </p>
      </div>
      <div className={styles.buttonGroup}>
        <button 
          className={styles.reject} 
          onClick={handleReject}
          onMouseEnter={() => { setRejectHovered(true); playClickSound(); }}
          onMouseLeave={() => setRejectHovered(false)}
        >
          <TextStaggerHover
            as="span"
            className={styles.buttonContent}
            isMouseIn={rejectHovered}
          >
            <TextStaggerHoverActive animation="top" text="Reject" />
            <TextStaggerHoverHidden animation="bottom" text="Reject" />
          </TextStaggerHover>
        </button>
        <button 
          className={styles.accept} 
          onClick={handleAccept}
          onMouseEnter={() => { setAcceptHovered(true); playClickSound(); }}
          onMouseLeave={() => setAcceptHovered(false)}
        >
          <TextStaggerHover
            as="span"
            className={styles.buttonContent}
            isMouseIn={acceptHovered}
          >
            <TextStaggerHoverActive animation="top" text="Accept" />
            <TextStaggerHoverHidden animation="bottom" text="Accept" />
          </TextStaggerHover>
        </button>
      </div>
    </div>
  );
}