import React, { useState } from 'react';
import { X, Calendar, MapPin, Printer, ShieldCheck, Car as CarIcon, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Booking } from '../../types';
import { formatCurrency, updateBookingStatus } from '../../utils/storage';

interface MyBookingsModalProps {
  bookings: Booking[];
  currency: 'USD' | 'EUR' | 'GBP';
  onClose: () => void;
  onRefreshBookings: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  bookings,
  currency,
  onClose,
  onRefreshBookings,
  onShowToast,
}) => {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.payment.status === filter;
  });

  const handleCancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
    onRefreshBookings();
    setCancellingId(null);
    onShowToast('Booking Cancelled', `Reservation ${bookingId} has been successfully cancelled and refunded.`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/50">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span>My Reservations & Digital Vouchers</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage your active rentals, access vehicle vouchers, and check handover status
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          {(['all', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {status} ({bookings.filter(b => status === 'all' ? true : b.payment.status === status).length})
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((b) => {
              const isConfirmed = b.payment.status === 'confirmed';
              const isCompleted = b.payment.status === 'completed';
              const isCancelled = b.payment.status === 'cancelled';

              return (
                <div
                  key={b.id}
                  className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 transition-all space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/40 border border-blue-500/30 px-2 py-0.5 rounded-lg">
                        {b.id}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Booked on {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      isConfirmed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : isCompleted
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}>
                      {b.payment.status}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={b.car.image}
                        alt={b.car.name}
                        className="w-24 h-16 object-cover rounded-xl border border-slate-800 shrink-0"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-white">{b.car.name}</h3>
                        <p className="text-xs text-slate-400">{b.car.category} • {b.car.year}</p>
                        <p className="text-xs font-semibold text-blue-400 mt-1">
                          Driver: {b.customer.fullName} ({b.customer.phone})
                        </p>
                      </div>
                    </div>

                    <div className="text-right sm:text-right w-full sm:w-auto">
                      <div className="text-[11px] text-slate-400">Total Billed</div>
                      <div className="text-lg font-black text-white">
                        {formatCurrency(b.pricing.total, currency)}
                      </div>
                      <div className="text-[10px] text-slate-500">{b.days} Days • {b.addOns.insurance.toUpperCase()} Shield</div>
                    </div>
                  </div>

                  {/* Route & Times */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 text-xs">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Pick-up</span>
                        <span className="text-white font-medium">{b.pickupLocation}</span>
                        <span className="text-slate-400 block text-[11px]">{b.pickupDate} at {b.pickupTime}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Drop-off</span>
                        <span className="text-white font-medium">{b.dropoffLocation}</span>
                        <span className="text-slate-400 block text-[11px]">{b.dropoffDate} at {b.dropoffTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Voucher</span>
                      </button>
                    </div>

                    {isConfirmed && (
                      <div>
                        {cancellingId === b.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-rose-400 font-semibold">Confirm cancel?</span>
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                            >
                              Yes, Cancel
                            </button>
                            <button
                              onClick={() => setCancellingId(null)}
                              className="px-2 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCancellingId(b.id)}
                            className="text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors cursor-pointer"
                          >
                            Cancel Reservation
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-slate-400">
              <Calendar className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <p className="text-sm font-semibold text-white">No reservations found in this category</p>
              <p className="text-xs text-slate-500 mt-1">Book a vehicle from the fleet to view your active vouchers.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
