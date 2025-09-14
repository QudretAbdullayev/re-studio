'use client';

import styles from './ServicesHeader.module.scss';
import { useSoundContext } from '@/contexts/SoundContext';
import { useState } from 'react';
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/TextStaggerHover/TextStaggerHover";
import { playMobileClickSound } from '@/utils/playMobileClickSound';

export default function ServicesHeader({ activeFilter, setActiveFilter, categories = [] }) {
  const { playClickSound } = useSoundContext();
  const [hoveredTab, setHoveredTab] = useState(null);
  
  // Create tabs array with "All" as first option, followed by categories from API
  const tabs = [
    { id: 'All', label: 'All' },
    ...categories.map(category => ({
      id: category.title,
      label: category.title
    }))
  ];

  const handleTabClick = (tabId) => {
    playClickSound();
    setActiveFilter(tabId);
  };

  return (
    <section className={styles.servicesContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={styles.tabContainer}
            onClick={() => {handleTabClick(tab.id); playMobileClickSound(playClickSound);}}
            onMouseEnter={() => {
              playClickSound();
              setHoveredTab(tab.id);
            }}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <span 
              className={`${styles.tab} ${
                activeFilter === tab.id ? styles.active : ''
              }`}
            >
              <TextStaggerHover
                as="span"
                isMouseIn={hoveredTab === tab.id}
              >
                <TextStaggerHoverActive animation="top" text={tab.label} />
                <TextStaggerHoverHidden animation="bottom" text={tab.label} />
              </TextStaggerHover>
            </span>
            <div className={styles.number}>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
