'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-black/80 backdrop-blur-md shadow-lg'
          : 'bg-white/70 dark:bg-black/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Link href="/" className="block">
              <div className="bg-black/80 dark:bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <Image
                  src="/logoNav.png"
                  alt="Logo de la empresa"
                  width={90}
                  height={40}
                  className="h-auto w-auto"
                  priority
                />
              </div>
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

          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-black dark:text-white p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <a
              href="#home"
              onClick={closeMobileMenu}
              className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Inicio
            </a>
            <a
              href="#about"
              onClick={closeMobileMenu}
              className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Acerca
            </a>
            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
