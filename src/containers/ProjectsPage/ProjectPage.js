"use client";
import { useRef, useState } from "react";
import DetailCardLeftSide from "@/components/DetailCardLeftSide/DetailCardLeftSide";
import DetailCardRightSide from "@/components/DetailCardRightSide/DetailCardRightSide";
import styles from "./ProjectPage.module.scss";
import OtherWorks from "@/components/OtherWorks/OtherWorks";

const ProjectPage = ({data, otherWorksData}) => {
  const rightSideRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const handleMainImageClick = () => {
    if (isScrolling) {
      return;
    }
    
    if (rightSideRef.current) {
      rightSideRef.current.openMainImageGallery();
    }
  };

  const handleTouchStart = () => {
    setIsScrolling(false);
  };

  const handleTouchMove = () => {
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  return (
    <main className={styles.container}>
      <section className={styles.section}>
        <DetailCardLeftSide 
          data={data} 
          onMainImageClick={handleMainImageClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />
        <DetailCardRightSide 
          ref={rightSideRef}
          data={data.sections} 
          image={data.image} 
          title={data.title}
        />
      </section>
      <OtherWorks otherWorksData={otherWorksData} slug={data.slug}/>
    </main>
  );
};

export default ProjectPage;
