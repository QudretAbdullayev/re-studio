'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './image-marquee.module.scss';

export default function ImageMarquee({
  src,
  alt = '',
  baseVelocity = 1,
  className = '',
}) {
  const direction = baseVelocity > 0 ? 'normal' : 'reverse';
  
  return (
    <div className={`${styles.parallax} ${className}`}>
      <motion.div 
        className={styles.scroller}
        style={{
          animationDirection: direction,
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.imageContainer}>
          <img src={src} alt={alt} className={styles.image} />
        </div>
        <div className={styles.imageContainer}>
          <img src={src} alt={alt} className={styles.image} />
        </div>
        <div className={styles.imageContainer}>
          <img src={src} alt={alt} className={styles.image} />
        </div>
        <div className={styles.imageContainer}>
          <img src={src} alt={alt} className={styles.image} />
        </div>
        <div className={styles.imageContainer}>
          <img src={src} alt={alt} className={styles.image} />
        </div>
        <div className={styles.imageContainer}>
          <img src={src} alt={alt} className={styles.image} />
        </div>
      </motion.div>
    </div>
  );
}