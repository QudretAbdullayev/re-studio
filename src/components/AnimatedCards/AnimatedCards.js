"use client";
import { useState, useEffect, useRef } from 'react';
import Card from '../Card/Card';
import styles from './AnimatedCards.module.scss';

export default function AnimatedCards({ data }) {
  const [cards, setCards] = useState([]);
  const containerRef = useRef(null);

  const cardData = data?.results || [];

  useEffect(() => {
    if (typeof window !== 'undefined' && cardData && cardData.length > 0) {
      const maxCards = Math.min(5, cardData.length);
      const initialCards = [];

      for (let i = 0; i < maxCards; i++) {
        const size = i < 2 ? 'extrasmall' : 'extraextrasmall';
        const card = cardData[i];

        if (card) {
          initialCards.push({
            id: Date.now() + Math.random() + i,
            ...card,
            position: `position${i}`,
            size,
            isVisible: true
          });
        }
      }

      setCards(initialCards);
    }
  }, [cardData]);

  return (
    <div ref={containerRef} className={styles.container}>
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${styles.cardWrapper} ${styles[card.position]} ${card.isVisible ? styles.visible : styles.hidden}`}
        >
          <Card
            className={styles[card.size]}
            image={card.image}
            slug={card.slug}
            {...(card.size === 'extraextrasmall' ? {
              slug: card.slug,
            } : {
              title: card.title,
              description: card.short_description,
              tags: card.tags,
              slug: card.slug,
            })}
          />
        </div>
      ))}
    </div>
  );
}
