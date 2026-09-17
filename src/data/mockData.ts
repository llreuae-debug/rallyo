import { PlayerProfile, Club, Court, Match, Tournament, Challenge, Badge, AppNotification, ChatThread, Booking } from '../types';

export const INITIAL_PLAYER: PlayerProfile = {
  id: 'usr_me',
  name: 'Alex Ruiz',
  email: 'alex.ruiz@rallyo.app',
  phone: '+971 50 284 9192',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  city: 'Dubai',
  country: 'United Arab Emirates',
  ageRange: '26-35',
  dominantHand: 'Right',
  gender: 'Male',
  skillLevel: 4.8,
  eloRating: 1540,
  matchHistoryCount: 22,
  wins: 16,
  losses: 6,
  winRate: 72,
  playingStyle: 'Attacking',
  competitiveness: 'Competitive',
  preferredClubs: ['club_1', 'club_2'],
  badges: [
    { id: 'b1', title: 'First Match', description: 'Played your inaugural RALLYO padel match', icon: '🎾', tier: 'bronze', unlockedAt: '2026-08-10', progress: 1, maxProgress: 1 },
    { id: 'b2', title: 'Winning Streak', description: 'Won 5 ranked matches in a row', icon: '🔥', tier: 'silver', unlockedAt: '2026-08-25', progress: 5, maxProgress: 5 },
    { id: 'b3', title: 'Club Regular', description: 'Played 10+ matches at the same home club', icon: '🏛️', tier: 'gold', unlockedAt: '2026-09-02', progress: 10, maxProgress: 10 },
    { id: 'b4', title: 'Perfect Partner', description: 'Received 10 sportsmanship compliments', icon: '🤝', tier: 'diamond', unlockedAt: '2026-09-12', progress: 10, maxProgress: 10 },
    { id: 'b5', title: 'City Top 100', description: 'Reach top 100 ranking in Dubai', icon: '🏆', tier: 'diamond', progress: 84, maxProgress: 100 },
    { id: 'b6', title: 'Tournament Ace', description: 'Reach finals of an official tournament', icon: '⚡', tier: 'gold', progress: 1, maxProgress: 2 }
  ],
  role: 'player',
  walletBalance: 120.0,
  wallet_balance_minor: 12000,
  preferred_currency: 'AED',
  activityStreakWeeks: 6,
  xp: 3450
};

export const MOCK_OTHER_PLAYERS: PlayerProfile[] = [
  {
    id: 'usr_2',
    name: 'Sofia Al-Mansoor',
    email: 'sofia@rallyo.app',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    city: 'Dubai',
    country: 'United Arab Emirates',
    ageRange: '26-35',
    dominantHand: 'Left',
    skillLevel: 5.1,
    eloRating: 1680,
    matchHistoryCount: 45,
    wins: 34,
    losses: 11,
    winRate: 75,
    playingStyle: 'Tactical',
    competitiveness: 'Competitive',
    preferredClubs: ['club_1', 'club_3'],
    badges: [],
    role: 'player',
    walletBalance: 240,
    wallet_balance_minor: 24000,
    preferred_currency: 'AED',
    activityStreakWeeks: 12,
    xp: 6800
  },
  {
    id: 'usr_3',
    name: 'Carlos Vega',
    email: 'carlos@rallyo.app',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    city: 'Dubai',
    country: 'United Arab Emirates',
    ageRange: '18-25',
    dominantHand: 'Right',
    skillLevel: 4.6,
    eloRating: 1510,
    matchHistoryCount: 30,
    wins: 19,
    losses: 11,
    winRate: 63,
    playingStyle: 'Attacking',
    competitiveness: 'Balanced',
    preferredClubs: ['club_2'],
    badges: [],
    role: 'player',
    walletBalance: 80,
    wallet_balance_minor: 8000,
    preferred_currency: 'AED',
    activityStreakWeeks: 4,
    xp: 2900
  },
  {
    id: 'usr_4',
    name: 'Lucas Fernandez',
    email: 'lucas@rallyo.app',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    city: 'Madrid',
    country: 'Spain',
    ageRange: '26-35',
    dominantHand: 'Right',
    skillLevel: 4.9,
    eloRating: 1585,
    matchHistoryCount: 52,
    wins: 38,
    losses: 14,
    winRate: 73,
    playingStyle: 'All-Court',
    competitiveness: 'Competitive',
    preferredClubs: ['club_1', 'club_4'],
    badges: [],
    role: 'player',
    walletBalance: 150,
    wallet_balance_minor: 15000,
    preferred_currency: 'EUR',
    activityStreakWeeks: 9,
    xp: 5200
  },
  {
    id: 'usr_5',
    name: 'Elena Rostova',
    email: 'elena@rallyo.app',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    city: 'London',
    country: 'United Kingdom',
    ageRange: '26-35',
    dominantHand: 'Right',
    skillLevel: 4.2,
    eloRating: 1420,
    matchHistoryCount: 18,
    wins: 10,
    losses: 8,
    winRate: 55,
    playingStyle: 'Defensive',
    competitiveness: 'Casual',
    preferredClubs: ['club_3'],
    badges: [],
    role: 'player',
    walletBalance: 45,
    wallet_balance_minor: 4500,
    preferred_currency: 'GBP',
    activityStreakWeeks: 3,
    xp: 1800
  }
];

