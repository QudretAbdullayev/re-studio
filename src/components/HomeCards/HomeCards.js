import React from "react";
import Card from "../Card/Card";
import styles from "./HomeCards.module.scss";
import Talk from "../Talk/Talk";

const HomeCards = ({cards}) => {
  const createCardGroups = () => {
    const groups = [];
    let cardIndex = 0;
    let talkAdded = false;

    const talkShouldAppearAt = 6;
    
    if (cards[cardIndex]) {
      groups.push({
        type: 'big',
        cards: [cards[cardIndex]]
      });
      cardIndex++;
    }

    let isFirstRemainingSmallCards = true;
    
    while (cardIndex < cards.length) {
      if (cardIndex < cards.length) {
        const extrasmallandMedium = cards.slice(cardIndex, cardIndex + 2);
        if (extrasmallandMedium.length > 0) {
          if (!talkAdded && extrasmallandMedium.length === 1) {
            groups.push({
              type: 'extrasmallandMedium',
              cards: extrasmallandMedium,
              includeTalk: true
            });
            cardIndex += 1;
            talkAdded = true;
          } else {
            groups.push({
              type: 'extrasmallandMedium',
              cards: extrasmallandMedium
            });
            cardIndex += extrasmallandMedium.length;
          }
        }
      }
      if (cardIndex < cards.length) {
        const smallCards = cards.slice(cardIndex, cardIndex + 3);
        if (smallCards.length > 0) {
          if (!talkAdded) {
            if (smallCards.length < 3) {
              groups.push({
                type: 'smallCards',
                cards: smallCards,
                includeTalk: true
              });
              cardIndex += smallCards.length;
              talkAdded = true;
            } else {
              const remainingCardsAfterThis = cards.length - (cardIndex + 3);
              const canReachRemainingSmallCards = remainingCardsAfterThis >= 2;
              
              if (!canReachRemainingSmallCards) {
                groups.push({
                  type: 'smallCards',
                  cards: smallCards,
                  addTalkAfter: true
                });
                cardIndex += 3;
                talkAdded = true;
              } else {
                groups.push({
                  type: 'smallCards',
                  cards: smallCards
                });
                cardIndex += 3;
              }
            }
          } else {
            groups.push({
              type: 'smallCards',
              cards: smallCards
            });
            cardIndex += 3;
          }
        }
      }

      if (cardIndex < cards.length) {
        const remainingCards = cards.slice(cardIndex, cardIndex + (isFirstRemainingSmallCards && !talkAdded ? 2 : 3));
        if (remainingCards.length > 0) {
          groups.push({
            type: 'remainingSmallCards',
            cards: remainingCards,
            includeTalk: isFirstRemainingSmallCards && !talkAdded
          });
          cardIndex += remainingCards.length;
          if (isFirstRemainingSmallCards && !talkAdded) {
            talkAdded = true;
          }
          isFirstRemainingSmallCards = false;
        }
      }
    }
    
    return groups;
  };

  const cardGroups = createCardGroups();

  return (
    <div className="g-container">
      <div className={styles.container}>
        {cardGroups.map((group, groupIndex) => {
          if (group.type === 'big') {
            return (
              <div key={`big-${groupIndex}`} className={styles.grid1}>
                <Card
                  className={styles.big}
                  title={group.cards[0].title}
                  description={group.cards[0].short_description}
                  tags={group.cards[0].tags}
                  image={group.cards[0].image}
                  slug={group.cards[0].slug}
                />
              </div>
            );
          }

          if (group.type === 'extrasmallandMedium') {
            return (
              <div key={`extrasmall-medium-${groupIndex}`} className={styles.grid2}>
                {group.cards[0] && (
                  <Card
                    className={styles.extrasmall}
                    title={group.cards[0].title}
                    description={group.cards[0].short_description}
                    tags={group.cards[0].tags}
                    image={group.cards[0].image}
                    slug={group.cards[0].slug}
                  />
                )}
                {group.cards[1] ? (
                  <Card
                    className={styles.medium}
                    title={group.cards[1].title}
                    description={group.cards[1].short_description}
                    tags={group.cards[1].tags}
                    image={group.cards[1].image}
                    slug={group.cards[1].slug}
                  />
                ) : (
                  group.includeTalk && (
                    <div className={styles.mediumTalk}>
                      <Talk />
                    </div>
                  )
                )}
              </div>
            );
          }

          if (group.type === 'smallCards') {
            return (
              <React.Fragment key={`small-cards-${groupIndex}`}>
                <div className={styles.grid3}>
                  {group.cards.map((project, index) => {
                    let cardSize = "small";
                    if (index === 1) cardSize = "extrasmall";
                    
                    return (
                      <Card
                        key={`small-${groupIndex}-${index}`}
                        className={styles[cardSize]}
                        title={project.title}
                        description={project.short_description}
                        tags={project.tags}
                        image={project.image}
                        slug={project.slug}
                      />
                    );
                  })}
                  {group.includeTalk && (
                    <div className={styles.extrasmallTalk}>
                      <Talk />
                    </div>
                  )}
                </div>
                {group.addTalkAfter && (
                  <div className={styles.grid4}>
                    <div className={styles.extrasmallTalk}>
                      <Talk />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          }

          if (group.type === 'remainingSmallCards') {
            return (
              <div key={`remaining-${groupIndex}`} className={styles.grid4}>
                {group.cards.slice(0, 2).map((project, index) => (
                  <Card
                    key={`remaining-${groupIndex}-${index}`}
                    className={styles.small}
                    title={project.title}
                    description={project.short_description}
                    tags={project.tags}
                    image={project.image}
                    slug={project.slug}
                  />
                ))}
                {group.includeTalk ? (
                  <div className={styles.extrasmallTalk}>
                    <Talk />
                  </div>
                ) : (
                  group.cards[2] && (
                    <Card
                      key={`remaining-${groupIndex}-2`}
                      className={styles.extrasmall}
                      title={group.cards[2].title}
                      description={group.cards[2].short_description}
                      tags={group.cards[2].tags}
                      image={group.cards[2].image}
                      slug={group.cards[2].slug}
                    />
                  )
                )}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default HomeCards;
