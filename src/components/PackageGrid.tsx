'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check, Award } from 'lucide-react';

const WHATSAPP_NUMBER = '8801743226802'; // primary WhatsApp number

export interface Package {
  id: string;
  name: string;
  speed: number; // in Mbps
  price: number; // in BDT
  unlimited: boolean;
  support: string;
  popular: boolean;
}

const defaultPackages: Package[] = [
  { id: 'step', name: 'STEP', speed: 22, price: 500, unlimited: true, support: '24/7 Standard Support', popular: false },
  { id: 'march', name: 'MARCH', speed: 26, price: 525, unlimited: true, support: '24/7 Standard Support', popular: false },
  { id: 'trot', name: 'TROT', speed: 35, price: 600, unlimited: true, support: '24/7 Standard Support', popular: false },
  { id: 'jog', name: 'JOG', speed: 45, price: 700, unlimited: true, support: '24/7 Standard Support', popular: false },
  { id: 'run', name: 'RUN', speed: 55, price: 800, unlimited: true, support: '24/7 Dedicated Support', popular: false },
  { id: 'sprint', name: 'SPRINT', speed: 80, price: 1050, unlimited: true, support: '24/7 Dedicated Support', popular: true },
  { id: 'gallop', name: 'GALLOP', speed: 110, price: 1400, unlimited: true, support: '24/7 Premium Support + Public IP', popular: false },
  { id: 'soar', name: 'SOAR', speed: 150, price: 2250, unlimited: true, support: '24/7 Premium Support + Public IP', popular: false },
  { id: 'rocket', name: 'ROCKET', speed: 200, price: 3000, unlimited: true, support: '24/7 Dedicated Manager + SLA', popular: false },
  { id: 'lead', name: 'LEAD', speed: 300, price: 6000, unlimited: true, support: '24/7 Dedicated Manager + SLA + Static IP', popular: false },
];

interface PackageGridProps {
  onOrderNow?: (pack: Package) => void;
}

export default function PackageGrid({ onOrderNow }: PackageGridProps) {
  return (
    <div className="space-y-8">
      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {defaultPackages.map((pkg, index) => {
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative rounded-3xl glass-panel p-6 flex flex-col justify-between border ${
                pkg.popular
                  ? 'border-brand-cyan ring-2 ring-brand-cyan/20 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                  : 'border-brand-cyan/10'
              } hover:shadow-xl transition-all duration-300`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark text-xs font-extrabold uppercase tracking-widest flex items-center space-x-1">
                  <Award className="w-3 h-3" />
                  <span>Most Popular</span>
                </span>
              )}

              <div>
                {/* Header */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    {pkg.name}
                  </h4>
                  
                  <div className="flex items-baseline mt-2">
                    <span className="text-5xl font-black tracking-tight text-brand-cyan">
                      {pkg.speed}
                    </span>
                    <span className="ml-2 text-xl font-bold text-gray-500 dark:text-gray-400">
                      Mbps
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent mb-6" />

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Unlimited Internet Data</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Buffer-free Youtube & Facebook (BDIX)</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{pkg.support}</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Optical Fiber FTTH Connection</span>
                  </li>
                </ul>
              </div>

              {/* Pricing & CTA */}
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">
                    Monthly Charge
                  </span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-sm font-bold text-gray-400 mr-1">৳</span>
                    <span className="text-3xl font-black text-brand-text-light dark:text-white">
                      {pkg.price}
                    </span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const message = `আমি SpeedNetworkBD-তে নতুন সংযোগ নিতে চাই! 🌐\n\n📦 প্যাকেজ: ${pkg.name}\n⚡ স্পিড: ${pkg.speed} Mbps\n💰 মাসিক চার্জ: ৳${pkg.price}/মাস\n📡 ডেটা: Unlimited Fiber\n\nঅনুগ্রহ করে আমার সাথে যোগাযোগ করুন।`;
                    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank');
                    if (onOrderNow) onOrderNow(pkg);
                  }}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] text-brand-dark'
                      : 'border border-brand-cyan/30 hover:border-brand-cyan hover:bg-brand-cyan/10 text-brand-cyan'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
