import { ArrowRight, MessageCircle, Shield, Users, Zap, Award } from 'lucide-react';

const heroImage = "/src/assets/images/fixker_hero_1781862018297.jpg";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  onSelectServiceTab: (serviceId: string) => void;
}

export default function Hero({ onScrollToSection, onSelectServiceTab }: HeroProps) {
  return (
    <section id="hero" className="relative bg-slate-50 pt-12 pb-16 sm:pb-24 border-b border-slate-200/60 overflow-hidden animate-fade-in">
      {/* Background Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-100/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-emerald-100/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-full bg-blue-50/70 border border-blue-100/80 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-primary fill-blue-50" />
              Pakistan's #1 Rated Support & Service Network
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
              Professional Help,<br />
              <span className="text-primary relative inline-block">Just Minutes Away.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
              Connect with verified electricians, plumbers, and skilled experts in your neighborhood. Quick arrivals, transparent pricing, and fully insured assistance.
            </p>

            {/* Actions Panel */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-lg sm:max-w-none">
              <button
                onClick={() => onScrollToSection('request-job')}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-extrabold text-base rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl active:scale-98 transition-all cursor-pointer"
              >
                <span>Request Service</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onScrollToSection('register-pro')}
                className="flex items-center justify-center px-6 py-4 bg-amber-400 hover:bg-amber-500 font-extrabold text-slate-900 text-sm rounded-xl shadow-lg shadow-amber-100 border border-amber-300/40 hover:shadow-xl hover:shadow-amber-200/60 transition-all cursor-pointer relative group overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                  Join as Pro
                </span>
              </button>

              {/* Directly WhatsApp Button */}
              <a
                href="https://wa.me/923006347836?text=Hi%20FixKer,%20I%20need%20to%20hire%2520a%20professional!"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2.5 px-7 py-4 bg-accent hover:bg-emerald-600 text-white font-extrabold text-base rounded-xl shadow-lg shadow-emerald-50 hover:shadow-xl active:scale-98 transition-all animate-pulse"
              >
                <MessageCircle className="w-5 h-5 fill-white text-accent" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200/80">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-primary">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-none">10k+</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-tight mt-0.5">Verified Pros</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-accent">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-none">15+</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-tight mt-0.5">Cities</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-none">50k+</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-tight mt-0.5">Assisted Jobs</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-none">4.9/5</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-tight mt-0.5">Avg Rating</p>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center">
            {/* Beautiful container matching card */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-900">
              <img
                src={heroImage}
                alt="Pakistani Electricians, Plumbers and Solar Techs working professionally"
                className="w-full h-full object-cover select-none object-center"
                referrerPolicy="no-referrer"
              />
              {/* Overlay with subtle dark glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom tag on image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl flex items-center justify-between shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono block">Real-time status</span>
                    <span className="text-xs font-black text-slate-900 block leading-tight">Matched 14 Jobs in Lahore just now!</span>
                  </div>
                </div>
                <button
                  onClick={() => onScrollToSection('request-job')}
                  className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>

            {/* Absolute badge floating behind */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-emerald-100/20 -z-10 blur-xl animate-pulse" />
          </div>

        </div>
      </div>
    </section>
  );
}
