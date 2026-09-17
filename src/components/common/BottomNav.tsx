import React from 'react';
import { Home, Zap, Compass, Trophy, User } from 'lucide-react';
import { useApp, NavTab } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, switchTab, activeScreen } = useApp();

  // Hide bottom nav on splash, welcome, onboarding screens
  const hideNav = ['splash', 'welcome', 'account_create', 'player_setup', 'skill_calibration', 'preferences_setup'].includes(activeScreen);
  if (hideNav) return null;

  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'play', label: 'Play', icon: <Zap size={20} /> },
    { id: 'discover', label: 'Discover', icon: <Compass size={20} /> },
    { id: 'compete', label: 'Compete', icon: <Trophy size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> }
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-tab-item ${isActive ? 'active' : ''}`}
            onClick={() => switchTab(tab.id)}
            aria-label={tab.label}
          >
            <div className="tab-icon-wrap">
              {tab.icon}
            </div>
            <span>{tab.label}</span>
            {isActive && <div className="tab-indicator-dot" />}
          </button>
        );
      })}
    </nav>
  );
};
