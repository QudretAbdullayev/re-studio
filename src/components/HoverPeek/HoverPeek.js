"use client";

import * as RdxHoverCard from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import clsx from "clsx";
import styles from "./HoverPeek.module.scss";

// Inline CSS for spinner since we don't have access to SCSS file
const spinnerStyles = `
  .spinner {
    width: 20rem;
    height: 20rem;
    border: 2rem solid #f3f3f3;
    border-top: 2rem solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject spinner styles into document head
if (typeof document !== 'undefined' && !document.getElementById('hover-peek-spinner-styles')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'hover-peek-spinner-styles';
  styleElement.textContent = spinnerStyles;
  document.head.appendChild(styleElement);
}

// Hook to determine the image source for preview
function usePreviewSource(
    url,
    width,
    height,
    quality,
    isStatic,
    staticImageSrc
) {
    return useMemo(() => {
        if (isStatic) {
            return staticImageSrc || "";
        }
        
        const params = encode({
            url,
            screenshot: true,
            meta: false,
            embed: "screenshot.url",
            colorScheme: "dark",
            "viewport.isMobile": true,
            "viewport.deviceScaleFactor": 1,
            "viewport.width": width * 2.5,
            "viewport.height": height * 2.5,
        });
        return `https://api.microlink.io/?${params}`;
    }, [isStatic, staticImageSrc, url, width, height]);
}

// Hook for hover state and mouse following effect
function useHoverState(followMouse) {
    const [isPeeking, setPeeking] = useState(false);
    const mouseX = useMotionValue(0);
    const springConfig = { stiffness: 120, damping: 20 };
    const followX = useSpring(mouseX, springConfig);

    const handlePointerMove = useCallback(
        (event) => {
            if (!followMouse) return;
            const target = event.currentTarget;
            const targetRect = target.getBoundingClientRect();
            const eventOffsetX = event.clientX - targetRect.left;
            const offsetFromCenter = (eventOffsetX - targetRect.width / 2) * 0.3;
            mouseX.set(offsetFromCenter);
        },
        [mouseX, followMouse]
    );

    const handleOpenChange = useCallback((open) => {
        setPeeking(open);
        if (!open) {
            mouseX.set(0);
        }
    }, [mouseX]);

    return { isPeeking, handleOpenChange, handlePointerMove, followX };
}

