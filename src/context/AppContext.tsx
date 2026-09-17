import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PlayerProfile, Club, Court, Match, Tournament, Challenge,
  AppNotification, ChatThread, Booking, UserRole, User, AuthProvider, ClubRate
} from '../types';
import {
  INITIAL_PLAYER, MOCK_OTHER_PLAYERS, MOCK_CLUBS, MOCK_COURTS,
  MOCK_MATCHES, MOCK_TOURNAMENTS, MOCK_CHALLENGES, MOCK_NOTIFICATIONS,
  MOCK_CHAT_THREADS, MOCK_BOOKINGS
} from '../data/mockData';
import { SupportedLanguage, LocaleConfig, LOCALES } from '../i18n/locales';
import { TRANSLATIONS, TranslationDictionary } from '../i18n/translations';
import { CurrencyCode, CURRENCIES, convertMinorAmount, formatMinorAmount } from '../currency/currencies';

export type ScreenId =
  // 16 Core Pages
  | 'landing'
  | 'onboarding'
  | 'player_onboarding'
  | 'club_onboarding'
  | 'login'
  | 'dashboard'
  | 'play'
  | 'discover'
  | 'club_detail'
  | 'court_booking'
  | 'match_detail'
  | 'rankings'
  | 'challenges'
  | 'tournaments'
  | 'chat'
  | 'profile'
  | 'settings'
  | 'club_dashboard'
  | 'admin_dashboard'
  // Existing Sub-screens
  | 'splash'
  | 'welcome'
  | 'account_create'
  | 'player_setup'
  | 'skill_calibration'
  | 'preferences_setup'
  | 'home'
  | 'match_recommendation'
  | 'notifications'
  | 'play_hub'
  | 'create_match'
  | 'find_match'
  | 'ai_matchmaker'
  | 'match_lobby'
  | 'score_submission'
  | 'discover_hub'
  | 'club_listing'
  | 'player_discovery'
  | 'player_public_profile'
  | 'compete_hub'
  | 'rankings_leaderboard'
  | 'achievements'
  | 'tournament_listing'
  | 'tournament_detail'
  | 'own_profile'
  | 'messages';

export type NavTab = 'home' | 'play' | 'discover' | 'compete' | 'chat' | 'profile';
export type PortalView = 'mobile' | 'web_admin' | 'web_club';

interface AppContextType {
  // Navigation & View
  portalView: PortalView;
  setPortalView: (view: PortalView) => void;
  activeScreen: ScreenId;
  activeTab: NavTab;
  navigateTo: (screen: ScreenId, params?: Record<string, any>) => void;
  goBack: () => void;
  navParams: Record<string, any>;
  switchTab: (tab: NavTab) => void;

  // View Mode: True Full Responsive Web vs Phone Simulator
  viewMode: 'responsive_web' | 'phone_simulator';
  setViewMode: (mode: 'responsive_web' | 'phone_simulator') => void;

  // Multilingual & Localization
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currentLocale: LocaleConfig;
  t: TranslationDictionary;

  // Multi-Currency Engine
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  formatMoney: (amountMinor: number, sourceCurrency?: CurrencyCode) => string;

