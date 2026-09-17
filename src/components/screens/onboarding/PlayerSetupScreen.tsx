import React, { useState } from 'react';
import { ArrowRight, MapPin, Camera } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const PlayerSetupScreen: React.FC = () => {
  const { navigateTo, updatePlayer, player } = useApp();
  const [city, setCity] = useState(player.city || 'Dubai');
  const [dominantHand, setDominantHand] = useState<'Right' | 'Left'>(player.dominantHand || 'Right');
  const [ageRange, setAgeRange] = useState(player.ageRange || '26-35');
  const [gender, setGender] = useState(player.gender || 'Male');

  const handleNext = () => {
    updatePlayer({ city, dominantHand, ageRange, gender });
    navigateTo('skill_calibration');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Player Setup" showBack onBack={() => navigateTo('account_create')} />

      <div className="scroll-container" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <span className="badge-volt">Step 2 of 4</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginTop: 6 }}>
              Player Bio & Geometry
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Padel doubles pairs thrive on court geometry and complementary hand positioning.
            </p>
          </div>

          {/* Avatar Upload Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, margin: '8px 0' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={player.avatar}
                alt={player.name}
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--brand-volt)',
                  boxShadow: '0 0 16px var(--brand-volt-glow)'
                }}
              />
              <button
                type="button"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--brand-volt)',
                  border: '2px solid #080B11',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#080B11',
                  cursor: 'pointer'
                }}
                title="Change photo"
              >
                <Camera size={14} />
              </button>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tap to update photo</span>
          </div>

          {/* City / Location */}
          <div>
            <label className="input-label">Current City</label>
            <div style={{ position: 'relative' }}>
              <input
                className="rally-input"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="e.g. Dubai, Madrid, London"
              />
              <MapPin size={16} style={{ position: 'absolute', right: 12, top: 14, color: 'var(--brand-volt)' }} />
            </div>
          </div>

          {/* Dominant Hand */}
          <div>
            <label className="input-label">Dominant Hand (Court Positioning)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                type="button"
                className={`btn-secondary ${dominantHand === 'Right' ? 'active' : ''}`}
                style={{
                  borderColor: dominantHand === 'Right' ? 'var(--brand-volt)' : 'var(--border-subtle)',
                  background: dominantHand === 'Right' ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                  color: dominantHand === 'Right' ? 'var(--brand-volt)' : '#FFF'
                }}
                onClick={() => setDominantHand('Right')}
              >
                👉 Right Handed
              </button>
              <button
                type="button"
                className={`btn-secondary ${dominantHand === 'Left' ? 'active' : ''}`}
                style={{
                  borderColor: dominantHand === 'Left' ? 'var(--brand-volt)' : 'var(--border-subtle)',
                  background: dominantHand === 'Left' ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                  color: dominantHand === 'Left' ? 'var(--brand-volt)' : '#FFF'
                }}
                onClick={() => setDominantHand('Left')}
              >
                👈 Left Handed (Lefty)
              </button>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>
              Lefties naturally control the right side of the court for killer smashes down the middle!
            </span>
          </div>

          {/* Age Range */}
          <div>
            <label className="input-label">Age Range</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {['18-25', '26-35', '36-45', '46+'].map(range => (
                <button
                  key={range}
                  type="button"
                  className="btn-secondary"
                  style={{
                    padding: '8px 4px',
                    fontSize: '0.78rem',
                    borderColor: ageRange === range ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    background: ageRange === range ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                    color: ageRange === range ? 'var(--brand-volt)' : '#FFF'
                  }}
                  onClick={() => setAgeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, paddingBottom: 16 }}>
          <button type="button" className="btn-volt" style={{ width: '100%' }} onClick={handleNext}>
            <span>Continue to Skill Calibration</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
