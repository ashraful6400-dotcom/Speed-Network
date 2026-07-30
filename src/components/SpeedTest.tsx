'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RefreshCw, ArrowDown, ArrowUp, Activity, CheckCircle } from 'lucide-react';

interface SpeedTestProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpeedTest({ isOpen, onClose }: SpeedTestProps) {
  const [status, setStatus] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [download, setDownload] = useState(0.0);
  const [upload, setUpload] = useState(0.0);
  const [gaugeValue, setGaugeValue] = useState(0); // 0 to 100 representing speed gauge percentage

  useEffect(() => {
    if (!isOpen) {
      // Reset state on close
      setStatus('idle');
      setPing(0);
      setJitter(0);
      setDownload(0);
      setUpload(0);
      setGaugeValue(0);
    }
  }, [isOpen]);

  const runTest = async () => {
    // 1. Ping Phase
    setStatus('ping');
    setGaugeValue(15);
    for (let i = 0; i <= 10; i++) {
      setPing(Math.floor(Math.random() * 4) + 2); // 2-5ms
      setJitter(Math.floor(Math.random() * 2) + 1); // 1-2ms
      await new Promise((r) => setTimeout(r, 150));
    }

    // 2. Download Phase
    setStatus('download');
    const targetDownload = Math.floor(Math.random() * 60) + 120; // 120-180 Mbps
    let currentDownload = 0;

    const dlInterval = setInterval(() => {
      currentDownload += (targetDownload - currentDownload) * 0.15 + (Math.random() * 10 - 5);
      if (currentDownload < 0) currentDownload = 0;
      setDownload(parseFloat(currentDownload.toFixed(1)));
      // Normalize gauge value to max 250 Mbps
      setGaugeValue(Math.min(100, (currentDownload / 250) * 100));
    }, 100);

    await new Promise((r) => setTimeout(r, 4000));
    clearInterval(dlInterval);
    setDownload(parseFloat(targetDownload.toFixed(1)));

    // 3. Upload Phase
    setStatus('upload');
    setGaugeValue(0);
    const targetUpload = Math.floor(Math.random() * 40) + 110; // 110-150 Mbps
    let currentUpload = 0;

    const ulInterval = setInterval(() => {
      currentUpload += (targetUpload - currentUpload) * 0.15 + (Math.random() * 8 - 4);
      if (currentUpload < 0) currentUpload = 0;
      setUpload(parseFloat(currentUpload.toFixed(1)));
      setGaugeValue(Math.min(100, (currentUpload / 250) * 100));
    }, 100);

    await new Promise((r) => setTimeout(r, 4000));
    clearInterval(ulInterval);
    setUpload(parseFloat(targetUpload.toFixed(1)));

    // 4. Complete Phase
    setStatus('complete');
    setGaugeValue(0);
  };

  if (!isOpen) return null;

  // Calculate rotation for the gauge needle (from -120deg to 120deg)
  const rotation = -120 + (gaugeValue / 100) * 240;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-deep/80 backdrop-blur-md">
        {/* Backdrop anim */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-panel border border-brand-cyan/30 dark:border-brand-cyan/20 p-6 md:p-8 text-brand-text-light dark:text-brand-text-dark shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border border-gray-200 dark:border-brand-cyan/20 text-gray-500 dark:text-gray-400 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black tracking-wider bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              SPEEDTEST SIMULATOR
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Check your connection to SpeedNetworkBD Dhaka Node
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left Metrics (Ping/Jitter) */}
            <div className="space-y-4">
              <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border border-brand-cyan/10">
                <div>
                  <span className="text-xs text-gray-400 font-bold block uppercase">Ping</span>
                  <span className="text-2xl font-black text-brand-cyan">
                    {ping > 0 ? `${ping} ` : '-- '}
                    <span className="text-xs font-normal text-gray-400">ms</span>
                  </span>
                </div>
                <Activity className={`w-8 h-8 text-brand-cyan ${status === 'ping' ? 'animate-pulse' : ''}`} />
              </div>

              <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border border-brand-cyan/10">
                <div>
                  <span className="text-xs text-gray-400 font-bold block uppercase">Jitter</span>
                  <span className="text-2xl font-black text-brand-blue">
                    {jitter > 0 ? `${jitter} ` : '-- '}
                    <span className="text-xs font-normal text-gray-400">ms</span>
                  </span>
                </div>
                <Activity className={`w-8 h-8 text-brand-blue ${status === 'ping' ? 'animate-pulse' : ''}`} />
              </div>
            </div>

