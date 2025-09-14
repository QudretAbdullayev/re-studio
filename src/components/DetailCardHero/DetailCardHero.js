import BackButton from "../BackButton/BackButton";
import styles from "./DetailCardHero.module.scss";

const DetailCardHero = ({tags, title, description}) => {
  return (
    <div className={styles.hero}>
      <BackButton />
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            <span>{tag}</span>
          </div>
        ))}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
};

export default DetailCardHero;
