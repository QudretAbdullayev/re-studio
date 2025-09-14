import React from "react";
import Card from "../Card/Card";
import styles from "./HomeCards.module.scss";
import Talk from "../Talk/Talk";

const HomeCards = ({cards}) => {
  const getCardSize = (index) => {
    if (index === 0) return "big";

    const sizePattern = [
      "extrasmall",
      "medium",
      "small",
      "extrasmall",
      "small",
      "small",
      "small",
    ];
    return sizePattern[(index - 1) % sizePattern.length];
  };

  return (
    <div className="g-container">
      <div className={styles.container}>
        {cards.map((project, index) => (
          <Card
            key={index}
            className={styles[getCardSize(index)]}
            title={project.title}
            description={project.short_description}
            tags={project.tags}
            image={project.image}
            slug={project.slug}
          />
        ))}
        <Talk />
      </div>
    </div>
  );
};

export default HomeCards;