            {/* Dial Gauge */}
            <div className="flex flex-col items-center justify-center relative">
              {/* Gauge Background circle */}
              <div className="relative w-52 h-52 flex items-center justify-center rounded-full border-4 border-dashed border-brand-blue/20 dark:border-brand-cyan/5">
                {/* SVG Gauge Outline */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle
                    cx="104"
                    cy="104"
                    r="85"
                    className="stroke-current text-gray-200 dark:text-brand-dark/40"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="104"
                    cy="104"
                    r="85"
                    className="stroke-current text-brand-cyan transition-all duration-100"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 85}
                    strokeDashoffset={2 * Math.PI * 85 * (1 - gaugeValue / 100)}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Meter Center Info */}
                <div className="text-center z-10">
                  <span className="text-xs font-bold text-gray-400 block uppercase">
                    {status === 'ping' && 'Testing Ping'}
                    {status === 'download' && 'Downloading'}
                    {status === 'upload' && 'Uploading'}
                    {status === 'complete' && 'Test Complete'}
                    {status === 'idle' && 'Ready'}
                  </span>
                  <span className="text-4xl font-extrabold text-brand-text-light dark:text-white leading-none my-1 block">
                    {status === 'download' ? download : status === 'upload' ? upload : status === 'complete' ? download : '0.0'}
                  </span>
                  <span className="text-xs font-semibold text-brand-cyan">Mbps</span>
                </div>

                {/* Animated Needle */}
                <div
                  className="absolute w-2 h-24 bottom-[104px] origin-bottom transition-transform duration-100 ease-out"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <div className="w-1 h-20 bg-gradient-to-t from-brand-cyan to-transparent rounded-full shadow-[0_0_10px_#00F0FF]" />
                </div>
              </div>
            </div>

            {/* Right Metrics (Download/Upload) */}
            <div className="space-y-4">
              <div
                className={`glass-panel p-4 rounded-2xl flex items-center justify-between border transition-all ${
                  status === 'download' ? 'border-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'border-brand-cyan/10'
                }`}
              >
                <div>
                  <span className="text-xs text-gray-400 font-bold block uppercase">Download</span>
                  <span className="text-2xl font-black text-brand-cyan">
                    {download > 0 ? download : '--'} <span className="text-xs font-normal text-gray-400">Mbps</span>
                  </span>
                </div>
                <ArrowDown className={`w-8 h-8 text-brand-cyan ${status === 'download' ? 'animate-bounce' : ''}`} />
              </div>

              <div
                className={`glass-panel p-4 rounded-2xl flex items-center justify-between border transition-all ${
                  status === 'upload' ? 'border-brand-blue shadow-[0_0_15px_rgba(2,132,199,0.2)]' : 'border-brand-cyan/10'
                }`}
              >
                <div>
                  <span className="text-xs text-gray-400 font-bold block uppercase">Upload</span>
                  <span className="text-2xl font-black text-brand-blue">
                    {upload > 0 ? upload : '--'} <span className="text-xs font-normal text-gray-400">Mbps</span>
                  </span>
                </div>
                <ArrowUp className={`w-8 h-8 text-brand-blue ${status === 'upload' ? 'animate-bounce' : ''}`} />
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-8 flex justify-center">
            {status === 'idle' && (
              <button
                onClick={runTest}
                className="flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark font-black hover:scale-105 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>START SPEED TEST</span>
              </button>
            )}

            {status !== 'idle' && status !== 'complete' && (
              <div className="flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-bold animate-pulse">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>TEST IN PROGRESS...</span>
              </div>
            )}

            {status === 'complete' && (
              <div className="flex flex-col items-center space-y-4 w-full">
                <div className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 font-bold">
                  <CheckCircle className="w-5 h-5" />
                  <span>Network Status: Excellent (Dhaka Node)</span>
                </div>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setPing(0);
                    setJitter(0);
                    setDownload(0);
                    setUpload(0);
                    setGaugeValue(0);
                  }}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-lg border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 font-bold transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Test Again</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
