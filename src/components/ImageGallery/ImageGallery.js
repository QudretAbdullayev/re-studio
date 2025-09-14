import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Zoom } from 'swiper/modules';
import SafeImage from '../SafeImage/SafeImage';
import styles from './ImageGallery.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import Close from '@/assets/icons/Close';
import ArrowLeft from '@/assets/icons/ArrowLeft';
import ArrowRight from '@/assets/icons/ArrowRight';

const ImageGallery = ({ images, isOpen, onClose, initialSlide = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveIndex(initialSlide);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrevSlide = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.galleryContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <Close />
        </button>
        
        <Swiper
          modules={[Keyboard, Zoom]}
          navigation={false}
          keyboard={{ enabled: true }}
          touchRatio={1}
          touchAngle={45}
          threshold={5}
          touchStartPreventDefault={false}
          touchMoveStopPropagation={false}
          allowTouchMove={true}
          zoom={{
            maxRatio: 3,
            minRatio: 1,
          }}
          initialSlide={initialSlide}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={setSwiperRef}
          className={styles.swiper}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <div className="swiper-zoom-container">
                <SafeImage
                  src={image.src}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  className={styles.galleryImage}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.navigation}>
            {activeIndex > 0 && (
                <button className={`${styles.navigationButton} ${styles.left}`} onClick={handlePrevSlide}>
                    <ArrowLeft />
                </button>
            )}
            {activeIndex < images.length - 1 && (
                <button className={`${styles.navigationButton} ${styles.right}`} onClick={handleNextSlide}>
                    <ArrowRight />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
