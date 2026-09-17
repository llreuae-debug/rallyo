import React, { useState } from 'react';
import { Sparkles, Zap, Sliders, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const AIMatchmakerScreen: React.FC = () => {
  const { matches, joinMatch, navigateTo, setSelectedMatchId } = useApp();

  const [timeWindow, setTimeWindow] = useState('Tonight (18:00 - 22:00)');
  const [radius, setRadius] = useState(10);
  const [competitiveness, setCompetitiveness] = useState('Competitive');
  const [partnerHand, setPartnerHand] = useState('Lefty (Complimentary)');
  const [isSearching, setIsSearching] = useState(false);
  const [foundMatch, setFoundMatch] = useState<typeof matches[0] | null>(null);

  const handleRunAI = () => {
    setIsSearching(true);
    setFoundMatch(null);

    setTimeout(() => {
      setIsSearching(false);
      const openM = matches.find(m => m.status === 'open') || matches[0];
      setFoundMatch(openM);
    }, 1400);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="AI Matchmaker" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Banner */}
        <div
          className="rally-card"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, #0E1624 100%)',
            borderColor: 'rgba(168, 85, 247, 0.4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={20} color="#C084FC" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>
              Dynamic Padel Matchmaker
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Input your play window and court constraints. Our algorithm evaluates 8 weighted dimensions (Skill, Schedule, Distance, Reliability, Hand Synergy) to find or construct the ideal 4-player lobby.
          </p>
        </div>

        {/* Form Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="input-label">Play Window</label>
            <select
              className="rally-input"
              value={timeWindow}
              onChange={e => setTimeWindow(e.target.value)}
            >
              <option value="Tonight (18:00 - 22:00)">Tonight (18:00 - 22:00)</option>
              <option value="Tomorrow Morning (07:00 - 10:00)">Tomorrow Morning (07:00 - 10:00)</option>
              <option value="Tomorrow Evening (18:00 - 21:00)">Tomorrow Evening (18:00 - 21:00)</option>
              <option value="This Weekend (Anytime)">This Weekend (Anytime)</option>
            </select>
          </div>

          <div className="rally-card" style={{ padding: 12, background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="input-label" style={{ margin: 0 }}>Distance Radius</label>
              <span className="badge-volt">Within {radius} km</span>
            </div>
            <input
              type="range"
              min="3"
              max="25"
              value={radius}
              onChange={e => setRadius(parseInt(e.target.value))}
              style={{ accentColor: 'var(--brand-volt)', marginTop: 8 }}
            />
          </div>

          <div>
            <label className="input-label">Competitiveness Mode</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {['Casual', 'Competitive', 'High Stakes'].map(mode => (
                <button
                  key={mode}
                  type="button"
                  className="btn-secondary"
                  style={{
                    fontSize: '0.74rem',
                    padding: '8px 4px',
                    borderColor: competitiveness === mode ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    background: competitiveness === mode ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                    color: competitiveness === mode ? 'var(--brand-volt)' : '#FFF'
                  }}
                  onClick={() => setCompetitiveness(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="input-label">Partner Synergy Preference</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {['Lefty (Complimentary)', 'Any Dominant Hand'].map(opt => (
                <button
                  key={opt}
                  type="button"
                  className="btn-secondary"
                  style={{
                    fontSize: '0.74rem',
                    padding: '8px 6px',
                    borderColor: partnerHand === opt ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    background: partnerHand === opt ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                    color: partnerHand === opt ? 'var(--brand-volt)' : '#FFF'
                  }}
                  onClick={() => setPartnerHand(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Button */}
          <button
            type="button"
            className="btn-volt"
            style={{ width: '100%', marginTop: 6 }}
            onClick={handleRunAI}
            disabled={isSearching}
          >
            {isSearching ? (
              <span>Running Calibrated Analysis...</span>
            ) : (
              <>
                <Zap size={18} />
                <span>Find Optimal 4-Player Match</span>
              </>
            )}
          </button>
        </div>

        {/* Search Animation State */}
        {isSearching && (
          <div style={{ textAlign: 'center', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '3px solid rgba(0, 245, 118, 0.2)',
                borderTopColor: 'var(--brand-volt)',
                animation: 'spin 0.8s infinite linear'
              }}
            />
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--brand-volt)' }}>
              Analyzing court availability & ELO synergies...
            </span>
          </div>
        )}

        {/* Found Result Card */}
        {foundMatch && !isSearching && (
          <div
            className="rally-card"
            style={{
              background: 'linear-gradient(145deg, #152A3F 0%, #0D1625 100%)',
              borderColor: 'var(--brand-volt)',
              animation: 'fadeIn 0.4s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge-volt">🎯 96% Match Calibration</span>
              <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                €{foundMatch.feePerPlayer}
              </span>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>
              {foundMatch.title}
            </h4>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {foundMatch.aiExplanation}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              <Clock size={13} />
              <span>{foundMatch.date} • {foundMatch.time}</span>
              <span>•</span>
              <MapPin size={13} />
              <span>{foundMatch.clubName}</span>
            </div>

            <button
              className="btn-volt"
              style={{ width: '100%', marginTop: 8 }}
              onClick={() => {
                setSelectedMatchId(foundMatch.id);
                joinMatch(foundMatch.id);
              }}
            >
              <span>Accept & Enter Match Lobby</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
