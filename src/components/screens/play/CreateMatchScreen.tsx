import React, { useState } from 'react';
import { Clock, MapPin, Shield, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const CreateMatchScreen: React.FC = () => {
  const { clubs, createMatch, navigateTo } = useApp();

  const [title, setTitle] = useState('Doubles Battle & Rally');
  const [selectedClubId, setSelectedClubId] = useState(clubs[0]?.id || 'club_1');
  const [courtName, setCourtName] = useState('Court 1 (Panoramic)');
  const [date, setDate] = useState('Tomorrow');
  const [time, setTime] = useState('19:00 - 20:30');
  const [matchType, setMatchType] = useState<'ranked' | 'casual'>('ranked');
  const [format, setFormat] = useState<'doubles' | 'singles'>('doubles');
  const [visibility, setVisibility] = useState<'public' | 'private' | 'approval'>('public');
  const [minSkill, setMinSkill] = useState(4.0);
  const [maxSkill, setMaxSkill] = useState(5.2);
  const [totalFee, setTotalFee] = useState(240);

  const selectedClub = clubs.find(c => c.id === selectedClubId) || clubs[0];
  const feePerPlayer = format === 'doubles' ? Math.round(totalFee / 4) : Math.round(totalFee / 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMatch({
      title,
      clubId: selectedClubId,
      clubName: selectedClub.name,
      courtName,
      date,
      time,
      format,
      matchType,
      visibility,
      skillRange: { min: minSkill, max: maxSkill },
      totalFee,
      feePerPlayer
    });
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Host a Match" showBack />

      <form onSubmit={handleSubmit} className="scroll-container" style={{ paddingBottom: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Title */}
          <div>
            <label className="input-label">Match Title</label>
            <input
              className="rally-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Thursday Night Clash"
              required
            />
          </div>

          {/* Club Selector */}
          <div>
            <label className="input-label">Select Club</label>
            <select
              className="rally-input"
              value={selectedClubId}
              onChange={e => setSelectedClubId(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              {clubs.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.location})
                </option>
              ))}
            </select>
          </div>

          {/* Court & Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <label className="input-label">Date</label>
              <select
                className="rally-input"
                value={date}
                onChange={e => setDate(e.target.value)}
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            <div>
              <label className="input-label">Time Slot</label>
              <select
                className="rally-input"
                value={time}
                onChange={e => setTime(e.target.value)}
              >
                <option value="18:00 - 19:30">18:00 - 19:30</option>
                <option value="19:30 - 21:00">19:30 - 21:00</option>
                <option value="20:00 - 21:30">20:00 - 21:30</option>
                <option value="21:00 - 22:30">21:00 - 22:30</option>
              </select>
            </div>
          </div>

          {/* Format & Match Type */}
          <div>
            <label className="input-label">Format & Scoring Mode</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                type="button"
                className="btn-secondary"
                style={{
                  borderColor: format === 'doubles' ? 'var(--brand-volt)' : 'var(--border-subtle)',
                  background: format === 'doubles' ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                  color: format === 'doubles' ? 'var(--brand-volt)' : '#FFF'
                }}
                onClick={() => setFormat('doubles')}
              >
                👥 Doubles (4P)
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{
                  borderColor: format === 'singles' ? 'var(--brand-volt)' : 'var(--border-subtle)',
                  background: format === 'singles' ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                  color: format === 'singles' ? 'var(--brand-volt)' : '#FFF'
                }}
                onClick={() => setFormat('singles')}
              >
                👤 Singles (2P)
              </button>
            </div>
          </div>

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                type="button"
                className="btn-secondary"
                style={{
                  borderColor: matchType === 'ranked' ? 'var(--brand-volt)' : 'var(--border-subtle)',
                  background: matchType === 'ranked' ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                  color: matchType === 'ranked' ? 'var(--brand-volt)' : '#FFF'
                }}
                onClick={() => setMatchType('ranked')}
              >
                🏆 Official Ranked (ELO)
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{
                  borderColor: matchType === 'casual' ? 'var(--brand-volt)' : 'var(--border-subtle)',
                  background: matchType === 'casual' ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                  color: matchType === 'casual' ? 'var(--brand-volt)' : '#FFF'
                }}
                onClick={() => setMatchType('casual')}
              >
                🤝 Casual Friendly
              </button>
            </div>
          </div>

          {/* Skill Guardrails Slider */}
          <div className="rally-card" style={{ background: 'var(--bg-card)', padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="input-label" style={{ margin: 0 }}>Skill Level Guardrails</label>
              <span className="badge-volt">
                Level {minSkill.toFixed(1)} - {maxSkill.toFixed(1)}
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Players outside this level range cannot auto-join without your approval.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
              <input
                type="range"
                min="1.0"
                max="6.5"
                step="0.1"
                value={minSkill}
                onChange={e => setMinSkill(Math.min(parseFloat(e.target.value), maxSkill - 0.2))}
                style={{ flex: 1, accentColor: 'var(--brand-volt)' }}
              />
              <input
                type="range"
                min="1.5"
                max="7.0"
                step="0.1"
                value={maxSkill}
                onChange={e => setMaxSkill(Math.max(parseFloat(e.target.value), minSkill + 0.2))}
                style={{ flex: 1, accentColor: 'var(--brand-volt)' }}
              />
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className="input-label">Match Access</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {(['public', 'approval', 'private'] as const).map(vis => (
                <button
                  key={vis}
                  type="button"
                  className="btn-secondary"
                  style={{
                    fontSize: '0.74rem',
                    textTransform: 'capitalize',
                    padding: '8px 4px',
                    borderColor: visibility === vis ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    background: visibility === vis ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                    color: visibility === vis ? 'var(--brand-volt)' : '#FFF'
                  }}
                  onClick={() => setVisibility(vis)}
                >
                  {vis}
                </button>
              ))}
            </div>
          </div>

          {/* Split Payment Preview */}
          <div
            style={{
              background: 'rgba(0, 245, 118, 0.08)',
              border: '1px solid rgba(0, 245, 118, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#FFF' }}>
                Automated Split Payment
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Total court booking: €{totalFee} ÷ 4 players
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--brand-volt)' }}>
                €{feePerPlayer}
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>
                / player
              </span>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-volt" style={{ width: '100%', marginTop: 8 }}>
            <span>Create Match & Open Lobby</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
