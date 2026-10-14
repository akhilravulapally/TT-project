import React from 'react';
import { Heart, Users, Gauge, Zap, Fuel, Star, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { Car } from '../../types';
import { formatCurrency } from '../../utils/storage';

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  currency: 'USD' | 'EUR' | 'GBP';
  onToggleFavorite: (carId: string) => void;
  onQuickView: (car: Car) => void;
  onBookNow: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isFavorite,
  currency,
  onToggleFavorite,
  onQuickView,
  onBookNow,
}) => {
  return (
    <div className="group relative bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image & Badge Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Badges Overlay */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 backdrop-blur-md text-blue-400 border border-slate-700/60 uppercase tracking-wide">
            {car.category}
          </span>
          {car.badge && (
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide backdrop-blur-md border ${
              car.badge === 'Top Pick'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : car.badge === 'Eco Friendly'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : car.badge === 'New'
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
            }`}>
              {car.badge}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(car.id);
          }}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
              : 'bg-slate-900/70 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700/60'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Location pill on bottom left of image */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
          <MapPin className="w-3 h-3 text-blue-400" />
          <span className="truncate max-w-[200px]">{car.location.split('&')[0]}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Rating */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
                {car.brand} • {car.year}
              </p>
              <h3 className="text-lg font-bold text-white tracking-tight mt-0.5 group-hover:text-blue-300 transition-colors">
                {car.name}
              </h3>
            </div>

            <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700/50 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-white">{car.rating}</span>
              <span className="text-[10px] text-slate-400">({car.reviewsCount})</span>
            </div>
          </div>

          {/* Key Spec Badges */}
          <div className="mt-4 grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60">
              <Users className="w-3.5 h-3.5 text-blue-400 mb-1" />
              <span className="text-[10px] text-slate-400">Seats</span>
              <span className="text-xs font-bold text-white">{car.specs.seats} Persons</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60">
              <Zap className="w-3.5 h-3.5 text-cyan-400 mb-1" />
              <span className="text-[10px] text-slate-400">Power</span>
              <span className="text-xs font-bold text-white">{car.specs.horsepower} HP</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60">
              <Fuel className="w-3.5 h-3.5 text-indigo-400 mb-1" />
              <span className="text-[10px] text-slate-400">Fuel</span>
              <span className="text-xs font-bold text-white truncate max-w-full px-1">{car.specs.fuelType}</span>
            </div>
          </div>

          {/* Quick Perks / Features snippet */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Free Cancellation
            </span>
            <span className="text-[11px] text-slate-400">
              0-60 in <strong className="text-white">{car.specs.acceleration.split(' ')[0]}</strong>
            </span>
          </div>
        </div>

        {/* Footer: Price & Action Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-white">
                {formatCurrency(car.dailyRate, currency)}
              </span>
              <span className="text-xs font-medium text-slate-400">/ day</span>
            </div>
            <div className="text-[11px] text-slate-500">
              or {formatCurrency(car.hourlyRate, currency)} / hour
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickView(car)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
            >
              Details
            </button>
            <button
              onClick={() => onBookNow(car)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
