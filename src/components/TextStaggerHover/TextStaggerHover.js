'use client';

import React, { useState, createContext, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './TextStaggerHover.module.scss';

const TextStaggerHoverContext = createContext(null);

function useTextStaggerHoverContext() {
  const context = useContext(TextStaggerHoverContext);
  if (!context) throw new Error('Must be inside TextStaggerHover');
  return context;
}

function splitText(text) {
  if (!text) return { characters: [], characterCount: 0 };
  const characters = text.split('');
  return { characters, characterCount: characters.length };
}

function useVariants(direction = 'top') {
  return useMemo(() => ({
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'top' ? '-100%' : direction === 'bottom' ? '100%' : 0,
      scale: direction === 'z' ? 0 : 1,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    }
  }), [direction]);
}

export function TextStaggerHover({ as: Component = 'span', children, className, isMouseIn: externalIsMouseIn, ...props }) {
  const [internalIsMouseIn, setInternalIsMouseIn] = useState(false);

  // Use external prop if provided, otherwise use internal state
  const isMouseIn = externalIsMouseIn !== undefined ? externalIsMouseIn : internalIsMouseIn;

  return (
    <TextStaggerHoverContext.Provider value={{ isMouseIn }}>
      <Component
        className={`${styles.wrapper} ${className || ''}`}
        onMouseEnter={() => setInternalIsMouseIn(true)}
        onMouseLeave={() => setInternalIsMouseIn(false)}
        {...props}
      >
        {children}
      </Component>
    </TextStaggerHoverContext.Provider>
  );
}

export function TextStaggerHoverActive({ animation = 'top', text = '', icon, className, charClassName, iconClassName, activeClassName, transition, ...props }) {
  const { isMouseIn } = useTextStaggerHoverContext();
  const { characters } = splitText(text);
  const variants = useVariants(animation);

  return (
    <>
      <span className={`${styles.active} ${activeClassName || ''} ${className || ''}`}>
        {icon && (
          <motion.span
            className={`${styles.icon} ${iconClassName || ''}`}
            variants={variants}
            initial="visible"
            animate={isMouseIn ? 'hidden' : 'visible'}
            transition={{ duration: 0.3, ease: 'easeOut', ...transition }}
            {...props}
          >
            {icon}
          </motion.span>
        )}
        {characters.map((char, i) => (
          <motion.span
            key={i}
            className={`${styles.char} ${charClassName || ''}`}
            variants={variants}
            initial="visible"
            animate={isMouseIn ? 'hidden' : 'visible'}
            transition={{ delay: i * 0.02, duration: 0.3, ease: 'easeOut', ...transition }}
            {...props}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
      <span className={styles.visibleNone}>
        {icon}<span><span className={styles.char}>{text}</span></span>
      </span>
    </>
  );
}

export function TextStaggerHoverHidden({ animation = 'bottom', text = '', icon, className, charClassName, iconClassName, hiddenClassName, transition, ...props }) {
  const { isMouseIn } = useTextStaggerHoverContext();
  const { characters } = splitText(text);
  const variants = useVariants(animation);

  return (
    <span className={`${styles.hidden} ${hiddenClassName || ''} ${className || ''}`}>
      {icon && (
        <motion.span
          className={`${styles.icon} ${iconClassName || ''}`}
          variants={variants}
          initial="hidden"
          animate={isMouseIn ? 'visible' : 'hidden'}
          transition={{ duration: 0.3, ease: 'easeOut', ...transition }}
          {...props}
        >
          {icon}
        </motion.span>
      )}
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className={`${styles.char} ${charClassName || ''}`}
          variants={variants}
          initial="hidden"
          animate={isMouseIn ? 'visible' : 'hidden'}
          transition={{ delay: i * 0.02, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], ...transition }}
          {...props}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
