"use client";

import { Fragment, useState, useMemo, forwardRef, useImperativeHandle } from "react";
import DetailImageCard from "../DetailImageCard/DetailImageCard";
import DetailMainImage from "../DetailMainImage/DetailMainImage";
import ImageGallery from "../ImageGallery/ImageGallery";
import styles from "./DetailCardRightSide.module.scss";

const DetailCardRightSide = forwardRef(({ data, image, title }, ref) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  // Collect all images for the gallery and create a mapping
  const { galleryImages, imageMapping } = useMemo(() => {
    const images = [];
    const mapping = new Map();
    let currentIndex = 0;
    
    // Add main image
    if (image) {
      images.push({
        src: image,
        alt: title || "Main image"
      });
      mapping.set('main', currentIndex);
      currentIndex++;
    }

    // Add images from data sections
    if (data && Array.isArray(data)) {
      data.forEach((item, itemIndex) => {
        if (item.layout_type === "full_image" && item.image_full) {
          images.push({
            src: item.image_full,
            alt: item.title || "Gallery image"
          });
          mapping.set(`full_${itemIndex}`, currentIndex);
          currentIndex++;
        } else if (item.layout_type === "left_right") {
          if (item.image_left) {
            images.push({
              src: item.image_left,
              alt: item.title || "Gallery image"
            });
            mapping.set(`left_${itemIndex}`, currentIndex);
            currentIndex++;
          }
          if (item.image_right) {
            images.push({
              src: item.image_right,
              alt: item.title || "Gallery image"
            });
            mapping.set(`right_${itemIndex}`, currentIndex);
            currentIndex++;
          }
        }
      });
    }

    return { galleryImages: images, imageMapping: mapping };
  }, [data, image, title]);

  const openGallery = (imageKey) => {
    const imageIndex = imageMapping.get(imageKey);
    if (imageIndex !== undefined) {
      setInitialSlide(imageIndex);
      setIsGalleryOpen(true);
    }
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openMainImageGallery: () => openGallery('main')
  }));

  return (
    <aside className={styles.container}>
      <div className={styles.mainImageContainer}>
        <DetailMainImage 
          image={image} 
          title={title} 
          onClick={() => openGallery('main')}
        />
      </div>
      <div className={styles.cards}>
        {data.map((item, idx) => {
          if (item.layout_type === "full_image") {
            return (
              <DetailImageCard
                key={idx}
                imageSrc={item.image_full}
                alt={item.title}
                className={styles.full}
                onClick={() => openGallery(`full_${idx}`)}
              />
            );
          } else if (item.layout_type === "left_right") {
            return (
              <Fragment key={idx}>
                <DetailImageCard
                  imageSrc={item.image_left}
                  alt={item.title}
                  className={styles.half}
                  onClick={() => openGallery(`left_${idx}`)}
                />
                <DetailImageCard
                  imageSrc={item.image_right}
                  alt={item.title}
                  className={styles.half}
                  onClick={() => openGallery(`right_${idx}`)}
                />
              </Fragment>
            );
          } else if (item.layout_type === "full_text") {
            return (
              <DetailImageCard
                key={idx}
                text={item.text}
                className={styles.full}
              />
            );
          }
          return null;
        })}
      </div>

      <ImageGallery
        images={galleryImages}
        isOpen={isGalleryOpen}
        onClose={closeGallery}
        initialSlide={initialSlide}
      />
    </aside>
  );
});

DetailCardRightSide.displayName = 'DetailCardRightSide';

export default DetailCardRightSide;
