'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="">
            <Link href="/" className="block">
              <Image
                src="/logoNav.png"
                alt="Logo de la empresa"
                width={90}
                height={40}
                className="h-auto w-auto "
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#about"
              className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Acerca
            </a>
            <a
              href="#contact"
              className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Contacto
            </a>
          </div>

          <button className="md:hidden text-black dark:text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
