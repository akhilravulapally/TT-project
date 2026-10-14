import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Harrison Sterling',
      role: 'Private Equity Director',
      vehicle: 'Porsche 911 Carrera 4S',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80',
      comment: 'Apex completely redefines car rental. The 911 was waiting right at Signature Aviation LAX when my charter landed. Immaculate condition with only 1,800 miles on the odometer.',
      rating: 5,
    },
    {
      name: 'Dr. Evelyn Morales',
      role: 'Biotech Founder',
      vehicle: 'Tesla Model S Plaid',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=140&q=80',
      comment: 'The Plaid was unreal. Clean, fully charged to 100%, and the concierge walked me through every yoke steering setting patiently. Will never use airport Hertz or Avis again.',
      rating: 5,
    },
    {
      name: 'Liam Davenport',
      role: 'Film Producer',
      vehicle: 'Mercedes-AMG G 63',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=140&q=80',
      comment: 'Needed a statement car for Miami art week. The matte black G-Wagon arrived on time with flawless sound system. Booking through the portal took under 2 minutes.',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-slate-900/60 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Trusted By High-Profile Drivers
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Over 24,000 successful luxury rentals across the United States & Europe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-8 relative flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-4">
                <img
                  src={rev.image}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">{rev.role}</p>
                  <p className="text-[11px] font-semibold text-blue-400 mt-0.5">
                    Rented {rev.vehicle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
