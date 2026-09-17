import React from 'react';
import { useApp, ScreenId } from './context/AppContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { WebNavigation } from './components/layout/WebNavigation';
import { LOCALES, SupportedLanguage } from './i18n/locales';
import { CURRENCIES, CurrencyCode } from './currency/currencies';
import { Globe, Smartphone, Monitor } from 'lucide-react';

// 16 Core Responsive Gen-Z Web Pages
import { LandingPage } from './components/pages/LandingPage';
import { OnboardingPage } from './components/pages/OnboardingPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { PlayMatchmakingPage } from './components/pages/PlayMatchmakingPage';
import { DiscoverPage } from './components/pages/DiscoverPage';
import { ClubDetailPage } from './components/pages/ClubDetailPage';
import { CourtBookingPage } from './components/pages/CourtBookingPage';
import { MatchDetailPage } from './components/pages/MatchDetailPage';
import { RankingsPage } from './components/pages/RankingsPage';
import { ChallengesAchievementsPage } from './components/pages/ChallengesAchievementsPage';
import { TournamentsPage } from './components/pages/TournamentsPage';
import { ChatCommunityPage } from './components/pages/ChatCommunityPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { SettingsPage } from './components/pages/SettingsPage';
import { ClubDashboardPage } from './components/pages/ClubDashboardPage';
import { AdminDashboardPage } from './components/pages/AdminDashboardPage';

// Auth & Onboarding Flow
import { AuthModal } from './components/auth/AuthModal';
import { PlayerOnboardingPage } from './components/onboarding/PlayerOnboardingPage';
import { ClubOwnerOnboardingPage } from './components/onboarding/ClubOwnerOnboardingPage';

// Mobile Simulator Screens
import { SplashScreen } from './components/screens/onboarding/SplashScreen';
import { WelcomeScreen } from './components/screens/onboarding/WelcomeScreen';
import { AccountCreationScreen } from './components/screens/onboarding/AccountCreationScreen';
import { PlayerSetupScreen } from './components/screens/onboarding/PlayerSetupScreen';
import { SkillCalibrationScreen } from './components/screens/onboarding/SkillCalibrationScreen';
import { PreferencesSetupScreen } from './components/screens/onboarding/PreferencesSetupScreen';
import { HomeFeedScreen } from './components/screens/home/HomeFeedScreen';
import { MatchRecommendationCardDetailScreen } from './components/screens/home/MatchRecommendationCardDetailScreen';
import { NotificationsCenterScreen } from './components/screens/home/NotificationsCenterScreen';
import { PlayHubScreen } from './components/screens/play/PlayHubScreen';
import { CreateMatchScreen } from './components/screens/play/CreateMatchScreen';
import { FindMatchScreen } from './components/screens/play/FindMatchScreen';
import { MatchDetailScreen } from './components/screens/play/MatchDetailScreen';
import { AIMatchmakerScreen } from './components/screens/play/AIMatchmakerScreen';
import { MatchLobbyScreen } from './components/screens/play/MatchLobbyScreen';
import { ScoreSubmissionScreen } from './components/screens/play/ScoreSubmissionScreen';
import { DiscoverHubScreen } from './components/screens/discover/DiscoverHubScreen';
import { ClubListingScreen } from './components/screens/discover/ClubListingScreen';
import { ClubDetailScreen } from './components/screens/discover/ClubDetailScreen';
import { CourtBookingScreen } from './components/screens/discover/CourtBookingScreen';
import { PlayerDiscoveryScreen } from './components/screens/discover/PlayerDiscoveryScreen';
import { PlayerPublicProfileScreen } from './components/screens/discover/PlayerPublicProfileScreen';
import { CompeteHubScreen } from './components/screens/compete/CompeteHubScreen';
import { RankingsLeaderboardScreen } from './components/screens/compete/RankingsLeaderboardScreen';
import { ChallengesScreen } from './components/screens/compete/ChallengesScreen';
import { AchievementsScreen } from './components/screens/compete/AchievementsScreen';
import { TournamentListingScreen } from './components/screens/compete/TournamentListingScreen';
import { TournamentDetailScreen } from './components/screens/compete/TournamentDetailScreen';
import { OwnProfileScreen } from './components/screens/profile/OwnProfileScreen';
import { MessagesCommunityScreen } from './components/screens/profile/MessagesCommunityScreen';

