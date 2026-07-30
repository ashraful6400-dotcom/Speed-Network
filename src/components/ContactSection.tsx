'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 1500);
  };

  const supportChannels = [
    {
      id: 'call',
      name: 'Primary Hotline',
      value: '01743-226802',
      link: 'tel:+8801743226802',
      icon: <Phone className="w-6 h-6" />,
      color: 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5 hover:bg-brand-cyan/10',
      action: 'Call Now'
    },
    {
      id: 'call2',
      name: 'Secondary Helpline',
      value: '01848-176454',
      link: 'tel:+8801848176454',
      icon: <Phone className="w-6 h-6" />,
      color: 'text-brand-blue border-brand-blue/20 bg-brand-blue/5 hover:bg-brand-blue/10',
      action: 'Call Now'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Live Chat',
      value: '01743-226802',
      link: 'https://wa.me/8801743226802',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'text-[#25D366] border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10',
      action: 'Open WhatsApp'
    },
    {
      id: 'messenger',
      name: 'Messenger Support',
      value: 'm.me/SpeedNetworkBD',
      link: 'https://m.me/SpeedNetworkBD',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'text-[#0084FF] border-[#0084FF]/20 bg-[#0084FF]/5 hover:bg-[#0084FF]/10',
      action: 'Open Messenger'
    },
    {
      id: 'email',
      name: 'Official Email Contact',
      value: 'support@speednetworkbd.com',
      link: 'mailto:support@speednetworkbd.com',
      icon: <Mail className="w-6 h-6" />,
      color: 'text-brand-blue border-brand-blue/20 bg-brand-blue/5 hover:bg-brand-blue/10',
      action: 'Send Email'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left side: Support Quick Channels & Address */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-brand-text-light dark:text-white">
            Customer Support Center
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Have questions about billing, latency, or connection drops? Connect instantly with our dedicated support agents via any of these channels.
          </p>
        </div>

        {/* Quick action grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {supportChannels.map((channel) => (
            <a
              key={channel.id}
              href={channel.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] ${channel.color}`}
            >
              <div>
                <div className="mb-3">{channel.icon}</div>
                <h5 className="font-bold text-xs uppercase text-gray-400 tracking-wider">
                  {channel.name}
                </h5>
                <p className="text-sm font-extrabold text-brand-text-light dark:text-white mt-1 break-all">
                  {channel.value}
                </p>
              </div>
              <span className="text-xs font-bold mt-4 block underline">
                {channel.action} &rarr;
              </span>
            </a>
          ))}
        </div>

        {/* Office Address & CEO Card */}
        <div className="glass-panel p-5 rounded-2xl border border-brand-cyan/10 flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-sm text-brand-text-light dark:text-white">
              Office Address
            </h5>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              Halsa Bazar, Natore, Bangladesh.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="font-bold text-brand-text-light dark:text-white">CEO:</span> Md. Rashidul Islam
            </p>
            <a href="mailto:speednetwork72@gmail.com" className="text-xs text-brand-cyan hover:underline mt-1 block">
              speednetwork72@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Right side: Email Message Form */}
      <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-brand-cyan/20 dark:border-brand-cyan/10 shadow-xl">
        {success ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-2xl font-black text-brand-text-light dark:text-white">
              Message Transmitted!
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
              Thank you for contacting SpeedNetworkBD. We have received your query. A Customer Relations officer will reply to your email within 2 hours.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="px-6 py-2.5 rounded-xl border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 font-bold transition-all cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h4 className="text-lg font-black text-brand-text-light dark:text-white mb-2">
              Send us a message
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Karim Ahmed"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-cyan/10 bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
              
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. karim@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-cyan/10 bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Package Query, Bill Adjustment"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-cyan/10 bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                Detailed Message
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your query in detail..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-cyan/10 bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark font-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending Query...' : 'Send Message'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
