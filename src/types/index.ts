export type CarCategory = 'Supercar' | 'Luxury' | 'SUV' | 'Electric' | 'Sedan' | 'Convertible';

export interface CarSpecs {
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  horsepower: number;
  acceleration: string;
  topSpeed: string;
  rangeOrMpg: string;
  luggage: number;
  doors: number;
}

export interface CarReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: CarCategory;
  year: number;
  dailyRate: number;
  hourlyRate: number;
  image: string;
  gallery: string[];
  specs: CarSpecs;
  features: string[];
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  location: string;
  badge?: 'Top Pick' | 'Popular' | 'Eco Friendly' | 'Best Value' | 'New';
  description: string;
  reviews?: CarReview[];
}

export type InsuranceTier = 'basic' | 'premium' | 'full';

export interface BookingAddOns {
  insurance: InsuranceTier;
  gps: boolean;
  childSeat: boolean;
  additionalDriver: boolean;
  unlimitedMileage: boolean;
  roadsideAssistance: boolean;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  licenseNumber: string;
  notes?: string;
}

export interface BookingPricing {
  baseRate: number;
  days: number;
  subtotal: number;
  insuranceCost: number;
  addOnsTotal: number;
  discountAmount: number;
  taxesAndFees: number;
  total: number;
  promoCodeApplied?: string;
}

export interface Booking {
  id: string;
  carId: string;
  car: Car;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  days: number;
  customer: CustomerDetails;
  addOns: BookingAddOns;
  pricing: BookingPricing;
  payment: {
    method: 'credit_card' | 'apple_pay' | 'google_pay';
    last4?: string;
    status: 'confirmed' | 'active' | 'completed' | 'cancelled';
    paidAt: string;
  };
  createdAt: string;
}

export interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  transmission: string;
  fuelType: string;
  seats: number | 'all';
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'rating' | 'horsepower';
  searchQuery: string;
  location: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}
