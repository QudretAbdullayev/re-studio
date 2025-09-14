"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import SafeImage from "../../SafeImage/SafeImage";
import Link from "next/link";
import VolumeOff from "@/assets/icons/VolumeOff";
import VolumeOn from "@/assets/icons/VolumeOn";
import Menu from "../../Menu/Menu";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/TextStaggerHover/TextStaggerHover";
import { useSoundContext } from "@/contexts/SoundContext";
import { playMobileClickSound } from "@/utils/playMobileClickSound";

export default function Header({ data, footerResults }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [applyHovered, setApplyHovered] = useState(false);
  const [tabHovered, setTabHovered] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const pathname = usePathname();
  const { playClickSound, isSoundEnabled, toggleSound, testSound, forceEnableAudio } = useSoundContext();

  // Refs for measuring tab positions - now dynamic based on navigation data
  const tabRefs = useRef({});
  const segmentRef = useRef(null);
  
  // Sound hover state'ini ref ile tut
  const soundHoveredRef = useRef(false);
  const [soundHoverTrigger, setSoundHoverTrigger] = useState(0); // Force re-render trigger

  // Ensure data has default values to prevent errors
  const safeData = data || {};
  const navigations = safeData.navigations || [];

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setMenuClosing(false);
      }, 400); // Animation duration
    } else {
      setMenuOpen(true);
    }
  };

  // Add/remove overflow hidden from body when menu opens/closes
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleApplyClick = () => {
    // Apply button action buraya eklenebilir
  };

  // Update active tab based on pathname
  React.useEffect(() => {
    if (!navigations || navigations.length === 0) return;

    const currentNav = navigations.find(nav =>
      pathname.includes(`/${nav.url}`)
    );

    if (currentNav) {
      setActiveTab(currentNav.url);
    } else {
      // Home page or other pages - no active tab
      setActiveTab(null);
      setIndicatorStyle({}); // Clear indicator when no active tab
    }
  }, [pathname, navigations]);

  // Calculate indicator position when activeTab changes
  useEffect(() => {
    if (!activeTab || !segmentRef.current || !tabRefs.current[activeTab]) {
      // Hide indicator when no active tab
      setIndicatorStyle({
        opacity: 0,
        transition: 'opacity 0.3s ease'
      });
      return;
    }

    const targetRef = tabRefs.current[activeTab];

    if (targetRef) {
      const segmentRect = segmentRef.current.getBoundingClientRect();
      const targetRect = targetRef.getBoundingClientRect();

      const left = targetRect.left - segmentRect.left;
      const width = targetRect.width;

      setIndicatorStyle({
        transform: `translateX(${left}px)`,
        width: `${width}px`,
        opacity: 1,
        transition:
          'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease'
      });
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Sound hover handlers
  const handleSoundMouseEnter = () => {
    soundHoveredRef.current = true;
    setSoundHoverTrigger(prev => prev + 1); // Trigger re-render
    playClickSound();
  };

  const handleSoundMouseLeave = () => {
    soundHoveredRef.current = false;
    setSoundHoverTrigger(prev => prev + 1); // Trigger re-render
  };

  // Sort navigation items by order
  const sortedNavigations = navigations.length > 0 ?
    [...navigations].sort((a, b) => a.order - b.order) : [];

  return (
    <>
      <header className={`g-container ${styles.header} ${menuOpen ? styles.menuOpen : ""}`}>
        <Link href="/" className={styles.logo} onMouseEnter={playClickSound} onClick={() => { playMobileClickSound(playClickSound); }}>
          <SafeImage src={safeData.logo} fill alt="Heats" priority />
        </Link>

        <nav className={styles.nav}>
          <div className={styles.segment} ref={segmentRef} data-active={activeTab}>
            {activeTab && <div
              key={activeTab ?? "none"}
              className={`${styles.slidingIndicator} ${activeTab ? styles.slidingIndicatorActive : ""
                }`}
              style={indicatorStyle}
            />}

            {sortedNavigations.map((nav) => (
              <Link
                key={nav.url}
                ref={(el) => { tabRefs.current[nav.url] = el; }}
                href={`/${nav.url}`}
                className={`${styles.tab} ${activeTab === nav.url ? styles.active : ""}`}
                onClick={() => { playMobileClickSound(playClickSound); handleTabChange(nav.url); }}
                onMouseEnter={() => { setTabHovered(nav.url); playClickSound(); }}
                onMouseLeave={() => setTabHovered(null)}
              >
                <TextStaggerHover as="span" className={styles.tabContent} isMouseIn={tabHovered === nav.url}>
                  <TextStaggerHoverActive animation="top" text={nav.title.toUpperCase()} />
                  <TextStaggerHoverHidden animation="bottom" text={nav.title.toUpperCase()} />
                </TextStaggerHover>
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.buttons}>
          <button
            className={styles.sound}
            onClick={() => { playMobileClickSound(playClickSound); toggleSound(); }}
            onMouseEnter={handleSoundMouseEnter}
            onMouseLeave={handleSoundMouseLeave}
          >
            <TextStaggerHover
              key={`sound-${isSoundEnabled}-${soundHoverTrigger}`} // Unique key to maintain state
              as="span"
              className={styles.soundContent}
              isMouseIn={soundHoveredRef.current}
            >
              <TextStaggerHoverActive
                animation="top"
                text={isSoundEnabled ? "ON" : "OFF"}
                charClassName={styles.charClass}
                icon={
                  <span className={styles.icon}>
                    {isSoundEnabled ? <VolumeOn /> : <VolumeOff />}
                  </span>
                }
              />
              <TextStaggerHoverHidden
                animation="bottom"
                text={isSoundEnabled ? "ON" : "OFF"}
                charClassName={styles.charClass}
                icon={
                  <span className={styles.icon}>
                    {isSoundEnabled ? <VolumeOn /> : <VolumeOff />}
                  </span>
                }
              />
            </TextStaggerHover>
          </button>
          <button
            className={styles.menu}
            onClick={() => {
              playMobileClickSound(playClickSound);
              toggleMenu();
            }}
            onMouseEnter={() => { playClickSound(); }}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
          <Link
            href="/apply"
            className={styles.apply}
            onClick={() => {
              playMobileClickSound(playClickSound);
              handleApplyClick();
            }}
            onMouseEnter={() => {
              playClickSound();
              setApplyHovered(true);
            }}
            onMouseLeave={() => setApplyHovered(false)}
          >
            <TextStaggerHover
              as="span"
              className={styles.applyContent}
              isMouseIn={applyHovered}
            >
              <TextStaggerHoverActive animation="top" text={safeData.apply} />
              <TextStaggerHoverHidden animation="bottom" text={safeData.apply} />
            </TextStaggerHover>
          </Link>
        </div>
      </header>
      {menuOpen && <Menu onClose={toggleMenu} isClosing={menuClosing} footerResults={footerResults} headerResults={data} />}
    </>
  );
}