import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { SearchBox } from './components/home/SearchBox';
import { FleetSection } from './components/home/FleetSection';
import { ValueProps } from './components/home/ValueProps';
import { Testimonials } from './components/home/Testimonials';
import { FaqSection } from './components/home/FaqSection';
import { Footer } from './components/layout/Footer';
import { CarDetailModal } from './components/modals/CarDetailModal';
import { BookingWizardModal } from './components/modals/BookingWizardModal';
import { MyBookingsModal } from './components/modals/MyBookingsModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ToastContainer } from './components/common/Toast';

import { Car, Booking, FilterState, ToastMessage } from './types';
import { 
  getStoredCars, getStoredBookings, getFavorites, 
  toggleFavoriteCar 
} from './utils/storage';

const INITIAL_FILTERS: FilterState = {
  category: 'all',
  brand: 'all',
  minPrice: 150,
  maxPrice: 600,
  transmission: 'all',
  fuelType: 'all',
  seats: 'all',
  sortBy: 'recommended',
  searchQuery: '',
  location: 'Los Angeles Airport (LAX)',
};

export const App: React.FC = () => {
  // Core state
  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Modals state
  const [detailCar, setDetailCar] = useState<Car | null>(null);
  const [bookingCar, setBookingCar] = useState<Car | null>(null);
  const [bookingSchedule, setBookingSchedule] = useState<{
    pickupDate?: string;
    dropoffDate?: string;
    location?: string;
  }>({});
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync data from storage
  const refreshData = () => {
    setCars(getStoredCars());
    setBookings(getStoredBookings());
    setFavorites(getFavorites());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filter updates
  const handleFilterChange = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    showToast('Filters Reset', 'Showing the complete available luxury fleet.', 'info');
  };

  // Search submission from SearchBox
  const handleSearchSubmit = (pickupDate: string, dropoffDate: string, location: string) => {
    setBookingSchedule({ pickupDate, dropoffDate, location });
    const fleetEl = document.getElementById('fleet-section');
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation scroll
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Favorites toggle
  const handleToggleFavorite = (carId: string) => {
    const updated = toggleFavoriteCar(carId);
    setFavorites(updated);
    const isNowFav = updated.includes(carId);
    showToast(
      isNowFav ? 'Added to Saved' : 'Removed from Saved',
      isNowFav ? 'Car bookmarked to your preferences.' : 'Removed from your saved list.',
      'info'
    );
  };

  // Booking triggers
  const handleStartBooking = (car: Car) => {
    setBookingCar(car);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    refreshData();
    showToast(
      'Reservation Confirmed!',
      `Vehicle ${newBooking.car.name} successfully booked for ${newBooking.days} days. Reference: ${newBooking.id}`,
      'success'
    );
  };

  // Active bookings count
  const activeBookingsCount = bookings.filter((b) => b.payment.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeBookingsCount={activeBookingsCount}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => handleNavigateSection('fleet-section')}
          onHowItWorksClick={() => handleNavigateSection('how-it-works')}
        />

        {/* Floating Search Hub */}
        <SearchBox
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* Fleet Catalog Section */}
        <FleetSection
          cars={cars}
          favorites={favorites}
          currency={currency}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onToggleFavorite={handleToggleFavorite}
          onQuickView={(car) => setDetailCar(car)}
          onBookNow={handleStartBooking}
        />

        {/* Value Proposition & How It Works */}
        <ValueProps />

        {/* Verified Client Testimonials */}
        <Testimonials />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Global Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Vehicle Detailed Specifications & Gallery Modal */}
      {detailCar && (
        <CarDetailModal
          car={detailCar}
          currency={currency}
          isFavorite={favorites.includes(detailCar.id)}
          onClose={() => setDetailCar(null)}
          onToggleFavorite={handleToggleFavorite}
          onBookNow={(car) => {
            setDetailCar(null);
            handleStartBooking(car);
          }}
        />
      )}

      {/* Multi-Step Booking & Checkout Modal */}
      {bookingCar && (
        <BookingWizardModal
          car={bookingCar}
          currency={currency}
          initialPickupDate={bookingSchedule.pickupDate}
          initialDropoffDate={bookingSchedule.dropoffDate}
          initialLocation={bookingSchedule.location}
          onClose={() => setBookingCar(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* User Reservations & Vouchers Modal */}
      {isMyBookingsOpen && (
        <MyBookingsModal
          bookings={bookings}
          currency={currency}
          onClose={() => setIsMyBookingsOpen(false)}
          onRefreshBookings={refreshData}
          onShowToast={showToast}
        />
      )}

      {/* Admin Control CMS Panel */}
      {isAdminOpen && (
        <AdminDashboard
          cars={cars}
          bookings={bookings}
          currency={currency}
          onClose={() => setIsAdminOpen(false)}
          onRefreshData={refreshData}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
};

export default App;
