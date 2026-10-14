import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, RotateCcw, Sparkles, Filter, Check } from 'lucide-react';
import { Car, FilterState } from '../../types';
import { CarCard } from './CarCard';

interface FleetSectionProps {
  cars: Car[];
  favorites: string[];
  currency: 'USD' | 'EUR' | 'GBP';
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onToggleFavorite: (carId: string) => void;
  onQuickView: (car: Car) => void;
  onBookNow: (car: Car) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  cars,
  favorites,
  currency,
  filters,
  onFilterChange,
  onResetFilters,
  onToggleFavorite,
  onQuickView,
  onBookNow,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categories = [
    { label: 'All Fleet', value: 'all' },
    { label: 'Supercars', value: 'Supercar' },
    { label: 'Executive Luxury', value: 'Luxury' },
    { label: 'Premium SUVs', value: 'SUV' },
    { label: 'Electric Performance', value: 'Electric' },
    { label: 'Convertibles', value: 'Convertible' },
  ];

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Category filter
      if (filters.category !== 'all' && car.category !== filters.category) {
        return false;
      }
      // Search query (name or brand)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesBrand = car.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }
      // Transmission filter
      if (filters.transmission !== 'all' && car.specs.transmission !== filters.transmission) {
        return false;
      }
      // Fuel type filter
      if (filters.fuelType !== 'all' && car.specs.fuelType !== filters.fuelType) {
        return false;
      }
      // Seats filter
      if (filters.seats !== 'all' && car.specs.seats !== filters.seats) {
        return false;
      }
      // Price range
      if (car.dailyRate < filters.minPrice || car.dailyRate > filters.maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.dailyRate - b.dailyRate;
      if (filters.sortBy === 'price-high') return b.dailyRate - a.dailyRate;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'horsepower') return b.specs.horsepower - a.specs.horsepower;
      return 0; // recommended
    });
  }, [cars, filters]);

  return (
    <section id="fleet-section" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Handcrafted Collection
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Curated Luxury Fleet
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Every vehicle in our collection is meticulously detailed, mechanically inspected, and delivered with white-glove care.
            </p>
          </div>

          {/* Quick Search & Filter Toggle Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Porsche, Tesla..."
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                showAdvancedFilters
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => {
            const count = cat.value === 'all' 
              ? cars.length 
              : cars.filter(c => c.category === cat.value).length;
            const isSelected = filters.category === cat.value;

            return (
              <button
                key={cat.value}
                onClick={() => onFilterChange({ category: cat.value })}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900/80 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Advanced Filters Drawer Panel */}
        {showAdvancedFilters && (
          <div className="mt-4 p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-200">
            
            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">Max Price / Day</label>
                <span className="text-xs font-bold text-blue-400">${filters.maxPrice}</span>
              </div>
              <input
                type="range"
                min="150"
                max="600"
                step="25"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                className="w-full accent-blue-600 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>$150</span>
                <span>$600+</span>
              </div>
            </div>

            {/* Transmission */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Transmission</label>
              <select
                value={filters.transmission}
                onChange={(e) => onFilterChange({ transmission: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Transmissions</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Powertrain</label>
              <select
                value={filters.fuelType}
                onChange={(e) => onFilterChange({ fuelType: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Powertrains</option>
                <option value="Petrol">Gasoline / Petrol</option>
                <option value="Electric">Pure Electric (EV)</option>
                <option value="Hybrid">Plug-in Hybrid</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="recommended">Featured & Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated Drivers</option>
                <option value="horsepower">Highest Horsepower</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="col-span-full flex justify-end pt-2 border-t border-slate-800/60">
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>

          </div>
        )}

        {/* Results Metadata */}
        <div className="mt-8 mb-6 flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Showing <strong className="text-white">{filteredCars.length}</strong> vehicles ready for delivery</span>
          {filters.category !== 'all' && (
            <span className="text-blue-400">Category: {filters.category}</span>
          )}
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                currency={currency}
                isFavorite={favorites.includes(car.id)}
                onToggleFavorite={onToggleFavorite}
                onQuickView={onQuickView}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 p-8 max-w-xl mx-auto">
            <Filter className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No vehicles match your criteria</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your price range, powertrain options, or clearing the search keyword.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all cursor-pointer"
            >
              Reset Filters & Show All
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
