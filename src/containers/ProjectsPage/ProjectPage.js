"use client";
import { useRef } from "react";
import DetailCardLeftSide from "@/components/DetailCardLeftSide/DetailCardLeftSide";
import DetailCardRightSide from "@/components/DetailCardRightSide/DetailCardRightSide";
import styles from "./ProjectPage.module.scss";
import OtherWorks from "@/components/OtherWorks/OtherWorks";

const ProjectPage = ({data, otherWorksData}) => {
  const rightSideRef = useRef(null);

  const handleMainImageClick = () => {
    if (rightSideRef.current) {
      rightSideRef.current.openMainImageGallery();
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.section}>
        <DetailCardLeftSide 
          data={data} 
          onMainImageClick={handleMainImageClick}
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