export const HoverPeek = ({
    children,
    url,
    className,
    peekWidth = 200,
    peekHeight = 125,
    imageQuality = 50,
    isStatic = false,
    imageSrc = "",
    enableMouseFollow = true,
    enableLensEffect = true,
    lensZoomFactor = 1.75,
    lensSize = 100,
}) => {
    const [imageLoadFailed, setImageLoadFailed] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const finalImageSrc = usePreviewSource(
        url, peekWidth, peekHeight, imageQuality, isStatic, imageSrc
    );
    const { isPeeking, handleOpenChange, handlePointerMove, followX } = useHoverState(enableMouseFollow);

    const [isHoveringLens, setIsHoveringLens] = useState(false);
    const [lensMousePosition, setLensMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setImageLoadFailed(false);
        setImageLoading(true);
    }, [finalImageSrc]);

    useEffect(() => {
        if (!isPeeking) {
            setImageLoadFailed(false);
            setIsHoveringLens(false);
            setImageLoading(true);
        }
    }, [isPeeking]);

    const handleLensMouseMove = (e) => {
        if (!enableLensEffect) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setLensMousePosition({ x, y });
    };

    const handleLensMouseEnter = () => {
        if (enableLensEffect) setIsHoveringLens(true);
    };

    const handleLensMouseLeave = () => {
        if (enableLensEffect) setIsHoveringLens(false);
    };

    const cardMotionVariants = {
        initial: { opacity: 0, rotateY: -90, transition: { duration: 0.15 } },
        animate: { opacity: 1, rotateY: 0, transition: { type: "spring", stiffness: 200, damping: 18 } },
        exit: { opacity: 0, rotateY: 90, transition: { duration: 0.15 } },
    };

    const lensMotionVariants = {
        initial: { opacity: 0, scale: 0.7 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
        exit: { opacity: 0, scale: 0.7, transition: { duration: 0.2, ease: "easeIn" } },
    };

    const triggerChild = React.isValidElement(children)
        ? React.cloneElement(children, {
            className: clsx(children.props?.className, className),
            onPointerMove: handlePointerMove,
        })
        : React.createElement('span', { 
            className: className, 
            onPointerMove: handlePointerMove 
          }, children);

    return (
        <RdxHoverCard.Root
            openDelay={75}
            closeDelay={150}
            onOpenChange={handleOpenChange}
        >
            <RdxHoverCard.Trigger asChild>
                {triggerChild}
            </RdxHoverCard.Trigger>

            <RdxHoverCard.Portal>
                <RdxHoverCard.Content
                    className={styles.hoverCardContent}
                    side="top"
                    align="center"
                    sideOffset={12}
                    style={{ pointerEvents: enableLensEffect ? 'none' : 'auto' }}
                >
                    <AnimatePresence>
                        {isPeeking && (
                            <motion.div
                                className={styles.cardContainer}
                                variants={cardMotionVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                style={{
                                    x: enableMouseFollow ? followX : 0,
                                    pointerEvents: 'auto'
                                }}
                            >
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.previewLink}
                                    onMouseEnter={handleLensMouseEnter}
                                    onMouseLeave={handleLensMouseLeave}
                                    onMouseMove={handleLensMouseMove}
                                >
                                    {imageLoadFailed ? (
                                        <div
                                            className={styles.fallbackContainer}
                                            style={{ width: peekWidth, height: peekHeight }}
                                        >
                                            Preview unavailable
                                        </div>
                                    ) : (
                                        <div style={{ position: 'relative' }}>
                                            {imageLoading && (
                                                <div
                                                    className={styles.loadingContainer}
                                                    style={{ 
                                                        width: peekWidth, 
                                                        height: peekHeight,
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                        zIndex: 10
                                                    }}
                                                >
                                                    <div className="spinner"></div>
                                                </div>
                                            )}
                                            <Image
                                                src={finalImageSrc}
                                                width={peekWidth}
                                                height={peekHeight}
                                                className={styles.previewImage}
                                                alt={`Link preview for ${url}`}
                                                onError={() => {
                                                    setImageLoadFailed(true);
                                                    setImageLoading(false);
                                                }}
                                                onLoad={() => setImageLoading(false)}
                                                loading="lazy"
                                            />
                                        </div>
                                    )}

                                    <AnimatePresence>
                                        {enableLensEffect && isHoveringLens && !imageLoadFailed && (
                                            <motion.div
                                                className={styles.lensContainer}
                                                variants={lensMotionVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                style={{
                                                    maskImage: `radial-gradient(circle ${lensSize / 2}rem at ${lensMousePosition.x}rem ${lensMousePosition.y}rem, black ${lensSize / 2}rem, transparent ${lensSize / 2}rem)`,
                                                    WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}rem at ${lensMousePosition.x}rem ${lensMousePosition.y}rem, black ${lensSize / 2}rem, transparent ${lensSize / 2}rem)`,
                                                }}
                                            >
                                                <div
                                                    className={styles.lensContent}
                                                    style={{
                                                        transform: `scale(${lensZoomFactor})`,
                                                        transformOrigin: `${lensMousePosition.x}rem ${lensMousePosition.y}rem`,
                                                    }}
                                                >
                                                    <Image
                                                        src={finalImageSrc}
                                                        width={peekWidth}
                                                        height={peekHeight}
                                                        className={styles.lensImage}
                                                        alt=""
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </RdxHoverCard.Content>
            </RdxHoverCard.Portal>
        </RdxHoverCard.Root>
    );
};
