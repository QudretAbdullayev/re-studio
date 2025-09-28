import { useRef } from 'react';
import SafeImage from '../SafeImage/SafeImage'
import styles from './DetailMainImage.module.scss'

const DetailMainImage = ({image, title, onClick}) => {
  const touchStartRef = useRef(null);
  const hasMoved = useRef(false);

  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
    hasMoved.current = false;
  };

  const handleTouchMove = (e) => {
    if (!touchStartRef.current) return;
    
    const currentTouch = e.touches[0];
    const deltaX = Math.abs(currentTouch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(currentTouch.clientY - touchStartRef.current.y);
    
    // 10px'den fazla hareket varsa scroll/swipe olarak kabul et
    if (deltaX > 10 || deltaY > 10) {
      hasMoved.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!touchStartRef.current || hasMoved.current) {
      touchStartRef.current = null;
      return;
    }

    // Çok kısa dokunmalar da ignore edilebilir (accidental touches)
    const touchDuration = Date.now() - touchStartRef.current.time;
    if (touchDuration < 50) {
      touchStartRef.current = null;
      return;
    }

    if (onClick) {
      onClick();
    }
    
    touchStartRef.current = null;
  };

  const handleClick = (e) => {
    // Touch device'larda onClick'i devre dışı bırak
    if ('ontouchstart' in window) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={styles.main} 
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <SafeImage fill src={image} alt={title}/>
    </div>
  )
}

export default DetailMainImage
