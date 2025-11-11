'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  id?: string;
  title: string;
  description: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function AnimatedSection({
  id,
  title,
  description,
  backgroundColor = 'bg-white dark:bg-zinc-900',
  textColor = 'text-black dark:text-white',
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !descRef.current) return;

    // Animación del título
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    );

    // Animación de la descripción
    gsap.fromTo(
      descRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === sectionRef.current ||
          trigger.trigger === titleRef.current ||
          trigger.trigger === descRef.current
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center ${backgroundColor} ${textColor} z-10`}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 opacity-0"
        >
          {title}
        </h2>
        <p
          ref={descRef}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 opacity-0"
        >
          {description}
        </p>
      </div>
    </section>
  );
}
