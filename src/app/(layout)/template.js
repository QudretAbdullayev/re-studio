"use client"

import { usePathname } from "next/navigation";
import { useEffect } from "react"
import Lenis from '@studio-freight/lenis';

export default function Template({ children }) {
    const pathname = usePathname();


    // For smooth scrolling
    useEffect(() => {
        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, [pathname]);

    return (
        <>
            <div id="layer" className="layer">
            </div>
            {children}
        </>
    )
}