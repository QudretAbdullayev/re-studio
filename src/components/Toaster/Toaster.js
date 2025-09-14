"use client";
import { useEffect, useRef } from "react";
import Tick from "@/assets/icons/Success";
import Error from "@/assets/icons/Error";
import styles from "./Toaster.module.scss";

const Toaster = ({ success, setSuccess, showFade, setShowFade, message, isError = false }) => {
  const timeoutRefs = useRef([]);

  useEffect(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    setShowFade(true);

    const fadeOutTimer = setTimeout(() => {
      setShowFade(false);
    }, 5700);

    const removeTimer = setTimeout(() => {
      setSuccess(false);
    }, 6000);

    timeoutRefs.current = [fadeOutTimer, removeTimer];

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []); 

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={`${styles.toaster} ${showFade ? styles.fadeIn : styles.fadeOut}`}>
      <div className={styles.left}>
        <div className={styles.icon}>
          {isError ? <Error /> : <Tick />}
        </div>
        {message}
      </div>
    </div>
  );
};

export default Toaster;