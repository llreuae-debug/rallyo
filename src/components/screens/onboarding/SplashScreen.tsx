import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { RallyoLoadingAnimation } from '../../common/RallyoLoadingAnimation';
import { LOCALES, SupportedLanguage } from '../../../i18n/locales';
import { ArrowRight, RefreshCw, Globe, Check } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { navigateTo, language, setLanguage, currentLocale } = useApp();
  const [activeTab, setActiveTab] = useState<'animation' | 'icon'>('animation');
  const [key, setKey] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languagesList = Object.values(LOCALES);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#080C14',
        padding: '16px 20px',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      {/* Top Header with Multilingual Selector */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="badge-volt" style={{ fontSize: '0.66rem', letterSpacing: '0.5px' }}>
          GLOBAL BRAND ASSETS
        </div>

        {/* Language Selector Trigger */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="btn-secondary"
            style={{
              padding: '5px 10px',
              fontSize: '0.74rem',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'var(--brand-volt)',
              gap: 6
            }}
            onClick={() => setShowLangMenu(!showLangMenu)}
          >
            <span>{currentLocale.flag}</span>
            <span style={{ fontWeight: 700 }}>{currentLocale.nativeName}</span>
            <Globe size={13} color="var(--brand-volt)" />
          </button>

          {/* Language Dropdown Menu */}
          {showLangMenu && (
            <div
              style={{
                position: 'absolute',
                top: 36,
                right: 0,
                background: 'rgba(14, 22, 36, 0.98)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-highlight)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.7)',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                zIndex: 1000,
                minWidth: 160,
                textAlign: 'left'
              }}
            >
              {languagesList.map(l => (
                <button
                  key={l.code}
                  type="button"
                  style={{
                    background: language === l.code ? 'rgba(0, 245, 118, 0.15)' : 'transparent',
                    border: 'none',
                    color: language === l.code ? 'var(--brand-volt)' : '#FFF',
                    padding: '6px 10px',
                    borderRadius: 6,
                    fontSize: '0.78rem',
                    fontWeight: language === l.code ? 800 : 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onClick={() => {
                    setLanguage(l.code);
                    setShowLangMenu(false);
                    setKey(k => k + 1); // replay animation on language change
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </span>
                  {language === l.code && <Check size={14} color="var(--brand-volt)" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Asset Display */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto 0' }}>
        {activeTab === 'animation' ? (
          <div style={{ width: '100%', maxWidth: 360, position: 'relative' }}>
            <RallyoLoadingAnimation
              key={`${key}-${language}`}
              height={330}
              showTagline={true}
              language={language}
            />

            {/* Replay Button */}
            <button
              type="button"
              className="btn-secondary"
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                padding: '4px 8px',
                fontSize: '0.68rem',
                background: 'rgba(255, 255, 255, 0.08)',
                gap: 4
              }}
              onClick={() => setKey(k => k + 1)}
              title={currentLocale.replayAnimation}
            >
              <RefreshCw size={12} />
              <span>{currentLocale.replayAnimation.split(' ')[0]}</span>
            </button>
          </div>
        ) : (
          /* Language-Neutral App Icon Display */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 190,
                height: 190,
                borderRadius: 44,
                overflow: 'hidden',
                boxShadow: '0 16px 40px rgba(0, 245, 118, 0.35)',
                border: '2px solid rgba(0, 245, 118, 0.5)',
                background: '#0E1626'
              }}
            >
              <img
                src="/app-icon.jpg"
                alt="RALLYO App Icon"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: '#FFF' }}>
                RALLYO Icon Mark
              </h2>
              <div
                dir={currentLocale.isRTL ? 'rtl' : 'ltr'}
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--brand-volt)',
                  fontWeight: 800,
                  marginTop: 2
                }}
              >
                {currentLocale.tagline}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4, maxWidth: 280 }}>
                100% text-free & language-neutral symbol. Globally unified across iOS & Android app stores without redesign.
              </p>
            </div>
          </div>
        )}

        {/* View Switcher Pill */}
        <div className="view-toggle-pill" style={{ marginTop: 14 }}>
          <button
            className={`view-toggle-btn ${activeTab === 'animation' ? 'active' : ''}`}
            onClick={() => setActiveTab('animation')}
          >
            ⚡ {currentLocale.viewAnimation}
          </button>
          <button
            className={`view-toggle-btn ${activeTab === 'icon' ? 'active' : ''}`}
            onClick={() => setActiveTab('icon')}
          >
            📱 {currentLocale.viewIcon}
          </button>
        </div>

        {/* Live Tagline Multilingual Indicator */}
        <div
          dir={currentLocale.isRTL ? 'rtl' : 'ltr'}
          style={{
            marginTop: 10,
            padding: '6px 12px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.74rem',
            color: 'var(--text-secondary)'
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>Locale [{currentLocale.code.toUpperCase()}]: </span>
          <strong style={{ color: 'var(--brand-volt)' }}>"{currentLocale.tagline}"</strong>
        </div>
      </div>

      {/* Enter App CTA */}
      <div style={{ width: '100%', paddingBottom: 6 }}>
        <button
          className="btn-volt"
          style={{ width: '100%' }}
          onClick={() => navigateTo('welcome')}
        >
          <span>{currentLocale.enterPlatform}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
