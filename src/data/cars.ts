import { Car } from '../types';

export const INITIAL_CARS: Car[] = [
  {
    id: 'car-1',
    name: 'Porsche 911 Carrera 4S',
    brand: 'Porsche',
    category: 'Supercar',
    year: 2024,
    dailyRate: 389,
    hourlyRate: 55,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 4,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      horsepower: 443,
      acceleration: '3.4s (0-60 mph)',
      topSpeed: '190 mph',
      rangeOrMpg: '24 MPG Highway',
      luggage: 2,
      doors: 2,
    },
    features: [
      'Sport Chrono Package',
      'PASM Sport Suspension',
      'Bose High-End Surround Sound',
      'Apple CarPlay & Android Auto',
      'Porsche Dynamic Light System Plus',
      'Carbon Fiber Interior Package'
    ],
    rating: 4.98,
    reviewsCount: 142,
    isAvailable: true,
    location: 'Los Angeles (LAX) & Beverly Hills',
    badge: 'Top Pick',
    description: 'An iconic silhouette packed with twin-turbocharged precision. The Porsche 911 Carrera 4S delivers unparalleled all-wheel grip, hair-raising acceleration, and refined everyday luxury.',
    reviews: [
      {
        id: 'rev-1',
        author: 'Alexander Wright',
        rating: 5,
        date: '3 days ago',
        comment: 'Pure exhilaration driving down the Pacific Coast Highway. Flawless condition, spotless interior, and the exhaust note is addictive.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The handover at LAX was completely seamless. Outstanding customer care from the Apex team.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-2',
    name: 'Tesla Model S Plaid',
    brand: 'Tesla',
    category: 'Electric',
    year: 2024,
    dailyRate: 299,
    hourlyRate: 42,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Electric',
      horsepower: 1020,
      acceleration: '1.99s (0-60 mph)',
      topSpeed: '200 mph',
      rangeOrMpg: '396 mi EPA Range',
      luggage: 4,
      doors: 4,
    },
    features: [
      'Tri-Motor All-Wheel Drive',
      'Full Self-Driving Capability (Supervised)',
      '17-inch Cinematic OLED Display',
      'Yoke Steering Control',
      'Gaming Computer (10 teraflops)',
      'Free Supercharging Access'
    ],
    rating: 4.95,
    reviewsCount: 215,
    isAvailable: true,
    location: 'San Francisco (SFO) & Silicon Valley',
    badge: 'Popular',
    description: 'Beyond supercar speeds in a pristine electric executive saloon. 1,020 peak horsepower launches you with instantaneous zero-lag thrust while coddling you in quiet acoustic glass.',
    reviews: [
      {
        id: 'rev-3',
        author: 'Marcus Vance',
        rating: 5,
        date: '1 week ago',
        comment: 'Unbelievable acceleration. The roller-coaster launch is something everyone needs to experience once.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-3',
    name: 'Mercedes-Benz S-Class S580',
    brand: 'Mercedes-Benz',
    category: 'Luxury',
    year: 2024,
    dailyRate: 349,
    hourlyRate: 49,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      horsepower: 496,
      acceleration: '4.4s (0-60 mph)',
      topSpeed: '155 mph',
      rangeOrMpg: '26 MPG Highway',
      luggage: 4,
      doors: 4,
    },
    features: [
      'Burmester 4D High-End Sound System',
      'Executive Rear Reclining Seats with Massage',
      'Active Ambient Lighting with 64 Colors',
      'Augmented Reality Head-Up Display',
      'Air Balance Cabin Fragrance System',
      'E-Active Body Control Suspension'
    ],
    rating: 4.97,
    reviewsCount: 98,
    isAvailable: true,
    location: 'New York (JFK) & Manhattan',
    badge: 'Top Pick',
    description: 'The pinnacle of automotive engineering and supreme luxury. Whispering quietness, energizing comfort massages, and effortless twin-turbo V8 torque make every commute sublime.',
    reviews: [
      {
        id: 'rev-4',
        author: 'Sophia Chen',
        rating: 5,
        date: '5 days ago',
        comment: 'Used for a weekend corporate summit in Manhattan. Flawless presentation, executive prestige, and divine comfort.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-4',
    name: 'Range Rover Autobiography LWB',
    brand: 'Land Rover',
    category: 'SUV',
    year: 2024,
    dailyRate: 395,
    hourlyRate: 54,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      horsepower: 523,
      acceleration: '4.6s (0-60 mph)',
      topSpeed: '162 mph',
      rangeOrMpg: '21 MPG Highway',
      luggage: 5,
      doors: 5,
    },
    features: [
      'Twin-Turbo V8 Engine',
      'All-Wheel Steering & Electronic Air Suspension',
      'Meridian Signature 35-Speaker Audio',
      'Executive Class Comfort Rear Seating',
      'ClearSight Ground View Camera',
      'Soft Door Close & Power Deployable Steps'
    ],
    rating: 4.92,
    reviewsCount: 167,
    isAvailable: true,
    location: 'Miami (MIA) & South Beach',
    badge: 'Popular',
    description: 'Commanding road presence matched with peerless British refinement. Effortlessly cruises through metropolitan avenues or mountain getaways with unrivaled poise.',
    reviews: [
      {
        id: 'rev-5',
        author: 'David Sterling',
        rating: 5,
        date: '4 days ago',
        comment: 'Rented for a family road trip to the Keys. So comfortable that even a 4-hour drive felt like 30 minutes.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-5',
    name: 'BMW M4 Competition Coupe',
    brand: 'BMW',
    category: 'Supercar',
    year: 2024,
    dailyRate: 310,
    hourlyRate: 45,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 4,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      horsepower: 503,
      acceleration: '3.4s (0-60 mph)',
      topSpeed: '180 mph',
      rangeOrMpg: '23 MPG Highway',
      luggage: 2,
      doors: 2,
    },
    features: [
      'M xDrive All-Wheel Drive with 2WD Drift Mode',
      'M Carbon Bucket Seats',
      'M Carbon Ceramic Brakes',
      'Harman Kardon Surround Sound',
      'Head-Up Display with M Track Mode',
      'Active M Differential'
    ],
    rating: 4.94,
    reviewsCount: 88,
    isAvailable: true,
    location: 'Chicago (ORD) & Downtown',
    badge: 'New',
    description: 'Uncompromising motorsport pedigree built for the streets. 503 horsepower delivered with razor-sharp steering and ferocious throttle response.',
    reviews: [
      {
        id: 'rev-6',
        author: 'Jordan Lee',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The handling on this car is pure magic. Razor sharp steering and the exhaust crackles put a huge smile on my face.',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-6',
    name: 'Porsche Taycan Turbo Cross Turismo',
    brand: 'Porsche',
    category: 'Electric',
    year: 2024,
    dailyRate: 360,
    hourlyRate: 50,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Electric',
      horsepower: 670,
      acceleration: '3.1s (0-60 mph)',
      topSpeed: '155 mph',
      rangeOrMpg: '280 mi Range',
      luggage: 3,
      doors: 5,
    },
    features: [
      '800-Volt Architecture Fast Charging',
      'Adaptive Air Suspension with Smart Lift',
      'Porsche Electric Sport Sound',
      'Passenger Touchscreen Display',
      'Off-Road Design Package',
      'Panoramic Fixed Glass Roof'
    ],
    rating: 4.96,
    reviewsCount: 74,
    isAvailable: true,
    location: 'San Francisco (SFO) & Palo Alto',
    badge: 'Eco Friendly',
    description: 'Electrifying performance meets shooting-brake practicality. Instantaneous torque launches you while delivering supreme balance around every corner.',
    reviews: [
      {
        id: 'rev-7',
        author: 'Claire Moreau',
        rating: 5,
        date: '3 weeks ago',
        comment: 'The interior is like a spaceship and it charges in just 20 minutes at Electrify America stations. Outstanding vehicle!',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-7',
    name: 'Mercedes-AMG G 63 (G-Wagon)',
    brand: 'Mercedes-Benz',
    category: 'SUV',
    year: 2024,
    dailyRate: 495,
    hourlyRate: 68,
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      horsepower: 577,
      acceleration: '4.5s (0-60 mph)',
      topSpeed: '149 mph',
      rangeOrMpg: '16 MPG Highway',
      luggage: 4,
      doors: 5,
    },
    features: [
      'Handcrafted AMG 4.0L V8 Biturbo',
      'AMG Performance Exhaust with Side Pipes',
      'Triple Differential Locks',
      'Burmester Surround Sound',
      'AMG Ride Control Sport Suspension',
      'Exclusive Nappa Leather Interior'
    ],
    rating: 4.99,
    reviewsCount: 192,
    isAvailable: true,
    location: 'Miami (MIA) & Los Angeles (LAX)',
    badge: 'Top Pick',
    description: 'The undisputed icon of luxury and dominance. With distinctive side-pipe exhaust roar and rugged capability wrapped in bespoke luxury, turn heads wherever you arrive.',
    reviews: [
      {
        id: 'rev-8',
        author: 'Nathaniel Cole',
        rating: 5,
        date: '1 day ago',
        comment: 'Turns heads at every red light. That deep V8 rumble is unmatched. Will rent again next month in South Beach.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-8',
    name: 'Chevrolet Corvette Z06 C8',
    brand: 'Chevrolet',
    category: 'Convertible',
    year: 2024,
    dailyRate: 330,
    hourlyRate: 46,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      horsepower: 670,
      acceleration: '2.6s (0-60 mph)',
      topSpeed: '195 mph',
      rangeOrMpg: '20 MPG Highway',
      luggage: 2,
      doors: 2,
    },
    features: [
      'Flat-Plane Crank 5.5L Naturally Aspirated V8',
      'Retractable Hardtop Convertible',
      'Magnetic Selective Ride Control 4.0',
      'Bose Performance Series 14-Speaker Audio',
      'Performance Data Recorder',
      'GT2 Competition Sport Seats'
    ],
    rating: 4.93,
    reviewsCount: 110,
    isAvailable: true,
    location: 'Las Vegas (LAS) & Phoenix (PHX)',
    badge: 'Best Value',
    description: 'An exotic mid-engine masterpiece with an 8,600 RPM redline singing like a Ferrari. Drop the retractable hardtop and soak in the desert sunset in unrivaled style.',
    reviews: [
      {
        id: 'rev-9',
        author: 'Bradley Adams',
        rating: 5,
        date: '1 week ago',
        comment: 'Drove through Red Rock Canyon with the top down. One of the best driving experiences of my life.',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-9',
    name: 'Audi RS e-tron GT',
    brand: 'Audi',
    category: 'Electric',
    year: 2024,
    dailyRate: 340,
    hourlyRate: 48,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 4,
      transmission: 'Automatic',
      fuelType: 'Electric',
      horsepower: 637,
      acceleration: '3.1s (0-60 mph)',
      topSpeed: '155 mph',
      rangeOrMpg: '250 mi Range',
      luggage: 3,
      doors: 4,
    },
    features: [
      'Quattro Electric All-Wheel Drive',
      'Carbon Fiber Roof and Trim',
      'Bang & Olufsen 3D Sound System',
      'Matrix-design LED Headlights with Audi Laser Light',
      'Rear-Axle Steering',
      'Fine Nappa Leather RS Sport Seats'
    ],
    rating: 4.91,
    reviewsCount: 65,
    isAvailable: true,
    location: 'Seattle (SEA) & Portland (PDX)',
    badge: 'Eco Friendly',
    description: 'Sculpted gran turismo styling combined with whisper-silent, neck-snapping acceleration. The definition of modern electric luxury.',
    reviews: [
      {
        id: 'rev-10',
        author: 'Hannah Davies',
        rating: 5,
        date: '4 weeks ago',
        comment: 'Stunning car that looks like a concept vehicle on the road. The soundproofing is remarkable.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-10',
    name: 'BMW 7 Series 760i xDrive',
    brand: 'BMW',
    category: 'Luxury',
    year: 2024,
    dailyRate: 365,
    hourlyRate: 52,
    image: 'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      horsepower: 536,
      acceleration: '4.1s (0-60 mph)',
      topSpeed: '155 mph',
      rangeOrMpg: '26 MPG Highway',
      luggage: 4,
      doors: 4,
    },
    features: [
      '31.3-inch 8K BMW Theater Screen in Rear',
      'Automatic Opening and Closing Doors',
      'Bowers & Wilkins Diamond Surround Sound',
      'Sky Lounge LED Panoramic Sunroof',
      'Interaction Bar with Crystal Glass Controls',
      'Integral Active 4-Wheel Steering'
    ],
    rating: 4.97,
    reviewsCount: 82,
    isAvailable: true,
    location: 'Boston (BOS) & New York (JFK)',
    badge: 'Popular',
    description: 'Transform every journey into a private VIP cinema. Fitted with the revolutionary 31-inch theater screen in the rear and effortless TwinPower Turbo V8 power.',
    reviews: [
      {
        id: 'rev-11',
        author: 'Robert Sterling',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The rear theater screen was a hit for our clients. Incomparable executive comfort.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-11',
    name: 'Genesis GV80 Prestige 3.5T',
    brand: 'Genesis',
    category: 'SUV',
    year: 2024,
    dailyRate: 215,
    hourlyRate: 32,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      horsepower: 375,
      acceleration: '5.3s (0-60 mph)',
      topSpeed: '149 mph',
      rangeOrMpg: '24 MPG Highway',
      luggage: 4,
      doors: 5,
    },
    features: [
      'Twin-Turbo 3.5L V6 Engine',
      'Electronically Controlled Suspension with Road Preview',
      'Lexicon 21-Speaker Premium Audio',
      'Ergo Motion Driver Seat with Posture Assist',
      'Remote Smart Parking Assist',
      'Quilted Nappa Leather Seating'
    ],
    rating: 4.89,
    reviewsCount: 140,
    isAvailable: true,
    location: 'Dallas (DFW) & Austin (AUS)',
    badge: 'Best Value',
    description: 'Unbeatable luxury value. High-craftsmanship quilted leather, serene acoustic quietude, and dynamic twin-turbo power at an accessible daily rate.',
    reviews: [
      {
        id: 'rev-12',
        author: 'Tara Peterson',
        rating: 5,
        date: '1 week ago',
        comment: 'So quiet and smooth! Feels just as luxurious as a Bentley Bentayga at a fraction of the cost.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  {
    id: 'car-12',
    name: 'Ford Mustang Dark Horse 5.0L',
    brand: 'Ford',
    category: 'Supercar',
    year: 2024,
    dailyRate: 245,
    hourlyRate: 35,
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      seats: 4,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      horsepower: 500,
      acceleration: '3.7s (0-60 mph)',
      topSpeed: '168 mph',
      rangeOrMpg: '22 MPG Highway',
      luggage: 2,
      doors: 2,
    },
    features: [
      '5.0L Naturally Aspirated Gen-4 Coyote V8',
      'Active Valve Dual Exhaust System',
      'MagneRide Damping System',
      'Brembo 6-Piston Performance Front Brakes',
      'Dual 13.2-inch Curved Digital Displays',
      'Recaro Micro-Suede Sport Seats'
    ],
    rating: 4.90,
    reviewsCount: 104,
    isAvailable: true,
    location: 'Denver (DEN) & Las Vegas (LAS)',
    badge: 'New',
    description: 'Raw American muscle perfected with precision track manners. 500 naturally aspirated horsepower that bellows with pure adrenaline on open highways.',
    reviews: [
      {
        id: 'rev-13',
        author: 'Jason Miller',
        rating: 5,
        date: '5 days ago',
        comment: 'The sound in Track Mode is unbelievable. Fast, thrilling, and a joy to pilot through the canyons.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
      }
    ]
  }
];

export const POPULAR_LOCATIONS = [
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
];

export const PROMO_CODES: Record<string, { discountPercent: number; maxDiscount: number; description: string }> = {
  'APEX20': { discountPercent: 20, maxDiscount: 200, description: '20% off for first-time premium drivers' },
  'DRIVEFAST': { discountPercent: 15, maxDiscount: 150, description: '15% summer highway discount' },
  'VIPMEMBER': { discountPercent: 25, maxDiscount: 300, description: '25% VIP Executive discount' },
};
