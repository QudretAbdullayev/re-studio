
import Card from "../Card/Card";
import styles from "./OtherWorks.module.scss";

export default function OtherWorks({otherWorksData, slug}) {
  const cardSizes = ["small", "extrasmall", "small"];

  const getRandomOtherWorks = () => {
    const filteredProjects = otherWorksData.filter((data) => data.slug !== slug);
    
    const shuffled = [...filteredProjects].sort(() => 0.5 - Math.random());
    
    return shuffled.slice(0, 3);
  };

  const randomOtherWorks = getRandomOtherWorks();

  return (
    <section className="g-container">
      <div className={styles.otherWorks}>
        <div className={styles.otherWorksHeader}>
          <div className={styles.sectionTitle}>YOU CAN FIND YOUR QUESTION</div>
          <div className={styles.sectionSubtitle}>Other works</div>
        </div>
        <div className={styles.cardsRow}>
          {randomOtherWorks.map((project, idx) => (
            <Card
              key={idx}
              className={styles[cardSizes[idx]]}
              project={project}
              title={project.title}
              description={project.short_description}
              tags={project.tags}
              image={project.image}
              slug={project.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