export const MOCK_CLUBS: Club[] = [
  {
    id: 'club_1',
    name: 'The Padel Club Downtown',
    tagline: 'Premier panoramic courts in the heart of Downtown',
    location: 'Downtown Marina',
    address: 'Sheikh Mohammed Bin Rashid Blvd, Downtown Dubai',
    country: 'United Arab Emirates',
    distance: '1.4 km away',
    rating: 4.9,
    reviewCount: 312,
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80',
    courtsCount: 6,
    availableCourts: 3,
    indoor: false,
    pricePerHour: 220,
    price_per_hour_minor: 22000,
    operating_currency: 'AED',
    amenities: ['Panoramic Glass', 'Mondo Supercourt', 'Cafe & Bar', 'Showers & Lockers', 'Pro Racket Rental', 'Valet Parking'],
    description: 'Featuring world-class Italian Mondo turf and panoramic glass enclosures with stunning skyline backdrops. The official training grounds for the Dubai Padel Open.',
    operatingHours: '06:00 AM - 01:00 AM'
  },
  {
    id: 'club_2',
    name: 'Apex Padel Arena',
    tagline: 'Climate-controlled indoor sports-tech sanctuary',
    location: 'Al Quoz Arts District',
    address: 'Street 8, Al Quoz 1, Dubai',
    country: 'United Arab Emirates',
    distance: '3.2 km away',
    rating: 4.8,
    reviewCount: 248,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    courtsCount: 8,
    availableCourts: 4,
    indoor: true,
    pricePerHour: 260,
    price_per_hour_minor: 26000,
    operating_currency: 'AED',
    amenities: ['100% Indoor A/C', 'AI Match Cameras', 'Recovery Lounge', 'Coaching Academy', 'Showers', 'Smoothie Bar'],
    description: 'Dubai’s most technologically advanced indoor padel arena with automated high-speed video recording, instant replay kiosks, and calibrated temperature control.',
    operatingHours: '07:00 AM - Midnight'
  },
  {
    id: 'club_3',
    name: 'Skyline Rooftop Padel',
    tagline: 'Elevated padel on the 42nd floor with 360 views',
    location: 'DIFC Financial District',
    address: 'Gate Precinct 4, DIFC, Dubai',
    country: 'United Arab Emirates',
    distance: '4.8 km away',
    rating: 4.9,
    reviewCount: 189,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
    courtsCount: 4,
    availableCourts: 1,
    indoor: false,
    pricePerHour: 320,
    price_per_hour_minor: 32000,
    operating_currency: 'AED',
    amenities: ['Rooftop Panoramic Views', 'Sunset DJ Sessions', 'Premium Lounge', 'Equipment Store', 'VIP Locker Rooms'],
    description: 'Play in the clouds. Unrivaled views over the Burj Khalifa and Arabian Gulf paired with elite padel court construction.',
    operatingHours: '06:00 AM - 02:00 AM'
  },
  {
    id: 'club_4',
    name: 'Club de Pádel Chamartín',
    tagline: 'Iconic Spanish clay and panoramic turf courts',
    location: 'Chamartín, Madrid',
    address: 'Calle de Pío XII, Chamartín, 28016 Madrid',
    country: 'Spain',
    distance: 'Madrid Center',
    rating: 4.9,
    reviewCount: 420,
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80',
    courtsCount: 12,
    availableCourts: 5,
    indoor: false,
    pricePerHour: 55,
    price_per_hour_minor: 5500,
    operating_currency: 'EUR',
    amenities: ['12 Championship Courts', 'Pro Shop', 'Tapas Club Terrace', 'Floodlit Night Play', 'Official Academy'],
    description: 'The historic Madrid center where top World Padel Tour athletes train and compete.',
    operatingHours: '07:00 AM - 23:30 PM'
  },
  {
    id: 'club_5',
    name: 'Riyadh Oasis Padel Club',
    tagline: 'Luxury desert architectural padel sanctuary',
    location: 'Diriyah Heritage District',
    address: 'Wadi Hanifah, Diriyah, Riyadh',
    country: 'Saudi Arabia',
    distance: 'Diriyah',
    rating: 4.9,
    reviewCount: 175,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
    courtsCount: 8,
    availableCourts: 3,
    indoor: true,
    pricePerHour: 250,
    price_per_hour_minor: 25000,
    operating_currency: 'SAR',
    amenities: ['Luxury Cabanas', 'Mondo WPT Turf', 'Specialty Coffee Bar', 'Recovery Cryotherapy', 'Private Locker Suites'],
    description: 'A benchmark in luxury sporting experience in Riyadh with world-class courts and private player lounges.',
    operatingHours: '06:00 AM - 01:00 AM'
  }
];

