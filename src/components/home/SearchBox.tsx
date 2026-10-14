import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Search, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../../data/cars';
import { FilterState } from '../../types';

interface SearchBoxProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onSearchSubmit: (pickupDate: string, dropoffDate: string, location: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
}) => {
  const [pickupLoc, setPickupLoc] = useState(filters.location || POPULAR_LOCATIONS[0]);
  const [sameLocation, setSameLocation] = useState(true);
  const [dropoffLoc, setDropoffLoc] = useState(POPULAR_LOCATIONS[0]);
  
  // Default dates: tomorrow to 4 days later
  const today = new Date();
  const defaultPickup = new Date(today);
  defaultPickup.setDate(today.getDate() + 1);
  const defaultDropoff = new Date(today);
  defaultDropoff.setDate(today.getDate() + 4);

  const [pickupDate, setPickupDate] = useState(defaultPickup.toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [dropoffDate, setDropoffDate] = useState(defaultDropoff.toISOString().split('T')[0]);
  const [dropoffTime, setDropoffTime] = useState('10:00 AM');

  const calculateDays = () => {
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffTime = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    return isNaN(diffTime) ? 3 : Math.max(1, diffTime);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ location: pickupLoc });
    onSearchSubmit(pickupDate, dropoffDate, pickupLoc);
  };

  return (
    <div className="w-full max-w-6xl mx-auto -mt-16 sm:-mt-20 relative z-30 px-4 sm:px-6">
      <div className="bg-slate-900/90 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-800 shadow-2xl shadow-blue-950/40">
        
        {/* Top Badges / Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Instant Booking Guaranteed
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              No Hidden Fees at Handover
            </span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300 hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={sameLocation}
              onChange={(e) => setSameLocation(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900"
            />
            <span>Return vehicle to same pickup location</span>
          </label>
        </div>

        {/* Search Form Inputs */}
        <form onSubmit={handleSearch} className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Pick-up Location */}
          <div className="flex flex-col gap-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Pick-up Location
            </label>
            <select
              value={pickupLoc}
              onChange={(e) => {
                setPickupLoc(e.target.value);
                if (sameLocation) setDropoffLoc(e.target.value);
              }}
              className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
            >
              {POPULAR_LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="bg-slate-900 text-white">
                  {loc}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-500">Free airport terminal delivery</span>
          </div>

          {/* Return Location (if different) or Vehicle Type */}
          {!sameLocation ? (
            <div className="flex flex-col gap-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Return Location
              </label>
              <select
                value={dropoffLoc}
                onChange={(e) => setDropoffLoc(e.target.value)}
                className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                {POPULAR_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} className="bg-slate-900 text-white">
                    {loc}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-slate-500">One-way drop-off available</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                Vehicle Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => onFilterChange({ category: e.target.value })}
                className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">All Luxury Categories (12)</option>
                <option value="Supercar" className="bg-slate-900">Supercars & Exotic</option>
                <option value="Luxury" className="bg-slate-900">Executive Luxury Sedans</option>
                <option value="SUV" className="bg-slate-900">Premium SUVs</option>
                <option value="Electric" className="bg-slate-900">EV Performance</option>
                <option value="Convertible" className="bg-slate-900">Open-top Convertibles</option>
              </select>
              <span className="text-[11px] text-slate-500">Filter by style or powertrain</span>
            </div>
          )}

          {/* Pick-up Date & Time */}
          <div className="flex flex-col gap-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Pick-up Schedule
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="bg-transparent text-sm font-semibold text-white focus:outline-none w-full cursor-pointer"
              />
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="bg-slate-900 text-xs font-medium text-slate-300 rounded px-1.5 py-1 focus:outline-none"
              >
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>12:00 PM</option>
                <option>02:00 PM</option>
                <option>04:00 PM</option>
                <option>07:00 PM</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-500">Flexible 24-hr check-in</span>
          </div>

          {/* Return Date & Time */}
          <div className="flex flex-col gap-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              Return Schedule ({calculateDays()} Days)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dropoffDate}
                min={pickupDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="bg-transparent text-sm font-semibold text-white focus:outline-none w-full cursor-pointer"
              />
              <select
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}
                className="bg-slate-900 text-xs font-medium text-slate-300 rounded px-1.5 py-1 focus:outline-none"
              >
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>12:00 PM</option>
                <option>02:00 PM</option>
                <option>06:00 PM</option>
                <option>09:00 PM</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-500">Duration: {calculateDays()} rental days</span>
          </div>

        </form>

        {/* Action Button Strip */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All vehicles include comprehensive sanitation & full tank/battery</span>
          </div>

          <button
            onClick={handleSearch}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search Available Cars</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
