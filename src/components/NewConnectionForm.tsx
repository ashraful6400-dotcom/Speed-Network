'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, User, Phone, MapPin, Grid, Wifi } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NewConnectionFormProps {
  preselectedPackageId?: string;
  preselectedPackageSpeed?: number;
}

export default function NewConnectionForm({
  preselectedPackageId = 'sprint',
  preselectedPackageSpeed = 80,
}: NewConnectionFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    area: 'natore-sadar',
    package: preselectedPackageId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedPackageId) {
      setFormData((prev) => ({
        ...prev,
        package: preselectedPackageId,
      }));
    }
  }, [preselectedPackageId]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(?:\+88)?01[3-9]\d{8}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid Bangladesh mobile number (e.g., 017XXXXXXXX)';
    }
    if (!formData.address.trim()) newErrors.address = 'Detailed address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Open WhatsApp and Email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      const message = `New Connection Request:\nName: ${formData.name}\nPhone: ${formData.phone}\nArea: ${formData.area}\nAddress: ${formData.address}\nPackage: ${formData.package}`;
      const waUrl = `https://wa.me/8801743226802?text=${encodeURIComponent(message)}`;
      const mailUrl = `mailto:speednetwork72@gmail.com?subject=New Connection Request&body=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');
      // Trigger email client
      window.location.href = mailUrl;

      // Fire confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const areas = [
    { value: 'natore-sadar', label: 'Natore Sadar' },
    { value: 'halsa', label: 'Halsa Bazar' },
    { value: 'natore-new', label: 'Natore New Market' },
    { value: 'gurudaspur', label: 'Gurudaspur Sadar' },
    { value: 'chalan-bil', label: 'Chalan Bil Zone' },
    { value: 'birol', label: 'Birol Bazar' },
  ];

  const packages = [
    { id: 'step', label: 'STEP (22 Mbps) - ৳500/mo' },
    { id: 'march', label: 'MARCH (26 Mbps) - ৳525/mo' },
    { id: 'trot', label: 'TROT (35 Mbps) - ৳600/mo' },
    { id: 'jog', label: 'JOG (45 Mbps) - ৳700/mo' },
    { id: 'run', label: 'RUN (55 Mbps) - ৳800/mo' },
    { id: 'sprint', label: 'SPRINT (80 Mbps) - ৳1050/mo' },
    { id: 'gallop', label: 'GALLOP (110 Mbps) - ৳1400/mo' },
    { id: 'soar', label: 'SOAR (150 Mbps) - ৳2250/mo' },
    { id: 'rocket', label: 'ROCKET (200 Mbps) - ৳3000/mo' },
    { id: 'lead', label: 'LEAD (300 Mbps) - ৳6000/mo' },
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-3xl border border-brand-cyan/20 text-center max-w-xl mx-auto shadow-2xl space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 mx-auto animate-bounce">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>
        <h4 className="text-3xl font-black text-brand-text-light dark:text-white">
          Application Received!
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed">
          Awesome, <strong>{formData.name}</strong>! Your application for a new connection has been logged successfully. 
          A SpeedNetworkBD installation specialist will contact you at <strong>{formData.phone}</strong> within the next 4 hours to verify coordinates and install your optical fiber cable.
        </p>
        <div className="bg-brand-cyan/10 p-4 rounded-2xl border border-brand-cyan/20 inline-block text-left text-xs space-y-1">
          <p className="text-gray-400">Application Details:</p>
          <p className="text-brand-text-light dark:text-gray-200">Zone: <span className="font-bold uppercase text-brand-cyan">{formData.area}</span></p>
          <p className="text-brand-text-light dark:text-gray-200">Address: <span className="font-bold">{formData.address}</span></p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', phone: '', address: '', area: 'natore-sadar', package: 'sprint' });
            }}
            className="px-6 py-2.5 rounded-xl border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 font-bold transition-all cursor-pointer"
          >
            Apply for another line
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-brand-cyan/20 dark:border-brand-cyan/10 shadow-xl max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-2xl font-black text-brand-text-light dark:text-white mb-2 text-center">
          New Connection Form
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-6">
          Fill up this connection request form and get activated in 24 hours! No installation fees.
        </p>

        {/* Name */}
        <div>
          <label className="block text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-2 flex items-center space-x-1">
            <User className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Full Name</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ashraful Islam"
            className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan ${
              errors.name ? 'border-red-500' : 'border-gray-200 dark:border-brand-cyan/10'
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-2 flex items-center space-x-1">
            <Phone className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Mobile Phone</span>
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. 01712345678"
            className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan ${
              errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-brand-cyan/10'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
        </div>

        {/* Coverage Area Dropdown */}
        <div>
          <label className="block text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-2 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Coverage Area / Zone</span>
          </label>
          <select
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-cyan/10 bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
          >
            {areas.map((area) => (
              <option key={area.value} value={area.value} className="text-brand-dark bg-white dark:bg-brand-dark dark:text-white">
                {area.label}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-2 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Detailed Address</span>
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="e.g. Apartment 4B, House 12, Road 5, Sector 4"
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan ${
              errors.address ? 'border-red-500' : 'border-gray-200 dark:border-brand-cyan/10'
            }`}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.address}</p>}
        </div>

        {/* Package Selector */}
        <div>
          <label className="block text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-2 flex items-center space-x-1">
            <Wifi className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Preferred Broadband Package</span>
          </label>
          <select
            value={formData.package}
            onChange={(e) => setFormData({ ...formData, package: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-cyan/10 bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
          >
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id} className="text-brand-dark bg-white dark:bg-brand-dark dark:text-white">
                {pkg.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark font-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Sending Request...' : 'Apply for New Connection'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
