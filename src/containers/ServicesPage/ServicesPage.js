"use client";

import { useState } from "react";
import { ServiceCards } from "@/components/ServiceCards/ServiceCards";
import styles from "./ServicesPage.module.scss";
import ServicesHeader from "@/components/ServicesHeader/ServicesHeader";
import TitleArea from "@/components/TitleArea/TitleArea";

const ServicesPage = ({data}) => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <main className={styles.servicesPage}>
      <TitleArea
        title="our SERVICES"
        description="Innovative UX/UI Design solutions for your Brand"
      />
      <ServicesHeader
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        categories={data?.results?.categories || []}
      />
      <ServiceCards activeFilter={activeFilter} data={data?.results || {}}/>
    </main>
  );
};

export default ServicesPage;
