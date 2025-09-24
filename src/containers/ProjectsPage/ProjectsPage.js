"use client";
import FilterTabs from "@/components/FilterTabs/FilterTabs";
import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/Card/Card";
import Talk from "@/components/Talk/Talk";
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

    const timer = setTimeout(autoLoadMore, 1000);
    return () => clearTimeout(timer);
  }, [nextPage, isLoading, currentPage]);

  const filterTabs = useMemo(() => {
    const tabs = [
      {
        label: "All",
        count: caseStudies.count,
        active: activeFilter === "All",
      },
    ];

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

  const handleFilterChange = async (filterLabel) => {
    setActiveFilter(filterLabel);
    
    if (filterLabel === "All") {
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

  const projectGroups = useMemo(() => {
    const createProjectGroups = () => {
      const groups = [];
      let cardIndex = 0;

    if (projects[cardIndex]) {
      groups.push({
        type: 'big',
        cards: [projects[cardIndex]]
      });
      cardIndex++;
    }

    let patternStep = 0; 

    while (cardIndex < projects.length) {
      if (patternStep === 0) {
        if (cardIndex < projects.length) {
          const extrasmallandMedium = projects.slice(cardIndex, cardIndex + 2);
          if (extrasmallandMedium.length > 0) {
            groups.push({
              type: 'extrasmallandMedium',
              cards: extrasmallandMedium
            });
            cardIndex += extrasmallandMedium.length;
          }
        }
        patternStep = 1;
      } else if (patternStep === 1) {
        if (cardIndex < projects.length) {
          const smallCards = projects.slice(cardIndex, cardIndex + 3);
          if (smallCards.length > 0) {
            groups.push({
              type: 'smallCards',
              cards: smallCards
            });
            cardIndex += 3;
          }
        }
        patternStep = 2;
      } else if (patternStep === 2) {
        if (cardIndex < projects.length) {
          const mediumExtraSmall = projects.slice(cardIndex, cardIndex + 2);
          if (mediumExtraSmall.length > 0) {
            groups.push({
              type: 'mediumExtraSmall',
              cards: mediumExtraSmall
            });
            cardIndex += mediumExtraSmall.length;
          }
        }
        patternStep = 3;
      } else if (patternStep === 3) {
        if (cardIndex < projects.length) {
          const finalGroup = projects.slice(cardIndex, cardIndex + 2); 
          groups.push({
            type: 'finalGroup',
            cards: finalGroup,
            includeTalk: true 
          });
          cardIndex += finalGroup.length;
        }
        patternStep = 0;
      }
    }

      return groups;
    };

    return createProjectGroups();
  }, [projects]);

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
          {projectGroups.map((group, groupIndex) => {
            if (group.type === 'big') {
              return (
                <div key={`big-${groupIndex}`} className={styles.grid1}>
                  <Card
                    className={styles.big}
                    title={group.cards[0].title}
                    description={group.cards[0].short_description}
                    tags={group.cards[0].tags}
                    image={group.cards[0].image}
                    slug={group.cards[0].slug}
                  />
                </div>
              );
            }

            if (group.type === 'extrasmallandMedium') {
              return (
                <div key={`extrasmall-medium-${groupIndex}`} className={styles.grid2}>
                  {group.cards[0] && (
                    <Card
                      className={styles.extrasmall}
                      title={group.cards[0].title}
                      description={group.cards[0].short_description}
                      tags={group.cards[0].tags}
                      image={group.cards[0].image}
                      slug={group.cards[0].slug}
                    />
                  )}
                  {group.cards[1] && (
                    <Card
                      className={styles.medium}
                      title={group.cards[1].title}
                      description={group.cards[1].short_description}
                      tags={group.cards[1].tags}
                      image={group.cards[1].image}
                      slug={group.cards[1].slug}
                    />
                  )}
                </div>
              );
            }

            if (group.type === 'smallCards') {
              return (
                <div key={`small-cards-${groupIndex}`} className={styles.grid3}>
                  {group.cards.map((project, index) => {
                    let cardSize = "small";
                    if (index === 1) cardSize = "extrasmall";
                    
                    return (
                      <Card
                        key={`small-${groupIndex}-${index}`}
                        className={styles[cardSize]}
                        title={project.title}
                        description={project.short_description}
                        tags={project.tags}
                        image={project.image}
                        slug={project.slug}
                      />
                    );
                  })}
                </div>
              );
            }

            if (group.type === 'mediumExtraSmall') {
              return (
                <div key={`medium-extrasmall-${groupIndex}`} className={styles.grid4}>
                  {group.cards[0] && (
                    <Card
                      className={styles.medium}
                      title={group.cards[0].title}
                      description={group.cards[0].short_description}
                      tags={group.cards[0].tags}
                      image={group.cards[0].image}
                      slug={group.cards[0].slug}
                    />
                  )}
                  {group.cards[1] && (
                    <Card
                      className={styles.extrasmall}
                      title={group.cards[1].title}
                      description={group.cards[1].short_description}
                      tags={group.cards[1].tags}
                      image={group.cards[1].image}
                      slug={group.cards[1].slug}
                    />
                  )}
                </div>
              );
            }

            if (group.type === 'finalGroup') {
              return (
                <div key={`final-${groupIndex}`} className={styles.grid5}>
                  {group.includeTalk ? (
                    <div className={styles.extrasmall}>
                      <Talk works={false} />
                    </div>
                  ) : (
                    group.cards[0] && (
                      <Card
                        className={styles.extrasmall}
                        title={group.cards[0].title}
                        description={group.cards[0].short_description}
                        tags={group.cards[0].tags}
                        image={group.cards[0].image}
                        slug={group.cards[0].slug}
                      />
                    )
                  )}
                  {group.includeTalk ? (
                    group.cards[0] && (
                      <Card
                        className={styles.small}
                        title={group.cards[0].title}
                        description={group.cards[0].short_description}
                        tags={group.cards[0].tags}
                        image={group.cards[0].image}
                        slug={group.cards[0].slug}
                      />
                    )
                  ) : (
                    group.cards[1] && (
                      <Card
                        className={styles.small}
                        title={group.cards[1].title}
                        description={group.cards[1].short_description}
                        tags={group.cards[1].tags}
                        image={group.cards[1].image}
                        slug={group.cards[1].slug}
                      />
                    )
                  )}
                  {group.includeTalk ? (
                    group.cards[1] && (
                      <Card
                        className={styles.small}
                        title={group.cards[1].title}
                        description={group.cards[1].short_description}
                        tags={group.cards[1].tags}
                        image={group.cards[1].image}
                        slug={group.cards[1].slug}
                      />
                    )
                  ) : (
                    group.cards[2] && (
                      <Card
                        className={styles.small}
                        title={group.cards[2].title}
                        description={group.cards[2].short_description}
                        tags={group.cards[2].tags}
                        image={group.cards[2].image}
                        slug={group.cards[2].slug}
                      />
                    )
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>
      </section>
      {isLoading && (
        <LoadingButton/>
      )}
    </main>
  );
};

export default ProjectsPage;
