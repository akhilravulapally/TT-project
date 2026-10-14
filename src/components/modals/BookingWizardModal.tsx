import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, Calendar, Clock, MapPin, User, Mail, Phone, 
  CreditCard, Sparkles, Tag, ArrowRight, ArrowLeft, Printer, Download, 
  CheckCircle2, Car as CarIcon, AlertCircle, FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Car, Booking, BookingAddOns, CustomerDetails, InsuranceTier } from '../../types';
import { POPULAR_LOCATIONS, PROMO_CODES } from '../../data/cars';
import { formatCurrency, createNewBooking } from '../../utils/storage';

interface BookingWizardModalProps {
  car: Car | null;
  currency: 'USD' | 'EUR' | 'GBP';
  initialPickupDate?: string;
  initialDropoffDate?: string;
  initialLocation?: string;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  car,
  currency,
  initialPickupDate,
  initialDropoffDate,
  initialLocation,
  onClose,
  onBookingSuccess,
}) => {
  if (!car) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Schedule & Add-ons
  const today = new Date();
  const defaultPickup = initialPickupDate || new Date(today.getTime() + 86400000).toISOString().split('T')[0];
  const defaultDropoff = initialDropoffDate || new Date(today.getTime() + 86400000 * 4).toISOString().split('T')[0];

  const [pickupLocation, setPickupLocation] = useState(initialLocation || car.location.split('&')[0].trim());
  const [dropoffLocation, setDropoffLocation] = useState(initialLocation || car.location.split('&')[0].trim());
  const [pickupDate, setPickupDate] = useState(defaultPickup);
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [dropoffDate, setDropoffDate] = useState(defaultDropoff);
  const [dropoffTime, setDropoffTime] = useState('10:00 AM');

  const [insurance, setInsurance] = useState<InsuranceTier>('premium');
  const [addOns, setAddOns] = useState<Omit<BookingAddOns, 'insurance'>>({
    gps: false,
    childSeat: false,
    additionalDriver: true,
    unlimitedMileage: true,
    roadsideAssistance: true,
  });

  // Step 2: Driver Details
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    age: 28,
    licenseNumber: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Step 3: Payment & Promo
  const [promoCodeInput, setPromoCodeInput] = useState('APEX20');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('APEX20');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'apple_pay' | 'google_pay'>('credit_card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Step 4: Finished Booking
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Calculations
  const calcDays = () => {
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diff = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    return isNaN(diff) ? 3 : Math.max(1, diff);
  };

  const days = calcDays();
  const baseSubtotal = car.dailyRate * days;

  const insuranceDailyRate = insurance === 'full' ? 45 : insurance === 'premium' ? 25 : 0;
  const insuranceTotal = insuranceDailyRate * days;

  let addOnsDaily = 0;
  if (addOns.gps) addOnsDaily += 10;
  if (addOns.childSeat) addOnsDaily += 12;
  if (addOns.additionalDriver) addOnsDaily += 15;
  if (addOns.unlimitedMileage) addOnsDaily += 20;
  const addOnsTotal = addOnsDaily * days;

  const subtotalBeforeDiscount = baseSubtotal + insuranceTotal + addOnsTotal;

  let discountAmount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    discountAmount = Math.min((baseSubtotal * promo.discountPercent) / 100, promo.maxDiscount);
  }

  const taxableAmount = Math.max(0, subtotalBeforeDiscount - discountAmount);
  const taxesAndFees = Math.round(taxableAmount * 0.10 * 100) / 100; // 10% tax & terminal fee
  const finalTotal = Math.round((taxableAmount + taxesAndFees) * 100) / 100;

  // Apply Promo Code
  const handleApplyPromo = () => {
    setPromoError(null);
    const code = promoCodeInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
    } else {
      setPromoError('Invalid coupon code. Try APEX20, DRIVEFAST, or VIPMEMBER');
      setAppliedPromo(null);
    }
  };

  // Validate Step 2
  const validateDriverDetails = () => {
    const errors: Record<string, string> = {};
    if (!customer.fullName.trim()) errors.fullName = 'Full legal name is required';
    if (!customer.email.trim() || !customer.email.includes('@')) errors.email = 'Valid email is required';
    if (!customer.phone.trim()) errors.phone = 'Contact phone is required';
    if (customer.age < 21) errors.age = 'Driver must be at least 21 years old';
    if (!customer.licenseNumber.trim()) errors.licenseNumber = 'Valid driver license is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Process Booking
  const handleConfirmBooking = () => {
    const bookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      id: bookingId,
      carId: car.id,
      car,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      days,
      customer,
      addOns: {
        insurance,
        ...addOns,
      },
      pricing: {
        baseRate: car.dailyRate,
        days,
        subtotal: baseSubtotal,
        insuranceCost: insuranceTotal,
        addOnsTotal,
        discountAmount,
        taxesAndFees,
        total: finalTotal,
        promoCodeApplied: appliedPromo || undefined,
      },
      payment: {
        method: paymentMethod,
        last4: paymentMethod === 'credit_card' ? '4242' : '8831',
        status: 'confirmed',
        paidAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
    };

    createNewBooking(newBooking);
    setCreatedBooking(newBooking);
    setStep(4);
    onBookingSuccess(newBooking);

    // Celebratory Confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#06b6d4', '#6366f1', '#10b981'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <CarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Reserve {car.name}</span>
                <span className="text-xs font-normal text-slate-400">({car.year})</span>
              </h2>
              <p className="text-[11px] text-slate-400">Step {step} of 4 • Instant Confirmation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progression Bar */}
        <div className="grid grid-cols-4 border-b border-slate-800 text-[11px] font-bold">
          <div className={`p-3 text-center border-r border-slate-800 flex items-center justify-center gap-1.5 ${
            step >= 1 ? 'bg-blue-600/10 text-blue-400 border-b-2 border-b-blue-500' : 'text-slate-500'
          }`}>
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
            <span className="hidden sm:inline">Schedule & Shield</span>
          </div>
          <div className={`p-3 text-center border-r border-slate-800 flex items-center justify-center gap-1.5 ${
            step >= 2 ? 'bg-blue-600/10 text-blue-400 border-b-2 border-b-blue-500' : 'text-slate-500'
          }`}>
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
            <span className="hidden sm:inline">Driver Info</span>
          </div>
          <div className={`p-3 text-center border-r border-slate-800 flex items-center justify-center gap-1.5 ${
            step >= 3 ? 'bg-blue-600/10 text-blue-400 border-b-2 border-b-blue-500' : 'text-slate-500'
          }`}>
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
            <span className="hidden sm:inline">Review & Pay</span>
          </div>
          <div className={`p-3 text-center flex items-center justify-center gap-1.5 ${
            step >= 4 ? 'bg-emerald-600/10 text-emerald-400 border-b-2 border-b-emerald-500' : 'text-slate-500'
          }`}>
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">4</span>
            <span className="hidden sm:inline">Voucher</span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* ================= STEP 1: SCHEDULE & PERKS ================= */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Rental Schedule Card */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  Trip Details ({days} Days Duration)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Pick-up Location</label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {POPULAR_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Return Location</label>
                    <select
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {POPULAR_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Pick-up Date & Time</label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white"
                      >
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>03:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Return Date & Time</label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        min={pickupDate}
                        value={dropoffDate}
                        onChange={(e) => setDropoffDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <select
                        value={dropoffTime}
                        onChange={(e) => setDropoffTime(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white"
                      >
                        <option>10:00 AM</option>
                        <option>01:00 PM</option>
                        <option>06:00 PM</option>
                        <option>09:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Protection Packages */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Select Protection Shield Plan
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Basic */}
                  <div
                    onClick={() => setInsurance('basic')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      insurance === 'basic'
                        ? 'bg-blue-950/30 border-blue-500 shadow-md shadow-blue-500/20'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">Basic Shield</span>
                      <span className="text-xs font-bold text-slate-400">Included</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                      Statutory third-party liability. $1,500 security deposit required at pickup.
                    </p>
                    <span className="text-[10px] text-slate-500 font-medium">Standard Deductible</span>
                  </div>

                  {/* Premium (Recommended) */}
                  <div
                    onClick={() => setInsurance('premium')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                      insurance === 'premium'
                        ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/30 ring-1 ring-blue-500'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">Premium Shield</span>
                      <span className="text-xs font-bold text-blue-400">+$25 / day</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                      Zero deposit hold. Glass, tire & wheel protection. 24/7 roadside hotline.
                    </p>
                    <span className="text-[10px] text-emerald-400 font-semibold">$0 Deposit Required</span>
                  </div>

                  {/* Full Shield */}
                  <div
                    onClick={() => setInsurance('full')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      insurance === 'full'
                        ? 'bg-blue-950/30 border-blue-500 shadow-md shadow-blue-500/20'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">Elite Total Shield</span>
                      <span className="text-xs font-bold text-cyan-400">+$45 / day</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                      Complete zero-liability bumper-to-bumper. Interior spill coverage + emergency towing.
                    </p>
                    <span className="text-[10px] text-cyan-400 font-semibold">100% Peace of Mind</span>
                  </div>

                </div>
              </div>

              {/* Add-on Upgrades */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Optional Trip Upgrades
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <div>
                      <span className="text-xs font-bold text-white block">Unlimited Highway Mileage</span>
                      <span className="text-[10px] text-slate-400">Drive as many miles as you desire</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-blue-400">+$20/day</span>
                      <input
                        type="checkbox"
                        checked={addOns.unlimitedMileage}
                        onChange={(e) => setAddOns({ ...addOns, unlimitedMileage: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700"
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <div>
                      <span className="text-xs font-bold text-white block">Additional Authorized Driver</span>
                      <span className="text-[10px] text-slate-400">Share driving duties legally</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-blue-400">+$15/day</span>
                      <input
                        type="checkbox"
                        checked={addOns.additionalDriver}
                        onChange={(e) => setAddOns({ ...addOns, additionalDriver: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700"
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <div>
                      <span className="text-xs font-bold text-white block">Child Safety Booster Seat</span>
                      <span className="text-[10px] text-slate-400">Certified Isofix child seat</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-blue-400">+$12/day</span>
                      <input
                        type="checkbox"
                        checked={addOns.childSeat}
                        onChange={(e) => setAddOns({ ...addOns, childSeat: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700"
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <div>
                      <span className="text-xs font-bold text-white block">Satellite GPS & Wi-Fi Hotspot</span>
                      <span className="text-[10px] text-slate-400">5G mobile hotspot for 5 devices</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-blue-400">+$10/day</span>
                      <input
                        type="checkbox"
                        checked={addOns.gps}
                        onChange={(e) => setAddOns({ ...addOns, gps: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700"
                      />
                    </div>
                  </label>
                </div>
              </div>

            </div>
          )}

          {/* ================= STEP 2: DRIVER CREDENTIALS ================= */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-blue-950/30 border border-blue-500/20 p-4 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <p className="text-xs text-blue-200 leading-relaxed">
                  To ensure rapid contactless handover, please provide the primary driver’s details. A concierge will have the paperwork prepared in advance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Julian Hayes"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                      formErrors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {formErrors.fullName && <p className="text-[10px] text-rose-400 mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address (for voucher) *</label>
                  <input
                    type="email"
                    placeholder="e.g. julian@example.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                      formErrors.email ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {formErrors.email && <p className="text-[10px] text-rose-400 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Cellular Phone (SMS updates) *</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (310) 555-0199"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                      formErrors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {formErrors.phone && <p className="text-[10px] text-rose-400 mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Driver Age (21+) *</label>
                  <input
                    type="number"
                    min="21"
                    max="99"
                    value={customer.age}
                    onChange={(e) => setCustomer({ ...customer, age: Number(e.target.value) })}
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                      formErrors.age ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {formErrors.age && <p className="text-[10px] text-rose-400 mt-1">{formErrors.age}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Driver's License ID Number *</label>
                  <input
                    type="text"
                    placeholder="e.g. CA-D9842109 or International Passport #"
                    value={customer.licenseNumber}
                    onChange={(e) => setCustomer({ ...customer, licenseNumber: e.target.value })}
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                      formErrors.licenseNumber ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {formErrors.licenseNumber && <p className="text-[10px] text-rose-400 mt-1">{formErrors.licenseNumber}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Special Concierge Requests / Flight # (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Arriving on Delta DL418 at LAX Terminal 2. Please pre-chill car interior to 68°F."
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: REVIEW & PAYMENT ================= */}
          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
              
              {/* Payment Method Details (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                    Select Payment Method
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'credit_card'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'apple_pay'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span> Apple Pay</span>
                      <span className="text-[10px] text-emerald-400">Instant</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('google_pay')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'google_pay'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>G Pay</span>
                      <span className="text-[10px] text-emerald-400">Instant</span>
                    </button>
                  </div>
                </div>

                {/* Card Fields */}
                {paymentMethod === 'credit_card' && (
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">Expires (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">Security CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Promo Coupon Box */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-400" />
                    Promo Code (Try APEX20, DRIVEFAST, VIPMEMBER)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase tracking-wider"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Coupon <strong>{appliedPromo}</strong> applied successfully!</span>
                    </div>
                  )}
                  {promoError && (
                    <div className="mt-2 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{promoError}</span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>256-bit encrypted checkout. You will not be charged until vehicle handover.</span>
                </div>
              </div>

              {/* Price Breakdown Card (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-3 border-b border-slate-800">
                    Pricing Summary
                  </h4>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Base Rate ({formatCurrency(car.dailyRate, currency)} × {days} days)</span>
                      <span className="font-semibold text-white">{formatCurrency(baseSubtotal, currency)}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>Protection Shield ({insurance.toUpperCase()})</span>
                      <span className="font-semibold text-white">
                        {insuranceTotal === 0 ? 'Included' : formatCurrency(insuranceTotal, currency)}
                      </span>
                    </div>

                    {addOnsTotal > 0 && (
                      <div className="flex justify-between text-slate-300">
                        <span>Selected Trip Add-ons</span>
                        <span className="font-semibold text-white">{formatCurrency(addOnsTotal, currency)}</span>
                      </div>
                    )}

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>Promotional Discount ({appliedPromo})</span>
                        <span>-{formatCurrency(discountAmount, currency)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>Taxes & Airport Concession (10%)</span>
                      <span>{formatCurrency(taxesAndFees, currency)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-bold text-white">Total Amount Due</span>
                    <span className="text-2xl font-black text-blue-400">
                      {formatCurrency(finalTotal, currency)}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Includes all taxes, fees, and roadside guarantee.</p>
                </div>
              </div>

            </div>
          )}

          {/* ================= STEP 4: CONFIRMATION VOUCHER ================= */}
          {step === 4 && createdBooking && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              
              <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Reservation Confirmed & Guaranteed
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  You're Ready To Hit The Highway!
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  A digital voucher and handover coordinator tracking link has been dispatched to <strong>{createdBooking.customer.email}</strong>.
                </p>
              </div>

              {/* Printable Official Voucher Box */}
              <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-6 text-left relative overflow-hidden shadow-2xl">
                
                {/* Brand header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                      AD
                    </div>
                    <span className="text-sm font-extrabold text-white tracking-wider">APEXDRIVE VOUCHER</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 uppercase">Reservation ID</div>
                    <div className="text-xs font-mono font-bold text-blue-400">{createdBooking.id}</div>
                  </div>
                </div>

                {/* Car summary */}
                <div className="py-4 flex items-center gap-4 border-b border-slate-800">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-20 h-14 object-cover rounded-xl border border-slate-800"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{car.name}</h4>
                    <p className="text-xs text-slate-400">{car.category} • {car.specs.horsepower} HP • {car.specs.fuelType}</p>
                    <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Contactless Curbside Handover</p>
                  </div>
                </div>

                {/* Trip Grid */}
                <div className="grid grid-cols-2 gap-3 py-4 text-xs border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Pick-up Location</span>
                    <span className="font-semibold text-white truncate block">{createdBooking.pickupLocation}</span>
                    <span className="text-[10px] text-slate-400">{createdBooking.pickupDate} at {createdBooking.pickupTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Drop-off Location</span>
                    <span className="font-semibold text-white truncate block">{createdBooking.dropoffLocation}</span>
                    <span className="text-[10px] text-slate-400">{createdBooking.dropoffDate} at {createdBooking.dropoffTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Primary Driver</span>
                    <span className="font-semibold text-white">{createdBooking.customer.fullName}</span>
                    <span className="text-[10px] text-slate-400">{createdBooking.customer.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Total Paid</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      {formatCurrency(createdBooking.pricing.total, currency)}
                    </span>
                    <span className="text-[10px] text-slate-400">Paid via {createdBooking.payment.method}</span>
                  </div>
                </div>

                {/* Simulated QR Code & Barcode */}
                <div className="pt-4 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    <p className="font-semibold text-slate-300">Show this digital voucher upon curbside arrival.</p>
                    <p className="text-[10px] text-slate-500">24/7 Roadside Hotline: +1 (800) 592-APEX</p>
                  </div>
                  <div className="p-2 bg-white rounded-xl">
                    {/* Simulated SVG QR Code */}
                    <svg className="w-12 h-12 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v4h-2v-4zm2 4h4v2h-4v-2zm2-2h2v2h-2v-2z" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  Done & View My Bookings
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Step Controller (when not in confirmation step) */}
        {step < 4 && (
          <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Cost</div>
                <div className="text-base font-extrabold text-white">
                  {formatCurrency(finalTotal, currency)}
                </div>
              </div>

              {step === 1 && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Continue to Driver Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => {
                    if (validateDriverDetails()) {
                      setStep(3);
                    }
                  }}
                  className="px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 3 && (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white text-xs font-bold shadow-xl shadow-emerald-600/30 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm & Authorize {formatCurrency(finalTotal, currency)}</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
