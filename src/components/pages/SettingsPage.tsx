import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CURRENCIES, CurrencyCode } from '../../currency/currencies';
import { LOCALES, SupportedLanguage } from '../../i18n/locales';
import {
  Settings, Globe, CreditCard, Bell, Lock,
  CheckCircle2, Sparkles, RefreshCw
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage, currency, setCurrency, currentLocale, t, showToast } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [ghostMode, setGhostMode] = useState(false);

  const handleSave = () => {
    showToast('⚙️ Settings preferences saved successfully!');
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* HEADER */}
      <div>
        <div className="volt-badge" style={{ marginBottom: 8 }}>
          <Settings size={14} /> System Configuration
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>
          {t.settings.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: 4 }}>
          Manage your world localization, active currency, notifications, and privacy options.
        </p>
      </div>

      <div className="bento-grid">
        {/* LOCALIZATION CARD */}
        <div className="bento-card bento-col-6">
          <div className="bento-header">
            <div className="bento-title">
              <Globe size={20} color="var(--brand-volt)" /> {t.settings.language}
            </div>
            {currentLocale.isRTL && (
              <span className="volt-badge">
                RTL Mode Active
              </span>
            )}
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
            Select your preferred interface language. Arabic automatically reorients the UI layout from Right-To-Left.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.values(LOCALES).map((loc) => {
              const isSelected = language === loc.code;
              return (
                <button
                  key={loc.code}
                  onClick={() => setLanguage(loc.code)}
                  className="btn-secondary"
                  style={{
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderColor: isSelected ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    background: isSelected ? 'rgba(0, 245, 118, 0.1)' : 'transparent',
                    color: isSelected ? 'var(--brand-volt)' : 'var(--text-primary)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.2rem' }}>{loc.flag}</span>
                    <span style={{ fontWeight: 700 }}>{loc.nativeName}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({loc.name})</span>
                  </span>
                  {isSelected && <CheckCircle2 size={16} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* MULTI-CURRENCY CARD */}
        <div className="bento-card bento-col-6">
          <div className="bento-header">
            <div className="bento-title">
              <CreditCard size={20} color="#38BDF8" /> {t.settings.currency}
            </div>
            <span className="volt-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
              ISO 4217 Engine
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
            All fees are converted into your preferred currency using safe integer minor unit computation.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.values(CURRENCIES).map((c) => {
              const isSelected = currency === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c.code)}
                  className="btn-secondary"
                  style={{
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderColor: isSelected ? '#38BDF8' : 'var(--border-subtle)',
                    background: isSelected ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                    color: isSelected ? '#38BDF8' : 'var(--text-primary)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.2rem' }}>{c.flag}</span>
                    <span style={{ fontWeight: 700 }}>{c.code}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({c.name})</span>
                  </span>
                  <span style={{ fontWeight: 800 }}>{c.symbol}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* NOTIFICATIONS & PRIVACY TOGGLES */}
        <div className="bento-card bento-col-12">
          <div className="bento-header">
            <div className="bento-title">
              <Bell size={20} color="var(--brand-volt)" /> {t.settings.notifications} & {t.settings.privacy}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Push Notifications</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Instant alerts for invites and confirmed bookings</div>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--brand-volt)' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>AI Matchmaker Radar Alerts</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Notify when a 90%+ match opens nearby</div>
              </div>
              <input
                type="checkbox"
                checked={matchAlerts}
                onChange={(e) => setMatchAlerts(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--brand-volt)' }}
              />
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button className="btn-volt" onClick={handleSave}>
              {t.settings.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
