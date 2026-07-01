import { useState } from 'react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('f1'); // Keep first open by default

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-200/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-bold text-primary uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-4">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-bold">
            Everything you need to know about our matching processes, payment safety, and partner verification.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="group border border-slate-200 bg-white rounded-xl hover:border-primary/60 shadow-xs transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center text-sm sm:text-base pr-4">
                    <HelpCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-100 animate-fade-in pl-13">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Qs Button */}
        <div className="mt-12 text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
            Direct Helpline Assistance Available 8:00 AM - 10:00 PM
          </p>
          <p className="text-sm font-semibold text-slate-700 mt-2">
            Speak directly with our regional lead generator coordinators for customized queries.
          </p>
          <a
            href="tel:+923116347837"
            className="inline-flex items-center mt-4 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-black transition-all shadow-xs"
          >
            Call Helpline: 0311 6347837
          </a>
        </div>

      </div>
    </section>
  );
}
