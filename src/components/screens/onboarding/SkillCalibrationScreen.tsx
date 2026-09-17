import React, { useState } from 'react';
import { ArrowRight, Zap, Award } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const SkillCalibrationScreen: React.FC = () => {
  const { navigateTo, updatePlayer, player } = useApp();
  const [skillLevel, setSkillLevel] = useState<number>(player.skillLevel || 4.5);
  const [playingStyle, setPlayingStyle] = useState<'Attacking' | 'Defensive' | 'All-Court' | 'Tactical'>(player.playingStyle || 'Attacking');
  const [competitiveness, setCompetitiveness] = useState<'Casual' | 'Balanced' | 'Competitive' | 'Ultra'>(player.competitiveness || 'Competitive');

  const getTierName = (val: number) => {
    if (val < 3.0) return 'Beginner / Casual';
    if (val < 4.0) return 'Intermediate Improver';
    if (val < 5.0) return 'Advanced Competitor';
    if (val < 6.0) return 'Semi-Pro / Tournament';
    return 'Pro / Master';
  };

  const getEstimatedELO = (val: number) => {
    return Math.round(1000 + (val - 1.0) * 200);
  };

  const handleNext = () => {
    const elo = getEstimatedELO(skillLevel);
    updatePlayer({ skillLevel, playingStyle, competitiveness, eloRating: elo });
    navigateTo('preferences_setup');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Skill Calibration" showBack onBack={() => navigateTo('player_setup')} />

      <div className="scroll-container" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <span className="badge-volt">Step 3 of 4</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginTop: 6 }}>
              Calibrate Your Game
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Accurate self-calibration ensures tight, competitive 3-set matches and zero mismatched blowouts.
            </p>
          </div>

          {/* Skill Level Gauge Card */}
          <div className="rally-card" style={{ background: 'linear-gradient(145deg, #162235 0%, #0E1624 100%)', borderColor: 'var(--brand-volt)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-volt)', textTransform: 'uppercase' }}>
                Padel Rating (1.0 - 7.0)
              </span>
              <span className="badge-tag">
                Est. ELO ~{getEstimatedELO(skillLevel)}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '6px 0' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 900, color: '#FFF' }}>
                {skillLevel.toFixed(1)}
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-volt)' }}>
                {getTierName(skillLevel)}
              </span>
            </div>

            <input
              type="range"
              min="1.0"
              max="7.0"
              step="0.1"
              value={skillLevel}
              onChange={e => setSkillLevel(parseFloat(e.target.value))}
              style={{
                accentColor: 'var(--brand-volt)',
                width: '100%',
                cursor: 'pointer',
                height: 8,
                borderRadius: 4
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>1.0 Beginner</span>
              <span>3.5 Club Intermediate</span>
              <span>5.0 Advanced</span>
              <span>7.0 World Padel</span>
            </div>
          </div>

          {/* Playing Style */}
          <div>
            <label className="input-label">Your Preferred Court Playstyle</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {(['Attacking', 'Tactical', 'All-Court', 'Defensive'] as const).map(style => (
                <button
                  key={style}
                  type="button"
                  className="btn-secondary"
                  style={{
                    borderColor: playingStyle === style ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    background: playingStyle === style ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                    color: playingStyle === style ? 'var(--brand-volt)' : '#FFF',
                    justifyContent: 'flex-start',
                    padding: '10px 12px'
                  }}
                  onClick={() => setPlayingStyle(style)}
                >
                  <Zap size={15} />
                  <span>{style}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Competitiveness */}
          <div>
            <label className="input-label">Competitiveness Mindset</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {(['Casual', 'Balanced', 'Competitive', 'Ultra'] as const).map(comp => (
                <button
                  key={comp}
                  type="button"
                  className="btn-secondary"
                  style={{
                    fontSize: '0.74rem',
                    padding: '8px 4px',
                    borderColor: competitiveness === comp ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    background: competitiveness === comp ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                    color: competitiveness === comp ? 'var(--brand-volt)' : '#FFF'
                  }}
                  onClick={() => setCompetitiveness(comp)}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, paddingBottom: 16 }}>
          <button type="button" className="btn-volt" style={{ width: '100%' }} onClick={handleNext}>
            <span>Continue to Preferences</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
