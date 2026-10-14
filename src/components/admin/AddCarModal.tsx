import React, { useState } from 'react';
import { X, Plus, Sparkles, Image, Check } from 'lucide-react';
import { Car, CarCategory } from '../../types';
import { POPULAR_LOCATIONS } from '../../data/cars';

interface AddCarModalProps {
  onClose: () => void;
  onAddCar: (newCar: Car) => void;
}

export const AddCarModal: React.FC<AddCarModalProps> = ({ onClose, onAddCar }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<CarCategory>('Supercar');
  const [year, setYear] = useState(2024);
  const [dailyRate, setDailyRate] = useState(350);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80');
  const [location, setLocation] = useState(POPULAR_LOCATIONS[0]);
  const [horsepower, setHorsepower] = useState(520);
  const [acceleration, setAcceleration] = useState('3.2s (0-60 mph)');
  const [topSpeed, setTopSpeed] = useState('190 mph');
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [fuelType, setFuelType] = useState<'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'>('Petrol');
  const [seats, setSeats] = useState(4);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !brand) return;

    const newCar: Car = {
      id: `car-${Date.now()}`,
      name,
      brand,
      category,
      year,
      dailyRate: Number(dailyRate),
      hourlyRate: Number(hourlyRate),
      image,
      gallery: [image],
      specs: {
        seats: Number(seats),
        transmission,
        fuelType,
        horsepower: Number(horsepower),
        acceleration,
        topSpeed,
        rangeOrMpg: fuelType === 'Electric' ? '300 mi Range' : '22 MPG Highway',
        luggage: 2,
        doors: seats > 2 ? 4 : 2,
      },
      features: [
        'Premium Surround Audio',
        'Adaptive Cruise Control',
        'Carbon Fiber Package',
        'Heated Nappa Leather Seats',
        'Navigation GPS',
      ],
      rating: 5.0,
      reviewsCount: 1,
      isAvailable: true,
      location,
      badge: 'New',
      description: description || `Stunning high-performance ${name} engineered with precision handling and bespoke luxury comfort.`,
      reviews: [],
    };

    onAddCar(newCar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/50">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" />
              <span>Add Vehicle To Fleet</span>
            </h2>
            <p className="text-xs text-slate-400">Expand your inventory with instant availability</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Vehicle Model Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Aston Martin Vantage"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Brand / Make *</label>
              <input
                type="text"
                required
                placeholder="e.g. Aston Martin"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CarCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Supercar">Supercar</option>
                <option value="Luxury">Luxury</option>
                <option value="SUV">SUV</option>
                <option value="Electric">Electric</option>
                <option value="Sedan">Sedan</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Model Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Daily Rate ($)</label>
              <input
                type="number"
                value={dailyRate}
                onChange={(e) => setDailyRate(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Hourly Rate ($)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Horsepower (HP)</label>
              <input
                type="number"
                value={horsepower}
                onChange={(e) => setHorsepower(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">0-60 MPH Acceleration</label>
              <input
                type="text"
                value={acceleration}
                onChange={(e) => setAcceleration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Powertrain</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Station Hub</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                {POPULAR_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">High-Res Image URL</label>
            <input
              type="url"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Vehicle Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of features and driving experience..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
            >
              Add to Active Fleet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
