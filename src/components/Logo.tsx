import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = '', variant = 'light' }: LogoProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Premium 3D-effect Squircle Container */}
      <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-lg shadow-slate-900/40 text-white overflow-hidden group">
        {/* Fine-line tech grid backdrop */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#334155_1.5px,transparent_1.5px)] [background-size:8px_8px]" />
        
        {/* Glow & reflection flares */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.1)_0%,transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-transparent to-amber-500/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Custom Hand-Crafted Vector Handy Tools SVG (Crossed Wrench + Claw Hammer inside Shield) */}
        <svg
          className="w-8 h-8 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[6deg]"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="tool-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="tool-silver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="tool-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {/* Protective Shield Base representing Trust & Safety */}
          <path
            d="M5 9.5V15.5C5 21.5 10 26.5 16 28C22 26.5 27 21.5 27 15.5V9.5L16 5L5 9.5Z"
            stroke="url(#tool-accent)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="opacity-40 group-hover:opacity-85 transition-opacity"
            fill="rgba(14, 165, 233, 0.03)"
          />

          {/* BACKGROUND GEAR (Behind the tools for mechanical engineering vibes) */}
          <path
            d="M16 11C14.3431 11 13 12.3431 13 14M13 18C13 19.6569 14.3431 21 16 21M19 18C19.6569 18 20.3431 17.3431 20.8 16.5M19 14C19.6569 14 20.2 13.5 20.5 12.8M16 11V9M16 21V23"
            stroke="url(#tool-gold)"
            strokeWidth="1.25"
            strokeLinecap="round"
            className="opacity-25 group-hover:opacity-60 transition-opacity"
          />

          {/* TOOL 1: Diagonal Right-to-Left Handy Wrench */}
          {/* Path outlines double head combi wrench */}
          <path
            d="M9 23 L22 10"
            stroke="url(#tool-silver)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Wrench Top Open Jaw */}
          <path
            d="M18.8 8c1.3-1.3 3.5-1.3 4.8 0l1.4 1.4c1.3 1.3 1.3 3.5 0 4.8l-2.4-2.4L18.8 8z"
            fill="url(#tool-silver)"
          />
          {/* Wrench Bottom Ring/Span End */}
          <circle
            cx="8.5"
            cy="23.5"
            r="2.5"
            fill="url(#tool-silver)"
          />
          <circle
            cx="8.5"
            cy="23.5"
            r="1"
            fill="#020617"
          />

          {/* TOOL 2: Diagonal Left-to-Right Mechanical Claw Hammer */}
          {/* Wooden/Rubber Grip Handle */}
          <path
            d="M10 10 L23 23"
            stroke="url(#tool-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Steel Hammer Head */}
          <path
            d="M7 11.5 L12.5 6 M9 9 M5.5 10 L10 5.5"
            stroke="url(#tool-silver)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Solid Heavy Head Block */}
          <path
            d="M6 7.5c.3-.5 1-1.2 1.8-1.5L9.5 9c-.3.8-1 1.5-1.5 1.8L6 7.5z"
            fill="url(#tool-silver)"
          />
          {/* Left Driving Face */}
          <rect
            x="4"
            y="9"
            width="2"
            height="3"
            rx="0.5"
            transform="rotate(-45 4 9)"
            fill="url(#tool-silver)"
          />
          {/* Right Pulling Claw */}
          <path
            d="M10 5c1.5 0 3 .8 4 2L11 10C10.5 8.5 10 6.5 10 5z"
            fill="url(#tool-silver)"
          />

          {/* Central Shining Verification Accent (FixSparkle) */}
          <circle
            cx="16"
            cy="16"
            r="1.5"
            className="fill-amber-400 animate-ping opacity-75"
          />
          <circle
            cx="16"
            cy="16"
            r="1.5"
            className="fill-amber-400 shadow-sm"
          />
        </svg>

        {/* Sweeping premium bright flare animation on hover */}
        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        
        {/* Online Status Bullet indicator */}
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
      </div>

      {/* Brand Label & Typography */}
      <div>
        <div className="flex items-baseline">
          <span className={`font-black text-2xl tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Fix<span className="text-accent">Ker</span>
          </span>
          <span className="text-primary font-black text-xl leading-none">.pk</span>
        </div>
        <p className={`text-[8.5px] uppercase tracking-widest font-black font-mono leading-none mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Verified Pro Network
        </p>
      </div>
    </div>
  );
}


