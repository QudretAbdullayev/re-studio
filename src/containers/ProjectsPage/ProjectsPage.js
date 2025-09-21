"use client";
import FilterTabs from "@/components/FilterTabs/FilterTabs";
import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/Card/Card";
import styles from "./ProjectsPage.module.scss";
import TitleArea from "@/components/TitleArea/TitleArea.js";
import { fetchData } from '@/utils/httpService';
import LoadingButton from "@/components/LoadingButton/LoadingButton";

const ProjectsPage = ({ caseStudies, data }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState(caseStudies?.results || []);
  const [categories, setCategories] = useState(caseStudies?.categories || []);
  const [nextPage, setNextPage] = useState(caseStudies?.next || null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Auto-load more data when component mounts or when there's more data to load
  useEffect(() => {
    const autoLoadMore = async () => {
      if (!nextPage || isLoading) return;
      
      setIsLoading(true);
      try {
        const response = await fetchData(`case_studies/case_studies/?page=${currentPage + 1}&page_size=4`);
        
        if (response.results) {
          setProjects(prev => [...prev, ...response.results]);
          setNextPage(response.next);
          setCurrentPage(prev => prev + 1);
        }
      } catch (error) {
        console.error('Error auto-loading more projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Auto-load after a short delay to ensure smooth UX
    const timer = setTimeout(autoLoadMore, 1000);
    return () => clearTimeout(timer);
  }, [nextPage, isLoading, currentPage]);


  // Create filter tabs dynamically based on API categories
  const filterTabs = useMemo(() => {
    const tabs = [
      {
        label: "All",
        count: caseStudies.count,
        active: activeFilter === "All",
      },
    ];

    // Add categories with count > 0
    categories.forEach((category) => {
      if (category.count > 0) {
        tabs.push({
          label: category.title,
          count: category.count,
          active: activeFilter === category.title,
          id: category.id,
        });
      }
    });

    return tabs;
  }, [activeFilter, categories, caseStudies.count]);

  // Filter projects by category
  const handleFilterChange = async (filterLabel) => {
    setActiveFilter(filterLabel);
    
    if (filterLabel === "All") {
      // Reset to initial data
      setProjects(caseStudies?.results || []);
      setNextPage(caseStudies?.next || null);
      setCurrentPage(1);
      return;
    }

    const selectedCategory = categories.find(cat => cat.title === filterLabel);
    if (selectedCategory) {
      setIsLoading(true);
      try {
        const response = await fetchData(`case_studies/case_studies/?page=1&page_size=10&category=${selectedCategory.id}`);
        
        if (response.results) {
          setProjects(response.results);
          setNextPage(response.next);
          setCurrentPage(1);
        }
      } catch (error) {
        console.error('Error filtering projects:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Same card sizing logic as HomeCards
  const getCardSize = (index) => {
    if (index === 0) return "big";

    const sizePattern = [
      "extrasmall",
      "medium",
      "small",
      "extrasmall",
      "small",
      "small",
      "small",
    ];
    return sizePattern[(index - 1) % sizePattern.length];
  };

  return (
    <main className={styles.projectsPage}>
      <TitleArea
        title={data?.section?.label}
        description={data?.section?.title}
      />
      <FilterTabs
        tabs={filterTabs}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <section className="g-container">
        <div className={styles.container}>
          {projects.map((project, index) => (
            <Card
              key={`${project.slug}-${index}`}
              className={styles[getCardSize(index)]}
              title={project.title}
              description={project.short_description}
              tags={project.tags}
              image={project.image}
              slug={project.slug}
            />
          ))}
        </div>
      </section>
      {isLoading && (
        <LoadingButton/>
      )}
    </main>
  );
};

export default ProjectsPage;
