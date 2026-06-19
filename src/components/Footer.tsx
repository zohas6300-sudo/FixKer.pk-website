import { ShieldCheck, MessageCircle, Phone, Globe } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
}

export default function Footer({ onScrollToSection, onOpenPrivacyModal, onOpenTermsModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans relative overflow-hidden">
      
      {/* Footer Top Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Col 1: Brand & Desc */}
          <div className="lg:col-span-4 space-y-6">
            <div className="cursor-pointer" onClick={() => onScrollToSection('hero')}>
              <Logo variant="dark" />
            </div>

            <p className="text-sm text-slate-400 font-medium leading-relaxed font-sans">
              FixKer.pk is Pakistan’s leading digital service platform matching residential & commercial properties with checked electricians, plumbers, painters, AC technicians, and repair experts safely.
            </p>

            {/* Quick trust line */}
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Verified Business Registration Network</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm font-bold">
              <li>
                <button
                  onClick={() => onScrollToSection('hero')}
                  className="hover:text-accent cursor-pointer block text-left transition-colors"
                >
                  Home Main
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('services')}
                  className="hover:text-accent cursor-pointer block text-left transition-colors"
                >
                  Popular Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('request-job')}
                  className="hover:text-accent cursor-pointer block text-left transition-colors"
                >
                  Request a Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('register-pro')}
                  className="hover:text-accent cursor-pointer block text-left transition-colors"
                >
                  Join as Professional
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('why-us')}
                  className="hover:text-accent cursor-pointer block text-left transition-colors"
                >
                  How & Why Choose Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Safety */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Legal Panels</h4>
            <ul className="space-y-2.5 text-sm font-bold">
              <li>
                <button onClick={onOpenPrivacyModal} className="hover:text-accent cursor-pointer block text-left transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenTermsModal} className="hover:text-accent cursor-pointer block text-left transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('faq')}
                  className="hover:text-accent cursor-pointer block text-left transition-colors"
                >
                  General FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts Helpline */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white font-mono">24/7 Helpline Support</h4>
            <p className="text-xs text-slate-400 font-semibold">
              Reach out directly for specialized commercial installations, regional partnerships, or service dispute support teams.
            </p>
            <div className="space-y-2.5 pt-1">
              <a
                href="tel:03006347836"
                className="flex items-center space-x-2.5 text-sm font-bold text-white hover:text-emerald-400 transition-colors"
                title="Call phone helpline"
              >
                <div className="p-2 h-8 w-8 rounded bg-slate-800 text-emerald-500 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span>0300 6347836</span>
              </a>

              <a
                href="https://wa.me/923006347836"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 text-sm font-bold text-white hover:text-emerald-400 transition-colors"
                title="WhatsApp support link"
              >
                <div className="p-2 h-8 w-8 rounded bg-slate-800 text-emerald-500 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 fill-emerald-500 text-slate-800" />
                </div>
                <span>WhatsApp Helpline</span>
              </a>
            </div>

            {/* Social channels */}
            <div className="flex items-center space-x-3 pt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded bg-slate-900 text-slate-400 hover:text-accent hover:bg-slate-800 transition-colors">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded bg-slate-900 text-slate-400 hover:text-accent hover:bg-slate-800 transition-colors">
                Instagram
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="border-t border-slate-900 py-6 bg-black text-slate-500 text-center font-semibold text-xs relative z-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {currentYear} FixKer.pk. All rights reserved. Built for Pakistan service network.</p>
          <div className="flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span>Serving Lahore • Karachi • Islamabad • Rawalpindi & Beyond</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
