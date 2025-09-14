import React from 'react'
import ServiceCardsTitle from '../ServiceCardsTitle/ServiceCardsTitle'
import ServiceCard from '../ServiceCard/ServiceCard'
import styles from './ServiceCards.module.scss'

export function ServiceCards({ activeFilter, data }) {
  let globalIndex = 0;

  // Transform API data to match the expected format
  const transformApiData = (apiData) => {
    if (!apiData || !apiData.groups) return [];
    
    return apiData.groups.map(group => ({
      title: group.title,
      list: group.items.map(item => ({
        title: {
          subtitle: item.title,
          subdescription: item.description,
          tags: item.tags.map(tag => ({ tag, id: tag.toLowerCase().replace(/\s+/g, '-') }))
        },
        image: item.image,
        list: item.advantages.map((advantage, index) => ({
          id: String(index + 1).padStart(2, '0'),
          description: advantage
        }))
      }))
    }));
  };

  const services = transformApiData(data);

  // Filter services based on activeFilter
  const filteredServices = activeFilter === 'All' 
    ? services 
    : services.filter(serviceCategory => serviceCategory.title === activeFilter);

  return (
    <div className="g-container">
      {filteredServices.map((serviceCategory, categoryIndex) => (
        <div key={categoryIndex} className={styles.categorySection}>
          <ServiceCardsTitle title={serviceCategory.title} />
          <div className={styles.cardsContainer}>
            {serviceCategory.list.map((service, serviceIndex) => {
              const currentGlobalIndex = globalIndex;
              globalIndex++; 
              const cardClass = currentGlobalIndex % 2 === 0 ? 'serviceCard' : 'serviceCardSecond';
              
              return (
                <ServiceCard 
                  key={serviceIndex}
                  serviceData={service}
                  className={cardClass}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

