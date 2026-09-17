import React from 'react';
import { ChevronLeft, Bell, MessageSquare, Wallet } from 'lucide-react';
import { useApp, ScreenId } from '../../context/AppContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = false, onBack, rightAction }) => {
  const { goBack, navigateTo, notifications, player, activeScreen } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  const isMainTab = ['home', 'play_hub', 'discover_hub', 'compete_hub', 'own_profile'].includes(activeScreen);

  return (
    <header className="screen-header">
      <div className="header-left">
        {showBack || !isMainTab ? (
          <button className="header-btn" onClick={onBack || goBack} aria-label="Go back">
            <ChevronLeft size={20} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: '#00F576',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.8rem',
              color: '#080B11'
            }}>R</div>
            <span style={{ fontWeight: 800, fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '-0.02em' }}>
              RALLYO
            </span>
          </div>
        )}
        {title && <h1 className="screen-title" style={{ marginLeft: 6 }}>{title}</h1>}
      </div>

      <div className="header-right">
        {rightAction ? (
          rightAction
        ) : (
          <>
            <button
              className="header-btn"
              onClick={() => navigateTo('notifications')}
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && <span className="badge-dot" />}
            </button>
            <button
              className="header-btn"
              onClick={() => navigateTo('messages')}
              title="Messages"
              aria-label="Messages"
            >
              <MessageSquare size={18} />
            </button>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'rgba(0, 245, 118, 0.1)',
                border: '1px solid rgba(0, 245, 118, 0.3)',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--brand-volt)',
                cursor: 'pointer'
              }}
              onClick={() => navigateTo('own_profile')}
              title="Wallet Balance"
            >
              <Wallet size={13} />
              <span>€{player.walletBalance.toFixed(0)}</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
