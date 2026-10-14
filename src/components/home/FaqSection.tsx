import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What are the age and license requirements to rent?',
      a: 'Drivers must be at least 21 years old for luxury sedans and premium SUVs, and 25 years old for supercars (Porsche 911, Corvette Z06, G-Wagon). A valid government-issued driver’s license held for at least 1 year is required. International drivers may use their domestic license alongside a valid passport.',
    },
    {
      q: 'How does the white-glove curbside delivery work?',
      a: 'Upon landing or checking into your hotel, your personal concierge will text you with real-time GPS tracking. We meet you directly at the passenger curbside or valet stand, complete a fast 60-second digital vehicle walk-around, hand over the key fob, and you are ready to roll.',
    },
    {
      q: 'What is your security deposit policy?',
      a: 'Unlike traditional rental agencies that hold thousands of dollars on your card, choosing our Premium or Full Protection package waives the traditional security deposit entirely. For basic tier rentals, a minor authorization of $500 is temporarily placed and released immediately upon return inspection.',
    },
    {
      q: 'Can I add an additional driver or change drop-off locations?',
      a: 'Yes! Additional drivers with valid licenses can be added during online checkout or at any point before handover. You can also opt for one-way rentals between our major hubs (e.g. LAX to Beverly Hills or SFO to Silicon Valley) with zero return hassle.',
    },
    {
      q: 'What is your cancellation and refund policy?',
      a: 'We understand schedules change. Every booking comes with complimentary free cancellation up to 24 hours before your scheduled delivery window for a 100% full refund back to your original payment method.',
    },
    {
      q: 'How are electric vehicle charges managed?',
      a: 'All electric vehicles (Tesla Model S Plaid, Porsche Taycan, Audi e-tron GT) are delivered with at least 90% battery charge. You can return the vehicle with as low as 20% battery with zero recharging penalties.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-24 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need To Know
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Clear, honest answers to help you hit the highway with complete peace of mind.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/90 transition-colors"
                >
                  <span className="text-base font-bold text-white tracking-wide">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/50 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
