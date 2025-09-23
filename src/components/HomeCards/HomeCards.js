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

  // Group cards based on the grid structure
  const bigCard = cards[0];
  const extrasmallandMedium = cards.slice(1, 3); // extrasmall and medium
  const smallCards = cards.slice(3, 6); // 3 small cards
  const remainingSmallCards = cards.slice(6); // remaining small cards

  return (
    <div className="g-container">
      <div className={styles.container}>
        {/* Grid 1: Big card (1 column 100%) */}
        <div className={styles.grid1}>
          <Card
            className={styles.big}
            title={bigCard.title}
            description={bigCard.short_description}
            tags={bigCard.tags}
            image={bigCard.image}
            slug={bigCard.slug}
          />
        </div>

        {/* Grid 2: Extrasmall + Medium (485rem + auto) */}
        <div className={styles.grid2}>
          <Card
            className={styles.extrasmall}
            title={extrasmallandMedium[0]?.title}
            description={extrasmallandMedium[0]?.short_description}
            tags={extrasmallandMedium[0]?.tags}
            image={extrasmallandMedium[0]?.image}
            slug={extrasmallandMedium[0]?.slug}
          />
          <Card
            className={styles.medium}
            title={extrasmallandMedium[1]?.title}
            description={extrasmallandMedium[1]?.short_description}
            tags={extrasmallandMedium[1]?.tags}
            image={extrasmallandMedium[1]?.image}
            slug={extrasmallandMedium[1]?.slug}
          />
        </div>

        {/* Grid 3: small + extrasmall + small cards */}
        <div className={styles.grid3}>
          {smallCards.map((project, index) => {
            // Pattern: small, extrasmall, small
            let cardSize = "small";
            if (index === 1) cardSize = "extrasmall"; // Middle card is extrasmall
            
            return (
              <Card
                key={index + 3}
                className={styles[cardSize]}
                title={project.title}
                description={project.short_description}
                tags={project.tags}
                image={project.image}
                slug={project.slug}
              />
            );
          })}
        </div>

        {/* Grid 4: small + small + extrasmall (with Talk) */}
        <div className={styles.grid4}>
          {remainingSmallCards.slice(0, 2).map((project, index) => (
            <Card
              key={index + 6}
              className={styles.small}
              title={project.title}
              description={project.short_description}
              tags={project.tags}
              image={project.image}
              slug={project.slug}
            />
          ))}
          <div className={styles.extrasmall}>
            <Talk />
          </div>
        </div>

        {/* Any additional remaining cards */}
        {remainingSmallCards.slice(2).map((project, index) => (
          <Card
            key={index + 8}
            className={styles.small}
            title={project.title}
            description={project.short_description}
            tags={project.tags}
            image={project.image}
            slug={project.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCards;
