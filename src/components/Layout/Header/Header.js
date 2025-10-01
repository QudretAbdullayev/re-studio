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
  const [hasImageOrComponent, setHasImageOrComponent] = useState(false);
  const pathname = usePathname();
  const {
    playClickSound,
    isSoundEnabled,
    toggleSound,
    testSound,
    forceEnableAudio,
  } = useSoundContext();

  const tabRefs = useRef({});
  const segmentRef = useRef(null);

  const soundHoveredRef = useRef(false);
  const [soundHoverTrigger, setSoundHoverTrigger] = useState(0);

  const safeData = data || {};
  const navigations = safeData.navigations || [];

  const cases = pathname.startsWith("/case-studies/") && window.innerWidth > 700
  const shouldUseBlackNav = cases && hasImageOrComponent
  const toggleMenu = () => {
    if (menuOpen) {
      setMenuClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setMenuClosing(false);
      }, 400);
    } else {
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  useEffect(() => {
    const checkForImageOrComponent = () => {
      if (!pathname.startsWith("/case-studies/") || window.innerWidth <= 700) {
        return;
      }

      const header = document.querySelector(`.${styles.header}`);
      if (!header) return;

      const headerRect = header.getBoundingClientRect();
      const centerY = headerRect.bottom + 48; // Header'ın altından 70px aşağı
      
      // Header'ın altındaki alanı kontrol et
      const elementBelow = document.elementFromPoint(window.innerWidth / 2, centerY);
      
      if (elementBelow) {
        // Element'in kendisi veya parent'larında img, video, canvas, component var mı kontrol et
        let currentElement = elementBelow;
        let found = false;
        
        // 5 seviye yukarı kontrol et
        for (let i = 0; i < 5 && currentElement && currentElement !== document.body; i++) {
          const tagName = currentElement.tagName?.toLowerCase();
          const className = currentElement.className || '';
          
          // Image, video, canvas veya component class'ları kontrol et
          if (tagName === 'img' || 
              tagName === 'video' || 
              tagName === 'canvas' ||
              className.includes('component') ||
              className.includes('image') ||
              className.includes('hero') ||
              className.includes('banner') ||
              className.includes('gallery')) {
            found = true;
            break;
          }
          
          currentElement = currentElement.parentElement;
        }
        
        setHasImageOrComponent(found);
      }
    };

    const handleScroll = () => {
      checkForImageOrComponent();
    };

    // Initial check
    checkForImageOrComponent();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  React.useEffect(() => {
    if (!navigations || navigations.length === 0) return;

    const currentNav = navigations.find((nav) =>
      pathname.includes(`/${nav.url}`)
    );

    if (currentNav) {
      setActiveTab(currentNav.url);
    } else {
      setActiveTab(null);
      setIndicatorStyle({});
    }
  }, [pathname, navigations]);

  useEffect(() => {
    if (!activeTab || !segmentRef.current || !tabRefs.current[activeTab]) {
      setIndicatorStyle({
        opacity: 0,
        transition: "opacity 0.3s ease",
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
          "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
      });
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSoundMouseEnter = () => {
    soundHoveredRef.current = true;
    setSoundHoverTrigger((prev) => prev + 1);
    playClickSound();
  };

  const handleSoundMouseLeave = () => {
    soundHoveredRef.current = false;
    setSoundHoverTrigger((prev) => prev + 1);
  };

  const sortedNavigations =
    navigations.length > 0
      ? [...navigations].sort((a, b) => a.order - b.order)
      : [];

  return (
    <>
      <header
        className={`g-container ${styles.header} ${menuOpen ? styles.menuOpen : ""
          }`}
      >
        <Link
          href="/"
          className={styles.logo}
          onMouseEnter={playClickSound}
          onClick={() => {
            playMobileClickSound(playClickSound);
          }}
        >
          <SafeImage src={"/re.svg"} fill alt="Re Studio" priority />
        </Link>

        <nav className={` ${shouldUseBlackNav ? styles.navBlack : styles.nav}`}>
          <div
            className={styles.segment}
            ref={segmentRef}
            data-active={activeTab}
          >
            {activeTab && (
              <div
                key={activeTab ?? "none"}
                className={`${styles.slidingIndicator} ${activeTab ? styles.slidingIndicatorActive : ""
                  }`}
                style={indicatorStyle}
              />
            )}

            {sortedNavigations.map((nav) => (
              <Link
                key={nav.url}
                ref={(el) => {
                  tabRefs.current[nav.url] = el;
                }}
                href={`/${nav.url}`}
                className={`${styles.tab} ${activeTab === nav.url ? styles.active : ""
                  }`}
                onClick={() => {
                  playMobileClickSound(playClickSound);
                  handleTabChange(nav.url);
                }}
                onMouseEnter={() => {
                  setTabHovered(nav.url);
                  playClickSound();
                }}
                onMouseLeave={() => setTabHovered(null)}
              >
                <TextStaggerHover
                  as="span"
                  className={styles.tabContent}
                  isMouseIn={tabHovered === nav.url}
                >
                  <TextStaggerHoverActive
                    animation="top"
                    text={nav.title.toUpperCase()}
                  />
                  <TextStaggerHoverHidden
                    animation="bottom"
                    text={nav.title.toUpperCase()}
                  />
                </TextStaggerHover>
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.buttons}>
          <button
            className={`${shouldUseBlackNav ? styles.soundBlack : styles.sound} ${isSoundEnabled ? styles.contracting : styles.expanding}`}
            onClick={() => {
              playMobileClickSound(playClickSound);
              toggleSound();
            }}
            onMouseEnter={handleSoundMouseEnter}
            onMouseLeave={handleSoundMouseLeave}
          >
            <TextStaggerHover
              key={`sound-${isSoundEnabled}-${soundHoverTrigger}`}
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
            onMouseEnter={() => {
              playClickSound();
            }}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
          <Link
            href="/apply"
            className={`${shouldUseBlackNav ? styles.applyBlack : styles.apply}`}
            onClick={() => {
              playMobileClickSound(playClickSound);
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
              <TextStaggerHoverHidden
                animation="bottom"
                text={safeData.apply}
              />
            </TextStaggerHover>
          </Link>
        </div>
      </header>
      {menuOpen && (
        <Menu
          onClose={toggleMenu}
          isClosing={menuClosing}
          footerResults={footerResults}
          headerResults={data}
        />
      )}
    </>
  );
}
