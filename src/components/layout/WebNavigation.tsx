import React, { useState } from 'react';
import { useApp, ScreenId, NavTab } from '../../context/AppContext';
import { LOCALES, SupportedLanguage } from '../../i18n/locales';
import { CURRENCIES, CurrencyCode } from '../../currency/currencies';
import {
  Home, Swords, Compass, Trophy, MessageSquare, User,
  Settings, Building2, ShieldCheck, Search, Bell,
  Smartphone, Monitor, Flame, Sparkles, LogIn, LogOut, ArrowRightLeft, ShieldAlert
} from 'lucide-react';

export const WebNavigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activeScreen,
    navigateTo,
    activeTab,
    switchTab,
    player,
    currency,
    setCurrency,
    language,
    setLanguage,
    currentLocale,
    t,
    viewMode,
    setViewMode,
    notifications,
    currentUser,
    currentRole,
    isAuthenticated,
    openAuthModal,
    logout,
    switchRole,
    myClub
  } = useApp();

  const [showRoleGuardModal, setShowRoleGuardModal] = useState(false);
  const [roleGuardMessage, setRoleGuardMessage] = useState<{ title: string; desc: string; target: 'club_onboarding' | 'player_onboarding' }>({
    title: 'Club Owner Access Required',
    desc: 'You are currently browsing with a Player profile. To access court management, rates, and turnover analytics, register your club or switch to your Club Owner account.',
    target: 'club_onboarding'
  });

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const isCurrentScreen = (screen: ScreenId) => activeScreen === screen;

  const handleClubDashboardClick = () => {
    if (currentRole === 'player' && !myClub) {
      setRoleGuardMessage({
        title: 'Club Owner Access Required',
        desc: 'You are currently browsing with a Player profile. To access venue management, court rates, and turnover analytics, register your club venue with RALLYO.',
        target: 'club_onboarding'
      });
      setShowRoleGuardModal(true);
      return;
    }
    navigateTo('club_dashboard');
  };

  const handleProceedRoleGuard = () => {
    setShowRoleGuardModal(false);
    if (roleGuardMessage.target === 'club_onboarding') {
      navigateTo('club_onboarding');
    } else {
      navigateTo('player_onboarding');
    }
  };

  return (
    <div className="web-shell" dir={currentLocale.isRTL ? 'rtl' : 'ltr'}>
      {/* DESKTOP SIDEBAR */}
      <aside className="web-sidebar">
        {/* Brand Header */}
        <div className="web-sidebar-brand" onClick={() => navigateTo('landing')}>
          <div className="brand-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
              <path d="M12 8H26C33 8 38 13 38 20C38 27 33 32 26 32H12V8Z" fill="#080B11" />
              <circle cx="26" cy="20" r="5" fill="#00F576" />
              <path d="M22 32L36 44" stroke="#080B11" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="brand-title">RALLYO</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--brand-volt)', fontWeight: 600 }}>
              {t.tagline}
            </div>
          </div>
        </div>

        {/* Active Role Indicator & Switcher */}
        <div className="mx-3 my-2 p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Role:
            </span>
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                currentRole === 'club_owner'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {currentRole === 'club_owner' ? '🏛️ Club Owner' : '🎾 Player'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => switchRole(currentRole === 'club_owner' ? 'player' : 'club_owner')}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white text-[11px] font-bold border border-slate-700/60 transition-colors"
          >
            <ArrowRightLeft size={12} />
            <span>
              {currentRole === 'club_owner' ? 'Switch to Player Mode' : 'Switch to Club Owner'}
            </span>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="web-sidebar-nav">
          <div className="web-nav-section-title">
            {currentRole === 'club_owner' ? 'Club Management' : 'Player Experience'}
          </div>

          {currentRole === 'player' ? (
            <>
              <button
                className={`web-nav-link ${isCurrentScreen('dashboard') || isCurrentScreen('home') ? 'active' : ''}`}
                onClick={() => navigateTo('dashboard')}
              >
                <Home size={18} />
                <span>{t.nav.home}</span>
              </button>

              <button
                className={`web-nav-link ${isCurrentScreen('play') || isCurrentScreen('play_hub') ? 'active' : ''}`}
                onClick={() => navigateTo('play')}
              >
                <Swords size={18} />
                <span>{t.nav.play}</span>
                <span className="web-nav-badge glow">AI</span>
              </button>

              <button
                className={`web-nav-link ${isCurrentScreen('discover') || isCurrentScreen('discover_hub') ? 'active' : ''}`}
                onClick={() => navigateTo('discover')}
              >
                <Compass size={18} />
                <span>{t.nav.discover}</span>
              </button>

              <button
                className={`web-nav-link ${isCurrentScreen('rankings') || isCurrentScreen('compete_hub') ? 'active' : ''}`}
                onClick={() => navigateTo('rankings')}
              >
                <Trophy size={18} />
                <span>{t.nav.compete}</span>
              </button>

              <button
                className={`web-nav-link ${isCurrentScreen('chat') || isCurrentScreen('messages') ? 'active' : ''}`}
                onClick={() => navigateTo('chat')}
              >
                <MessageSquare size={18} />
                <span>{t.nav.chat}</span>
                <span className="web-nav-badge">3</span>
              </button>

              <button
                className={`web-nav-link ${isCurrentScreen('profile') || isCurrentScreen('own_profile') ? 'active' : ''}`}
                onClick={() => navigateTo('profile')}
              >
                <User size={18} />
                <span>{t.nav.profile}</span>
              </button>
            </>
          ) : (
            <>
              <button
                className={`web-nav-link ${isCurrentScreen('club_dashboard') ? 'active' : ''}`}
                onClick={() => navigateTo('club_dashboard')}
              >
                <Building2 size={18} />
                <span>Club Manager Hub</span>
                <span className="web-nav-badge glow" style={{ background: '#F59E0B', color: '#000' }}>
                  HQ
                </span>
              </button>

              <button
                className={`web-nav-link ${isCurrentScreen('discover') || isCurrentScreen('club_detail') ? 'active' : ''}`}
                onClick={() => navigateTo('discover')}
              >
                <Compass size={18} />
                <span>Venue Public View</span>
              </button>

              <button
                className={`web-nav-link ${isCurrentScreen('chat') ? 'active' : ''}`}
                onClick={() => navigateTo('chat')}
              >
                <MessageSquare size={18} />
                <span>Player Inquiries</span>
                <span className="web-nav-badge">3</span>
              </button>
            </>
          )}

          <div className="web-nav-section-title">Portals & Settings</div>

          <button
            className={`web-nav-link ${isCurrentScreen('settings') ? 'active' : ''}`}
            onClick={() => navigateTo('settings')}
          >
            <Settings size={18} />
            <span>{t.nav.settings}</span>
          </button>

          {/* Club Dashboard link with Role Guard */}
          <button
            className={`web-nav-link ${isCurrentScreen('club_dashboard') ? 'active' : ''}`}
            onClick={handleClubDashboardClick}
          >
            <Building2 size={18} />
            <span>Club Manager Hub</span>
          </button>

          <button
            className={`web-nav-link ${isCurrentScreen('admin_dashboard') ? 'active' : ''}`}
            onClick={() => navigateTo('admin_dashboard')}
          >
            <ShieldCheck size={18} />
            <span>Admin Platform GMV</span>
          </button>
        </div>

        {/* User Card */}
        <div className="web-sidebar-user">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 w-full">
              <img
                src={player.avatar}
                alt={currentUser?.full_name || player.name}
                style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--brand-volt)' }}
                onClick={() => navigateTo('profile')}
                className="cursor-pointer"
              />
              <div style={{ flex: 1, minWidth: 0 }} onClick={() => navigateTo('profile')} className="cursor-pointer">
                <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser?.full_name || player.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  <span className="volt-badge" style={{ padding: '1px 5px', fontSize: '0.62rem' }}>
                    {currentRole === 'club_owner' ? 'OWNER' : `ELO ${player.eloRating}`}
                  </span>
                  {currentRole === 'player' && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2, color: 'var(--brand-clay)' }}>
                      <Flame size={11} fill="currentColor" /> {player.activityStreakWeeks}w
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={logout}
                title="Log Out"
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('player', 'login')}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <LogIn size={14} />
              <span>Sign In / Join</span>
            </button>
          )}
        </div>
      </aside>

      {/* MAIN VIEW AREA */}
      <div className="web-main-area">
        {/* Sticky Topbar */}
        <header className="web-topbar">
          {/* Quick Search */}
          <div className="web-search-box">
            <Search size={16} />
            <input
              type="text"
              className="web-search-input"
              placeholder={t.discover.searchPlaceholder}
            />
          </div>

          {/* Topbar Actions */}
          <div className="web-topbar-actions">
            {/* Auth CTA if guest */}
            {!isAuthenticated && (
              <button
                onClick={() => openAuthModal('player', 'login')}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
              >
                <LogIn size={13} />
                <span>Log In</span>
              </button>
            )}

            {/* View Mode Toggle */}
            <div className="view-toggle-pill">
              <button
                className={`view-toggle-btn ${viewMode === 'responsive_web' ? 'active' : ''}`}
                onClick={() => setViewMode('responsive_web')}
                title="Full Responsive Web Experience"
              >
                <Monitor size={14} /> Web
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'phone_simulator' ? 'active' : ''}`}
                onClick={() => setViewMode('phone_simulator')}
                title="Mobile Phone Simulator"
              >
                <Smartphone size={14} /> Phone
              </button>
            </div>

            {/* Currency Selector */}
            <select
              className="web-pill-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label="Currency Selector"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.symbol})
                </option>
              ))}
            </select>

            {/* Language Selector */}
            <select
              className="web-pill-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              aria-label="Language Selector"
            >
              {Object.values(LOCALES).map((loc) => (
                <option key={loc.code} value={loc.code}>
                  {loc.flag} {loc.nativeName}
                </option>
              ))}
            </select>

            {/* Notifications Bell */}
            <button
              className="web-pill-select"
              style={{ position: 'relative', padding: '8px 12px' }}
              onClick={() => navigateTo('notifications')}
              aria-label="Notifications"
            >
              <Bell size={16} />
              {unreadNotifs > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--brand-volt)',
                  boxShadow: '0 0 6px var(--brand-volt)'
                }} />
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="web-content-container">
          {children}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION (Shown below 1024px) */}
      <nav className="web-mobile-bottombar">
        <button
          className={`mobile-nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => switchTab('home')}
        >
          <Home size={20} />
          <span>{t.nav.home}</span>
        </button>

        <button
          className={`mobile-nav-btn ${activeTab === 'play' ? 'active' : ''}`}
          onClick={() => switchTab('play')}
        >
          <Swords size={20} />
          <span>{t.nav.play}</span>
        </button>

        <button
          className={`mobile-nav-btn ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => switchTab('discover')}
        >
          <Compass size={20} />
          <span>{t.nav.discover}</span>
        </button>

        <button
          className={`mobile-nav-btn ${activeTab === 'compete' ? 'active' : ''}`}
          onClick={() => switchTab('compete')}
        >
          <Trophy size={20} />
          <span>{t.nav.compete}</span>
        </button>

        <button
          className={`mobile-nav-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => switchTab('chat')}
        >
          <MessageSquare size={20} />
          <span>{t.nav.chat}</span>
        </button>

        <button
          className={`mobile-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => switchTab('profile')}
        >
          <User size={20} />
          <span>{t.nav.profile}</span>
        </button>
      </nav>

      {/* ROLE ACCESS GUARD MODAL */}
      {showRoleGuardModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center text-2xl shadow-inner">
              <ShieldAlert size={28} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{roleGuardMessage.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{roleGuardMessage.desc}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRoleGuardModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs transition-colors"
              >
                Back to Player Hub
              </button>
              <button
                type="button"
                onClick={handleProceedRoleGuard}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition-all"
              >
                Register Club Venue →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
