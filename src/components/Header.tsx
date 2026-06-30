import { useState } from 'react';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ onScrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => handleNavClick('hero')}>
            <Logo variant="light" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('services')}
              className="text-slate-600 hover:text-primary font-bold text-sm transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-slate-600 hover:text-primary font-bold text-sm transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('why-us')}
              className="text-slate-600 hover:text-primary font-bold text-sm transition-colors cursor-pointer"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick('cities')}
              className="text-slate-600 hover:text-primary font-bold text-sm transition-colors cursor-pointer"
            >
              Cities
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-slate-600 hover:text-primary font-bold text-sm transition-colors cursor-pointer"
            >
              FAQs
            </button>
          </nav>

          {/* Action Buttons & Call Info */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-right">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Helpline</p>
                <a
                  href="tel:03006347836"
                  className="font-black text-slate-900 hover:text-primary text-base transition-colors"
                >
                  0300-6347836
                </a>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-accent">
                <Phone className="w-4 h-4" />
              </div>
            </div>

            <button
              onClick={() => handleNavClick('register-pro')}
              className="px-5 py-2.5 text-xs sm:text-sm font-black text-slate-900 bg-amber-400 hover:bg-amber-500 hover:shadow-amber-200/50 active:scale-95 rounded-xl shadow-lg shadow-amber-100/85 transition-all cursor-pointer flex items-center space-x-1.5 border border-amber-300/40 relative group overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="relative z-10 flex items-center font-black">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                Join as Pro
              </span>
            </button>

            <button
              onClick={() => handleNavClick('request-job')}
              className="px-5 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-hover active:scale-95 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all cursor-pointer"
            >
              Request Service
            </button>
          </div>

          {/* Mobile Rightside controls */}
          <div className="flex lg:hidden items-center space-x-3">
            <a
              href="tel:03006347836"
              className="p-2 rounded-xl bg-accent text-white shadow-xs"
              title="Call Helpline"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 animate-slide-down">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <button
              onClick={() => handleNavClick('services')}
              className="block w-full text-left py-3 px-4 rounded-xl text-slate-700 hover:bg-slate-50 font-bold"
            >
              Our Services
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="block w-full text-left py-3 px-4 rounded-xl text-slate-700 hover:bg-slate-50 font-bold"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('why-us')}
              className="block w-full text-left py-3 px-4 rounded-xl text-slate-700 hover:bg-slate-50 font-bold"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick('cities')}
              className="block w-full text-left py-3 px-4 rounded-xl text-slate-700 hover:bg-slate-50 font-bold"
            >
              Cities We Serve
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="block w-full text-left py-3 px-4 rounded-xl text-slate-700 hover:bg-slate-50 font-bold"
            >
              FAQs
            </button>

            <div className="border-t border-slate-100 pt-4 px-4 flex flex-col space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Verified Status:</span>
                <span className="flex items-center text-accent font-bold">
                  <ShieldCheck className="w-4 h-4 mr-1" /> Active Network
                </span>
              </div>
              <a
                href="tel:03006347836"
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-50 text-accent font-bold text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call 0300 6347836</span>
              </a>
              <button
                onClick={() => handleNavClick('request-job')}
                className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold font-sans text-center shadow-md shadow-blue-100"
              >
                Request Service Near You
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('register-pro');
                }}
                className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl font-black font-sans text-center shadow-md shadow-amber-100/60 flex items-center justify-center space-x-2 border border-amber-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Join as Verified Partner Pro</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
