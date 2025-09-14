// hooks/useScrollTracker.js
"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useScrollTracker = (isLoadingComplete = true) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoadingComplete || pathname === '/not-found' || pathname === '/404') {
      return;
    }

    // Eski scroll pozisyonlarını temizle
    const cleanupOldScrollPositions = () => {
      try {
        const keysToRemove = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && key.startsWith('scroll_')) {
            const data = sessionStorage.getItem(key);
            if (data) {
              const { timestamp } = JSON.parse(data);
              // 5 dakikadan eski pozisyonları temizle
              if (Date.now() - timestamp > 300000) {
                keysToRemove.push(key);
              }
            }
          }
        }
        keysToRemove.forEach(key => sessionStorage.removeItem(key));
      } catch (error) {
        console.warn('Failed to cleanup old scroll positions:', error);
      }
    };

    cleanupOldScrollPositions();

    const restoreScrollPosition = () => {
      try {
        const scrollData = sessionStorage.getItem(`scroll_${pathname}`);
        if (scrollData) {
          const { x, y, timestamp } = JSON.parse(scrollData);
          // 30 saniyeden eski pozisyonları kullanma (daha uzun süre bekle)
          if (Date.now() - timestamp < 30000) {
            // Loading tamamlandıktan sonra biraz daha bekle
            setTimeout(() => {
              window.scrollTo(x, y);
            }, 300);
          } else {
            // Çok eski pozisyonları temizle
            sessionStorage.removeItem(`scroll_${pathname}`);
          }
        }
      } catch (error) {
        console.warn('Scroll restore failed:', error);
      }
    };

    restoreScrollPosition();

    // Scroll pozisyonunu sürekli kaydet (throttled)
    let scrollTimeout;
    const saveScrollPosition = () => {
      // 404 sayfasında kaydetme
      if (pathname === '/not-found' || pathname === '/404') {
        return;
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollData = {
          x: window.scrollX,
          y: window.scrollY,
          timestamp: Date.now()
        };
        sessionStorage.setItem(`scroll_${pathname}`, JSON.stringify(scrollData));
      }, 150); // 150ms throttle
    };

    // Sayfa değiştirmeden önce son scroll pozisyonunu kaydet
    const handleBeforeUnload = () => {
      // 404 sayfasında kaydetme
      if (pathname === '/not-found' || pathname === '/404') {
        return;
      }
      
      const scrollData = {
        x: window.scrollX,
        y: window.scrollY,
        timestamp: Date.now()
      };
      sessionStorage.setItem(`scroll_${pathname}`, JSON.stringify(scrollData));
    };

    // Event listeners
    window.addEventListener('scroll', saveScrollPosition);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', saveScrollPosition);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, isLoadingComplete]);
};