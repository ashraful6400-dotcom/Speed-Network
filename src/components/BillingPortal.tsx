'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ArrowRight, Check, X, ShieldCheck, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentMethod {
  id: string;
  name: string;
  logo: string; // custom color class name
  merchantNumber: string;
  type: string;
  bgGrad: string;
  textColor: string;
  steps: string[];
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'bkash',
    name: 'bKash',
    logo: 'bg-[#E2125B]',
    merchantNumber: '01743226802 (Personal)',
    type: 'Send Money',
    bgGrad: 'from-[#E2125B] to-[#F1598E]',
    textColor: 'text-white',
    steps: [
      'Go to your bKash Mobile Menu (*247#) or open the bKash App.',
      'Choose "Send Money".',
      'Enter Personal Account Number: 01743226802',
      'Enter your monthly package bill amount.',
      'Enter Reference: (Your Name & SpeedNetwork Phone Number).',
      'Enter your Menu PIN to confirm the transaction.',
      'Copy the Transaction ID (TxnID) and paste it below to verify.'
    ]
  },
  {
    id: 'nagad',
    name: 'Nagad',
    logo: 'bg-[#F26222]',
    merchantNumber: '01743226802 (Personal)',
    type: 'Send Money',
    bgGrad: 'from-[#F26222] to-[#FF8C52]',
    textColor: 'text-white',
    steps: [
      'Dial *167# or open the Nagad App on your smartphone.',
      'Select "Send Money" option.',
      'Enter Personal Account Number: 01743226802',
      'Enter the package bill amount.',
      'Enter Reference: (Your Name & registered Mobile Number).',
      'Enter your PIN to verify and complete payment.',
      'Paste the transaction ID received in SMS here for verification.'
    ]
  },
  {
    id: 'rocket',
    name: 'Rocket',
    logo: 'bg-[#8C3494]',
    merchantNumber: '019123456789 (Merchant)',
    type: 'Merchant Payment',
    bgGrad: 'from-[#8C3494] to-[#B366B9]',
    textColor: 'text-white',
    steps: [
      'Dial *322# or open the Dutch-Bangla Rocket App.',
      'Select "Merchant Pay".',
      'Enter Merchant Number: 019123456789',
      'Enter your payment amount.',
      'Enter Bill ID or Reference (Your Phone Number).',
      'Enter your Rocket PIN to authorize transaction.',
      'Input the Transaction ID below to update your account.'
    ]
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    logo: 'bg-brand-blue',
    merchantNumber: 'City Bank AC: 110299388277101',
    type: 'EFT / routing transfer',
    bgGrad: 'from-brand-blue to-[#02BFE7]',
    textColor: 'text-white',
    steps: [
      'Login to your local Bank App (Citytouch, Cellfin, EBL Skybank, etc.)',
      'Choose Transfer to Bank Account / BEFTN / NPSB.',
      'Account Name: SpeedNetworkBD Ltd.',
      'Account Number: 110299388277101',
      'Bank: The City Bank Limited (Branch: Gulshan)',
      'Reference: (Provide your Subscriber ID or Phone Number).',
      'Take a screenshot/save receipt and upload/input Txn ID below.'
    ]
  }
];

export default function BillingPortal() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [txnId, setTxnId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpenPayment = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setTxnId('');
    setSuccess(false);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txnId.trim()) return;

    setVerifying(true);
    // Simulate API request verification
    setTimeout(() => {
      setVerifying(false);
      setSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Quick Info */}
      <div className="glass-panel p-6 rounded-3xl border border-brand-cyan/20 dark:border-brand-cyan/10">
        <h4 className="text-xl font-bold text-brand-text-light dark:text-white mb-2 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-brand-cyan" />
          <span>Automated Billing System</span>
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Bills are generated on the 1st of every month. Payments via bKash, Nagad, Rocket, or Bank Transfers are processed instantly. Please make sure to input your correct transaction ID to activate your line.
        </p>
      </div>

      {/* Payment Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleOpenPayment(method)}
            className="group flex flex-col justify-between p-6 rounded-2xl glass-panel glass-panel-hover border border-brand-cyan/10 text-left hover:scale-[1.02] transition-all cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${method.logo} flex items-center justify-center text-white shadow-lg`}>
                  <Smartphone className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
              </div>
              <h5 className="text-lg font-black text-brand-text-light dark:text-white">
                Pay with {method.name}
              </h5>
              <p className="text-xs text-gray-400 mt-1">
                {method.type}
              </p>
            </div>
            <span className="text-xs font-bold text-brand-cyan mt-6 block group-hover:underline">
              View Instructions &rarr;
            </span>
          </button>
        ))}
      </div>

      {/* Instruction Modal */}
      <AnimatePresence>
        {selectedMethod && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-deep/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-panel border border-brand-cyan/20 p-6 md:p-8 text-brand-text-light dark:text-brand-text-dark shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMethod(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-gray-200 dark:border-brand-cyan/20 text-gray-500 dark:text-gray-400 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${selectedMethod.logo} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                  {selectedMethod.name[0]}
                </div>
                <div>
                  <h4 className="text-xl font-black tracking-wide text-brand-text-light dark:text-white">
                    {selectedMethod.name} payment portal
                  </h4>
                  <p className="text-sm text-brand-cyan font-semibold">
                    Send to: {selectedMethod.merchantNumber}
                  </p>
                </div>
              </div>

              {!success ? (
                <div className="space-y-6">
                  {/* Steps */}
                  <div className="bg-gray-50 dark:bg-brand-dark/30 rounded-2xl p-4 md:p-6 border border-brand-cyan/5">
                    <h5 className="text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-4">
                      Follow these steps:
                    </h5>
                    <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700 dark:text-gray-300">
                      {selectedMethod.steps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          <span className="ml-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Verification Form */}
                  <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-2">
                        Verify Transaction
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={txnId}
                          onChange={(e) => setTxnId(e.target.value)}
                          placeholder="e.g. K98DFE98J2"
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-cyan/20 bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan"
                        />
                        <button
                          type="submit"
                          disabled={verifying}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 transition-all cursor-pointer"
                        >
                          {verifying ? 'Verifying...' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 mx-auto">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h5 className="text-2xl font-black text-brand-text-light dark:text-white">
                    Verification Successful!
                  </h5>
                  <p className="text-sm text-gray-400 max-w-sm mx-auto">
                    Thank you! Your transaction ID <strong>{txnId}</strong> has been matched. Your broadband connection status has been updated to Active.
                  </p>
                  <button
                    onClick={() => setSelectedMethod(null)}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
