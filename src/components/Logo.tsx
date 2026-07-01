import React from 'react';
import logoImg from '../assets/images/fixker_logo_1782911405263.jpg';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = '', variant = 'light' }: LogoProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Premium Circular Logo Badge */}
      <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-slate-200/90 dark:border-slate-800/90 shadow-lg overflow-hidden group bg-white">
        <img
          src={logoImg}
          alt="FixKer.pk Logo"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Glow & light reflex */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Brand Label & Typography */}
      <div>
        <div className="flex items-baseline">
          <span className={`font-black text-4xl tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Fix<span className="text-accent">Ker</span>
          </span>
          <span className="text-primary font-black text-3xl leading-none">.pk</span>
        </div>
        <p className={`text-[10.5px] uppercase tracking-widest font-black font-mono leading-none mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Verified Pro Network
        </p>
      </div>
    </div>
  );
}


