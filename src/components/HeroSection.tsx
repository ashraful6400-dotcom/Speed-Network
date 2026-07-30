'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Wifi, ShieldAlert, Award, Zap } from 'lucide-react';

interface HeroSectionProps {
  onOpenSpeedTest: () => void;
}

export default function HeroSection({ onOpenSpeedTest }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 20000));
    const connectionDistance = 120;
    const mouse = { x: -1000, y: -1000, radius: 150 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce borders
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(0, 240, 255, 0.7)';
        context.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw line to mouse
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const alphaMouse = (1 - distMouse / mouse.radius) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alphaMouse})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Network Particle Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0" />

      {/* Decorative Radial Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8 select-none">
        
        {/* Brand highlight banner */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-bold text-brand-cyan uppercase tracking-widest shadow-lg">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span>Next-Gen Optical Fiber Network</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-brand-text-light dark:text-white max-w-5xl mx-auto leading-[1.1] select-none">
          Fast, Reliable & Unlimited{' '}
          <span className="bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-blue bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            Broadband Internet
          </span>
        </h1>

        {/* Hero Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-300 max-w-2xl mx-auto font-medium">
          Experience ultra-stable fiber connection with SpeedNetworkBD. Zero buffering, dedicated BDIX speeds, and 24/7 technical surveillance for your home and business.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => handleScrollTo('#new-connection')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark font-black hover:scale-105 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>Get New Connection</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => handleScrollTo('#packages')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-brand-cyan/30 text-brand-text-light dark:text-white font-black hover:bg-brand-cyan/10 hover:border-brand-cyan transition-all duration-300 cursor-pointer"
          >
            View Packages
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-12 text-center border-t border-brand-cyan/10">
          <div>
            <span className="text-xl sm:text-2xl font-black text-brand-cyan block">99.98%</span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Uptime SLA</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-brand-cyan block">&lt; 3ms</span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Ping Latency</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-brand-cyan block">15k+</span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Active Lines</span>
          </div>
        </div>

      </div>
    </section>
  );
}
