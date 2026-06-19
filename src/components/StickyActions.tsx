import { Phone, MessageCircle } from 'lucide-react';

export default function StickyActions() {
  return (
    <>
      {/* Desktop Floating Right Widgets (Shows only on md and larger) */}
      <div className="hidden md:flex flex-col space-y-3.5 fixed right-6 bottom-8 z-30 animate-fade-in">
        {/* Support Phone widget */}
        <a
          href="tel:03006347836"
          className="group flex items-center justify-end bg-primary hover:bg-primary-hover text-white p-3.5 rounded-full shadow-xl transition-all cursor-pointer relative"
          title="Call FixKer Support"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-300 font-extrabold text-xs whitespace-nowrap px-0 group-hover:px-2 block">
            Call 0300 6347836
          </span>
          <Phone className="w-5 h-5 flex-shrink-0" />
        </a>

        {/* WhatsApp widget */}
        <a
          href="https://wa.me/923006347836?text=Assalam-o-Alaikum%20FixKer,%20I%20have%20an%20urgent%20repair%20request!"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-end bg-accent hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-xl transition-all cursor-pointer relative"
          title="Direct WhatsApp Helpline"
        >
          {/* Subtle live pulse indicator */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[160px] transition-all duration-300 font-extrabold text-xs whitespace-nowrap px-0 group-hover:px-2 block">
            WhatsApp Online (Live)
          </span>
          <MessageCircle className="w-5 h-5 fill-white text-accent flex-shrink-0" />
        </a>
      </div>

      {/* Mobile Sticky CTA Bar (Shows only on screens below md) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 grid grid-cols-2 gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
        {/* Click to Call */}
        <a
          href="tel:03006347836"
          className="flex items-center justify-center space-x-2 py-3 px-4 bg-primary text-white font-extrabold text-sm rounded-lg active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4" />
          <span>Call Support</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href="https://wa.me/923006347836?text=Hi%20FixKer,%20I%20want%2520to%20hire%20a%20technician"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center space-x-2 py-3 px-4 bg-accent text-white font-extrabold text-sm rounded-lg active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-white text-accent" />
          <span>WhatsApp Job</span>
        </a>
      </div>
    </>
  );
}
