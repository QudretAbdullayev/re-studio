import BackButton from '../BackButton/BackButton';
import styles from './AboutUs.module.scss';

export default function AboutUs({title, description, description_left, description_right}) {
  return (
    <section className='g-container'>
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <BackButton style={"back"}/>
          <div className={styles.title}>{title}</div>
          <div className={styles.heading}>
            {description}
          </div>
        </div>
        <div className={styles.descriptionRow}>
          <div className={styles.description}>
            {description_left}
          </div>
          <div className={styles.description}>
            {description_right}
          </div>
        </div>
      </div>
    </section>
  );
}
