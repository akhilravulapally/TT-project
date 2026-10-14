import React from 'react';
import { ShieldCheck, Sparkles, KeyRound, Headphones, Car, CheckCircle2, Award, Clock } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const pillars = [
    {
      icon: KeyRound,
      title: 'White-Glove Handover',
      description: 'Skip tedious airport counters and rental queues. Our concierge delivers your car directly to your terminal or hotel curbside with engine warmed.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: ShieldCheck,
      title: 'Guaranteed Exact Model',
      description: 'Unlike standard car rental chains, we never assign "or similar". The exact model, color, and trim you choose is the exact car you take to the road.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Award,
      title: 'Transparent Pricing & Perks',
      description: 'Comprehensive baseline insurance, generous daily mileage, and no surprise airport concession facility fees at return.',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      icon: Headphones,
      title: '24/7 VIP Concierge & Support',
      description: 'Direct cellular access to personal logistics coordinators for route recommendations, roadside assist, or effortless booking extension.',
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Select Your Vehicle',
      description: 'Browse our curated catalog of supercars, electric performers, and luxury family cruisers.',
    },
    {
      step: '02',
      title: 'Instant Digital Verification',
      description: 'Securely upload your driver credentials in 60 seconds with encrypted identity validation.',
    },
    {
      step: '03',
      title: 'Curbside Handover',
      description: 'Meet your dedicated concierge, inspect the immaculate vehicle, receive the key fob, and drive away.',
    },
  ];

  return (
    <div>
      {/* Why Choose Us Section */}
      <section id="experience-section" className="py-24 bg-slate-900/40 border-t border-slate-800/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
              The Apex Standard
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
              Engineered For The Discerning Driver
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400">
              We eliminated every hassle of traditional car rental to deliver an effortless, first-class journey from departure to return.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${p.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20`}>
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-950 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">
              Seamless Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              From Screen To Highway In 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-black text-blue-500/40 tracking-tighter block mb-4">
                    {st.step}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{st.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed within 5 minutes</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
