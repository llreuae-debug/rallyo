import React from 'react';
import { ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const WelcomeScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 24,
        background: 'linear-gradient(180deg, #0A0F1A 0%, #080B11 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Court Line Accents */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 245, 118, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Top Brand Tag */}
      <div style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'var(--brand-volt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              color: '#080B11',
              fontSize: '1.1rem'
            }}
          >
            R
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#FFF' }}>
            RALLYO
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#FFF',
            marginBottom: 12
          }}
        >
          The Operating System for Your <span style={{ color: 'var(--brand-volt)' }}>Padel Life.</span>
        </h2>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Connect with balanced players, book premier panoramic courts in seconds, compete in verified ranked matches, and build your padel identity.
        </p>

        {/* Feature Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ padding: 8, borderRadius: 8, background: 'rgba(0, 245, 118, 0.12)', color: 'var(--brand-volt)' }}>
              <Zap size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>Smart AI Matchmaking</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Calibrated by ELO, playstyle & distance</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ padding: 8, borderRadius: 8, background: 'rgba(255, 94, 54, 0.12)', color: 'var(--brand-clay)' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>Seamless Court Bookings</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Instant slot reservations & split payments</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ padding: 8, borderRadius: 8, background: 'rgba(56, 189, 248, 0.12)', color: '#38BDF8' }}>
              <Users size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>Rankings & Tournaments</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified ELO scoring & official brackets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
        <button
          className="btn-volt"
          style={{ width: '100%' }}
          onClick={() => navigateTo('account_create')}
        >
          <span>Get Started — It's Free</span>
          <ArrowRight size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            className="btn-secondary"
            onClick={() => navigateTo('home')}
            style={{ fontSize: '0.82rem' }}
          >
            <span> Apple ID</span>
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigateTo('home')}
            style={{ fontSize: '0.82rem' }}
          >
            <span>G Google</span>
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 4 }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <strong
              style={{ color: 'var(--brand-volt)', cursor: 'pointer' }}
              onClick={() => navigateTo('home')}
            >
              Sign In
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
