import { Car, Booking } from '../types';
import { INITIAL_CARS } from '../data/cars';

const CARS_KEY = 'apex_rental_cars_v1';
const BOOKINGS_KEY = 'apex_rental_bookings_v1';
const FAVORITES_KEY = 'apex_rental_favorites_v1';

export const getStoredCars = (): Car[] => {
  try {
    const data = localStorage.getItem(CARS_KEY);
    if (!data) {
      localStorage.setItem(CARS_KEY, JSON.stringify(INITIAL_CARS));
      return INITIAL_CARS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading cars from storage:', e);
    return INITIAL_CARS;
  }
};

export const saveStoredCars = (cars: Car[]): void => {
  try {
    localStorage.setItem(CARS_KEY, JSON.stringify(cars));
  } catch (e) {
    console.error('Error saving cars to storage:', e);
  }
};

export const addStoredCar = (car: Car): Car[] => {
  const current = getStoredCars();
  const updated = [car, ...current];
  saveStoredCars(updated);
  fetch('/api/cars', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  }).catch((err) => console.warn('Could not sync new car to backend:', err));
  return updated;
};

export const updateStoredCar = (updatedCar: Car): Car[] => {
  const current = getStoredCars();
  const updated = current.map(c => (c.id === updatedCar.id ? updatedCar : c));
  saveStoredCars(updated);
  fetch(`/api/cars/${updatedCar.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCar),
  }).catch((err) => console.warn('Could not sync updated car to backend:', err));
  return updated;
};

export const toggleCarAvailability = (carId: string): Car[] => {
  const current = getStoredCars();
  const updated = current.map(c => 
    c.id === carId ? { ...c, isAvailable: !c.isAvailable } : c
  );
  saveStoredCars(updated);
  fetch(`/api/cars/${carId}/availability`, {
    method: 'PATCH',
  }).catch((err) => console.warn('Could not sync availability to backend:', err));
  return updated;
};

export const deleteStoredCar = (carId: string): Car[] => {
  const current = getStoredCars();
  const updated = current.filter(c => c.id !== carId);
  saveStoredCars(updated);
  fetch(`/api/cars/${carId}`, {
    method: 'DELETE',
  }).catch((err) => console.warn('Could not sync car deletion to backend:', err));
  return updated;
};

// Initial mock bookings for rich demo experience
export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-78219',
    carId: 'car-1',
    car: INITIAL_CARS[0],
    pickupLocation: 'Los Angeles Airport (LAX)',
    dropoffLocation: 'Beverly Hills Luxury Hub',
    pickupDate: '2026-10-18',
    pickupTime: '10:00 AM',
    dropoffDate: '2026-10-21',
    dropoffTime: '06:00 PM',
    days: 3,
    customer: {
      fullName: 'Julian Hayes',
      email: 'julian.hayes@example.com',
      phone: '+1 (310) 555-0199',
      age: 32,
      licenseNumber: 'CA-9842109',
      notes: 'Please ensure car is pre-conditioned to 68°F.'
    },
    addOns: {
      insurance: 'premium',
      gps: true,
      childSeat: false,
      additionalDriver: true,
      unlimitedMileage: true,
      roadsideAssistance: true,
    },
    pricing: {
      baseRate: 389,
      days: 3,
      subtotal: 1167,
      insuranceCost: 75,
      addOnsTotal: 135,
      discountAmount: 116.7,
      taxesAndFees: 126.03,
      total: 1286.33,
      promoCodeApplied: 'APEX20'
    },
    payment: {
      method: 'credit_card',
      last4: '4242',
      status: 'confirmed',
      paidAt: '2026-10-12T14:20:00Z'
    },
    createdAt: '2026-10-12T14:20:00Z'
  },
  {
    id: 'BK-61904',
    carId: 'car-2',
    car: INITIAL_CARS[1],
    pickupLocation: 'San Francisco Int Airport (SFO)',
    dropoffLocation: 'San Francisco Int Airport (SFO)',
    pickupDate: '2026-10-05',
    pickupTime: '09:00 AM',
    dropoffDate: '2026-10-07',
    dropoffTime: '05:00 PM',
    days: 2,
    customer: {
      fullName: 'Samantha Vance',
      email: 'sam.vance@techcorp.io',
      phone: '+1 (415) 555-0143',
      age: 29,
      licenseNumber: 'DL-SF49102'
    },
    addOns: {
      insurance: 'full',
      gps: false,
      childSeat: false,
      additionalDriver: false,
      unlimitedMileage: true,
      roadsideAssistance: true,
    },
    pricing: {
      baseRate: 299,
      days: 2,
      subtotal: 598,
      insuranceCost: 90,
      addOnsTotal: 40,
      discountAmount: 0,
      taxesAndFees: 72.80,
      total: 800.80,
    },
    payment: {
      method: 'apple_pay',
      last4: '8831',
      status: 'completed',
      paidAt: '2026-10-04T11:00:00Z'
    },
    createdAt: '2026-10-04T11:00:00Z'
  }
];

export const getStoredBookings = (): Booking[] => {
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    if (!data) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading bookings:', e);
    return INITIAL_BOOKINGS;
  }
};

export const saveStoredBookings = (bookings: Booking[]): void => {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (e) {
    console.error('Error saving bookings:', e);
  }
};

export const createNewBooking = (booking: Booking): Booking[] => {
  const current = getStoredBookings();
  const updated = [booking, ...current];
  saveStoredBookings(updated);
  fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  }).catch((err) => console.warn('Could not sync booking to backend:', err));
  return updated;
};

export const updateBookingStatus = (bookingId: string, status: Booking['payment']['status']): Booking[] => {
  const current = getStoredBookings();
  const updated = current.map(b => 
    b.id === bookingId ? { ...b, payment: { ...b.payment, status } } : b
  );
  saveStoredBookings(updated);
  fetch(`/api/bookings/${bookingId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  }).catch((err) => console.warn('Could not sync status to backend:', err));
  return updated;
};

export const syncFromBackend = async (): Promise<{ cars: Car[]; bookings: Booking[] } | null> => {
  try {
    const [carsRes, bookingsRes] = await Promise.all([
      fetch('/api/cars'),
      fetch('/api/bookings')
    ]);
    if (carsRes.ok && bookingsRes.ok) {
      const cars: Car[] = await carsRes.json();
      const bookings: Booking[] = await bookingsRes.json();
      saveStoredCars(cars);
      saveStoredBookings(bookings);
      return { cars, bookings };
    }
  } catch (e) {
    // Graceful fallback to localStorage
    console.info('Backend API currently unreachable, operating in offline/client storage mode.');
  }
  return null;
};

export const getFavorites = (): string[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : ['car-1', 'car-4'];
  } catch {
    return ['car-1', 'car-4'];
  }
};

export const toggleFavoriteCar = (carId: string): string[] => {
  const favs = getFavorites();
  const updated = favs.includes(carId) ? favs.filter(id => id !== carId) : [...favs, carId];
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
};

export const formatCurrency = (amount: number, currency: 'USD' | 'EUR' | 'GBP' = 'USD'): string => {
  const rates = { USD: 1, EUR: 0.92, GBP: 0.79 };
  const symbols = { USD: '$', EUR: '€', GBP: '£' };
  const converted = amount * (rates[currency] || 1);
  return `${symbols[currency]}${Math.round(converted).toLocaleString()}`;
};
