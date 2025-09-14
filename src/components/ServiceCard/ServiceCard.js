"use client";
import ServiceCardImage from "../ServiceCardImage/ServiceCardImage";
import ServiceCardList from "../ServiceCardList/ServiceCardList";
import ServiceCardTitle from "../ServiceCardTitle/ServiceCardTitle";
import styles from "./ServiceCard.module.scss";

const ServiceCard = ({ serviceData, className }) => {
  
  return className === "serviceCardSecond" ? <div className={styles[className]}>
    <div className={styles.serviceCardSecondContent}>
      <ServiceCardTitle className={styles.title} serviceData={serviceData?.title} />
      <ServiceCardList className={styles.list} listData={serviceData?.list} />
    </div>
    <ServiceCardImage className={styles.image} />
  </div> : <div className={styles[className]}>
    <ServiceCardImage className={styles.image} />
    <ServiceCardTitle className={styles.title} serviceData={serviceData?.title} />
    <ServiceCardList className={styles.list} listData={serviceData?.list} />
  </div>;
};

export default ServiceCard;