export const MOCK_COURTS: Court[] = [
  { id: 'crt_1', clubId: 'club_1', clubName: 'The Padel Club Downtown', name: 'Court 1 (Center Panoramic)', type: 'panoramic_glass', surface: 'mondo_supercourt', indoor: false, hourlyRate: 240, hourly_rate_minor: 24000, currency_code: 'AED' },
  { id: 'crt_2', clubId: 'club_1', clubName: 'The Padel Club Downtown', name: 'Court 2 (Skyline View)', type: 'panoramic_glass', surface: 'mondo_supercourt', indoor: false, hourlyRate: 220, hourly_rate_minor: 22000, currency_code: 'AED' },
  { id: 'crt_3', clubId: 'club_1', clubName: 'The Padel Club Downtown', name: 'Court 3 (Standard Pro)', type: 'standard_glass', surface: 'turf_pro', indoor: false, hourlyRate: 200, hourly_rate_minor: 20000, currency_code: 'AED' },
  { id: 'crt_4', clubId: 'club_2', clubName: 'Apex Padel Arena', name: 'Court 1 (Stadium Indoor)', type: 'panoramic_glass', surface: 'mondo_supercourt', indoor: true, hourlyRate: 280, hourly_rate_minor: 28000, currency_code: 'AED' },
  { id: 'crt_5', clubId: 'club_2', clubName: 'Apex Padel Arena', name: 'Court 2 (AI Replay Pro)', type: 'panoramic_glass', surface: 'mondo_supercourt', indoor: true, hourlyRate: 260, hourly_rate_minor: 26000, currency_code: 'AED' },
  { id: 'crt_6', clubId: 'club_3', clubName: 'Skyline Rooftop Padel', name: 'Court A (Burj Vista)', type: 'outdoor_scenic', surface: 'mondo_supercourt', indoor: false, hourlyRate: 340, hourly_rate_minor: 34000, currency_code: 'AED' },
  { id: 'crt_7', clubId: 'club_4', clubName: 'Club de Pádel Chamartín', name: 'Pista Central Pro', type: 'panoramic_glass', surface: 'mondo_supercourt', indoor: false, hourlyRate: 55, hourly_rate_minor: 5500, currency_code: 'EUR' }
];

