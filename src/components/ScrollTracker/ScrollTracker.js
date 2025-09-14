'use client';
import { useScrollTracker } from "@/components/UseScrollTracker/UseScrollTracker";

function ScrollTracker({ isLoadingComplete = true }) {
  useScrollTracker(isLoadingComplete);
  return null;
}

export default ScrollTracker;
