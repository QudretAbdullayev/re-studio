"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const SoundContext = createContext();

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};

export const SoundProvider = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const audioPool = useRef([]);
  const poolSize = 5;
  const hasUserInteracted = useRef(false);
  const audioContext = useRef(null);

  // Create a pool of audio elements
  useEffect(() => {
    // Try to create Web Audio API context
    try {
      if (typeof window !== 'undefined' && window.AudioContext) {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    } catch (error) {
      console.warn('Web Audio API not available:', error);
    }

    for (let i = 0; i < poolSize; i++) {
      const audio = new Audio('/sounds/click.mp3');
      audio.volume = 0.9;
      audio.preload = 'auto';
      audio.muted = false;
      
      audio.setAttribute('data-no-media-controls', 'true');
      
      audioPool.current.push(audio);
    }

    // Listen for user interaction to enable audio (but DON'T play sound automatically)
    const enableAudio = () => {
      if (hasUserInteracted.current) return; // Prevent multiple executions
      
      hasUserInteracted.current = true;
      
      // Resume audio context if suspended
      if (audioContext.current && audioContext.current.state === 'suspended') {
        audioContext.current.resume();
      }
      
      // Try to play a silent audio to unlock audio context
      const silentAudio = new Audio();
      silentAudio.volume = 0;
      silentAudio.play().catch(() => {});
      
      console.log('Audio system unlocked after user interaction');
    };

    // Add event listeners for user interaction (ONLY to unlock audio, not to play sounds)
    const events = ['mousedown', 'keypress', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, enableAudio, { once: true, passive: true });
    });

    return () => {
      audioPool.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      audioPool.current = [];
      
      if (audioContext.current) {
        audioContext.current.close();
      }
      
      events.forEach(event => {
        document.removeEventListener(event, enableAudio);
      });
    };
  }, []);

  // Manual click sound function - only called when explicitly requested
  const playClickSound = useCallback(() => {
    // Check if sound is enabled AND user has interacted
    if (!isSoundEnabled || !hasUserInteracted.current || audioPool.current.length === 0) {
      return;
    }
    
    try {
      const availableAudio = audioPool.current.find(audio => audio.ended || audio.paused);
      
      if (availableAudio) {
        availableAudio.currentTime = 0;
        availableAudio.muted = false;
        availableAudio.volume = 0.7; // Reasonable volume
        
        const playPromise = availableAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn('Click sound failed:', error);
          });
        }
      }
    } catch (error) {
      console.warn('Sound play failed:', error);
    }
  }, [isSoundEnabled]);

  // Force enable audio (for testing purposes)
  const forceEnableAudio = useCallback(() => {
    if (audioContext.current && audioContext.current.state === 'suspended') {
      audioContext.current.resume();
    }

    hasUserInteracted.current = true;
    console.log('Audio forcefully enabled');
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      const newState = !prev;
      console.log('Sound', newState ? 'enabled' : 'disabled');
      return newState;
    });
  }, []);

  const testSound = useCallback(() => {
    if (!hasUserInteracted.current) {
      console.warn('Cannot test sound: User has not interacted with the page yet');
      return;
    }
    
    const testAudio = new Audio('/sounds/click.mp3');
    testAudio.volume = 0.7;
    testAudio.currentTime = 0;
    testAudio.muted = false;
    
    const playPromise = testAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log('Test sound played successfully');
      }).catch((error) => {
        console.warn('Test sound failed:', error);
      });
    }
  }, []);

  const value = {
    isSoundEnabled,
    toggleSound,
    playClickSound, // Bu artık sadece manuel olarak çağrıldığında ses çıkarır
    testSound,
    forceEnableAudio
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};