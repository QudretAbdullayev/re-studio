"use client";
import { useState, useEffect, useRef } from 'react';
import Card from '../Card/Card';
import styles from './AnimatedCards.module.scss';

export default function AnimatedCards({ data }) {
  const [cards, setCards] = useState([]);
  const [usedPositions, setUsedPositions] = useState([]);
  const [usedCardIds, setUsedCardIds] = useState(new Set()); // 3. sorun için
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // Use actual API data or fallback to empty array
  const cardData = data?.results || [];

  const calculateSafePositions = () => {
    if (typeof window === 'undefined') return [];
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isMobile = viewportWidth <= 700;
    
    // Kart boyutları
    const extraSmallWidth = 358;
    const extraSmallHeight = 260;
    const extraExtraSmallWidth = 230;
    const extraExtraSmallHeight = 176;
    
    // En büyük kart boyutunu kullan (güvenlik için)
    const maxCardWidth = Math.max(extraSmallWidth, extraExtraSmallWidth);
    const maxCardHeight = Math.max(extraSmallHeight, extraExtraSmallHeight);
    
    // Ana içerik alanı hesaplama
    const mainContentWidth = isMobile ? viewportWidth - 40 : Math.min(994, viewportWidth - 510);
    const mainContentLeft = isMobile ? 20 : (viewportWidth - mainContentWidth) / 2;
    const mainContentRight = mainContentLeft + mainContentWidth;
    const headerHeight = 104;
    const margin = 30;
    
    const positions = [];
    
    // 1. SORUN FİX: Ekrandan taşmayacak şekilde pozisyon hesaplama
    const safeArea = {
      left: margin,
      top: margin,
      right: viewportWidth - maxCardWidth - margin,
      bottom: viewportHeight - maxCardHeight - margin,
    };
    
    // Sol taraf boş alanları (ana içeriğin solunda)
    if (mainContentLeft > maxCardWidth + margin * 2) {
      positions.push(
        { 
          x: Math.max(safeArea.left, 20), 
          y: Math.max(safeArea.top, headerHeight + 50),
          width: maxCardWidth,
          height: maxCardHeight
        },
        { 
          x: Math.max(safeArea.left, 30), 
          y: Math.min(safeArea.bottom, viewportHeight * 0.4),
          width: maxCardWidth,
          height: maxCardHeight
        },
        { 
          x: Math.max(safeArea.left, 15), 
          y: Math.min(safeArea.bottom, viewportHeight * 0.7),
          width: maxCardWidth,
          height: maxCardHeight
        },
      );
    }
    
    // Sağ taraf boş alanları (ana içeriğin sağında)
    if (viewportWidth - mainContentRight > maxCardWidth + margin * 2) {
      const rightX = Math.min(safeArea.right, mainContentRight + margin);
      positions.push(
        { 
          x: rightX, 
          y: Math.max(safeArea.top, headerHeight + 80),
          width: maxCardWidth,
          height: maxCardHeight
        },
        { 
          x: rightX, 
          y: Math.min(safeArea.bottom, viewportHeight * 0.4),
          width: maxCardWidth,
          height: maxCardHeight
        },
        { 
          x: rightX, 
          y: Math.min(safeArea.bottom, viewportHeight * 0.7),
          width: maxCardWidth,
          height: maxCardHeight
        },
      );
    }
    
    // Üst boş alanlar
    if (headerHeight > maxCardHeight + margin * 2) {
      positions.push({ 
        x: Math.min(safeArea.right, viewportWidth * 0.2), 
        y: safeArea.top,
        width: maxCardWidth,
        height: maxCardHeight
      });
    }
    
    return positions.slice(0, 7);
  };

  // 2. SORUN FİX: Çakışma kontrolü
  const isPositionSafe = (newPos, newWidth, newHeight) => {
    const buffer = 50; // Kartlar arası minimum mesafe
    
    return !usedPositions.some(usedPos => {
      const xOverlap = newPos.x < usedPos.x + usedPos.width + buffer && 
                      newPos.x + newWidth + buffer > usedPos.x;
      const yOverlap = newPos.y < usedPos.y + usedPos.height + buffer && 
                      newPos.y + newHeight + buffer > usedPos.y;
      
      return xOverlap && yOverlap;
    });
  };

  const getFixedPosition = (cardSize) => {
    const availablePositions = calculateSafePositions();
    
    if (availablePositions.length === 0) {
      return { x: 50, y: 50, width: 230, height: 176, index: 0 };
    }
    
    // Kart boyutlarını belirle
    const cardWidth = cardSize === 'extrasmall' ? 358 : 230;
    const cardHeight = cardSize === 'extrasmall' ? 260 : 176;
    
    // Güvenli pozisyon bul
    for (let i = 0; i < availablePositions.length; i++) {
      const pos = availablePositions[i];
      if (isPositionSafe(pos, cardWidth, cardHeight)) {
        return {
          x: pos.x,
          y: pos.y,
          width: cardWidth,
          height: cardHeight,
          index: i
        };
      }
    }
    
    // Güvenli pozisyon bulunamazsa, mevcut pozisyonları temizle
    if (usedPositions.length > 0) {
      const firstPos = availablePositions[0];
      return {
        x: firstPos.x,
        y: firstPos.y,
        width: cardWidth,
        height: cardHeight,
        index: 0
      };
    }
    
    return { x: 50, y: 50, width: cardWidth, height: cardHeight, index: 0 };
  };

  // 3. SORUN FİX: Tüm liste bitene kadar tekrarlamama
  const getUniqueCard = () => {
    if (cardData.length === 0) return null;
    
    // Eğer tüm kartlar kullanıldıysa, sıfırla
    if (usedCardIds.size >= cardData.length) {
      setUsedCardIds(new Set());
    }
    
    // Kullanılmamış kartları filtrele
    const availableCards = cardData.filter(card => !usedCardIds.has(card.id));
    
    if (availableCards.length === 0) {
      // Eğer hala boşsa, ilk kartı kullan
      return cardData[0];
    }
    
    // Rastgele kullanılmamış kart seç
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];
    
    // Kullanılan kartlar listesine ekle
    setUsedCardIds(prev => new Set([...prev, selectedCard.id]));
    
    return selectedCard;
  };

  const addCard = () => {
    // Don't add cards if no data available
    if (!cardData || cardData.length === 0) return;

    if (cards.length >= 5) {
      // Remove the oldest card
      setCards(prev => {
        const newCards = prev.slice(1);
        setUsedPositions(prev => prev.slice(1));
        return newCards;
      });
    }

    // Determine card size based on current count
    const extraSmallCount = cards.filter(c => c.size === 'extrasmall').length;
    const extraExtraSmallCount = cards.filter(c => c.size === 'extraextrasmall').length;
    
    let size;
    if (extraSmallCount < 2) {
      size = 'extrasmall';
    } else if (extraExtraSmallCount < 3) {
      size = 'extraextrasmall';
    } else {
      size = Math.random() < 0.4 ? 'extrasmall' : 'extraextrasmall';
    }

    const position = getFixedPosition(size);
    const card = getUniqueCard(); // 3. sorun için değiştirildi
    
    if (!card) return; // Kart bulunamazsa çık

    const newCard = {
      id: Date.now() + Math.random(),
      ...card,
      position,
      size,
      isVisible: false
    };

    setCards(prev => [...prev, newCard]);
    setUsedPositions(prev => [...prev, position]);

    // Trigger fade in animation
    setTimeout(() => {
      setCards(prev => 
        prev.map(c => 
          c.id === newCard.id ? { ...c, isVisible: true } : c
        )
      );
    }, 100);
  };

  useEffect(() => {
    // Only start the interval if we have data and we're in the browser
    if (typeof window !== 'undefined' && cardData && cardData.length > 0) {
      intervalRef.current = setInterval(addCard, 5000);
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cards, cardData, usedCardIds]);

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
