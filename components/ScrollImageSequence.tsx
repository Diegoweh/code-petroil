'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MAX_FRAMES = 65;

export default function ScrollImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Función para formatear el número del frame con padding (ej: 0 -> "000")
  const getFrameNumber = (frame: number) => {
    return frame.toString().padStart(3, '0');
  };

  // Precargar todas las imágenes
  useEffect(() => {
    const preloadImages = async () => {
      const promises: Promise<HTMLImageElement>[] = [];
      let loaded = 0;

      for (let i = 0; i < MAX_FRAMES; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = `/scrollimg/code_${getFrameNumber(i)}_compressed.webp`;

          img.onload = () => {
            loaded++;
            setLoadProgress(Math.round((loaded / MAX_FRAMES) * 100));
            resolve(img);
          };

          img.onerror = reject;
        });

        promises.push(promise);
      }

      try {
        const loadedImages = await Promise.all(promises);
        imagesRef.current = loadedImages;
        setLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setLoading(false);
      }
    };

    preloadImages();
  }, []);

  // Inicializar animación después de cargar las imágenes
  useEffect(() => {
    if (loading || !imgRef.current || !containerRef.current) return;

    const imageSequence = {
      frame: 0,
    };

    const updateImage = () => {
      if (imgRef.current && imagesRef.current.length > 0) {
        const frameNum = Math.floor(imageSequence.frame);
        const cachedImage = imagesRef.current[frameNum];
        if (cachedImage) {
          imgRef.current.src = cachedImage.src;
        }
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
        scrub: 0.15,
        invalidateOnRefresh: true,
      },
      onUpdate: updateImage,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
            </div>
            <p className="text-white text-lg font-medium">Cargando experiencia...</p>
            <p className="text-gray-400 text-sm mt-2">{loadProgress}%</p>
          </div>
        </div>
      )}

      <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
          <img
            ref={imgRef}
            src={`/scrollimg/code_000_compressed.webp`}
            alt="Scroll sequence"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </>
  );
}
