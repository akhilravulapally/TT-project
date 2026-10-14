import React, { useState } from 'react';
import { 
  X, Car as CarIcon, DollarSign, Calendar, TrendingUp, Plus, Trash2, 
  Power, CheckCircle, Clock, Ban, Search, ShieldCheck 
} from 'lucide-react';
import { Car, Booking } from '../../types';
import { 
  formatCurrency, toggleCarAvailability, deleteStoredCar, 
  updateBookingStatus, addStoredCar 
} from '../../utils/storage';
import { AddCarModal } from './AddCarModal';

interface AdminDashboardProps {
  cars: Car[];
  bookings: Booking[];
  currency: 'USD' | 'EUR' | 'GBP';
  onClose: () => void;
  onRefreshData: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cars,
  bookings,
  currency,
  onClose,
  onRefreshData,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'bookings'>('fleet');
  const [isAddCarOpen, setIsAddCarOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // KPIs
  const totalFleet = cars.length;
  const availableCars = cars.filter(c => c.isAvailable).length;
  const activeBookings = bookings.filter(b => b.payment.status === 'confirmed').length;
  const totalRevenue = bookings.reduce((sum, b) => b.payment.status !== 'cancelled' ? sum + b.pricing.total : sum, 0);
  const utilization = Math.round((activeBookings / Math.max(1, totalFleet)) * 100);

  const handleToggleStatus = (carId: string) => {
    toggleCarAvailability(carId);
    onRefreshData();
    onShowToast('Fleet Updated', 'Vehicle availability status has been updated.', 'info');
  };

  const handleDeleteCar = (carId: string, carName: string) => {
    if (window.confirm(`Are you sure you want to remove ${carName} from the fleet?`)) {
      deleteStoredCar(carId);
      onRefreshData();
      onShowToast('Car Removed', `${carName} was removed from the fleet.`, 'error');
    }
  };

  const handleAddCar = (newCar: Car) => {
    addStoredCar(newCar);
    onRefreshData();
    onShowToast('Vehicle Added', `${newCar.name} is now available for rent!`, 'success');
  };

  const handleStatusChange = (bookingId: string, status: Booking['payment']['status']) => {
    updateBookingStatus(bookingId, status);
    onRefreshData();
    onShowToast('Reservation Updated', `Reservation ${bookingId} marked as ${status}.`, 'success');
  };

  const filteredFleet = cars.filter(c => 
    c.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
    c.brand.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredBookings = bookings.filter(b => 
    b.id.toLowerCase().includes(searchFilter.toLowerCase()) || 
    b.customer.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.car.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
                Control Hub
              </span>
              <h2 className="text-xl font-black text-white">ApexDrive Fleet & CMS Portal</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Real-time inventory management, telematics and rental dispatch</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top KPI Metrics Grid */}
        <div className="p-4 sm:p-6 border-b border-slate-800/80 bg-slate-950/30 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Total Fleet Size</span>
              <CarIcon className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white">{totalFleet}</div>
            <div className="text-[10px] text-emerald-400 mt-1">{availableCars} ready for delivery</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Total Gross Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{formatCurrency(totalRevenue, currency)}</div>
            <div className="text-[10px] text-slate-500 mt-1">Confirmed + Completed</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Active Reservations</span>
              <Calendar className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">{activeBookings}</div>
            <div className="text-[10px] text-indigo-400 mt-1">{bookings.length} all-time bookings</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Fleet Utilization</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white">{utilization}%</div>
            <div className="text-[10px] text-cyan-400 mt-1">Optimized turnover</div>
          </div>
        </div>

        {/* Tab Controls & Search */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'fleet'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Fleet Inventory ({cars.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Reservations ({bookings.length})
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={activeTab === 'fleet' ? 'Search vehicle...' : 'Search booking or driver...'}
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {activeTab === 'fleet' && (
              <button
                onClick={() => setIsAddCarOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Vehicle</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 max-h-[55vh] overflow-y-auto">
          
          {/* TAB 1: FLEET INVENTORY */}
          {activeTab === 'fleet' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 px-3">Vehicle Details</th>
                    <th className="pb-3 px-3">Category</th>
                    <th className="pb-3 px-3">Daily Rate</th>
                    <th className="pb-3 px-3">Station Hub</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {filteredFleet.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img src={c.image} alt={c.name} className="w-14 h-10 object-cover rounded-lg border border-slate-800" />
                          <div>
                            <span className="font-bold text-white block">{c.name}</span>
                            <span className="text-[10px] text-slate-400">{c.specs.horsepower} HP • {c.specs.fuelType}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-slate-300 font-medium">
                        {c.category}
                      </td>

                      <td className="py-3 px-3 font-bold text-white">
                        {formatCurrency(c.dailyRate, currency)} / day
                      </td>

                      <td className="py-3 px-3 text-slate-400 text-[11px] max-w-[180px] truncate">
                        {c.location}
                      </td>

                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleToggleStatus(c.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer ${
                            c.isAvailable
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                          }`}
                        >
                          {c.isAvailable ? 'Available' : 'Maintenance'}
                        </button>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleDeleteCar(c.id, c.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete car"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: ALL RESERVATIONS */}
          {activeTab === 'bookings' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 px-3">Booking ID</th>
                    <th className="pb-3 px-3">Vehicle</th>
                    <th className="pb-3 px-3">Client</th>
                    <th className="pb-3 px-3">Rental Dates</th>
                    <th className="pb-3 px-3">Total Amount</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3 text-right">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-blue-400">
                        {b.id}
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-white block">{b.car.name}</span>
                        <span className="text-[10px] text-slate-400">{b.days} days duration</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-semibold text-white block">{b.customer.fullName}</span>
                        <span className="text-[10px] text-slate-400">{b.customer.phone}</span>
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-[11px]">
                        <div>{b.pickupDate}</div>
                        <div className="text-slate-500">to {b.dropoffDate}</div>
                      </td>

                      <td className="py-3 px-3 font-bold text-emerald-400">
                        {formatCurrency(b.pricing.total, currency)}
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          b.payment.status === 'confirmed'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : b.payment.status === 'completed'
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                        }`}>
                          {b.payment.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <select
                          value={b.payment.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                          className="bg-slate-950 border border-slate-800 text-[11px] text-slate-200 rounded-lg px-2 py-1 focus:outline-none"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>

      {/* Add Car Modal */}
      {isAddCarOpen && (
        <AddCarModal
          onClose={() => setIsAddCarOpen(false)}
          onAddCar={handleAddCar}
        />
      )}
    </div>
  );
};
