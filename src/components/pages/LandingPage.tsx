import React from 'react';
import { useApp } from '../../context/AppContext';
import { Swords, Compass, Trophy, Zap, ShieldCheck, ArrowRight, Star, Sparkles, MapPin, Users } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, navigateTo, matches, clubs, formatMoney } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(14, 24, 42, 0.95) 0%, rgba(8, 12, 20, 0.98) 100%)',
        border: '1px solid rgba(0, 245, 118, 0.25)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 245, 118, 0.15)',
        padding: '56px 40px',
        overflow: 'hidden'
      }}>
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 245, 118, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 760, position: 'relative', zIndex: 2 }}>
          <div className="volt-badge" style={{ marginBottom: 18 }}>
            <Sparkles size={14} /> Padel OS & Social Matchmaking
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 20
          }}>
            {t.landing.heroTitle}
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: 32
          }}>
            {t.landing.heroSubtitle}
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button className="btn-volt" onClick={() => navigateTo('play')}>
              <Zap size={18} /> {t.landing.ctaJoin}
            </button>
            <button className="btn-secondary" onClick={() => navigateTo('discover')}>
              <Compass size={18} /> {t.landing.ctaExplore}
            </button>
          </div>
        </div>

        {/* Global Stats Counter */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 20,
          marginTop: 48,
          paddingTop: 32,
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
              142+
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {t.landing.statActiveMatches}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#FFF' }}>
              48,000+
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {t.landing.statPlayers}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#38BDF8' }}>
              190+
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {t.landing.statCourts}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#CCFF00' }}>
              98.4%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {t.landing.statFillRate}
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLAR FEATURES BENTO */}
      <section>
        <div className="bento-grid">
          {/* Feature 1: AI Matchmaker */}
          <div className="bento-card bento-col-4">
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 245, 118, 0.12)',
              color: 'var(--brand-volt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>
              {t.landing.featureAi}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
              {t.landing.featureAiDesc}
            </p>
            <button
              onClick={() => navigateTo('play')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--brand-volt)',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer'
              }}
            >
              Calibrate AI Matchmaker <ArrowRight size={14} />
            </button>
          </div>

          {/* Feature 2: Court Booking */}
          <div className="bento-card bento-col-4">
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(56, 189, 248, 0.12)',
              color: '#38BDF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}>
              <Compass size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>
              {t.landing.featureBooking}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
              {t.landing.featureBookingDesc}
            </p>
            <button
              onClick={() => navigateTo('discover')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38BDF8',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer'
              }}
            >
              Browse Panoramic Courts <ArrowRight size={14} />
            </button>
          </div>

          {/* Feature 3: Tournaments & ELO */}
          <div className="bento-card bento-col-4">
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 94, 54, 0.12)',
              color: '#FF5E36',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}>
              <Trophy size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>
              {t.landing.featureTournaments}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
              {t.landing.featureTournamentsDesc}
            </p>
            <button
              onClick={() => navigateTo('tournaments')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FF5E36',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer'
              }}
            >
              Live Brackets & Cups <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* LIVE MATCH FEED TICKER PREVIEW */}
      <section className="bento-card">
        <div className="bento-header">
          <div className="bento-title">
            <Swords size={20} color="var(--brand-volt)" /> Live Match Hub Preview
          </div>
          <button className="volt-badge" onClick={() => navigateTo('play')} style={{ cursor: 'pointer' }}>
            View All Open Matches ({matches.length})
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {matches.slice(0, 3).map((match) => (
            <div
              key={match.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 16,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => navigateTo('match_detail', { matchId: match.id })}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="volt-badge" style={{ fontSize: '0.68rem' }}>
                  {match.matchType.toUpperCase()} • {match.format.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand-volt)' }}>
                  {formatMoney(match.fee_per_player_minor || 6000, match.currency_code || 'AED')}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>
                {match.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <MapPin size={12} /> {match.clubName} • {match.time}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: -6 }}>
                  {match.players.map((p, i) => (
                    <img
                      key={p.id}
                      src={p.avatar}
                      alt={p.name}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        border: '2px solid var(--bg-card)',
                        marginLeft: i > 0 ? -8 : 0
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {match.players.length}/4 Joined
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
