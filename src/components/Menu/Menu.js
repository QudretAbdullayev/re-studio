import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useCallback } from 'react';
import Footer from '../Layout/Footer';
import styles from './Menu.module.scss';
import VideoStatic from '../VideoStatic/VideoStatic';
import { useSoundContext } from '@/contexts/SoundContext';

export default function Menu({ onClose, isClosing, footerResults, headerResults }) {
  const pathname = usePathname();
  const menuRef = useRef(null);
  const { playClickSound } = useSoundContext();

  const isActive = useCallback((path) => {
    return pathname.includes(path);
  }, [pathname]);

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  const handleLinkClick = useCallback(() => {
    playClickSound();
    onClose();
  }, [playClickSound, onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={`${styles.container} ${isClosing ? styles.closing : ''}`} ref={menuRef}>
      <div className={styles.menu}>
        <h1 className={styles.title}>Menu</h1>
        <div className={styles.segment}>
          {headerResults?.navigations?.map((nav) => (
            <Link 
              key={nav.url}
              href={`/${nav.url}`} 
              className={isActive(`/${nav.url}`) ? styles.segmentTabActive : styles.segmentTab}
              onClick={handleLinkClick}
              onMouseEnter={playClickSound}
            >
              <span className={styles.segmentTabColor}>{nav.title.toUpperCase()}</span>
            </Link>
          ))}
        </div>
        <Footer data={footerResults} menu={true}/>
      </div>
    </div>
  );
}