// Legacy Portals
import { AdminDashboard } from './components/portals/AdminDashboard';
import { ClubManagerPortal } from './components/portals/ClubManagerPortal';

const SCREEN_DIRECTORY: { id: ScreenId; label: string; group: string }[] = [
  // 16 Core Web Pages
  { id: 'landing', label: '1. Landing / Home', group: 'Core Web' },
  { id: 'onboarding', label: '2. Onboarding DNA', group: 'Core Web' },
  { id: 'dashboard', label: '3. Dashboard Hub', group: 'Core Web' },
  { id: 'play', label: '4. Play / Matchmaking', group: 'Core Web' },
  { id: 'discover', label: '5. Discover Venues', group: 'Core Web' },
  { id: 'club_detail', label: '6. Club Detail', group: 'Core Web' },
  { id: 'court_booking', label: '7. Court Booking & Pass', group: 'Core Web' },
  { id: 'match_detail', label: '8. Match Detail & Roster', group: 'Core Web' },
  { id: 'rankings', label: '9. Rankings & ELO Podium', group: 'Core Web' },
  { id: 'challenges', label: '10. Challenges & Badges', group: 'Core Web' },
  { id: 'tournaments', label: '11. Tournaments & Brackets', group: 'Core Web' },
  { id: 'chat', label: '12. Chat & Community', group: 'Core Web' },
  { id: 'profile', label: '13. Player Profile & Wallet', group: 'Core Web' },
  { id: 'settings', label: '14. Localization & Currency', group: 'Core Web' },
  { id: 'club_dashboard', label: '15. Club Manager Hub', group: 'Core Web' },
  { id: 'admin_dashboard', label: '16. Admin GMV Dashboard', group: 'Core Web' },
  { id: 'player_onboarding', label: '17. Player Onboarding Flow', group: 'Auth & Onboarding' },
  { id: 'club_onboarding', label: '18. Club Owner Onboarding Flow', group: 'Auth & Onboarding' }
];

