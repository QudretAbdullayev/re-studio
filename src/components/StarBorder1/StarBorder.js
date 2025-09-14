import React from "react";
import styles from "./StarBorder.module.scss";

export default function StarBorder({
  as: Component = "button",
  className = "",
  children,
  ...props
}) {
  return (
    <Component className={`${styles.starBorder} ${className}`} {...props}>
      <div
        className={`${styles.star} ${styles.bottom}`}
      />
      <div
        className={`${styles.star} ${styles.top}`}
      />
      <div className={styles.content}>{children}</div>
    </Component>
  );
}
