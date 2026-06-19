import React from 'react';
import { ClipboardList, UserCheck, MessageSquare, BadgeCheck, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Submit Request',
      description: 'Select your needed service and briefly describe your problem in our simple form. It takes less than a minute!',
      icon: <ClipboardList className="w-6 h-6 text-blue-500" />,
      glowColor: 'group-hover:shadow-blue-500/20',
      borderColor: 'border-blue-100',
      bgColor: 'bg-blue-50/50',
    },
    {
      number: '02',
      title: 'Vetted Match',
      description: 'Our system identifies background-verified, active professionals in your exact town/neighborhood.',
      icon: <UserCheck className="w-6 h-6 text-amber-500" />,
      glowColor: 'group-hover:shadow-amber-500/20',
      borderColor: 'border-amber-100',
      bgColor: 'bg-amber-50/50',
    },
    {
      number: '03',
      title: 'Direct Call / WhatsApp',
      description: 'Within 15 minutes, matched technicians will call or text you showing their credentials to negotiate quotes directly.',
      icon: <MessageSquare className="w-6 h-6 text-emerald-500" />,
      glowColor: 'group-hover:shadow-emerald-500/20',
      borderColor: 'border-emerald-100',
      bgColor: 'bg-emerald-50/50',
    },
    {
      number: '04',
      title: 'Hassle-Free Fix',
      description: 'The expert arrives at your doorstep, resolves the issue professionally, and you pay directly with zero agent markup.',
      icon: <BadgeCheck className="w-6 h-6 text-purple-500" />,
      glowColor: 'group-hover:shadow-purple-500/20',
      borderColor: 'border-purple-100',
      bgColor: 'bg-purple-50/50',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white border-b border-slate-200/50 relative overflow-hidden">
      {/* Decorative background visual styles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-50 to-transparent rounded-full filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-bl from-emerald-50 to-transparent rounded-full filter blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-primary uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/60">
            SIMPLE 4-STEP PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            How FixKer.pk Works For You
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-semibold mt-3">
            Say goodbye to unreliable handymen. Hire background-verified local professionals with total peace of mind in minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col h-full bg-slate-50/60 hover:bg-white rounded-2xl p-6 border border-slate-200/60 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              {/* Card Hover Glow effect */}
              <div className={`absolute -inset-px rounded-2xl border-2 border-transparent group-hover:border-inherit transition-all duration-300 pointer-events-none ${step.glowColor}`} />
              
              {/* Step indicator on top or corner */}
              <div className="flex items-center justify-between mb-6">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${step.bgColor} border ${step.borderColor} transition-transform group-hover:scale-110 duration-300`}>
                  {step.icon}
                </div>
                <span className="text-4xl font-black font-mono text-slate-200 group-hover:text-amber-400/40 transition-colors duration-300">
                  {step.number}
                </span>
              </div>

              {/* Step content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-black text-slate-950 mb-2 group-hover:text-primary transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>

              {/* Connecting line arrow pointing right (except last step on large monitors) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 translate-x-1/2 z-20">
                  <ArrowRight className="w-5 h-5 text-slate-300 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dynamic call to action prompt below the steps */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center p-1.5 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-2xl mx-auto space-y-3 sm:space-y-0 sm:space-x-3 shadow-xs">
            <span className="text-xs sm:text-sm font-bold text-slate-600 px-3">
              Need immediate assistance? Skip steps and connect now:
            </span>
            <a
              href="https://wa.me/923006347836?text=Hi%20FixKer,%20I%20need%20to%20hire%20a%20professional!"
              target="_blank"
              rel="referrer noopener"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg hover:shadow-emerald-200/50 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Quick Help via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
