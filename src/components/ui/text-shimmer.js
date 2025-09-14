'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './text-shimmer.module.scss';

export function TextShimmer({
  children,
  as: Component = 'span',
  className,
  duration = 2,
}) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      className={`${styles.shimmer} ${className || ''}`}
      style={{
        '--animation-duration': `${duration}s`,
      }}
    >
      {children}
    </MotionComponent>
  );
}
