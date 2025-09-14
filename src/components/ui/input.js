"use client";

import { useState, useEffect, forwardRef, useRef } from "react";
import { motion } from "motion/react";
import styles from "./input.module.scss";
import Resizer from "@/assets/icons/Resizer";

const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
};

const letterVariants = {
  initial: { y: 0 },
  animate: {
    y: "-24rem",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const mobileLetterVariants = {
  initial: { y: 0 },
  animate: {
    y: "-10rem",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const Input = forwardRef(({
  label,
  className = "",
  value = "",
  error,
  useErrorBorder = false,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  errorClassName = "",
  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const val = typeof value === "string" ? value : String(value ?? "");
  const showLabel = isFocused || val.length > 0;

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocusProp?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlurProp?.(e);
  };

  return (
    <div className={className} style={{ width: "100%" }}>
      <div
        className={`${styles.inputContainer} ${error && useErrorBorder ? styles.inputContainerError : ""
          }`}
      >
        <motion.div
          className={`${styles.labelContainer} ${showLabel ? styles.animated : ""}`}
          variants={containerVariants}
          initial="initial"
          animate={showLabel ? "animate" : "initial"}
        >
          {label &&
            label.split("").map((char, index) => (
              <motion.span
                key={index}
                style={{ display: "inline-block", willChange: "transform" }}
                variants={isMobile ? mobileLetterVariants : letterVariants}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
        </motion.div>

        <input
          ref={ref}
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={val}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          aria-label={label}
          {...rest}
        />
      </div>

      {error && <div className={`${styles.error} ${errorClassName}`}>{error}</div>}
    </div>
  );
});

Input.displayName = "Input";

export const TextArea = forwardRef(({
  label,
  className = "",
  value = "",
  error,
  useErrorBorder = false,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  errorClassName = "",
  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isResizingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  const val = typeof value === "string" ? value : String(value ?? "");
  const showLabel = isFocused || val.length > 0;
  const textareaRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set height to scrollHeight to fit content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [val]);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocusProp?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlurProp?.(e);
  };

  // Combine refs
  const combinedRef = (node) => {
    textareaRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handleMouseDown = (e) => {
    isResizingRef.current = true;
    startYRef.current = e.clientY;
    startHeightRef.current = textareaRef.current.offsetHeight;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizingRef.current) return;
    const dy = e.clientY - startYRef.current;
    textareaRef.current.style.height = `${startHeightRef.current + dy}px`;
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (!isResizingRef.current && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [val]);
  return (
    <div className={className} style={{ width: "100%" }}>
      <div
        className={`${styles.inputContainer} ${error && useErrorBorder ? styles.inputContainerError : ""
          }`}
      >
        {label && (
          <motion.div
            className={`${styles.textareaLabelContainer} ${showLabel ? styles.animated : ""}`}
            variants={containerVariants}
            initial="initial"
            animate={showLabel ? "animate" : "initial"}
          >
            {label.split("").map((char, index) => (
              <motion.span
                key={index}
                style={{ display: "inline-block", willChange: "transform" }}
                variants={isMobile ? mobileLetterVariants : letterVariants}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        )}

        <textarea
          ref={combinedRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={val}
          className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ""}`}
          aria-label={label}
          style={{ resize: 'none', overflow: 'hidden' }}
          {...rest}
        />
        <span
          className={styles.customResizer}
          onMouseDown={handleMouseDown}
          style={{ cursor: "ns-resize" }}
        >
          {/* <Resizer /> */}
        </span>

      </div>

      {error && <div className={`${styles.error} ${errorClassName}`}>{error}</div>}
    </div>
  );
});

TextArea.displayName = "TextArea";
