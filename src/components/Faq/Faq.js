"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Faq.module.scss";
import Plus from "@/assets/icons/Plus";
import Minus from "@/assets/icons/Minus";
import { useSoundContext } from "@/contexts/SoundContext";

export default function Faq({ faqs, title, label }) {
  const { playClickSound } = useSoundContext();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    playClickSound();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="g-container">
      <div className={styles.faqSection}>
        {(label || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.titleBlock}
          >
            {label && <div className={styles.sectionTitle}>{label}</div>}
            {title && <div className={styles.sectionSubtitle}>{title}</div>}
          </motion.div>
        )}

        {faqs &&
          faqs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: 0.1 }}
              className={styles.faqItemExpanded}
              onClick={() => toggleItem(index)}
              style={{ cursor: "pointer" }}
            >
              {/* Star border effects
              <div className={styles.starBottom}></div>
              <div className={styles.starTop}></div> */}

              <div className={styles.faqContent}>
                <div className={styles.faqQuestionBlock}>
                  <div className={styles.faqQuestion}>{item.question}</div>
                  <motion.div
                    animate={{
                      rotate: openIndex === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className={
                      openIndex === index ? styles.iconMinus : styles.iconPlus
                    }
                  >
                    {openIndex === index ? <Minus /> : <Plus />}
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : "0rem",
                    marginTop: openIndex === index ? "12rem" : "0rem"
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className={styles.faqAnswer}>
                    {item.answer}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}