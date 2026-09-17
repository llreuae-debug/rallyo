import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CURRENCIES, CurrencyCode } from '../../currency/currencies';
import { LOCALES, SupportedLanguage } from '../../i18n/locales';
import { Sparkles, MapPin, Zap, Check, ArrowRight, Shield } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { player, updatePlayer, currency, setCurrency, language, setLanguage, currentLocale, navigateTo, showToast } = useApp();

  const [step, setStep] = useState<number>(1);
  const [skill, setSkill] = useState<number>(player.skillLevel || 4.8);
  const [hand, setHand] = useState<'Right' | 'Left'>(player.dominantHand || 'Right');
  const [style, setStyle] = useState<string>(player.playingStyle || 'Attacking');
  const [competitiveness, setCompetitiveness] = useState<string>(player.competitiveness || 'Competitive');

  const getSkillLabel = (val: number) => {
    if (val < 2.5) return { title: 'Beginner / First Steps', badge: 'Novice', color: '#94A3B8' };
    if (val < 4.0) return { title: 'Club Casual & Social', badge: 'Intermediate', color: '#38BDF8' };
    if (val < 5.5) return { title: 'Ranked Competitor', badge: 'Advanced', color: 'var(--brand-volt)' };
    return { title: 'Elite / Tournament Ace', badge: 'Master Pro', color: '#FF5E36' };
  };

  const currentSkillInfo = getSkillLabel(skill);

  const handleFinish = () => {
    updatePlayer({
      skillLevel: skill,
      dominantHand: hand,
      playingStyle: style as any,
      competitiveness: competitiveness as any
    });
    showToast('✨ Player Calibration Complete! Welcome to RALLYO.');
    navigateTo('dashboard');
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* ONBOARDING HEADER */}
      <div style={{ textAlign: 'center' }}>
        <div className="volt-badge" style={{ marginBottom: 12 }}>
          <Sparkles size={14} /> Step {step} of 3 • Player Calibration
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800 }}>
          Calibrate Your Padel DNA
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: 6 }}>
          Set your language, currency, skill calibration, and match preferences for optimal matchmaking.
        </p>
      </div>

      {/* STEP 1: REGION & CURRENCY */}
      {step === 1 && (
        <div className="bento-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={20} color="var(--brand-volt)" /> World Localization & Currency
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
                Application Language
              </label>
              <select
                className="web-pill-select"
                style={{ width: '100%', padding: '12px 16px' }}
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              >
                {Object.values(LOCALES).map((loc) => (
                  <option key={loc.code} value={loc.code}>
                    {loc.flag} {loc.name} ({loc.nativeName}) {loc.isRTL ? '— RTL' : ''}
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>
                RTL layout automatically activated for Arabic.
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
                Preferred Currency (Minor Units Stored)
              </label>
              <select
                className="web-pill-select"
                style={{ width: '100%', padding: '12px 16px' }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>
                Exchange rates auto-convert club fees to your preferred currency.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
            <button className="btn-volt" onClick={() => setStep(2)}>
              Next: Skill Calibration <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SKILL CALIBRATION */}
      {step === 2 && (
        <div className="bento-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={20} color="var(--brand-volt)" /> Dynamic Skill Calibration
          </h2>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
            textAlign: 'center',
            marginBottom: 24
          }}>
            <div style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 999,
              background: 'rgba(0, 245, 118, 0.15)',
              color: currentSkillInfo.color,
              fontWeight: 800,
              fontSize: '0.85rem',
              marginBottom: 12
            }}>
              {currentSkillInfo.badge}
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, color: '#FFF' }}>
              Level {skill.toFixed(1)}
            </div>

            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: 4 }}>
              {currentSkillInfo.title}
            </div>

            <input
              type="range"
              min="1.0"
              max="7.0"
              step="0.1"
              value={skill}
              onChange={(e) => setSkill(parseFloat(e.target.value))}
              style={{
                width: '100%',
                marginTop: 24,
                accentColor: 'var(--brand-volt)',
                cursor: 'pointer'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
              <span>1.0 Beginner</span>
              <span>4.0 Intermediate</span>
              <span>5.5 Advanced</span>
              <span>7.0 World Pro</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <button className="btn-secondary" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="btn-volt" onClick={() => setStep(3)}>
              Next: Style & Preferences <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PLAYING STYLE & HAND */}
      {step === 3 && (
        <div className="bento-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={20} color="var(--brand-volt)" /> Playing Profile & Style
          </h2>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 10 }}>
              Dominant Hand
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {(['Right', 'Left'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setHand(h)}
                  className={`btn-secondary ${hand === h ? 'active' : ''}`}
                  style={{
                    borderColor: hand === h ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    background: hand === h ? 'rgba(0, 245, 118, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    color: hand === h ? 'var(--brand-volt)' : '#FFF'
                  }}
                >
                  {h === 'Right' ? '🏸 Right-Handed' : '🎾 Left-Handed (Lefty)'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 10 }}>
              Tactical Archetype
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
              {['Attacking', 'Defensive', 'All-Court', 'Tactical'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStyle(st)}
                  className={`btn-secondary`}
                  style={{
                    padding: '10px',
                    fontSize: '0.82rem',
                    borderColor: style === st ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    background: style === st ? 'rgba(0, 245, 118, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    color: style === st ? 'var(--brand-volt)' : '#FFF'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 10 }}>
              Match Intensity
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
              {['Casual', 'Balanced', 'Competitive', 'Ultra'].map((comp) => (
                <button
                  key={comp}
                  onClick={() => setCompetitiveness(comp)}
                  className={`btn-secondary`}
                  style={{
                    padding: '10px',
                    fontSize: '0.82rem',
                    borderColor: competitiveness === comp ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    background: competitiveness === comp ? 'rgba(0, 245, 118, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    color: competitiveness === comp ? 'var(--brand-volt)' : '#FFF'
                  }}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <button className="btn-secondary" onClick={() => setStep(2)}>
              Back
            </button>
            <button className="btn-volt" onClick={handleFinish}>
              <Check size={18} /> Complete Calibration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
