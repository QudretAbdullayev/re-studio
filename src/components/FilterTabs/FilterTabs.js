"use client";
import styles from './FilterTabs.module.scss';
import { useState } from 'react';
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/TextStaggerHover/TextStaggerHover";
import { useSoundContext } from '@/contexts/SoundContext';

const defaultTabs = [
  { label: 'All', count: 15, active: true },
  { label: 'Mobile App', count: 2 },
  { label: 'Web Design', count: 8 },
  { label: 'Marketing', count: 1 },
  { label: 'Content', count: 2 },
  { label: 'E-commerce', count: 2 },
];

export default function FilterTabs({
  tabs = defaultTabs,
  activeFilter = 'All',
  onFilterChange = () => { }
}) {
  const { playClickSound } = useSoundContext();
  const [hoveredTab, setHoveredTab] = useState(null);

  const handleTabClick = (tabLabel) => {
    playClickSound();
    onFilterChange(tabLabel);
  };

  return (
    <section className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${tab.active ? styles.active : ''}`}
            onClick={() => handleTabClick(tab.label)}
            onMouseEnter={() => {
              setHoveredTab(tab.label);
              playClickSound();
            }}
            onMouseLeave={() => setHoveredTab(null)}
            type="button"
          >
            <TextStaggerHover as="span" isMouseIn={hoveredTab === tab.label}>
              <TextStaggerHoverActive animation="top" text={tab.label} />
              <TextStaggerHoverHidden animation="bottom" text={tab.label} />
            </TextStaggerHover>
            {" "}<sup className={styles.count}>{tab.count}</sup>
          </button>
        ))}
      </div>
    </section>
  );
}
