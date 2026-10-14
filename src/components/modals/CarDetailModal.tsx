import React, { useState } from 'react';
import { 
  X, Star, Users, Gauge, Zap, Fuel, ShieldCheck, MapPin, 
  Check, Calendar, Clock, ArrowRight, Heart, Sparkles, Briefcase, Car as CarIcon 
} from 'lucide-react';
import { Car } from '../../types';
import { formatCurrency } from '../../utils/storage';

interface CarDetailModalProps {
  car: Car | null;
  currency: 'USD' | 'EUR' | 'GBP';
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (carId: string) => void;
  onBookNow: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  currency,
  isFavorite,
  onClose,
  onToggleFavorite,
  onBookNow,
}) => {
  if (!car) return null;

  const [activeImage, setActiveImage] = useState(car.image);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
              {car.category}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Model Year {car.year} • {car.location}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(car.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 lg:p-8 max-h-[75vh] overflow-y-auto space-y-8">
          
          {/* Main Title & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">{car.brand}</p>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                {car.name}
              </h2>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 shrink-0">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <div>
                <div className="text-base font-extrabold text-white leading-none">{car.rating} / 5.0</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{car.reviewsCount} verified reviews</div>
              </div>
            </div>
          </div>

          {/* Photo Gallery with Thumbnail switcher */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={activeImage}
                alt={car.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-slate-200 border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Station: {car.location}</span>
              </div>
            </div>

            {car.gallery && car.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {car.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImage === img ? 'border-blue-500 scale-95 shadow-md shadow-blue-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Performance Specifications Grid */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-400" />
              Performance & Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">0-60 MPH</span>
                <span className="text-lg font-bold text-white">{car.specs.acceleration}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Horsepower</span>
                <span className="text-lg font-bold text-white">{car.specs.horsepower} HP</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Top Speed</span>
                <span className="text-lg font-bold text-white">{car.specs.topSpeed}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Powertrain</span>
                <span className="text-lg font-bold text-white">{car.specs.fuelType}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Transmission</span>
                <span className="text-lg font-bold text-white">{car.specs.transmission}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Passenger Capacity</span>
                <span className="text-lg font-bold text-white">{car.specs.seats} Seats</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Luggage Space</span>
                <span className="text-lg font-bold text-white">{car.specs.luggage} Suitcases</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Range / Efficiency</span>
                <span className="text-lg font-bold text-white">{car.specs.rangeOrMpg}</span>
              </div>
            </div>
          </div>

          {/* Description & Included Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800/80">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Vehicle Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {car.description}
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-200 leading-relaxed">
                  <strong className="block font-bold text-white mb-0.5">Complimentary Apex Perks</strong>
                  Full sanitization, contactless terminal delivery, 150 daily miles included, 24/7 concierge support.
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Key Features & Technology
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {car.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Client Reviews Section */}
          {car.reviews && car.reviews.length > 0 && (
            <div className="pt-6 border-t border-slate-800/80">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Verified Driver Feedback
              </h3>
              <div className="space-y-3">
                {car.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <img src={rev.avatar} alt={rev.author} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{rev.author}</span>
                        <span className="text-[10px] text-slate-500">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 my-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-white">
                {formatCurrency(car.dailyRate, currency)}
              </span>
              <span className="text-xs text-slate-400">/ day</span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <Check className="w-3.5 h-3.5" />
              Available for immediate reservation
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(car);
              }}
              className="w-1/2 sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Reserve This Car</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
