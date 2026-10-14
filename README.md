# ApexDrive — Premium Car Rental & Fleet Platform

A full-featured, luxury automotive car rental web platform engineered with React 19, TypeScript, Vite, Tailwind CSS v4, and Lucide icons.

![ApexDrive Banner](https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Key Features

### 1. Curated Fleet Showcase
- **12 High-Performance Vehicles**: Covering Supercars, Executive Sedans, Luxury SUVs, Electric Vehicles (EVs), and Convertibles.
- **Detailed Specifications**: Horsepower (HP), 0-60 MPH acceleration times, top speeds, powertrain types, seating capacity, luggage capacity, and efficiency ratings.
- **Dynamic Multi-Currency Support**: Switch between **USD ($)**, **EUR (€)**, and **GBP (£)** with real-time conversion rates across all pricing and invoices.
- **Saved Favorites**: Bookmark vehicles to your personal favorites with persistent `localStorage` synchronization.

### 2. Search & Filter System
- **Location Selector**: Major airport hubs & concierge stations (LAX, SFO, MIA, JFK, ORD, LAS, etc.).
- **Schedule Planner**: Dynamic pick-up and drop-off dates, time slots, and automatic rental day calculator.
- **Category Filter Tabs**: Fast filtering by vehicle style with live count badges.
- **Advanced Filters Drawer**: Daily rate slider ($150–$600+), transmission (Automatic / Manual), powertrain (Petrol, EV, Hybrid), and sorting (Price low-high, high-low, Top rated, Horsepower).

### 3. Interactive Multi-Step Booking Wizard
- **Step 1: Schedule & Protection Shield**:
  - Choice of protection packages: **Basic Shield** (Standard liability), **Premium Shield** ($25/day, $0 security deposit, tire/glass protection), and **Elite Total Shield** ($45/day, complete zero-liability).
  - Add-ons: Unlimited mileage, extra driver authorization, Isofix child seats, and 5G mobile hotspot.
- **Step 2: Driver Verification Form**: Full legal name, email, phone, age validation (21+), driver license number, and concierge instructions (e.g., flight numbers).
- **Step 3: Review & Secure Payment**:
  - Transparent itemized cost breakdown (Base rate × days, protection package, add-ons, 10% taxes and airport fees).
  - Live Promo Code Engine: test with `APEX20` (20% off), `DRIVEFAST` (15% off), or `VIPMEMBER` (25% off).
  - Payment options: Mock credit card processing, 1-tap Apple Pay, and Google Pay.
- **Step 4: Confirmation & Digital Voucher**:
  - Confetti fireworks celebratory animation (`canvas-confetti`).
  - Digital Rental Voucher with reference code (`BK-XXXXX`), vehicle summary, driver details, and simulated QR code.
  - Printable / downloadable voucher receipt.

### 4. Customer Portal ("My Bookings")
- Live tracking of all customer reservations.
- Filter by status: `Confirmed`, `Completed`, and `Cancelled`.
- 1-click printable digital voucher.
- Self-service reservation cancellation with instant automated refund confirmation.

### 5. Admin CMS & Fleet Control Portal
- **Real-Time KPIs**: Total fleet count, gross rental revenue, active reservations, and fleet utilization rate.
- **Fleet Inventory Manager**: Add new cars with custom specs, adjust rates, toggle car availability between `Available` and `Maintenance`, and delete vehicles.
- **Reservation Manager**: View all bookings, inspect customer contacts, and update reservation status (`Confirmed` ⇄ `Completed` ⇄ `Cancelled`).

---

## 🛠️ Technology Stack

| Layer | Tools / Libraries |
| :--- | :--- |
| **Framework** | React 19 + TypeScript |
| **Bundler & Dev Server** | Vite 8 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Icons** | Lucide React |
| **Animation / Celebration** | Canvas Confetti |
| **State Persistence** | Browser `localStorage` Store |

---

## 📂 Project Architecture

```
car-rental-platform/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AddCarModal.tsx        # Add new car to fleet form
│   │   │   └── AdminDashboard.tsx     # CMS dashboard with revenue stats & tables
│   │   ├── common/
│   │   │   └── Toast.tsx              # Toast notification system
│   │   ├── home/
│   │   │   ├── CarCard.tsx            # Vehicle preview card with specs & rates
│   │   │   ├── FaqSection.tsx         # Expandable FAQ accordion
│   │   │   ├── FleetSection.tsx       # Fleet catalog, category tabs & filters
│   │   │   ├── Hero.tsx               # Brand hero with trust badges & stats
│   │   │   ├── SearchBox.tsx          # Floating date/location booking hub
│   │   │   ├── Testimonials.tsx       # Verified driver feedback
│   │   │   └── ValueProps.tsx         # "Why Apex" & 3-step rental journey
│   │   ├── layout/
│   │   │   ├── Footer.tsx             # Footer links & VIP newsletter
│   │   │   └── Navbar.tsx             # Sticky navigation, currency & bookings counter
│   │   └── modals/
│   │       ├── BookingWizardModal.tsx # 4-step interactive checkout & voucher
│   │       ├── CarDetailModal.tsx     # Photo gallery & full specs modal
│   │       └── MyBookingsModal.tsx    # Customer reservations & voucher manager
│   ├── data/
│   │   └── cars.ts                    # 12 initial vehicles, hubs & coupons
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces
│   ├── utils/
│   │   └── storage.ts                 # LocalStorage persistence & currency engine
│   ├── App.tsx                        # Master layout & root controller
│   ├── index.css                      # Tailwind CSS v4 setup & theme
│   ├── main.tsx                       # React root bootstrap
│   └── vite-env.d.ts                  # Vite client declarations
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 💻 How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```
