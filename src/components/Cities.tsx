import { CITIES_SERVED } from '../data';
import { MapPin, ArrowUpRight } from 'lucide-react';

interface CitiesProps {
  onSelectCity: (cityName: string) => void;
}

export default function Cities({ onSelectCity }: CitiesProps) {
  return (
    <section id="cities" className="py-20 bg-slate-50 border-t border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-bold text-accent uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full">
            Active Zones
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Cities We Serve Across Pakistan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            We operate in all major commercial clusters. Connect with local teams operating in your metropolitan town.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-12 text-left">
          {CITIES_SERVED.map((city) => (
            <div
              key={city.name}
              onClick={() => onSelectCity(city.name)}
              className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-primary hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-blue-50 text-slate-500 group-hover:text-primary transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm font-black text-slate-400 group-hover:text-primary transition-colors">
                  {city.urduName}
                </span>
              </div>

              <div className="mt-8">
                <h4 className="font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                  {city.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mt-1">
                  <span>{city.professionalCount}+ Active Pros</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lahore/Karachi Special badge */}
        <p className="mt-10 text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
          🚨 Expanding soon to Abbottabad, Mirpur, and Gujrat!
        </p>

      </div>
    </section>
  );
}
