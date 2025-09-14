'use client';

import { useEffect, useRef } from "react";
import h337 from "heatmap.js";

export default function HeatmapCanvas() {
  const containerRef = useRef(null);
  const heatmapRef = useRef(null);
  const livePointsRef = useRef([]); 
  const fadingPointsRef = useRef([]); 
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Wait for the next tick to ensure container is properly rendered
    const initHeatmap = () => {
      if (!containerRef.current) return;
      
      // Check if container has dimensions
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        // Retry after a short delay if container has no dimensions
        setTimeout(initHeatmap, 50);
        return;
      }

      try {
        heatmapRef.current = h337.create({
          container: containerRef.current,
          radius: 60,
          maxOpacity: 0.6,
          minOpacity: 0,
          blur: 0.95,
          gradient: {
            0.4: "blue",
            0.6: "cyan",
            0.7: "lime",
            0.8: "yellow",
            1.0: "red",
          },
        });
      } catch (error) {
        console.warn('Failed to initialize heatmap:', error);
        return;
      }
    };

    initHeatmap();

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const point = { x, y, value: 1 };

      livePointsRef.current.push(point);

      if (livePointsRef.current.length > 5) {
        const faded = livePointsRef.current.shift();
        fadingPointsRef.current.push(faded);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // Check if heatmap is properly initialized before calling setData
      if (!heatmapRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const fadedPoints = fadingPointsRef.current
        .map(p => ({ ...p, value: p.value * 0.95 }))
        .filter(p => p.value > 0.01);

      fadingPointsRef.current = fadedPoints;

      try {
        heatmapRef.current.setData({
          max: 1,
          data: [...livePointsRef.current, ...fadingPointsRef.current],
        });
      } catch (error) {
        console.warn('Failed to set heatmap data:', error);
        // Stop animation if there's a persistent error
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay to ensure heatmap is initialized
    setTimeout(() => {
      animate();
    }, 100);

    return () => {
      cancelAnimationFrame(animationRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
