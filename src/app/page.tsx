'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PackageGrid, { Package } from '../components/PackageGrid';
import InteractiveMap from '../components/InteractiveMap';
import NewConnectionForm from '../components/NewConnectionForm';
import BillingPortal from '../components/BillingPortal';
import ContactSection from '../components/ContactSection';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import SpeedTest from '../components/SpeedTest';
import { Wifi, ShieldAlert, Award, Zap, HelpCircle, PhoneCall, RefreshCw, Layers } from 'lucide-react';

export default function Home() {
  const [isSpeedTestOpen, setIsSpeedTestOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ id: string; speed: number } | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('home');

  // Handle Order Now click from packages - scrolls user down to connection form with preselected option
  const handleOrderPackage = (pkg: Package) => {
    setSelectedPackage({ id: pkg.id, speed: pkg.speed });
    
    // Smooth scroll to connection form
    const element = document.querySelector('#new-connection');
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

  // Intersection Observer for scroll highlighting in Navbar
  useEffect(() => {
    const sections = ['home', 'packages', 'coverage', 'new-connection', 'payment', 'support', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // highlight when section occupies middle screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-brand-light dark:bg-brand-deep text-brand-text-light dark:text-brand-text-dark">
      
      {/* Dynamic Navigation Header */}
      <Navbar onOpenSpeedTest={() => setIsSpeedTestOpen(true)} activeSection={activeSection} />

      {/* Main Single Page Sections */}
      <main className="flex-1 w-full space-y-24 md:space-y-36 pb-20">
        
        {/* Section 1: Home (Hero & Canvas Particles) */}
        <HeroSection onOpenSpeedTest={() => setIsSpeedTestOpen(true)} />

        {/* Section 2: Internet Packages */}
        <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs font-bold text-brand-cyan uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Broadband Speed Packages</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text-light dark:text-white tracking-tight">
              High-Speed Fiber Plans
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Select the speed that fits your lifestyle. Enjoy unlimited optical fiber layouts with no data capping, bufferless streaming, and active latency routing.
            </p>
          </div>
          <PackageGrid onOrderNow={handleOrderPackage} />
        </section>

        {/* Section 3: Coverage Area */}
        <section id="coverage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs font-bold text-brand-cyan uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Coverage Network</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text-light dark:text-white tracking-tight">
              Areas We Cover
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Expanding rapidly across major divisions. Use our live interactive nodes mapping to check ping and active uptime status in your neighborhood.
            </p>
          </div>
          <InteractiveMap />
        </section>

        {/* Section 4: New Connection */}
        <section id="new-connection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs font-bold text-brand-cyan uppercase tracking-wider">
              <Wifi className="w-3.5 h-3.5" />
              <span>Instant Activation</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text-light dark:text-white tracking-tight">
              Apply For Connection
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Ready to experience fiber-speed internet? Fill out our application form below. Our support agents will contact you for deployment coordinates.
            </p>
          </div>
          <NewConnectionForm
            preselectedPackageId={selectedPackage?.id}
            preselectedPackageSpeed={selectedPackage?.speed}
          />
        </section>

        {/* Section 5: Bill Payment */}
        <section id="payment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs font-bold text-brand-cyan uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Hassle-Free Billing</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text-light dark:text-white tracking-tight">
              Bill Payment Portal
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Clear your monthly bills securely using any mobile financial service or direct bank transfer. Instant SMS confirmation and automated account reactivation.
            </p>
          </div>
          <BillingPortal />
        </section>

        {/* Section 6: Support Quick Actions */}
        <section id="support" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <ContactSection />
        </section>

        {/* Section 9: Contact */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="glass-panel p-6 md:p-10 rounded-3xl border border-brand-cyan/20 dark:border-brand-cyan/10 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-text-light dark:text-white mb-3">
                  Get Connected in Natore & Gurudaspur
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  We currently serve <strong className="text-brand-cyan">Natore</strong> and <strong className="text-brand-cyan">Gurudaspur</strong> with our premium fiber broadband network. Contact us to check availability at your location.
                </p>
                <div className="flex items-center space-x-4 mb-8 p-4 rounded-2xl bg-white/50 dark:bg-brand-deep/50 border border-brand-cyan/20">
                  <img src="/ceo.png" alt="CEO Md. Rashidul Islam" className="w-14 h-14 rounded-full object-cover border-2 border-brand-cyan shadow-md" />
                  <div>
                    <h4 className="font-bold text-brand-text-light dark:text-white">Md. Rashidul Islam</h4>
                    <p className="text-xs text-brand-cyan mb-1">CEO & Founder</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">📍 Office: Halsa Bazar, Natore</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+8801743226802"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark font-black text-center text-sm shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105 transition-all"
                  >
                    Call: 01743-226802
                  </a>
                  <a
                    href="mailto:speednetwork72@gmail.com"
                    className="px-6 py-3 rounded-xl border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 text-center text-sm font-black transition-all"
                  >
                    speednetwork72@gmail.com
                  </a>
                </div>
              </div>
              <div className="bg-brand-deep/20 dark:bg-brand-deep/50 border border-brand-cyan/10 p-6 rounded-2xl">
                <h5 className="font-extrabold text-xs uppercase text-gray-400 tracking-wider mb-4">
                  Support Operating Hours
                </h5>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex justify-between">
                    <span>Online Tech Support:</span>
                    <span className="font-bold text-brand-cyan">24/7/365</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Field Cable Crew:</span>
                    <span className="font-bold text-brand-text-light dark:text-white">8:00 AM - 10:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Billing Desk:</span>
                    <span className="font-bold text-brand-text-light dark:text-white">9:00 AM - 6:00 PM (Sat-Thu)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Halsa Bazar Office:</span>
                    <span className="font-bold text-brand-text-light dark:text-white">9:30 AM - 5:30 PM (Sun-Thu)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Action Elements (Back-to-top & WhatsApp bubble) */}
      <FloatingActions />

      {/* Bottom Footer Section */}
      <Footer />

      {/* Interactive SpeedTest Overlay Modal */}
      <SpeedTest isOpen={isSpeedTestOpen} onClose={() => setIsSpeedTestOpen(false)} />
    </div>
  );
}
