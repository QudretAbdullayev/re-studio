import ArrowCorner from '@/assets/icons/ArrowCorner';
import styles from './ServiceCardList.module.scss';

export default function ServiceCardList({className, listData}) {

  return (
    listData && <div className={`${styles.container} ${className}`}>
      {listData.map((item, index) => (
        <div className={styles.textRow} key={index}>
          <div className={styles.serviceItem}>
            <span className={styles.title}>{item.id}</span>
            <div className={styles.arrowIcon}>
              <ArrowCorner/>
            </div>
          </div>
          <div className={styles.description}>{item.description}</div>
        </div>
      ))}
    </div>
  );
}