export const App: React.FC = () => {
  const {
    portalView,
    setPortalView,
    activeScreen,
    navigateTo,
    language,
    setLanguage,
    currentLocale,
    currency,
    setCurrency,
    viewMode,
    setViewMode,
    t
  } = useApp();

  // Render for the 16 Core Web Pages in Responsive Web Layout
  const renderWebPage = () => {
    switch (activeScreen) {
      case 'landing':
        return <LandingPage />;
      case 'onboarding':
      case 'splash':
      case 'welcome':
      case 'account_create':
      case 'player_setup':
      case 'skill_calibration':
      case 'preferences_setup':
        return <OnboardingPage />;
      case 'dashboard':
      case 'home':
      case 'match_recommendation':
      case 'notifications':
        return <DashboardPage />;
      case 'play':
      case 'play_hub':
      case 'create_match':
      case 'find_match':
      case 'ai_matchmaker':
        return <PlayMatchmakingPage />;
      case 'discover':
      case 'discover_hub':
      case 'club_listing':
      case 'player_discovery':
      case 'player_public_profile':
        return <DiscoverPage />;
      case 'club_detail':
        return <ClubDetailPage />;
      case 'court_booking':
        return <CourtBookingPage />;
      case 'match_detail':
      case 'match_lobby':
      case 'score_submission':
        return <MatchDetailPage />;
      case 'rankings':
      case 'rankings_leaderboard':
      case 'compete_hub':
        return <RankingsPage />;
      case 'challenges':
      case 'achievements':
        return <ChallengesAchievementsPage />;
      case 'tournaments':
      case 'tournament_listing':
      case 'tournament_detail':
        return <TournamentsPage />;
      case 'chat':
      case 'messages':
        return <ChatCommunityPage />;
      case 'profile':
      case 'own_profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'club_dashboard':
        return <ClubDashboardPage />;
      case 'admin_dashboard':
        return <AdminDashboardPage />;
      case 'player_onboarding':
        return <PlayerOnboardingPage />;
      case 'club_onboarding':
        return <ClubOwnerOnboardingPage />;
      default:
        return <DashboardPage />;
    }
  };

  // Render for Mobile Phone Simulator
  const renderSimulatorScreen = () => {
    switch (activeScreen) {
      case 'splash': return <SplashScreen />;
      case 'welcome': return <WelcomeScreen />;
      case 'account_create': return <AccountCreationScreen />;
      case 'player_setup': return <PlayerSetupScreen />;
      case 'skill_calibration': return <SkillCalibrationScreen />;
      case 'preferences_setup': return <PreferencesSetupScreen />;
      case 'home':
      case 'dashboard': return <HomeFeedScreen />;
      case 'match_recommendation': return <MatchRecommendationCardDetailScreen />;
      case 'notifications': return <NotificationsCenterScreen />;
      case 'play':
      case 'play_hub': return <PlayHubScreen />;
      case 'create_match': return <CreateMatchScreen />;
      case 'find_match': return <FindMatchScreen />;
      case 'match_detail': return <MatchDetailScreen />;
      case 'ai_matchmaker': return <AIMatchmakerScreen />;
      case 'match_lobby': return <MatchLobbyScreen />;
      case 'score_submission': return <ScoreSubmissionScreen />;
      case 'discover':
      case 'discover_hub': return <DiscoverHubScreen />;
      case 'club_listing': return <ClubListingScreen />;
      case 'club_detail': return <ClubDetailScreen />;
      case 'court_booking': return <CourtBookingScreen />;
      case 'player_discovery': return <PlayerDiscoveryScreen />;
      case 'player_public_profile': return <PlayerPublicProfileScreen />;
      case 'compete_hub':
      case 'rankings': return <CompeteHubScreen />;
      case 'rankings_leaderboard': return <RankingsLeaderboardScreen />;
      case 'challenges': return <ChallengesScreen />;
      case 'achievements': return <AchievementsScreen />;
      case 'tournament_listing':
      case 'tournaments': return <TournamentListingScreen />;
      case 'tournament_detail': return <TournamentDetailScreen />;
      case 'profile':
      case 'own_profile': return <OwnProfileScreen />;
      case 'chat':
      case 'messages': return <MessagesCommunityScreen />;
      default: return <HomeFeedScreen />;
    }
  };

  // If in Responsive Web Mode (Default):
  if (viewMode === 'responsive_web') {
    return (
      <>
        <WebNavigation>
          {renderWebPage()}
        </WebNavigation>
        <AuthModal />
      </>
    );
  }

  // Otherwise, render the Phone Simulator Wrapper:
  return (
    <div className="app-container" dir={currentLocale.isRTL ? 'rtl' : 'ltr'}>
      {/* Top Shell Platform Header */}
      <header className="platform-header">
        <div className="platform-brand" onClick={() => navigateTo('dashboard')}>
          <div className="brand-icon-wrap">
            <span style={{ fontWeight: 900, fontSize: '1.05rem', color: '#080B11' }}>R</span>
          </div>
          <div>
            <span className="brand-title">RALLYO</span>
          </div>
          <span className="brand-tagline-badge">
            {t.tagline}
          </span>
        </div>

        <div className="platform-controls">
          {/* View Mode Toggle Pill */}
          <div className="view-toggle-pill">
            <button
              className="view-toggle-btn"
              onClick={() => setViewMode('responsive_web')}
            >
              <Monitor size={14} /> Responsive Web
            </button>
            <button
              className="view-toggle-btn active"
              onClick={() => setViewMode('phone_simulator')}
            >
              <Smartphone size={14} /> Phone Simulator
            </button>
          </div>

          {/* Currency Dropdown */}
          <select
            className="screen-jump-select"
            style={{ maxWidth: 120 }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            aria-label="Select currency"
          >
            {Object.values(CURRENCIES).map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>

          {/* Language Selector */}
          <select
            className="screen-jump-select"
            style={{ maxWidth: 130 }}
            value={language}
            onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            aria-label="Select platform language"
          >
            {Object.values(LOCALES).map((loc) => (
              <option key={loc.code} value={loc.code}>
                {loc.flag} {loc.nativeName}
              </option>
            ))}
          </select>

          {/* Jump to Core Page */}
          <select
            className="screen-jump-select"
            value={activeScreen}
            onChange={(e) => navigateTo(e.target.value as ScreenId)}
            aria-label="Jump to page"
          >
            {SCREEN_DIRECTORY.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Simulator Device Frame */}
      <main className="stage-wrapper">
        <DeviceFrame>
          {renderSimulatorScreen()}
        </DeviceFrame>
      </main>

      <AuthModal />
    </div>
  );
};
export default App;
