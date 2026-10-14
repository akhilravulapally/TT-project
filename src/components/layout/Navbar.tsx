import React, { useState } from 'react';
import { Car, Shield, CalendarDays, Phone, Menu, X, LayoutDashboard, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenMyBookings: () => void;
  onOpenAdmin: () => void;
  activeBookingsCount: number;
  currentCurrency: 'USD' | 'EUR' | 'GBP';
  onCurrencyChange: (c: 'USD' | 'EUR' | 'GBP') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMyBookings,
  onOpenAdmin,
  activeBookingsCount,
  currentCurrency,
  onCurrencyChange,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all">
              <Car className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  APEX<span className="text-blue-500">DRIVE</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Luxury
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium hidden sm:block">
                PREMIUM CAR RENTAL & FLEET
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('fleet-section')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Browse Fleet
            </button>
            <button
              onClick={() => handleNavClick('experience-section')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Why Apex
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('faq-section')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Action Center */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              >
                <span>{currentCurrency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden py-1 z-50">
                  {(['USD', 'EUR', 'GBP'] as const).map(curr => (
                    <button
                      key={curr}
                      onClick={() => {
                        onCurrencyChange(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                        currentCurrency === curr
                          ? 'bg-blue-600/20 text-blue-400 font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {curr === 'USD' ? 'USD ($)' : curr === 'EUR' ? 'EUR (€)' : 'GBP (£)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* My Bookings Button */}
            <button
              onClick={onOpenMyBookings}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all shadow-sm"
            >
              <CalendarDays className="w-4 h-4 text-blue-400" />
              <span>My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-950/60 border border-indigo-800/40 hover:border-indigo-600 text-indigo-300 hover:text-indigo-100 text-xs font-semibold transition-all"
              title="Open Fleet & Reservation Management"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              <span>Admin</span>
            </button>

            {/* Primary CTA */}
            <button
              onClick={() => handleNavClick('fleet-section')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Fleet</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenMyBookings}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              <CalendarDays className="w-5 h-5 text-blue-400" />
              {activeBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-[9px] font-bold text-white flex items-center justify-center">
                  {activeBookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('fleet-section')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
            >
              Browse Fleet
            </button>
            <button
              onClick={() => handleNavClick('experience-section')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
            >
              Why Apex
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('faq-section')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
            >
              FAQ
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 rounded-lg">
              <span className="text-xs text-slate-400 font-medium">Currency</span>
              <div className="flex gap-1">
                {(['USD', 'EUR', 'GBP'] as const).map(curr => (
                  <button
                    key={curr}
                    onClick={() => onCurrencyChange(curr)}
                    className={`px-2.5 py-1 text-xs rounded font-bold ${
                      currentCurrency === curr ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-xs font-semibold"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin CMS Portal</span>
            </button>

            <button
              onClick={() => handleNavClick('fleet-section')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider text-center shadow-lg shadow-blue-600/30"
            >
              Book A Vehicle
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
