'use client';

import React, { useState } from 'react';
import { Send, Zap, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    confetti({
      particleCount: 40,
      spread: 40,
      origin: { y: 0.9 }
    });
  };

  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
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
    <footer className="relative bg-white dark:bg-brand-deep border-t border-brand-cyan/20 dark:border-brand-cyan/5 pt-16 pb-8 z-10">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-brand-cyan/10">
          
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="SpeedNetworkBD Logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              SpeedNetworkBD is Bangladesh\'s leading premium optical fiber broadband provider, rendering stable, latency-optimized, and high-performance internet solutions for homes and enterprise networks.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-gray-100 dark:bg-brand-dark/50 border border-brand-cyan/10 text-gray-500 dark:text-gray-400 hover:text-brand-cyan dark:hover:text-brand-cyan hover:scale-105 transition-all" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 dark:bg-brand-dark/50 border border-brand-cyan/10 text-gray-500 dark:text-gray-400 hover:text-brand-cyan dark:hover:text-brand-cyan hover:scale-105 transition-all" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 dark:bg-brand-dark/50 border border-brand-cyan/10 text-gray-500 dark:text-gray-400 hover:text-brand-cyan dark:hover:text-brand-cyan hover:scale-105 transition-all" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 dark:bg-brand-dark/50 border border-brand-cyan/10 text-gray-500 dark:text-gray-400 hover:text-brand-cyan dark:hover:text-brand-cyan hover:scale-105 transition-all" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.028 0 12 0 12s0 3.972.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.972 24 12 24 12s0-3.972-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-bold uppercase text-brand-text-light dark:text-white tracking-widest">
              Quick Links
            </h5>
            <ul className="space-y-2">
              {['home', 'packages', 'coverage', 'new-connection', 'payment'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    onClick={(e) => handleLinkClick(e, `#${link}`)}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-brand-cyan transition-colors capitalize"
                  >
                    {link.replace('-', ' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Secondary Links */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-bold uppercase text-brand-text-light dark:text-white tracking-widest">
              More Services
            </h5>
            <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <li><a href="#packages" className="hover:text-brand-cyan transition-colors">Shared Bandwidth</a></li>
              <li><a href="#packages" className="hover:text-brand-cyan transition-colors">Dedicated Corporate Fiber</a></li>
              <li><a href="#packages" className="hover:text-brand-cyan transition-colors">Safe DNS / Parental Control</a></li>
              <li><a href="#packages" className="hover:text-brand-cyan transition-colors">SpeedFTP & BDIX TV</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="text-xs font-bold uppercase text-brand-text-light dark:text-white tracking-widest">
              Subscribe to Newsletter
            </h5>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Receive updates on network status, promo offers, and new local speed nodes.
            </p>
            {subscribed ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold p-3.5 rounded-xl flex items-center space-x-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Subscription Confirmed! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. email@speednetwork.com"
                  className="flex-1 px-3 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-brand-cyan/15 bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white focus:outline-none focus:border-brand-cyan"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Legal Details */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-gray-400 space-y-4 sm:space-y-0">
          <div>
            <p>&copy; {currentYear} SpeedNetworkBD. All rights reserved.</p>
            <p className="mt-1">
              Design & Development by <a href="https://wa.me/8801713727968" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline font-semibold">Ashraful (WhatsApp: +8801713727968)</a>
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-brand-cyan transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">SLA Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
