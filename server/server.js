import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const CARS_FILE = path.join(DATA_DIR, 'cars.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers for file persistence
const readJson = (file, fallback = []) => {
  try {
    if (!fs.existsSync(file)) return fallback;
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return fallback;
  }
};

const writeJson = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
  }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'ApexDrive Fleet & Rental API',
    version: '1.0.0',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// GET /api/cars
app.get('/api/cars', (req, res) => {
  let cars = readJson(CARS_FILE, []);
  const { category, search, available } = req.query;

  if (category && category !== 'all') {
    cars = cars.filter(c => c.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase();
    cars = cars.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.brand.toLowerCase().includes(q) ||
      c.location?.toLowerCase().includes(q)
    );
  }

  if (available !== undefined) {
    const isAvail = available === 'true';
    cars = cars.filter(c => c.isAvailable === isAvail);
  }

  res.json(cars);
});

// GET /api/cars/:id
app.get('/api/cars/:id', (req, res) => {
  const cars = readJson(CARS_FILE, []);
  const car = cars.find(c => c.id === req.params.id);
  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }
  res.json(car);
});

// POST /api/cars (Admin create)
app.post('/api/cars', (req, res) => {
  const cars = readJson(CARS_FILE, []);
  const newCar = {
    id: req.body.id || `car-${Date.now()}`,
    name: req.body.name || 'Unnamed Vehicle',
    brand: req.body.brand || 'Luxury',
    category: req.body.category || 'Luxury',
    year: req.body.year || new Date().getFullYear(),
    dailyRate: Number(req.body.dailyRate) || 299,
    hourlyRate: Number(req.body.hourlyRate) || 45,
    image: req.body.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    gallery: req.body.gallery || [req.body.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
    specs: req.body.specs || {
      seats: 4,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      horsepower: 400,
      acceleration: '4.0s (0-60 mph)',
      topSpeed: '180 mph',
      rangeOrMpg: '25 MPG',
      luggage: 2,
      doors: 2,
    },
    features: req.body.features || ['Premium Sound', 'Leather Seating', 'Navigation System'],
    rating: Number(req.body.rating) || 5.0,
    reviewsCount: Number(req.body.reviewsCount) || 1,
    isAvailable: req.body.isAvailable !== false,
    location: req.body.location || 'Los Angeles Airport (LAX)',
    badge: req.body.badge || 'New',
    description: req.body.description || 'Premium high-performance rental vehicle ready for immediate reservation.',
    reviews: req.body.reviews || []
  };

  const updatedCars = [newCar, ...cars];
  writeJson(CARS_FILE, updatedCars);
  res.status(201).json(newCar);
});

// PUT /api/cars/:id (Admin update)
app.put('/api/cars/:id', (req, res) => {
  const cars = readJson(CARS_FILE, []);
  const index = cars.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Car not found' });
  }

  const updatedCar = { ...cars[index], ...req.body, id: req.params.id };
  cars[index] = updatedCar;
  writeJson(CARS_FILE, cars);
  res.json(updatedCar);
});

// PATCH /api/cars/:id/availability
app.patch('/api/cars/:id/availability', (req, res) => {
  const cars = readJson(CARS_FILE, []);
  const index = cars.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Car not found' });
  }

  cars[index].isAvailable = !cars[index].isAvailable;
  writeJson(CARS_FILE, cars);
  res.json(cars[index]);
});

// DELETE /api/cars/:id
app.delete('/api/cars/:id', (req, res) => {
  const cars = readJson(CARS_FILE, []);
  const filtered = cars.filter(c => c.id !== req.params.id);
  if (filtered.length === cars.length) {
    return res.status(404).json({ error: 'Car not found' });
  }
  writeJson(CARS_FILE, filtered);
  res.json({ message: 'Car deleted successfully', id: req.params.id });
});

// GET /api/bookings
app.get('/api/bookings', (req, res) => {
  const bookings = readJson(BOOKINGS_FILE, []);
  res.json(bookings);
});

// GET /api/bookings/:id
app.get('/api/bookings/:id', (req, res) => {
  const bookings = readJson(BOOKINGS_FILE, []);
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.json(booking);
});

// POST /api/bookings (Create booking)
app.post('/api/bookings', (req, res) => {
  const bookings = readJson(BOOKINGS_FILE, []);
  const booking = {
    ...req.body,
    id: req.body.id || `BK-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: req.body.createdAt || new Date().toISOString()
  };

  const updated = [booking, ...bookings];
  writeJson(BOOKINGS_FILE, updated);
  res.status(201).json(booking);
});

// PATCH /api/bookings/:id/status
app.patch('/api/bookings/:id/status', (req, res) => {
  const { status } = req.body;
  if (!['confirmed', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be confirmed, completed, or cancelled' });
  }

  const bookings = readJson(BOOKINGS_FILE, []);
  const index = bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  bookings[index].payment.status = status;
  writeJson(BOOKINGS_FILE, bookings);
  res.json(bookings[index]);
});

// GET /api/stats (CMS KPI metrics)
app.get('/api/stats', (req, res) => {
  const cars = readJson(CARS_FILE, []);
  const bookings = readJson(BOOKINGS_FILE, []);

  const totalCars = cars.length;
  const availableCars = cars.filter(c => c.isAvailable).length;
  const activeBookings = bookings.filter(b => b.payment?.status === 'confirmed').length;
  const totalRevenue = bookings
    .filter(b => b.payment?.status === 'confirmed' || b.payment?.status === 'completed')
    .reduce((sum, b) => sum + (b.pricing?.total || 0), 0);
  
  const fleetUtilization = totalCars > 0 
    ? Math.round(((totalCars - availableCars) / totalCars) * 100) 
    : 0;

  res.json({
    totalCars,
    availableCars,
    activeBookings,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    fleetUtilization
  });
});

// GET /api/locations
app.get('/api/locations', (req, res) => {
  res.json([
    'Los Angeles Airport (LAX)',
    'Beverly Hills Luxury Hub',
    'San Francisco Int Airport (SFO)',
    'Silicon Valley / Palo Alto',
    'Miami International (MIA)',
    'South Beach Concierge Station',
    'New York JFK International',
    'Manhattan Midtown Executive',
    'Chicago O’Hare (ORD)',
    'Las Vegas Strip (LAS)',
    'Denver International (DEN)'
  ]);
});

// GET /api/coupons
app.get('/api/coupons', (req, res) => {
  res.json({
    'APEX20': { discountPercent: 20, maxDiscount: 200, description: '20% off for first-time premium drivers' },
    'DRIVEFAST': { discountPercent: 15, maxDiscount: 150, description: '15% summer highway discount' },
    'VIPMEMBER': { discountPercent: 25, maxDiscount: 300, description: '25% VIP Executive discount' }
  });
});

// Serve production static frontend if dist exists
const DIST_DIR = path.join(__dirname, '../dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 ApexDrive Backend API Server is running on http://localhost:${PORT}`);
  console.log(`📡 Endpoints:`);
  console.log(`   - Health check:     GET  http://localhost:${PORT}/api/health`);
  console.log(`   - Cars catalog:     GET  http://localhost:${PORT}/api/cars`);
  console.log(`   - Bookings manager: GET  http://localhost:${PORT}/api/bookings`);
  console.log(`   - Dashboard stats:  GET  http://localhost:${PORT}/api/stats`);
  console.log(`   - Fleet locations:  GET  http://localhost:${PORT}/api/locations`);
});
