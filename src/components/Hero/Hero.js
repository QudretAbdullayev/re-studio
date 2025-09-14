import { dangerousProcessText } from "@/utils/dangerousProcessText";
import styles from "./Hero.module.scss";

export default function Hero({slogan, description, about, tags}) {
  return (
    <section className="g-container">
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag.order} className={styles.tag}>{tag.title}</span>
            ))}
          </div>
          <h1 className={styles.headline} dangerouslySetInnerHTML={{__html: dangerousProcessText(slogan)}}/>
          <p className={styles.subtext} dangerouslySetInnerHTML={{__html: dangerousProcessText(description)}}/>
        </div>

        <div className={styles.right}>
          <p className={styles.desc} dangerouslySetInnerHTML={{__html: dangerousProcessText(about)}}/>
        </div>
      </div>
    </section>
  );
}
