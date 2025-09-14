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
  const poolSize = 5; // Pool of audio elements for overlapping sounds
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
      
      // Prevent audio from showing in browser media controls
      audio.setAttribute('data-no-media-controls', 'true');
      
      audioPool.current.push(audio);
    }

    // Listen for user interaction to enable audio
    const enableAudio = () => {
      hasUserInteracted.current = true;
      
      // Resume audio context if suspended
      if (audioContext.current && audioContext.current.state === 'suspended') {
        audioContext.current.resume();
      }
      
      // Try to play a silent audio to unlock audio context
      const silentAudio = new Audio();
      silentAudio.play().catch(() => {});
      
      // Try to play a very short click sound to unlock
      try {
        const unlockAudio = new Audio('/sounds/click.mp3');
        unlockAudio.volume = 0.01; // Very quiet
        unlockAudio.currentTime = 0;
        unlockAudio.muted = false;
        unlockAudio.play().catch(() => {});
      } catch (error) {
        console.warn('Unlock audio failed:', error);
      }
    };

    // Add event listeners for user interaction
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, enableAudio, { once: true });
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

  const tryUserInteractionAudio = useCallback(() => {
    try {
      // Try to create audio with different approach
      const audio = new Audio();
      audio.src = '/sounds/click.mp3';
      audio.volume = 0.7;
      audio.currentTime = 0;
      audio.muted = false;
      
      // Add event listeners to ensure audio loads
      audio.addEventListener('canplaythrough', () => {
        audio.play().catch((error) => {
          console.warn('User interaction audio failed:', error);
        });
      }, { once: true });
      
      audio.load();
    } catch (error) {
      console.warn('User interaction audio failed:', error);
    }
  }, []);

  const tryFallbackAudio = useCallback(() => {
    try {
      const fallbackAudio = new Audio('/sounds/click.mp3');
      fallbackAudio.volume = 0.7;
      fallbackAudio.currentTime = 0;
      fallbackAudio.muted = false;
      
      const playPromise = fallbackAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Fallback audio failed:', error);
          // Strategy 4: Try with user interaction
          tryUserInteractionAudio();
        });
      }
    } catch (error) {
      console.warn('Fallback audio creation failed:', error);
      tryUserInteractionAudio();
    }
  }, [tryUserInteractionAudio]);

  const playClickSound = useCallback(() => {
    if (!isSoundEnabled || audioPool.current.length === 0) return;
    
    try {
      // Strategy 1: Try to use pool audio
      const availableAudio = audioPool.current.find(audio => audio.ended || audio.paused);
      
      if (availableAudio) {
        availableAudio.currentTime = 0;
        availableAudio.muted = false;
        
        const playPromise = availableAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn('Pool audio failed, trying fallback:', error);
            // Strategy 2: Try fallback audio
            tryFallbackAudio();
          });
        }
      } else {
        // Strategy 2: Create new audio
        tryFallbackAudio();
      }
    } catch (error) {
      console.warn('Sound play failed:', error);
      // Strategy 3: Last resort fallback
      tryFallbackAudio();
    }
  }, [isSoundEnabled, tryFallbackAudio]);

  const forceEnableAudio = useCallback(() => {
    
    // Resume audio context
    if (audioContext.current && audioContext.current.state === 'suspended') {
      audioContext.current.resume();
    }
    
    // Try multiple strategies
    try {
      // Strategy 1: Silent audio
      const silentAudio = new Audio();
      silentAudio.play().catch(() => {});
      
      // Strategy 2: Very quiet click sound
      const quietAudio = new Audio('/sounds/click.mp3');
      quietAudio.volume = 0.01;
      quietAudio.currentTime = 0;
      quietAudio.muted = false;
      quietAudio.play().catch(() => {});
      
      // Strategy 3: Web Audio API
      if (audioContext.current) {
        const oscillator = audioContext.current.createOscillator();
        const gainNode = audioContext.current.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.current.destination);
        gainNode.gain.value = 0.001; // Very quiet
        oscillator.frequency.value = 440; // A4 note
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.1);
      }
      
      hasUserInteracted.current = true;
    } catch (error) {
      console.warn('Force enable audio failed:', error);
    }
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev);
  }, []);

  const testSound = useCallback(() => {
    
    const testAudio = new Audio('/sounds/click.mp3');
    testAudio.volume = 0.7;
    testAudio.currentTime = 0;
    testAudio.muted = false;
    
    const playPromise = testAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
      }).catch((error) => {
        console.warn('Test sound failed:', error);
      });
    }
  }, [isSoundEnabled]);

  const value = {
    isSoundEnabled,
    toggleSound,
    playClickSound,
    testSound,
    forceEnableAudio
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};
