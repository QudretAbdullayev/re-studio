import styles from './AboutCardContainer.module.scss';

export default function AboutCardContainer() {
  return (
    <section className='g-container'>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.image}></div>
        </div>

        <div className={styles.card}>
          <div className={styles.image}></div>
        </div>

        <div className={styles.cardSmall}>
          <div className={styles.imageSmall}></div>
        </div>
      </div>
    </section>
  );
}
