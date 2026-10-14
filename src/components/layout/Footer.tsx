import React, { useState } from 'react';
import { Car, ShieldCheck, Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (id: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenAdmin }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800/80">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Car className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                APEX<span className="text-blue-500">DRIVE</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier luxury and exotic automobile rental collective. Unrivaled fleet maintenance, instant terminal delivery, and 24/7 dedicated concierge.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>24/7 Roadside VIP Concierge: +1 (800) 592-APEX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Beverly Hills • Manhattan • Miami Beach • London</span>
              </div>
            </div>
          </div>

          {/* Quick Fleet Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Luxury Fleet
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigateSection('fleet-section')} className="hover:text-blue-400 transition-colors">
                  Exotic Supercars
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('fleet-section')} className="hover:text-blue-400 transition-colors">
                  Executive Sedans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('fleet-section')} className="hover:text-blue-400 transition-colors">
                  Electric Performance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('fleet-section')} className="hover:text-blue-400 transition-colors">
                  Full-Size Luxury SUVs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('fleet-section')} className="hover:text-blue-400 transition-colors">
                  Open-Top Convertibles
                </button>
              </li>
            </ul>
          </div>

          {/* Key Locations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Airport Hubs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>Los Angeles (LAX)</li>
              <li>San Francisco (SFO)</li>
              <li>Miami International (MIA)</li>
              <li>New York JFK / LGA</li>
              <li>Las Vegas (LAS)</li>
              <li>Chicago O’Hare (ORD)</li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              VIP Drivers Club
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Receive secret promotional access and invitations to track day private events.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You're on the VIP list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Fleet & Booking Management Console</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ApexDrive Luxury Mobility Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              256-Bit SSL Encrypted Booking
            </span>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
