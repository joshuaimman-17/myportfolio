"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const HeroScrollAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    const frameCount = 200;
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Use a ref to store the current frame index
    const currentFrameRef = useRef({ frame: 0 });

    const currentFrame = (index: number) => {
        // Pad the index to 3 digits (e.g., 001, 045, 200)
        const paddedIndex = index.toString().padStart(3, '0');
        return `/images/ezgif-frame-${paddedIndex}.jpg`;
    };

    // Preload all images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImagesLoaded(true);
                    setProgress(100);
                } else {
                    setProgress(Math.round((loadedCount / frameCount) * 100));
                }
            };
            images.push(img);
        }

        imagesRef.current = images;
    }, []);

    useGSAP(() => {
        if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Render the first frame initially
        const render = () => {
            const img = imagesRef.current[Math.round(currentFrameRef.current.frame)];
            if (img && img.complete) {
                // High DPI Display Fix
                const pixelRatio = window.devicePixelRatio || 1;
                const width = window.innerWidth;
                const height = window.innerHeight;

                canvas.width = width * pixelRatio;
                canvas.height = height * pixelRatio;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;

                context.scale(pixelRatio, pixelRatio);

                // Draw image to cover the canvas (simulate object-fit: cover)
                const hRatio = width / img.width;
                const vRatio = height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (width - img.width * ratio) / 2;
                const centerShift_y = (height - img.height * ratio) / 2;

                context.clearRect(0, 0, width, height);
                context.drawImage(img, 0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            }
        };

        // Draw initial frame
        render();

        // Handle window resize
        window.addEventListener('resize', render);

        // Create a Timeline so we can link multiple animations to the scroll progress
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: `+=120%`,               // Slightly extended to give text time to breathe
                scrub: 0.1,                  // Exceedingly responsive tracking
                pin: true,                   // Pin the canvas in place
                onUpdate: render             // Call render whenever the timeline updates
            }
        });

        // 1. Animate the canvas frames (spans the entire timeline duration)
        tl.to(currentFrameRef.current, {
            frame: frameCount - 1,
            snap: 'frame',
            ease: 'none',
            duration: 1
        }, 0);

        // 2. Animate the DEVELOPER text (in and out)
        tl.fromTo('.developer-text',
            { opacity: 0, scale: 0.8 },
            { opacity: 0.8, scale: 1, duration: 0.3, ease: 'power2.out' },
            0.1 // Start fading in slightly after scroll starts
        )
            .to('.developer-text', {
                opacity: 0,
                scale: 1.2,
                duration: 0.3,
                ease: 'power2.in'
            }, 0.7); // Start fading out before the end

        // Cleanup
        return () => {
            window.removeEventListener('resize', render);
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
        };

    }, { dependencies: [imagesLoaded], scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-black">
            {!imagesLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50 bg-black">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-xl font-mono">Loading Animation: {progress}%</p>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="block w-full h-screen mx-auto max-w-full"
            />
            {/* The Animated Developer Text Overlay */}
            <div className="developer-text absolute inset-0 flex items-center justify-center pointer-events-none z-10" style={{ mixBlendMode: 'overlay' }}>
                <h1 className="text-[12vw] font-black tracking-tighter text-white uppercase m-0 leading-none" style={{ textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                    Developer
                </h1>
            </div>
            {/* Overlay content on top of canvas */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)' }}>
                <h1 className="display-3 fw-bold text-white mb-4" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
                    Joshua<span style={{ color: '#54d6ff' }}>.Dev</span>
                </h1>
                <p className="lead text-white-50 max-w-2xl mx-auto px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    Turning vision into reality with code and design. Scroll down to explore my projects and expertise.
                </p>

                <div className="mt-auto mb-10 text-white opacity-70 animate-bounce">
                    <p className="mb-2 text-sm uppercase tracking-widest">Scroll to Explore</p>
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
            </div>
        </div>
    );
};

export default HeroScrollAnimation;
