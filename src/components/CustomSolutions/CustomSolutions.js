"use client"

import { usePathname } from 'next/navigation';
import styles from './CustomSolutions.module.scss';

export default function CustomSolutions({solutions}) {
  let pathname = usePathname();

  return (
    <section className="g-container">
      <div className={`${styles.container} ${pathname === '/about' ? styles.apply : ''}`}>
        <div className={styles.sectionTitle}>
          CUSTOM SOLUTIONS FOR EVERY SECTOR
        </div>
        <div className={styles.description}>
          {solutions ? solutions.map(solution => solution.title).join(' • ') : ''}
        </div>
      </div>
    </section>
  );
}
