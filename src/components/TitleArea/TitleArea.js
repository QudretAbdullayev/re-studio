import styles from "./TitleArea.module.scss";

const TitleArea = ({ title, description }) => {
  return (
    <section className="g-container">
      <div className={styles.texts}>
        <h3 className={styles.title}>{title}</h3>
        <h2 className={styles.description}>{description}</h2>
      </div>
    </section>
  );
};

export default TitleArea;
