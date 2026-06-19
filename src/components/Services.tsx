import { POPULAR_SERVICES } from '../data';
import { Lightbulb, Droplets, Hammer, Flame, Sun, Wind, Palette, Wrench } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

// Maps standard popular service icon identifier to high quality lucide icons
const getServiceIcon = (iconStr: string) => {
  switch (iconStr) {
    case '⚡':
      return <Lightbulb className="w-6 h-6 text-yellow-500" />;
    case '🚿':
      return <Droplets className="w-6 h-6 text-blue-500" />;
    case '🪚':
      return <Hammer className="w-6 h-6 text-amber-700" />;
    case '🔩':
      return <Flame className="w-6 h-6 text-red-500" />;
    case '☀':
      return <Sun className="w-6 h-6 text-orange-500 animate-spin-slow" />;
    case '❄':
      return <Wind className="w-6 h-6 text-cyan-500 animate-pulse" />;
    case '🎨':
      return <Palette className="w-6 h-6 text-pink-500" />;
    case '🔨':
    default:
      return <Wrench className="w-6 h-6 text-slate-600" />;
  }
};

export default function Services({ onSelectService }: ServicesProps) {
  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-bold text-primary uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Popular Professional Services On Demand
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Find checked, highly-rated technicians of any profession ready to solve your problems instantly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
          {POPULAR_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-primary service-card"
            >
              {/* Icon Panel */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                  {getServiceIcon(service.icon)}
                </div>
                <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors uppercase font-mono bg-slate-100/60 px-2 py-0.5 rounded-md">
                  {service.id}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-extrabold text-slate-900 mt-5 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              
              <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed h-12 line-clamp-2">
                {service.description}
              </p>

              {/* Quick Action Button */}
              <button
                onClick={() => onSelectService(service.name)}
                className="w-full mt-6 py-3 px-4 rounded-xl bg-slate-50 hover:bg-primary group-hover:bg-primary text-slate-700 hover:text-white group-hover:text-white text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center space-x-1"
              >
                <span>Book {service.name} Now</span>
              </button>
            </div>
          ))}
        </div>

        {/* Custom request callout */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-left gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <span className="p-3 bg-blue-100/50 rounded-full text-primary font-bold text-2xl">❓</span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">Need a custom job or service not listed here?</h4>
              <p className="text-sm text-slate-500 font-medium">No problem! Submit a custom request and our team will match you with specialized experts.</p>
            </div>
          </div>
          <button
            onClick={() => onSelectService('Other')}
            className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs tracking-wide transition-all whitespace-nowrap cursor-pointer shadow-xs"
          >
            Submit Custom Request
          </button>
        </div>

      </div>
    </section>
  );
}
