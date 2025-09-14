import styles from './ServiceCardTitle.module.scss';

export default function ServiceCardTitle({className, serviceData}) {
  return (
    <div className={`${styles.container} ${className}`}>
      <h2 className={styles.title}>{serviceData?.subtitle || 'UI/UX Design'}</h2>
      <p className={styles.description}>
        {serviceData?.subdescription || 'We work in smaller phases, gather feedback at each, and iterate on our ideas. This is our proven method for creating world-class products, that convert and win hearts.'}
      </p>
      <div className={styles.tags}>
        {serviceData?.tags?.map((tagItem, index) => (
          <div key={index} className={styles.tag}>
            <span className={styles.tagText}>{tagItem.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
