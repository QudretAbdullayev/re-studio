"use client";
import { useState, useEffect, useRef } from 'react';
import Card from '../Card/Card';
import styles from './AnimatedCards.module.scss';

export default function AnimatedCards({ data }) {
  const [cards, setCards] = useState([]);
  const containerRef = useRef(null);

  // Use actual API data or fallback to empty array
  const cardData = data?.results || [];

  const getFixedPositions = () => {
    if (typeof window === 'undefined') {
      // SSR için fallback pozisyonlar
      return [
        { x: 50, y: 150, width: 358, height: 260 },
        { x: 50, y: 450, width: 230, height: 176 },
        { x: 800, y: 150, width: 358, height: 260 },
        { x: 1000, y: 450, width: 230, height: 176 },
        { x: 500, y: 50, width: 358, height: 260 }
      ];
    }
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 5 sabit pozisyon tanımla
    const positions = [
      { x: 50, y: 150, width: 358, height: 260 },      // Sol üst
      { x: 50, y: 450, width: 230, height: 176 },     // Sol alt
      { x: viewportWidth - 408, y: 150, width: 358, height: 260 }, // Sağ üst
      { x: viewportWidth - 280, y: 450, width: 230, height: 176 }, // Sağ alt
      { x: viewportWidth / 2 - 179, y: 50, width: 358, height: 260 } // Üst orta
    ];
    
    return positions;
  };

  const getFixedPosition = (index) => {
    const positions = getFixedPositions();
    
    if (positions.length === 0) {
      return { x: 50, y: 50, width: 230, height: 176, index: 0 };
    }
    
    const positionIndex = index % positions.length;
    const pos = positions[positionIndex];
    
    return {
      x: pos.x,
      y: pos.y,
      width: pos.width,
      height: pos.height,
      index: positionIndex
    };
  };


  useEffect(() => {
    console.log('useEffect triggered, cardData:', cardData?.length);
    // Kartları direkt ekranda göster
    if (typeof window !== 'undefined' && cardData && cardData.length > 0) {
      console.log('Adding all cards immediately');
      
      // Tüm kartları hemen ekle (maksimum 5 adet)
      const maxCards = Math.min(5, cardData.length);
      const initialCards = [];
      
      for (let i = 0; i < maxCards; i++) {
        const position = getFixedPosition(i);
        const size = position.width === 358 ? 'extrasmall' : 'extraextrasmall';
        const card = cardData[i];
        
        if (card) {
          initialCards.push({
            id: Date.now() + Math.random() + i,
            ...card,
            position,
            size,
            isVisible: true // Direkt görünür yap
          });
        }
      }
      
      setCards(initialCards);
      console.log('Added', initialCards.length, 'cards');
    } else {
      console.log('Not adding cards - window:', typeof window !== 'undefined', 'cardData:', cardData?.length);
    }
  }, [cardData]);

  console.log('Rendering cards:', cards.length, cards.map(c => ({ id: c.id, isVisible: c.isVisible, position: c.position })));

  return (
    <div ref={containerRef} className={styles.container}>
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${styles.cardWrapper} ${card.isVisible ? styles.visible : styles.hidden}`}
          style={{
            left: `${card.position.x}px`,
            top: `${card.position.y}px`,
          }}
        >
          <Card
            className={styles[card.size]}
            image={card.image}
            slug={card.slug}
            {...(card.size === 'extraextrasmall' ? {} : {
              title: card.title,
              description: card.short_description,
              tags: card.tags
            })}
          />
        </div>
      ))}
    </div>
  );
}
