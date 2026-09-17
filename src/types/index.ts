import { CurrencyCode } from '../currency/currencies';
export type { CurrencyCode };

export type UserRole = 'player' | 'club_owner' | 'club_manager' | 'tournament_organizer' | 'coach' | 'admin';
export type AuthProvider = 'email' | 'google';

export type DominantHand = 'Right' | 'Left';
export type PlayingStyle = 'Attacking' | 'Defensive' | 'All-Court' | 'Tactical';
export type Competitiveness = 'Casual' | 'Balanced' | 'Competitive' | 'Ultra';

export interface User {
  id: string;
  full_name: string;
  email: string;
  auth_provider: AuthProvider;
  role: 'player' | 'club_owner' | 'admin';
  phone?: string;
  locale: string;
  preferred_currency: CurrencyCode;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface PlayerProfile {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  city: string;
  country?: string;
  preferred_area?: string;
  ageRange: string;
  dominantHand: DominantHand;
  gender?: string;
  skillLevel: number; // 1.0 to 7.0
  eloRating: number;
  matchHistoryCount: number;
  wins: number;
  losses: number;
  winRate: number;
  playingStyle: PlayingStyle;
  competitiveness: Competitiveness;
  preferred_match_type?: 'doubles' | 'singles' | 'both';
  availability?: string[];
  preferredClubs: string[];
  badges: Badge[];
  role: UserRole;
  walletBalance: number;
  wallet_balance_minor: number;
  preferred_currency: CurrencyCode;
  activityStreakWeeks: number;
  xp: number;
  created_at?: string;
  updated_at?: string;
}

export interface ClubRate {
  id: string;
  club_id: string;
  court_id?: string;
  rate_type: 'standard' | 'peak' | 'off_peak' | 'weekend';
  amount_minor: number;
  currency_code: CurrencyCode;
  day_of_week?: string;
  start_time?: string;
  end_time?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Club {
  id: string;
  owner_user_id?: string;
  name: string;
  tagline: string;
  location: string;
  address: string;
  city?: string;
  country?: string;
  distance: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  club_logo_url?: string;
  cover_photo_url?: string;
  gallery_image_urls?: string[];
  courtsCount: number;
  availableCourts: number;
  indoor: boolean;
  pricePerHour: number;
  price_per_hour_minor: number;
  rates_standard_minor?: number;
  rates_peak_minor?: number;
  rates_off_peak_minor?: number;
  rates_weekend_minor?: number;
  rates?: ClubRate[];
  operating_currency: CurrencyCode;
  amenities: string[];
  facilities?: string[];
  description: string;
  operatingHours: string;
  opening_hours?: string;
  contact_phone?: string;
  contact_email?: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Court {
  id: string;
  clubId: string;
  clubName: string;
  name: string;
  type: 'panoramic_glass' | 'standard_glass' | 'outdoor_scenic';
  surface: 'mondo_supercourt' | 'turf_pro' | 'textured';
  indoor: boolean;
  hourlyRate: number;
  hourly_rate_minor: number;
  currency_code: CurrencyCode;
}

export interface CourtSlot {
  id: string;
  courtId: string;
  startTime: string;
  endTime: string;
  price: number;
  price_minor?: number;
  currency_code?: CurrencyCode;
  isBooked: boolean;
  bookedBy?: string;
}

export interface Booking {
  id: string;
  clubId: string;
  clubName: string;
  courtId: string;
  courtName: string;
  date: string;
  timeSlot: string;
  durationMinutes: number;
  totalAmount: number;
  total_amount_minor: number;
  currency_code: CurrencyCode;
  operating_currency_code: CurrencyCode;
  splitCount: number;
  splitPerPerson: number;
  split_per_person_minor: number;
  paidByPlayerIds: string[];
  paymentStatus: 'paid' | 'pending' | 'cancelled';
  qrCode: string;
  createdAt: string;
}

export interface MatchPlayer {
  id: string;
  name: string;
  avatar: string;
  elo: number;
  skillLevel: number;
  team: 'A' | 'B';
  paid: boolean;
  confirmed: boolean;
}

export interface MatchScore {
  teamASets: number[];
  teamBSets: number[];
  winner: 'A' | 'B';
  submittedBy: string;
  confirmedBy: string[];
  isDisputed: boolean;
  eloDeltaTeamA: number;
  eloDeltaTeamB: number;
  timestamp: string;
}

export interface MatchDispute {
  reason: string;
  submittedBy: string;
  status: 'open' | 'resolved';
  resolutionNotes?: string;
  timestamp: string;
}

export interface Match {
  id: string;
  title: string;
  clubId: string;
  clubName: string;
  courtName: string;
  date: string;
  time: string;
  format: 'doubles' | 'singles';
  matchType: 'casual' | 'ranked';
  visibility: 'public' | 'private' | 'approval';
  skillRange: { min: number; max: number };
  totalFee: number;
  total_fee_minor: number;
  feePerPlayer: number;
  fee_per_player_minor: number;
  currency_code: CurrencyCode;
  hostPlayerId: string;
  status: 'open' | 'full' | 'in_progress' | 'completed' | 'cancelled';
  players: MatchPlayer[];
  waitlist: string[];
  score?: MatchScore;
  dispute?: MatchDispute;
  aiCompatibilityScore?: number;
  aiExplanation?: string;
}

export interface TournamentMatch {
  id: string;
  pair1: { name: string; seed?: number; elo: number };
  pair2: { name: string; seed?: number; elo: number };
  score?: string;
  winnerPairId?: 1 | 2;
  time: string;
  court: string;
  isCompleted: boolean;
}

export interface TournamentRound {
  roundNumber: number;
  roundName: string;
  matches: TournamentMatch[];
}

export interface Tournament {
  id: string;
  title: string;
  clubName: string;
  clubId: string;
  date: string;
  time: string;
  format: 'knockout' | 'americano' | 'round_robin';
  levelRange: string;
  entryFee: number;
  entry_fee_minor: number;
  prizePool: string;
  prize_pool_minor: number;
  currency_code: CurrencyCode;
  maxPairs: number;
  registeredCount: number;
  registeredPairs: { id: string; player1: string; player2: string; seed: number }[];
  status: 'upcoming' | 'live' | 'finished';
  bannerUrl: string;
  rounds: TournamentRound[];
}

export interface Challenge {
  id: string;
  title: string;
  category: 'weekly' | 'season' | 'club';
  description: string;
  current: number;
  target: number;
  unit: string;
  xpReward: number;
  badgeReward?: string;
  expiresAt: string;
  completed: boolean;
}

export interface AppNotification {
  id: string;
  type: 'match_invite' | 'join_request' | 'match_confirmed' | 'booking_confirmed' | 'score_pending' | 'achievement_unlocked' | 'tournament_alert';
  title: string;
  body: string;
  time: string;
  read: boolean;
  actionScreen?: string;
  actionId?: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMe?: boolean;
}

export interface ChatThread {
  id: string;
  type: 'direct' | 'match' | 'club';
  title: string;
  subtitle: string;
  avatar: string;
  unreadCount: number;
  lastMessageTime: string;
  lastMessageText: string;
  messages: ChatMessage[];
}
