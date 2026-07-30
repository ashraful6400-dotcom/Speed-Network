'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 items-end">
      {/* WhatsApp chat bubble */}
      <a
        href="https://wa.me/8801743226802"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Chat with Support on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-current stroke-none" />
        
        {/* Tooltip */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-brand-dark dark:bg-brand-cyan text-white dark:text-brand-dark text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
          Chat with Support
        </span>
      </a>

      {/* Back to Top */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center w-12 h-12 rounded-full glass-panel border border-brand-cyan/30 text-brand-cyan hover:text-brand-dark hover:bg-brand-cyan shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
