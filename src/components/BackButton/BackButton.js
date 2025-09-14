"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./BackButton.module.scss";
import Back from "@/assets/icons/Back";
import { useSoundContext } from "@/contexts/SoundContext";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/TextStaggerHover/TextStaggerHover";
import { playMobileClickSound } from "@/utils/playMobileClickSound";

const BackButton = ({ style }) => {
  const router = useRouter();
  const { playClickSound } = useSoundContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleBackClick = (e) => {
    e.preventDefault();
    playMobileClickSound(playClickSound);

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className={`${styles.backButton} ${style ? styles[style] : ''}`}
      onMouseEnter={() => {
        playClickSound();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      type="button"
    >
      <TextStaggerHover
        as="span"
        className={styles.backText}
        isMouseIn={isHovered}
      >
        <TextStaggerHoverActive 
          animation="top" 
          text="Back"
          icon={
            <span className={styles.icon}>
              <Back />
            </span>
          }
        />
        <TextStaggerHoverHidden 
          animation="bottom" 
          text="Back"
          icon={
            <span className={styles.icon}>
              <Back />
            </span>
          }
        />
      </TextStaggerHover>
    </button>
  );
};

export default BackButton;