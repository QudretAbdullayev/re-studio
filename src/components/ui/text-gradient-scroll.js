"use client";

import React, { createContext, useContext, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from './text-gradient-scroll.module.scss';

const TextGradientScrollContext = createContext({});

function useGradientScroll() {
  const context = useContext(TextGradientScrollContext);
  return context;
}

function TextGradientScroll({
  text,
  className,
  type = "letter",
  textOpacity = "soft",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const words = text.split(" ");

  return (
    <TextGradientScrollContext.Provider value={{ textOpacity, type }}>
      <p ref={ref} className={`${styles.textContainer} ${className || ''}`}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return type === "word" ? (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          ) : (
            <Letter key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Letter>
          );
        })}
      </p>
    </TextGradientScrollContext.Provider>
  );
}

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className={styles.word}>
      <span className={styles.wordBackground}>{children}</span>
      <motion.span 
        style={{ opacity: opacity }}
        className={styles.wordForeground}
      >
        {children}
      </motion.span>
    </span>
  );
};

const Letter = ({ children, progress, range }) => {
  if (typeof children === "string") {
    const amount = range[1] - range[0];
    const step = amount / children.length;

    return (
      <span className={styles.word}>
        {children.split("").map((char, i) => {
          const start = range[0] + i * step;
          const end = range[0] + (i + 1) * step;
          return (
            <Char key={`c_${i}`} progress={progress} range={[start, end]}>
              {char}
            </Char>
          );
        })}
      </span>
    );
  }
};

const Char = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const { textOpacity } = useGradientScroll();

  const getOpacityClass = () => {
    switch (textOpacity) {
      case "none": return styles.opacityNone;
      case "soft": return styles.opacitySoft;
      case "medium": return styles.opacityMedium;
      default: return styles.opacitySoft;
    }
  };

  return (
    <span className={styles.char}>
      <span className={getOpacityClass()}>
        {children}
      </span>
      <motion.span
        style={{ opacity: opacity }}
        className={styles.charForeground}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextGradientScroll };
