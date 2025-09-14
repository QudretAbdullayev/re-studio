import styles from "./ServiceCardImage.module.scss";

const ServiceCardImage = ({className}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.image}></div>
    </div>
  );
};

export default ServiceCardImage;
