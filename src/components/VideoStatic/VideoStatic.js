"use client"

import { useEffect, useRef } from 'react';
import styles from './VideoStatic.module.scss';

const VideoStatic = ({ src, props, imgSrc }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [src]);

    useEffect(() => {
        const playVideo = () => {
            if (videoRef.current) {
                videoRef.current.play();
            }
        };

        document.addEventListener('click', playVideo);

        return () => {
            document.removeEventListener('click', playVideo);
        };
    }, []);

    return (
        <video
            {...props}
            autoPlay
            loop
            muted
            playsInline
            ref={videoRef}
            className={styles.video}
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoStatic;