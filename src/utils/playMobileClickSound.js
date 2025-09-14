export const playMobileClickSound = (playClickSound) => {
    if (window.innerWidth < 700) {
      playClickSound();
    }
  };