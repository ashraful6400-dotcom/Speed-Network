'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How long does the physical optical fiber installation take?',
    answer: 'Once you submit your application form, our regional coordinate surveyor will call you within 4 hours. Once your location is validated, our technical team installs the physical overhead fiber drop cable, hooks up the ONU (Optical Network Unit), and configures your dual-band Router. The entire process takes under 24 hours.'
  },
  {
    question: 'Are there any hidden fees or security deposits for ONU/Router?',
    answer: 'No, SpeedNetworkBD does not charge any hidden fees. Router and ONU rental is absolutely free with our annual/bi-annual subscriptions. For monthly subscribers, a one-time connection fee of ৳1000 applies, which includes all cable layouts, fiber splicing, ONU device, and optical patch cords.'
  },
  {
    question: 'Can I change or upgrade my broadband speed plan at any time?',
    answer: 'Absolutely. You can request a package upgrade or downgrade at any time by calling our customer care or using our WhatsApp support line. Plan changes are processed instantly and your billing cycle is dynamically prorated on your next invoice.'
  },
  {
    question: 'Do you offer a dedicated public IPv4 address for hosting or gaming?',
    answer: 'Yes, we do! Our "Turbo Connect" (100 Mbps) plan and above include a free static public IPv4 address. For packages below 100 Mbps, a dedicated public IP can be allocated for a small surcharge of ৳150/month.'
  },
  {
    question: 'What happens if my connection goes down during office hours?',
    answer: 'Our network backbone has triple fiber path redundancy. However, if a local physical fiber cut occurs (due to storms or road works), our automated monitoring system alerts our local field crew immediately. We guarantee a maximum Resolution Time (SLA) of 2 hours for overhead cable repairs.'
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="rounded-2xl glass-panel border border-brand-cyan/10 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left text-brand-text-light dark:text-white font-bold hover:bg-brand-cyan/5 transition-colors cursor-pointer focus:outline-none"
            >
              <div className="flex items-center space-x-3 pr-4">
                <HelpCircle className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                <span className="text-sm md:text-base leading-snug">{faq.question}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  isOpen ? 'transform rotate-180 text-brand-cyan' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="p-5 pt-0 border-t border-brand-cyan/5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed bg-brand-cyan/2 dark:bg-brand-dark/10">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
