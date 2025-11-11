'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MAX_FRAMES = 65;

export default function ScrollImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Función para formatear el número del frame con padding (ej: 0 -> "000")
  const getFrameNumber = (frame: number) => {
    return frame.toString().padStart(3, '0');
  };

  useEffect(() => {
    if (!imgRef.current || !containerRef.current) return;

    const imageSequence = {
      frame: 0,
    };

    const updateImage = () => {
      if (imgRef.current) {
        const frameNum = Math.floor(imageSequence.frame);
        imgRef.current.src = `/scrollimg/code_${getFrameNumber(frameNum)}.png`;
      }
    };

    // Crear la animación con ScrollTrigger
    gsap.to(imageSequence, {
      frame: MAX_FRAMES - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
      onUpdate: updateImage,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        <img
          ref={imgRef}
          src={`/scrollimg/code_000.png`}
          alt="Scroll sequence"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
