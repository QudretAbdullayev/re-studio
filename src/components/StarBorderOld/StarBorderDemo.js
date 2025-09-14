// components/StarBorder/StarBorderDemo.jsx
import { StarBorder } from './StarBorder'
import styles from './StarBorder.module.scss'

export function StarBorderDemo() {
  return (
    <div className={styles.demo}>
      <StarBorder>
        Theme-aware Border
      </StarBorder>
    </div>
  )
}