export const MOCK_MATCHES: Match[] = [
  {
    id: 'match_1',
    title: 'Ranked Doubles Night Clash (Level 4.5 - 5.2)',
    clubId: 'club_1',
    clubName: 'The Padel Club Downtown',
    courtName: 'Court 1 (Center Panoramic)',
    date: 'Today',
    time: '19:30 - 21:00',
    format: 'doubles',
    matchType: 'ranked',
    visibility: 'public',
    skillRange: { min: 4.5, max: 5.2 },
    totalFee: 240,
    total_fee_minor: 24000,
    feePerPlayer: 60,
    fee_per_player_minor: 6000,
    currency_code: 'AED',
    hostPlayerId: 'usr_2',
    status: 'open',
    players: [
      { id: 'usr_2', name: 'Sofia Al-Mansoor', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', elo: 1680, skillLevel: 5.1, team: 'A', paid: true, confirmed: true },
      { id: 'usr_3', name: 'Carlos Vega', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', elo: 1510, skillLevel: 4.6, team: 'A', paid: true, confirmed: true },
      { id: 'usr_4', name: 'Lucas Fernandez', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', elo: 1585, skillLevel: 4.9, team: 'B', paid: true, confirmed: true }
    ],
    waitlist: [],
    aiCompatibilityScore: 94,
    aiExplanation: '🎯 94% Match: Perfectly calibrated for your 4.8 level, 1.4km from you, and fills your favorite slot tonight!'
  },
  {
    id: 'match_2',
    title: 'Casual Sunset Doubles & Social Rally',
    clubId: 'club_3',
    clubName: 'Skyline Rooftop Padel',
    courtName: 'Court A (Burj Vista)',
    date: 'Tomorrow',
    time: '18:00 - 19:30',
    format: 'doubles',
    matchType: 'casual',
    visibility: 'public',
    skillRange: { min: 4.0, max: 5.0 },
    totalFee: 320,
    total_fee_minor: 32000,
    feePerPlayer: 80,
    fee_per_player_minor: 8000,
    currency_code: 'AED',
    hostPlayerId: 'usr_me',
    status: 'open',
    players: [
      { id: 'usr_me', name: 'Alex Ruiz (You)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', elo: 1540, skillLevel: 4.8, team: 'A', paid: true, confirmed: true },
      { id: 'usr_5', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', elo: 1420, skillLevel: 4.2, team: 'B', paid: true, confirmed: true }
    ],
    waitlist: [],
    aiCompatibilityScore: 88,
    aiExplanation: '🌅 Golden hour rooftop slot with balanced social playstyle and relaxed vibe.'
  },
  {
    id: 'match_3',
    title: 'High-Tempo A/C Indoor Showdown',
    clubId: 'club_2',
    clubName: 'Apex Padel Arena',
    courtName: 'Court 1 (Stadium Indoor)',
    date: 'Fri, Sep 19',
    time: '20:00 - 21:30',
    format: 'doubles',
    matchType: 'ranked',
    visibility: 'public',
    skillRange: { min: 4.7, max: 5.5 },
    totalFee: 280,
    total_fee_minor: 28000,
    feePerPlayer: 70,
    fee_per_player_minor: 7000,
    currency_code: 'AED',
    hostPlayerId: 'usr_4',
    status: 'open',
    players: [
      { id: 'usr_4', name: 'Lucas Fernandez', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', elo: 1585, skillLevel: 4.9, team: 'A', paid: true, confirmed: true },
      { id: 'usr_2', name: 'Sofia Al-Mansoor', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', elo: 1680, skillLevel: 5.1, team: 'B', paid: true, confirmed: true }
    ],
    waitlist: [],
    aiCompatibilityScore: 91,
    aiExplanation: '⚡ High intensity matchup against top-tier opponents; optimal for ELO progression.'
  },
  {
    id: 'match_completed_1',
    title: 'Downtown Master League - Round 4',
    clubId: 'club_1',
    clubName: 'The Padel Club Downtown',
    courtName: 'Court 2',
    date: 'Yesterday',
    time: '20:00 - 21:30',
    format: 'doubles',
    matchType: 'ranked',
    visibility: 'public',
    skillRange: { min: 4.5, max: 5.0 },
    totalFee: 220,
    total_fee_minor: 22000,
    feePerPlayer: 55,
    fee_per_player_minor: 5500,
    currency_code: 'AED',
    hostPlayerId: 'usr_3',
    status: 'completed',
    players: [
      { id: 'usr_me', name: 'Alex Ruiz', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', elo: 1540, skillLevel: 4.8, team: 'A', paid: true, confirmed: true },
      { id: 'usr_4', name: 'Lucas Fernandez', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', elo: 1585, skillLevel: 4.9, team: 'A', paid: true, confirmed: true },
      { id: 'usr_3', name: 'Carlos Vega', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', elo: 1510, skillLevel: 4.6, team: 'B', paid: true, confirmed: true },
      { id: 'usr_5', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', elo: 1420, skillLevel: 4.2, team: 'B', paid: true, confirmed: true }
    ],
    waitlist: [],
    score: {
      teamASets: [6, 7],
      teamBSets: [4, 5],
      winner: 'A',
      submittedBy: 'usr_me',
      confirmedBy: ['usr_me', 'usr_4', 'usr_3'],
      isDisputed: false,
      eloDeltaTeamA: 18,
      eloDeltaTeamB: -18,
      timestamp: '2026-09-16T21:40:00Z'
    }
  }
];

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 'tourn_1',
    title: 'Rallyo Dubai Masters Championship',
    clubName: 'The Padel Club Downtown',
    clubId: 'club_1',
    date: 'Sep 27 - Sep 28, 2026',
    time: '16:00 - 22:00',
    format: 'knockout',
    levelRange: 'Level 4.5+',
    entryFee: 350,
    entry_fee_minor: 35000,
    prizePool: '15,000 AED + Bullpadel Gear',
    prize_pool_minor: 1500000,
    currency_code: 'AED',
    maxPairs: 8,
    registeredCount: 7,
    status: 'upcoming',
    bannerUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80',
    registeredPairs: [
      { id: 'pair_1', player1: 'Alex Ruiz', player2: 'Lucas Fernandez', seed: 1 },
      { id: 'pair_2', player1: 'Sofia Al-Mansoor', player2: 'Tariq Al-Hashemi', seed: 2 },
      { id: 'pair_3', player1: 'Carlos Vega', player2: 'Mateo Rossi', seed: 3 },
      { id: 'pair_4', player1: 'David Beckham', player2: 'Nasser Al-Khelaifi', seed: 4 }
    ],
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Quarter Finals',
        matches: [
          { id: 'm_qf1', pair1: { name: 'A. Ruiz / L. Fernandez', seed: 1, elo: 1562 }, pair2: { name: 'M. Gomez / J. Diaz', elo: 1480 }, time: 'Sat 16:00', court: 'Center Court', isCompleted: false },
          { id: 'm_qf2', pair1: { name: 'C. Vega / M. Rossi', seed: 3, elo: 1520 }, pair2: { name: 'K. Patel / A. Khan', elo: 1495 }, time: 'Sat 17:15', court: 'Court 2', isCompleted: false },
          { id: 'm_qf3', pair1: { name: 'S. Mansoor / T. Hashemi', seed: 2, elo: 1640 }, pair2: { name: 'E. Rostova / S. Clark', elo: 1460 }, time: 'Sat 18:30', court: 'Center Court', isCompleted: false },
          { id: 'm_qf4', pair1: { name: 'D. Vance / L. Scott', seed: 4, elo: 1530 }, pair2: { name: 'H. Muller / F. Weber', elo: 1490 }, time: 'Sat 19:45', court: 'Court 3', isCompleted: false }
        ]
      },
      {
        roundNumber: 2,
        roundName: 'Semi Finals',
        matches: [
          { id: 'm_sf1', pair1: { name: 'Winner QF 1', elo: 0 }, pair2: { name: 'Winner QF 2', elo: 0 }, time: 'Sun 17:00', court: 'Center Court', isCompleted: false },
          { id: 'm_sf2', pair1: { name: 'Winner QF 3', elo: 0 }, pair2: { name: 'Winner QF 4', elo: 0 }, time: 'Sun 18:30', court: 'Center Court', isCompleted: false }
        ]
      },
      {
        roundNumber: 3,
        roundName: 'Grand Final',
        matches: [
          { id: 'm_fn1', pair1: { name: 'Finalist 1', elo: 0 }, pair2: { name: 'Finalist 2', elo: 0 }, time: 'Sun 20:30', court: 'Center Panoramic', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 'tourn_2',
    title: 'Friday Night Americano Sprint',
    clubName: 'Apex Padel Arena',
    clubId: 'club_2',
    date: 'This Friday',
    time: '19:00 - 22:30',
    format: 'americano',
    levelRange: 'All Levels (Dynamic Grouping)',
    entryFee: 180,
    entry_fee_minor: 18000,
    prizePool: '3,000 AED Cash + Pro Rackets',
    prize_pool_minor: 300000,
    currency_code: 'AED',
    maxPairs: 16,
    registeredCount: 14,
    status: 'upcoming',
    bannerUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    registeredPairs: [],
    rounds: []
  }
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    title: 'Padel Warrior',
    category: 'weekly',
    description: 'Play 3 matches in any format this week',
    current: 2,
    target: 3,
    unit: 'matches',
    xpReward: 350,
    badgeReward: '🎾 Match Master',
    expiresAt: '3 days left',
    completed: false
  },
  {
    id: 'ch_2',
    title: 'Ranked Precision',
    category: 'weekly',
    description: 'Win 2 ranked matches against players with 1500+ ELO',
    current: 1,
    target: 2,
    unit: 'wins',
    xpReward: 500,
    badgeReward: '🔥 Ranked Ace',
    expiresAt: '4 days left',
    completed: false
  },
  {
    id: 'ch_3',
    title: 'Club Explorer',
    category: 'season',
    description: 'Book and play a match at 3 distinct clubs in Dubai',
    current: 2,
    target: 3,
    unit: 'clubs',
    xpReward: 750,
    badgeReward: '🏛️ Explorer',
    expiresAt: '18 days left',
    completed: false
  },
  {
    id: 'ch_4',
    title: '4-Week Streak Keeper',
    category: 'season',
    description: 'Maintain an active playing streak for 4 consecutive weeks',
    current: 4,
    target: 4,
    unit: 'weeks',
    xpReward: 1000,
    badgeReward: '⚡ Streak Legend',
    expiresAt: 'Completed',
    completed: true
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    type: 'match_invite',
    title: 'Match Invite from Sofia Al-Mansoor',
    body: 'Sofia invited you to join "Ranked Doubles Night Clash" tonight at 19:30.',
    time: '12m ago',
    read: false,
    actionScreen: 'play_match_detail',
    actionId: 'match_1'
  },
  {
    id: 'notif_2',
    type: 'score_pending',
    title: 'Score Confirmed & ELO Updated!',
    body: 'Downtown Master League score confirmed. Your ELO increased by +18 to 1540.',
    time: '2h ago',
    read: false,
    actionScreen: 'profile'
  },
  {
    id: 'notif_3',
    type: 'booking_confirmed',
    title: 'Court Booking Confirmed',
    body: 'Your slot at The Padel Club Downtown is confirmed for tomorrow 18:00.',
    time: '5h ago',
    read: true,
    actionScreen: 'discover_club_detail',
    actionId: 'club_1'
  },
  {
    id: 'notif_4',
    type: 'achievement_unlocked',
    title: '🏆 Achievement Unlocked: Perfect Partner',
    body: 'You reached 10 verified sportsmanship reviews! +250 XP earned.',
    time: '1d ago',
    read: true,
    actionScreen: 'compete_achievements'
  }
];

export const MOCK_CHAT_THREADS: ChatThread[] = [
  {
    id: 'chat_match_1',
    type: 'match',
    title: 'Ranked Doubles Night Clash (Match Lobby)',
    subtitle: 'Lucas: Are we playing with new Head Pro balls?',
    avatar: '🎾',
    unreadCount: 2,
    lastMessageTime: '19:10',
    lastMessageText: 'Are we playing with new Head Pro balls?',
    messages: [
      { id: 'm1', chatId: 'chat_match_1', senderId: 'usr_2', senderName: 'Sofia', senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', text: 'Hey guys! Looking forward to tonight. Court 1 is reserved.', timestamp: '18:30' },
      { id: 'm2', chatId: 'chat_match_1', senderId: 'usr_3', senderName: 'Carlos', senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', text: 'Awesome, I am arriving 15 mins early to stretch.', timestamp: '18:45' },
      { id: 'm3', chatId: 'chat_match_1', senderId: 'usr_4', senderName: 'Lucas', senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', text: 'Are we playing with new Head Pro balls?', timestamp: '19:10' }
    ]
  },
  {
    id: 'chat_sofia',
    type: 'direct',
    title: 'Sofia Al-Mansoor',
    subtitle: 'Great rally yesterday! Next week again?',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    unreadCount: 0,
    lastMessageTime: 'Yesterday',
    lastMessageText: 'Great rally yesterday! Next week again?',
    messages: [
      { id: 's1', chatId: 'chat_sofia', senderId: 'usr_me', senderName: 'Alex Ruiz', senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', text: 'Hey Sofia, that bandeja down the middle in set 2 was unreal!', timestamp: 'Yesterday 22:00', isMe: true },
      { id: 's2', chatId: 'chat_sofia', senderId: 'usr_2', senderName: 'Sofia', senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', text: 'Haha thanks Alex! Great rally yesterday! Next week again?', timestamp: 'Yesterday 22:15' }
    ]
  },
  {
    id: 'chat_club_1',
    type: 'club',
    title: 'The Padel Club Downtown Community',
    subtitle: 'Club Manager: Friday evening Americano registrations are open!',
    avatar: '🏛️',
    unreadCount: 1,
    lastMessageTime: '3h ago',
    lastMessageText: 'Friday evening Americano registrations are open!',
    messages: [
      { id: 'c1', chatId: 'chat_club_1', senderId: 'mgr_1', senderName: 'Coach Diego', senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', text: 'New court glass replaced on Court 2 with ultra-clear panoramic safety tech!', timestamp: 'Yesterday' },
      { id: 'c2', chatId: 'chat_club_1', senderId: 'mgr_1', senderName: 'Club Manager', senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', text: 'Friday evening Americano registrations are open! First 16 spots.', timestamp: '3h ago' }
    ]
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk_1',
    clubId: 'club_1',
    clubName: 'The Padel Club Downtown',
    courtId: 'crt_1',
    courtName: 'Court 1 (Center Panoramic)',
    date: 'Tomorrow, Sep 18',
    timeSlot: '18:00 - 19:30 (90 min)',
    durationMinutes: 90,
    totalAmount: 240,
    total_amount_minor: 24000,
    currency_code: 'AED',
    operating_currency_code: 'AED',
    splitCount: 4,
    splitPerPerson: 60,
    split_per_person_minor: 6000,
    paidByPlayerIds: ['usr_me'],
    paymentStatus: 'paid',
    qrCode: 'RALLYO-BK-829104',
    createdAt: '2026-09-17T03:30:00Z'
  }
];
