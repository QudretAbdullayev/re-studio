// components/StarBorder/StarBorder.jsx
import { forwardRef } from "react"
import styles from './StarBorder.module.scss'

export const StarBorder = forwardRef(function StarBorder({
  as: Component = "button",
  className,
  color,
  speed = "6s",
  children,
  ...props
}, ref) {
  const defaultColor = color || "hsl(var(--foreground))"
  
  return (
    <Component 
      ref={ref}
      className={`${styles.starBorder} ${className || ''}`}
      {...props}
    >
      <div
        className={styles.starBottom}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={styles.starTop}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={styles.content}>
        {children}
      </div>
    </Component>
  )
})
