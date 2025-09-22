import Link from "next/link";
import SafeImage from "../SafeImage/SafeImage";
import styles from "./Card.module.scss";

export default function Card({ className, title, description, tags, image, slug, overlay }) {
  return (
    <Link href={`/case-studies/${slug}`} className={`${styles.container} ${className || ""}`}>
      <div className={styles.imageBackground}>
        <div className={styles.image}>
          <SafeImage src={image} fill alt={title} />
        </div>
      </div>
      {(title || description || tags) && <div className={`${styles.overlay} ${overlay ? styles.overlay404 : ""}`}>
        <div className={styles.texts}>
          {title && <div className={styles.title}>{title}</div>}
          {description && <div className={styles.description}>{description}</div>}
          {tags && <div className={styles.tags}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tag}>
                <span className={styles.tagText}>{tag}</span>
              </div>
            ))}
          </div>}
        </div>
      </div>}
    </Link>
  );
}
