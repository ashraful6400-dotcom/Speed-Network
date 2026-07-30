'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check, Edit3, Save, Info, Award } from 'lucide-react';

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
  { id: 'p20', name: 'Lite Connect', speed: 20, price: 400, unlimited: true, support: '24/7 Standard Support', popular: false },
  { id: 'p30', name: 'Starter Pack', speed: 30, price: 500, unlimited: true, support: '24/7 Standard Support', popular: false },
  { id: 'p50', name: 'Standard Fiber', speed: 50, price: 800, unlimited: true, support: '24/7 Standard Support', popular: false },
  { id: 'p80', name: 'Popular Speed', speed: 80, price: 1000, unlimited: true, support: '24/7 Dedicated Support', popular: true },
  { id: 'p100', name: 'Turbo Connect', speed: 100, price: 1200, unlimited: true, support: '24/7 Premium Support + Public IP', popular: false },
  { id: 'p150', name: 'Ultra Stream', speed: 150, price: 1800, unlimited: true, support: '24/7 Premium Support + Public IP', popular: false },
  { id: 'p200', name: 'Hyper Gamer', speed: 200, price: 2300, unlimited: true, support: '24/7 Dedicated Manager + SLA', popular: false },
  { id: 'p300', name: 'Extreme Core', speed: 300, price: 3500, unlimited: true, support: '24/7 Dedicated Manager + SLA + Static IP', popular: false },
];

interface PackageGridProps {
  onOrderNow?: (pack: Package) => void;
}

export default function PackageGrid({ onOrderNow }: PackageGridProps) {
  const [packages, setPackages] = useState<Package[]>(defaultPackages);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editStates, setEditStates] = useState<Record<string, { speed: number; price: number; name: string }>>({});

  useEffect(() => {
    const saved = localStorage.getItem('speednetwork_packages');
    if (saved) {
      try {
        setPackages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load packages', e);
      }
    }
  }, []);

  const handleEditToggle = () => {
    if (!isEditMode) {
      // Enter edit mode: clone current packages to local editStates
      const states: Record<string, { speed: number; price: number; name: string }> = {};
      packages.forEach((pkg) => {
        states[pkg.id] = { speed: pkg.speed, price: pkg.price, name: pkg.name };
      });
      setEditStates(states);
    }
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (pkgId: string, field: 'speed' | 'price' | 'name', value: string | number) => {
    setEditStates((prev) => ({
      ...prev,
      [pkgId]: {
        ...prev[pkgId],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    const updated = packages.map((pkg) => {
      const editVal = editStates[pkg.id];
      if (editVal) {
        return {
          ...pkg,
          speed: Number(editVal.speed) || pkg.speed,
          price: Number(editVal.price) || pkg.price,
          name: editVal.name || pkg.name,
        };
      }
      return pkg;
    });
    setPackages(updated);
    localStorage.setItem('speednetwork_packages', JSON.stringify(updated));
    setIsEditMode(false);
  };

  const handleReset = () => {
    setPackages(defaultPackages);
    localStorage.setItem('speednetwork_packages', JSON.stringify(defaultPackages));
    setIsEditMode(false);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-brand-cyan/20">
        <div className="flex items-center space-x-2">
          <Info className="w-5 h-5 text-brand-cyan" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Prices are fully editable for presentation/testing! Toggle edit mode.
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {isEditMode ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-bold transition-all cursor-pointer"
              >
                Reset Default
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-brand-cyan/20 text-gray-500 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-brand-cyan/10 border border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/20 text-xs font-bold transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Packages</span>
            </button>
          )}
        </div>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => {
          const editVal = editStates[pkg.id] || { speed: pkg.speed, price: pkg.price, name: pkg.name };
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
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editVal.name}
                      onChange={(e) => handleInputChange(pkg.id, 'name', e.target.value)}
                      className="w-full text-lg font-bold bg-white/20 dark:bg-brand-dark/40 border border-brand-cyan/30 rounded px-2 py-1 text-brand-text-light dark:text-white"
                    />
                  ) : (
                    <h4 className="text-lg font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                      {pkg.name}
                    </h4>
                  )}
                  
                  <div className="flex items-baseline mt-2">
                    {isEditMode ? (
                      <div className="flex items-center space-x-2 w-full">
                        <input
                          type="number"
                          value={editVal.speed}
                          onChange={(e) => handleInputChange(pkg.id, 'speed', e.target.value)}
                          className="w-20 text-3xl font-extrabold bg-white/20 dark:bg-brand-dark/40 border border-brand-cyan/30 rounded px-2 py-1 text-brand-cyan"
                        />
                        <span className="text-xl font-bold text-brand-cyan">Mbps</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-5xl font-black tracking-tight text-brand-cyan">
                          {pkg.speed}
                        </span>
                        <span className="ml-2 text-xl font-bold text-gray-500 dark:text-gray-400">
                          Mbps
                        </span>
                      </>
                    )}
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
                    {isEditMode ? (
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          value={editVal.price}
                          onChange={(e) => handleInputChange(pkg.id, 'price', e.target.value)}
                          className="w-24 text-3xl font-extrabold bg-white/20 dark:bg-brand-dark/40 border border-brand-cyan/30 rounded px-2 py-1 text-brand-text-light dark:text-white"
                        />
                        <span className="text-sm text-gray-400">/mo</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-3xl font-black text-brand-text-light dark:text-white">
                          {pkg.price}
                        </span>
                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const message = `আমি SpeedNetworkBD-তে নতুন সংযোগ নিতে চাই! 🌐

📦 প্যাকেজ: ${pkg.name}
⚡ স্পিড: ${pkg.speed} Mbps
💰 মাসিক চার্জ: ৳${pkg.price}/মাস
📡 ডেটা: Unlimited Fiber

অনুগ্রহ করে আমার সাথে যোগাযোগ করুন।`;
                    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank');
                    if (onOrderNow) onOrderNow(pkg);
                  }}
                  disabled={isEditMode}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] text-brand-dark'
                      : 'border border-brand-cyan/30 hover:border-brand-cyan hover:bg-brand-cyan/10 text-brand-cyan'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
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
