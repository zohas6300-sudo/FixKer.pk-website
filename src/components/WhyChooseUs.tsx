import { ShieldCheck, Zap, Users, ShieldAlert, BadgePercent, Star, ThumbsUp } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      id: 1,
      title: 'Verified Professionals Only',
      description: 'Every worker undergoes a background audit, CNIC check, and technical evaluation before registration is approved.',
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      color: 'bg-blue-50/70 border-blue-100',
    },
    {
      id: 2,
      title: 'Super-Fast Match System',
      description: 'Submit your requirements and receive a response via call or WhatsApp from matched local professionals within minutes.',
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      color: 'bg-amber-50/70 border-amber-100',
    },
    {
      id: 3,
      title: 'Local Pakistani Experts',
      description: 'We connect you with workers currently active in your specific town/area. Minimum travel cost, maximum convenience.',
      icon: <Users className="w-8 h-8 text-accent" />,
      color: 'bg-emerald-50/70 border-emerald-100',
    },
    {
      id: 4,
      title: '100% Upfront, Fair Rates',
      description: 'Discuss rates freely directly with matched workers on WhatsApp without third-party commission pricing hikes.',
      icon: <BadgePercent className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50/70 border-purple-100',
    },
    {
      id: 5,
      title: 'Exceptional Customer Reviews',
      description: 'Check actual ratings and completion histories. Over 96% of Pakistani homeowners rate FixKer workers 5-stars.',
      icon: <Star className="w-8 h-8 text-rose-500 fill-rose-50" />,
      color: 'bg-rose-50/70 border-rose-100',
    },
    {
      id: 6,
      title: 'Trusted Across Pakistan',
      description: 'Connecting thousands of service requests daily in Lahore, Karachi, Islamabad, and other major cities.',
      icon: <ThumbsUp className="w-8 h-8 text-cyan-600" />,
      color: 'bg-cyan-50/70 border-cyan-100',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-50 border-t border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-bold text-accent uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full">
            Our Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Why Thousands of Families Trust FixKer.pk
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            We are redefining home and business maintenance services across Pakistan with an emphasis on speed, safety, and visual trust.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-left">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-slate-50">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium mt-3 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Safe Hand Off Banner */}
        <div className="mt-16 bg-primary rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl shadow-blue-200">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
          <div className="sm:flex sm:items-center sm:justify-between relative z-10 max-w-5xl mx-auto">
            <div className="mb-6 sm:mb-0 max-w-2xl text-left">
              <span className="inline-flex items-center text-xs font-black uppercase tracking-wider bg-blue-500/50 px-2.5 py-1 rounded-md mb-3">
                <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Client Protection Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                No Pre-payments. No Extra Fees. Direct Work.
              </h3>
              <p className="text-sm text-blue-100 font-medium mt-2">
                Pay only for actual repairs completed. You retain full control over pricing discussions and service scheduling directly on WhatsApp or phone.
              </p>
            </div>
            <a
              href="tel:+923116347837"
              className="inline-flex items-center px-6 py-4 bg-white text-primary hover:bg-slate-50 font-extrabold rounded-xl text-sm transition-all shadow-md"
            >
              Call Helpline: 0311 6347837
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