  // Authentication & Roles
  currentUser: User | null;
  currentRole: 'player' | 'club_owner' | 'admin';
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalInitialRole: 'player' | 'club_owner';
  authModalInitialMode: 'login' | 'signup';
  openAuthModal: (role?: 'player' | 'club_owner', mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  login: (email: string, password?: string, role?: 'player' | 'club_owner', provider?: AuthProvider) => Promise<void>;
  loginWithGoogle: (role?: 'player' | 'club_owner', email?: string, name?: string) => Promise<void>;
  signup: (data: { email: string; full_name: string; role: 'player' | 'club_owner'; password?: string }) => Promise<void>;
  logout: () => void;
  switchRole: (role: 'player' | 'club_owner') => void;

  // Player & Auth Profile
  player: PlayerProfile;
  updatePlayer: (updates: Partial<PlayerProfile>) => void;
  updatePlayerPhoto: (photoUrl: string) => void;
  registerPlayerOnboarding: (data: Partial<PlayerProfile>) => void;
  otherPlayers: PlayerProfile[];
  selectedPlayerId: string | null;
  setSelectedPlayerId: (id: string | null) => void;

  // Matches
  matches: Match[];
  selectedMatchId: string | null;
  setSelectedMatchId: (id: string | null) => void;
  createMatch: (newMatch: Partial<Match>) => void;
  joinMatch: (matchId: string) => void;
  leaveMatch: (matchId: string) => void;
  submitScore: (matchId: string, teamASets: number[], teamBSets: number[]) => void;
  confirmScore: (matchId: string) => void;
  disputeScore: (matchId: string, reason: string) => void;

  // Clubs & Bookings
  clubs: Club[];
  courts: Court[];
  bookings: Booking[];
  selectedClubId: string | null;
  setSelectedClubId: (id: string | null) => void;
  bookCourt: (clubId: string, courtId: string, date: string, timeSlot: string, splitCount: number) => Booking;
  cancelBooking: (bookingId: string) => void;

  // Club Owner State
  myClub: Club | null;
  updateMyClub: (updates: Partial<Club>) => void;
  addClubCourt: (court: Partial<Court>) => void;
  registerClubOwnerOnboarding: (clubData: Partial<Club>) => void;

  // Tournaments
  tournaments: Tournament[];
  selectedTournamentId: string | null;
  setSelectedTournamentId: (id: string | null) => void;
  registerTournament: (tournamentId: string, partnerName: string) => void;

  // Challenges & Badges
  challenges: Challenge[];
  completeChallenge: (challengeId: string) => void;

  // Notifications & Chats
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  chatThreads: ChatThread[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  sendChatMessage: (chatId: string, text: string) => void;

  // Toast feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [portalView, setPortalView] = useState<PortalView>('mobile');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [history, setHistory] = useState<ScreenId[]>(['home']);
  const [navParams, setNavParams] = useState<Record<string, any>>({});

  // Authentication & Role State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rallyo_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'usr_me',
      full_name: 'Alex Ruiz',
      email: 'alex.ruiz@rallyo.app',
      auth_provider: 'email',
      role: 'player',
      phone: '+971 50 284 9192',
      locale: 'en',
      preferred_currency: 'AED',
      created_at: '2026-08-01T10:00:00Z',
      updated_at: '2026-09-17T12:00:00Z'
    };
  });

  const [currentRole, setCurrentRole] = useState<'player' | 'club_owner' | 'admin'>(() => {
    const saved = localStorage.getItem('rallyo_role') as 'player' | 'club_owner' | 'admin';
    return saved || currentUser?.role || 'player';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<'player' | 'club_owner'>('player');
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'login' | 'signup'>('login');

  // Core Data
  const [player, setPlayer] = useState<PlayerProfile>(() => {
    const saved = localStorage.getItem('rallyo_player');
    return saved ? JSON.parse(saved) : INITIAL_PLAYER;
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem('rallyo_matches');
    return saved ? JSON.parse(saved) : MOCK_MATCHES;
  });

  const [clubs, setClubs] = useState<Club[]>(() => {
    const saved = localStorage.getItem('rallyo_clubs');
    return saved ? JSON.parse(saved) : MOCK_CLUBS;
  });

  const [courts, setCourts] = useState<Court[]>(() => {
    const saved = localStorage.getItem('rallyo_courts');
    return saved ? JSON.parse(saved) : MOCK_COURTS;
  });

  const [myClub, setMyClub] = useState<Club | null>(() => {
    const saved = localStorage.getItem('rallyo_my_club');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return clubs[0] || null;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('rallyo_bookings');
    return saved ? JSON.parse(saved) : MOCK_BOOKINGS;
  });

  const [tournaments, setTournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS);
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(MOCK_CHAT_THREADS);

  // Selected Entities
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>('match_1');
  const [selectedClubId, setSelectedClubId] = useState<string | null>('club_1');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>('tourn_1');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>('usr_2');
  const [activeChatId, setActiveChatId] = useState<string | null>('chat_match_1');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // View Mode: True Full Responsive Web vs Phone Simulator
  const [viewMode, setViewMode] = useState<'responsive_web' | 'phone_simulator'>(() => {
    const saved = localStorage.getItem('rallyo_view_mode') as 'responsive_web' | 'phone_simulator';
    return saved || 'responsive_web';
  });

  const handleSetViewMode = (mode: 'responsive_web' | 'phone_simulator') => {
    setViewMode(mode);
    localStorage.setItem('rallyo_view_mode', mode);
  };

  // Currency State (Minor units engine)
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('rallyo_currency') as CurrencyCode;
    return (saved && CURRENCIES[saved]) ? saved : 'AED';
  });

  const setCurrency = (newCurrency: CurrencyCode) => {
    if (CURRENCIES[newCurrency]) {
      setCurrencyState(newCurrency);
      localStorage.setItem('rallyo_currency', newCurrency);
      showToast(`Currency set to ${CURRENCIES[newCurrency].flag} ${newCurrency}`);
    }
  };

  // Localization State
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('rallyo_language') as SupportedLanguage;
    return (saved && LOCALES[saved]) ? saved : 'en';
  });

  const currentLocale = LOCALES[language] || LOCALES.en;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const setLanguage = (lang: SupportedLanguage) => {
    if (LOCALES[lang]) {
      setLanguageState(lang);
      localStorage.setItem('rallyo_language', lang);
      document.documentElement.dir = LOCALES[lang].isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      showToast(`Language updated: ${LOCALES[lang].nativeName}`);
    }
  };

  // Auth Modal Controls
  const openAuthModal = (role: 'player' | 'club_owner' = 'player', mode: 'login' | 'signup' = 'login') => {
    setAuthModalInitialRole(role);
    setAuthModalInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Auth Operations
  const login = async (
    email: string,
    password?: string,
    role: 'player' | 'club_owner' = 'player',
    provider: AuthProvider = 'email'
  ) => {
    const user: User = {
      id: `usr_${Date.now()}`,
      full_name: role === 'club_owner' ? 'Marcus Vance (Club Owner)' : (email.split('@')[0] || 'Alex Ruiz'),
      email,
      auth_provider: provider,
      role,
      locale: language,
      preferred_currency: currency,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setCurrentUser(user);
    setCurrentRole(role);
    localStorage.setItem('rallyo_user', JSON.stringify(user));
    localStorage.setItem('rallyo_role', role);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${user.full_name}! Signed in as ${role === 'club_owner' ? 'Club Owner' : 'Player'}.`);

    if (role === 'club_owner') {
      navigateTo('club_dashboard');
    } else {
      navigateTo('dashboard');
    }
  };

  const loginWithGoogle = async (
    role: 'player' | 'club_owner' = 'player',
    customEmail?: string,
    customName?: string
  ) => {
    const googleEmail = customEmail || (role === 'club_owner' ? 'marcus.vance@rallyo.club' : 'alex.rivera@gmail.com');
    const user: User = {
      id: `usr_${Date.now()}`,
      full_name: customName || (role === 'club_owner' ? 'Carlos Mendoza (Club Owner)' : 'Alex Rivera'),
      email: googleEmail,
      auth_provider: 'google',
      role,
      locale: language,
      preferred_currency: currency,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setCurrentUser(user);
    setCurrentRole(role);
    localStorage.setItem('rallyo_user', JSON.stringify(user));
    localStorage.setItem('rallyo_role', role);
    setIsAuthModalOpen(false);
    showToast(`Google Sign-In successful as ${user.full_name}!`);

    if (role === 'club_owner') {
      if (!myClub) navigateTo('club_onboarding');
      else navigateTo('club_dashboard');
    } else {
      navigateTo('dashboard');
    }
  };

  const signup = async (data: { email: string; full_name: string; role: 'player' | 'club_owner'; password?: string }) => {
    const user: User = {
      id: `usr_${Date.now()}`,
      full_name: data.full_name,
      email: data.email,
      auth_provider: 'email',
      role: data.role,
      locale: language,
      preferred_currency: currency,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setCurrentUser(user);
    setCurrentRole(data.role);
    localStorage.setItem('rallyo_user', JSON.stringify(user));
    localStorage.setItem('rallyo_role', data.role);
    setIsAuthModalOpen(false);
    showToast(`Account created for ${data.full_name}! Let's calibrate your profile.`);

    if (data.role === 'club_owner') {
      navigateTo('club_onboarding');
    } else {
      navigateTo('player_onboarding');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('rallyo_user');
    showToast('Logged out of RALLYO.');
    navigateTo('landing');
  };

  const switchRole = (newRole: 'player' | 'club_owner') => {
    setCurrentRole(newRole);
    localStorage.setItem('rallyo_role', newRole);
    if (currentUser) {
      const updated = { ...currentUser, role: newRole };
      setCurrentUser(updated);
      localStorage.setItem('rallyo_user', JSON.stringify(updated));
    }
    showToast(`Switched active view to ${newRole === 'club_owner' ? '🏛️ Club Owner' : '🎾 Player'}`);
    if (newRole === 'club_owner') {
      if (!myClub) {
        navigateTo('club_onboarding');
      } else {
        navigateTo('club_dashboard');
      }
    } else {
      navigateTo('dashboard');
    }
  };

  const updatePlayerPhoto = (photoUrl: string) => {
    setPlayer(prev => ({ ...prev, avatar: photoUrl }));
    showToast('📸 Profile photo updated!');
  };

  const registerPlayerOnboarding = (data: Partial<PlayerProfile>) => {
    setPlayer(prev => ({ ...prev, ...data }));
    setCurrentRole('player');
    localStorage.setItem('rallyo_role', 'player');
    localStorage.setItem('rallyo_player', JSON.stringify({ ...player, ...data }));
    showToast('🎉 Player Calibration Complete! Welcome to your Dashboard.');
    navigateTo('dashboard');
  };

  const registerClubOwnerOnboarding = (clubData: Partial<Club>) => {
    const newId = `club_${Date.now()}`;
    const newClub: Club = {
      id: newId,
      owner_user_id: currentUser?.id || 'usr_owner_1',
      name: clubData.name || 'My Padel Club',
      tagline: clubData.tagline || 'Championship padel destination',
      location: clubData.location || clubData.city || 'Dubai',
      address: clubData.address || 'Street 1, Dubai',
      city: clubData.city || 'Dubai',
      country: clubData.country || 'United Arab Emirates',
      distance: '0.8 km away',
      rating: 5.0,
      reviewCount: 1,
      imageUrl: clubData.cover_photo_url || clubData.imageUrl || 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80',
      club_logo_url: clubData.club_logo_url,
      cover_photo_url: clubData.cover_photo_url,
      gallery_image_urls: clubData.gallery_image_urls || [],
      courtsCount: clubData.courtsCount || 4,
      availableCourts: clubData.courtsCount || 4,
      indoor: clubData.indoor || false,
      pricePerHour: clubData.pricePerHour || 220,
      price_per_hour_minor: clubData.price_per_hour_minor || 22000,
      rates_standard_minor: clubData.rates_standard_minor || 22000,
      rates_peak_minor: clubData.rates_peak_minor || 26000,
      rates_off_peak_minor: clubData.rates_off_peak_minor || 18000,
      rates_weekend_minor: clubData.rates_weekend_minor || 28000,
      operating_currency: clubData.operating_currency || currency || 'AED',
      amenities: clubData.facilities || clubData.amenities || ['Panoramic Glass', 'Mondo Supercourt'],
      facilities: clubData.facilities || ['Panoramic Glass', 'Mondo Supercourt'],
      description: clubData.description || 'Modern padel club with state-of-the-art courts.',
      operatingHours: clubData.operatingHours || '07:00 AM - Midnight',
      opening_hours: clubData.operatingHours || '07:00 AM - Midnight',
      contact_phone: clubData.contact_phone || '+971 50 123 4567',
      contact_email: clubData.contact_email || currentUser?.email || 'club@rallyo.app',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setClubs(prev => [newClub, ...prev]);
    setMyClub(newClub);
    setCurrentRole('club_owner');
    localStorage.setItem('rallyo_role', 'club_owner');
    localStorage.setItem('rallyo_my_club', JSON.stringify(newClub));
    localStorage.setItem('rallyo_clubs', JSON.stringify([newClub, ...clubs]));

    // Also create courts for this club
    const createdCourts: Court[] = Array.from({ length: newClub.courtsCount }).map((_, i) => ({
      id: `crt_${newId}_${i + 1}`,
      clubId: newId,
      clubName: newClub.name,
      name: `Court ${i + 1} (${i === 0 ? 'Center Panoramic' : 'Standard Pro'})`,
      type: i === 0 ? 'panoramic_glass' : 'standard_glass',
      surface: 'mondo_supercourt',
      indoor: newClub.indoor,
      hourlyRate: newClub.pricePerHour,
      hourly_rate_minor: newClub.price_per_hour_minor,
      currency_code: newClub.operating_currency
    }));
    setCourts(prev => [...createdCourts, ...prev]);

    showToast(`🏛️ ${newClub.name} successfully registered! Welcome to your Club Dashboard.`);
    navigateTo('club_dashboard');
  };

  const updateMyClub = (updates: Partial<Club>) => {
    if (!myClub) return;
    const updated = { ...myClub, ...updates };
    setMyClub(updated);
    setClubs(prev => prev.map(c => c.id === updated.id ? updated : c));
    localStorage.setItem('rallyo_my_club', JSON.stringify(updated));
    showToast('Club details updated successfully!');
  };

  const addClubCourt = (courtData: Partial<Court>) => {
    if (!myClub) return;
    const newCourt: Court = {
      id: `crt_${myClub.id}_${Date.now()}`,
      clubId: myClub.id,
      clubName: myClub.name,
      name: courtData.name || `Court ${courts.filter(c => c.clubId === myClub.id).length + 1}`,
      type: courtData.type || 'panoramic_glass',
      surface: courtData.surface || 'mondo_supercourt',
      indoor: courtData.indoor || false,
      hourlyRate: courtData.hourlyRate || myClub.pricePerHour,
      hourly_rate_minor: courtData.hourly_rate_minor || myClub.price_per_hour_minor,
      currency_code: myClub.operating_currency
    };
    setCourts(prev => [newCourt, ...prev]);
    updateMyClub({ courtsCount: (myClub.courtsCount || 0) + 1, availableCourts: (myClub.availableCourts || 0) + 1 });
    showToast(`🎾 ${newCourt.name} added to ${myClub.name}!`);
  };

  useEffect(() => {
    document.documentElement.dir = currentLocale.isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, currentLocale]);

  /**
   * Formats an integer minor amount from source currency into user's preferred currency
   */
  const formatMoney = (amountMinor: number, sourceCurrency: CurrencyCode = 'AED'): string => {
    const convertedMinor = convertMinorAmount(amountMinor, sourceCurrency, currency);
    return formatMinorAmount(convertedMinor, currency, language);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('rallyo_player', JSON.stringify(player));
  }, [player]);

  useEffect(() => {
    localStorage.setItem('rallyo_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('rallyo_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Navigation Helpers
  const navigateTo = (screen: ScreenId, params: Record<string, any> = {}) => {
    setNavParams(params);
    setHistory(prev => [...prev, screen]);
    setActiveScreen(screen);

    // Sync tab when navigating to top level screen
    if (['landing', 'home', 'dashboard', 'match_recommendation', 'notifications'].includes(screen)) setActiveTab('home');
    else if (['play', 'play_hub', 'create_match', 'find_match', 'match_detail', 'ai_matchmaker', 'match_lobby', 'score_submission'].includes(screen)) setActiveTab('play');
    else if (['discover', 'discover_hub', 'club_listing', 'club_detail', 'court_booking', 'player_discovery', 'player_public_profile', 'club_dashboard', 'club_onboarding'].includes(screen)) setActiveTab('discover');
    else if (['compete', 'compete_hub', 'rankings', 'rankings_leaderboard', 'challenges', 'achievements', 'tournaments', 'tournament_listing', 'tournament_detail', 'admin_dashboard'].includes(screen)) setActiveTab('compete');
    else if (['chat', 'messages'].includes(screen)) setActiveTab('chat');
    else if (['profile', 'own_profile', 'settings', 'onboarding', 'player_onboarding', 'login'].includes(screen)) setActiveTab('profile');
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHist = [...history];
      newHist.pop();
      const prevScreen = newHist[newHist.length - 1];
      setHistory(newHist);
      setActiveScreen(prevScreen);
    } else {
      setActiveScreen('dashboard');
      setActiveTab('home');
    }
  };

  const switchTab = (tab: NavTab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setActiveScreen(viewMode === 'responsive_web' ? 'dashboard' : 'home');
        break;
      case 'play':
        setActiveScreen(viewMode === 'responsive_web' ? 'play' : 'play_hub');
        break;
      case 'discover':
        setActiveScreen(viewMode === 'responsive_web' ? 'discover' : 'discover_hub');
        break;
      case 'compete':
        setActiveScreen(viewMode === 'responsive_web' ? 'rankings' : 'compete_hub');
        break;
      case 'chat':
        setActiveScreen(viewMode === 'responsive_web' ? 'chat' : 'messages');
        break;
      case 'profile':
        setActiveScreen(viewMode === 'responsive_web' ? 'profile' : 'own_profile');
        break;
    }
  };

  const updatePlayer = (updates: Partial<PlayerProfile>) => {
    setPlayer(prev => ({ ...prev, ...updates }));
    showToast('Profile updated successfully!');
  };

  const createMatch = (newMatch: Partial<Match>) => {
    const id = `match_${Date.now()}`;
    const created: Match = {
      id,
      title: newMatch.title || 'Casual Doubles Match',
      clubId: newMatch.clubId || 'club_1',
      clubName: newMatch.clubName || 'The Padel Club Downtown',
      courtName: newMatch.courtName || 'Court 1',
      date: newMatch.date || 'Today',
      time: newMatch.time || '20:00 - 21:30',
      format: newMatch.format || 'doubles',
      matchType: newMatch.matchType || 'ranked',
      visibility: newMatch.visibility || 'public',
      skillRange: newMatch.skillRange || { min: 4.5, max: 5.5 },
      totalFee: newMatch.totalFee || 240,
      total_fee_minor: newMatch.total_fee_minor || 24000,
      feePerPlayer: newMatch.feePerPlayer || 60,
      fee_per_player_minor: newMatch.fee_per_player_minor || 6000,
      currency_code: newMatch.currency_code || currency,
      hostPlayerId: player.id,
      status: 'open',
      players: [
        {
          id: player.id,
          name: `${player.name} (Host)`,
          avatar: player.avatar,
          elo: player.eloRating,
          skillLevel: player.skillLevel,
          team: 'A',
          paid: true,
          confirmed: true
        }
      ],
      waitlist: [],
      aiCompatibilityScore: 95,
      aiExplanation: '🎯 95% Match: Hosted by you at your home club with your target skill range.'
    };

    setMatches(prev => [created, ...prev]);
    setSelectedMatchId(id);
    showToast('🎾 Match created! Ready for players to join.');
    navigateTo('match_lobby', { matchId: id });
  };

  const joinMatch = (matchId: string) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId) {
          const alreadyIn = m.players.some(p => p.id === player.id);
          if (alreadyIn) return m;
          const maxPlayers = m.format === 'singles' ? 2 : 4;
          if (m.players.length >= maxPlayers) {
            showToast('Match is full! Added to waitlist.');
            return { ...m, waitlist: [...m.waitlist, player.id] };
          }
          const team = m.players.filter(p => p.team === 'A').length < 2 ? 'A' : 'B';
          const updatedPlayers = [
            ...m.players,
            {
              id: player.id,
              name: `${player.name} (You)`,
              avatar: player.avatar,
              elo: player.eloRating,
              skillLevel: player.skillLevel,
              team: team as 'A' | 'B',
              paid: true,
              confirmed: true
            }
          ];
          const isFull = updatedPlayers.length >= maxPlayers;
          return {
            ...m,
            players: updatedPlayers,
            status: isFull ? 'full' : 'open'
          };
        }
        return m;
      })
    );
    showToast('✅ Joined match successfully!');
    setSelectedMatchId(matchId);
    navigateTo('match_lobby', { matchId });
  };

  const leaveMatch = (matchId: string) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId) {
          return {
            ...m,
            players: m.players.filter(p => p.id !== player.id),
            status: 'open'
          };
        }
        return m;
      })
    );
    showToast('Left match.');
    navigateTo('play_hub');
  };

  const submitScore = (matchId: string, teamASets: number[], teamBSets: number[]) => {
    const winner = (teamASets.filter((s, i) => s > teamBSets[i]).length >= 2) ? 'A' : 'B';
    const isTeamAWinner = winner === 'A';
    const deltaA = isTeamAWinner ? 22 : -18;
    const deltaB = isTeamAWinner ? -18 : 22;

    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId) {
          return {
            ...m,
            status: 'completed',
            score: {
              teamASets,
              teamBSets,
              winner,
              submittedBy: player.id,
              confirmedBy: [player.id],
              isDisputed: false,
              eloDeltaTeamA: deltaA,
              eloDeltaTeamB: deltaB,
              timestamp: new Date().toISOString()
            }
          };
        }
        return m;
      })
    );

    // Update player ELO if participant
    const targetMatch = matches.find(m => m.id === matchId);
    const myPlayer = targetMatch?.players.find(p => p.id === player.id);
    if (myPlayer) {
      const myDelta = myPlayer.team === 'A' ? deltaA : deltaB;
      const isWin = (myPlayer.team === winner);
      setPlayer(p => ({
        ...p,
        eloRating: p.eloRating + myDelta,
        wins: isWin ? p.wins + 1 : p.wins,
        losses: !isWin ? p.losses + 1 : p.losses,
        matchHistoryCount: p.matchHistoryCount + 1,
        xp: p.xp + 150
      }));
    }

    showToast(`🏆 Score submitted! ELO updated by ${isTeamAWinner ? '+22' : '-18'}`);
    navigateTo('own_profile');
  };

  const confirmScore = (matchId: string) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId && m.score) {
          return {
            ...m,
            score: {
              ...m.score,
              confirmedBy: Array.from(new Set([...m.score.confirmedBy, player.id]))
            }
          };
        }
        return m;
      })
    );
    showToast('✅ Score confirmed by both teams!');
  };

  const disputeScore = (matchId: string, reason: string) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId) {
          return {
            ...m,
            dispute: {
              reason,
              submittedBy: player.id,
              status: 'open',
              timestamp: new Date().toISOString()
            }
          };
        }
        return m;
      })
    );
    showToast('⚠️ Score dispute submitted to RALLYO Admin for review.');
  };

  const bookCourt = (clubId: string, courtId: string, date: string, timeSlot: string, splitCount: number): Booking => {
    const club = clubs.find(c => c.id === clubId);
    const court = courts.find(c => c.id === courtId);
    const operatingCurrency = club?.operating_currency || 'AED';
    const totalMinor = court?.hourly_rate_minor || ((court?.hourlyRate || 220) * 100);
    const splitMinor = Math.round(totalMinor / splitCount);

    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      clubId,
      clubName: club?.name || 'The Padel Club Downtown',
      courtId,
      courtName: court?.name || 'Court 1',
      date,
      timeSlot,
      durationMinutes: 90,
      totalAmount: totalMinor / 100,
      total_amount_minor: totalMinor,
      currency_code: currency,
      operating_currency_code: operatingCurrency,
      splitCount,
      splitPerPerson: splitMinor / 100,
      split_per_person_minor: splitMinor,
      paidByPlayerIds: [player.id],
      paymentStatus: 'paid',
      qrCode: `RALLYO-BK-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    showToast('🎾 Court booked successfully! Booking pass generated.');
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showToast('Booking cancelled and refunded.');
  };

  const registerTournament = (tournamentId: string, partnerName: string) => {
    setTournaments(prev =>
      prev.map(t => {
        if (t.id === tournamentId) {
          return {
            ...t,
            registeredCount: t.registeredCount + 1,
            registeredPairs: [
              ...t.registeredPairs,
              {
                id: `pair_${Date.now()}`,
                player1: player.name,
                player2: partnerName || 'Lucas Fernandez',
                seed: t.registeredPairs.length + 1
              }
            ]
          };
        }
        return t;
      })
    );
    showToast(`🏆 Registered for ${tournaments.find(t => t.id === tournamentId)?.title}!`);
  };

  const completeChallenge = (challengeId: string) => {
    setChallenges(prev =>
      prev.map(c => {
        if (c.id === challengeId) {
          return { ...c, current: c.target, completed: true };
        }
        return c;
      })
    );
    setPlayer(p => ({ ...p, xp: p.xp + 500 }));
    showToast('🎉 Challenge completed! +500 XP rewarded.');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const sendChatMessage = (chatId: string, text: string) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      chatId,
      senderId: player.id,
      senderName: player.name,
      senderAvatar: player.avatar,
      text,
      timestamp: 'Just now',
      isMe: true
    };

    setChatThreads(prev =>
      prev.map(thread => {
        if (thread.id === chatId) {
          return {
            ...thread,
            lastMessageTime: 'Just now',
            lastMessageText: text,
            messages: [...thread.messages, newMsg]
          };
        }
        return thread;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        portalView,
        setPortalView,
        activeScreen,
        activeTab,
        navigateTo,
        goBack,
        navParams,
        switchTab,

        viewMode,
        setViewMode: handleSetViewMode,

        language,
        setLanguage,
        currentLocale,
        t,

        currency,
        setCurrency,
        formatMoney,

        player,
        updatePlayer,
        otherPlayers: MOCK_OTHER_PLAYERS,
        selectedPlayerId,
        setSelectedPlayerId,

        matches,
        selectedMatchId,
        setSelectedMatchId,
        createMatch,
        joinMatch,
        leaveMatch,
        submitScore,
        confirmScore,
        disputeScore,

        clubs,
        courts,
        bookings,
        selectedClubId,
        setSelectedClubId,
        bookCourt,
        cancelBooking,

        tournaments,
        selectedTournamentId,
        setSelectedTournamentId,
        registerTournament,

        challenges,
        completeChallenge,

        notifications,
        markNotificationRead,

        chatThreads,
        activeChatId,
        setActiveChatId,
        sendChatMessage,

        toastMessage,
        showToast,

        // Auth & Roles
        currentUser,
        currentRole,
        isAuthenticated: !!currentUser,
        isAuthModalOpen,
        authModalInitialRole,
        authModalInitialMode,
        openAuthModal,
        closeAuthModal,
        login,
        loginWithGoogle,
        signup,
        logout,
        switchRole,
        myClub,
        updateMyClub,
        addClubCourt,
        registerClubOwnerOnboarding,
        registerPlayerOnboarding,
        updatePlayerPhoto
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
