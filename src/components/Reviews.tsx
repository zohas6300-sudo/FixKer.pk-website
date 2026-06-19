import { TESTIMONIALS, FEATURED_PROFESSIONALS } from '../data';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-primary uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            What Our Pakistani Customers Say
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Read direct stories from homeowners, businesses, and offices who used FixKer.pk to resolve urgent repair problems.
          </p>
        </div>

        {/* Reviews Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 relative flex flex-col justify-between shadow-sm"
            >
              <div className="absolute top-6 right-8 text-slate-200 pointer-events-none">
                <Quote className="w-10 h-10 fill-current" />
              </div>

              <div>
                {/* Rating stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  {review.rating < 5 && <Star className="w-4 h-4 text-slate-200" />}
                </div>

                {/* Comment text */}
                <p className="mt-5 text-slate-700 font-semibold text-sm sm:text-base leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">
                    {review.role} • {review.city}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 bg-blue-50 text-primary rounded-md font-mono">
                  ⚡ {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SEC 2: Featured Professional Profile Cards */}
        <div className="mt-24 border-t border-slate-200 pt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs font-bold text-accent uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Verified Partners
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4">
              Meet Some of Our Star Technicians
            </h3>
            <p className="mt-3 text-sm text-slate-500 font-bold">
              These professional workers hold elite customer feedback, proper identification badges, and high completion ranks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12 text-left">
            {FEATURED_PROFESSIONALS.map((pro) => (
              <div
                key={pro.id}
                className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg overflow-hidden transition-all duration-300"
              >
                {/* Photo container */}
                <div className="aspect-square relative w-full overflow-hidden bg-slate-100">
                  <img
                    src={pro.imageUrl}
                    alt={pro.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Rating pin */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg border border-slate-200 text-[10px] font-black text-slate-900 shadow-xs flex items-center space-x-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{pro.rating}</span>
                  </div>
                </div>

                {/* Profile detail */}
                <div className="p-4">
                  <div className="flex items-center space-x-1.5 text-accent font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 mr-0.5" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Verified Tech</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mt-1 group-hover:text-primary transition-colors">
                    {pro.name}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 mt-0.5 h-4 line-clamp-1">
                    {pro.profession}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-bold">
                    <span>{pro.city}</span>
                    <span>{pro.experience} Yrs Exp</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
