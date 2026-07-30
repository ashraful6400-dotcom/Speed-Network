'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Activity, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenSpeedTest: () => void;
  activeSection: string;
}

export default function Navbar({ onOpenSpeedTest, activeSection }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Packages', href: '#packages' },
    { name: 'Coverage', href: '#coverage' },
    { name: 'New Connection', href: '#new-connection' },
    { name: 'Payment', href: '#payment' },
    { name: 'Support', href: '#support' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel py-3 shadow-lg border-b border-brand-cyan/20 dark:border-brand-cyan/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-blue to-brand-cyan text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] animate-pulse-glow">
              <Zap className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-xl font-black tracking-wider text-brand-text-light dark:text-brand-text-dark">
              SPEED<span className="text-brand-cyan bg-clip-text">NETWORK</span>BD
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-brand-cyan shadow-[inset_0_-2px_0_0_#00F0FF] dark:text-brand-cyan'
                      : 'text-gray-600 dark:text-gray-300 hover:text-brand-cyan dark:hover:text-brand-cyan'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-200 dark:border-brand-cyan/20 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-brand-dark transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-brand-cyan" />}
            </button>

            <button
              onClick={onOpenSpeedTest}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark dark:text-brand-dark font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300 cursor-pointer"
            >
              <Activity className="w-4 h-4 animate-bounce" />
              <span>Speed Test</span>
            </button>
          </div>

          {/* Mobile Menu Toggle & Theme Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-200 dark:border-brand-cyan/20 text-gray-600 dark:text-gray-300"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-brand-cyan" />}
            </button>

            <button
              onClick={onOpenSpeedTest}
              className="p-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark"
              aria-label="Run Speed Test"
            >
              <Activity className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-brand-cyan focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[65px] transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="glass-panel mx-4 mt-2 p-4 rounded-xl shadow-2xl border border-brand-cyan/30 flex flex-col space-y-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-4 py-2.5 rounded-lg text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-cyan/20 text-brand-cyan border-l-4 border-brand-cyan'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-brand-cyan/10 hover:text-brand-cyan'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
