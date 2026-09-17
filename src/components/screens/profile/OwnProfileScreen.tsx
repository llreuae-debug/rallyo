import React, { useState } from 'react';
import { User, Edit3, Trophy, Flame, Wallet, Plus, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const OwnProfileScreen: React.FC = () => {
  const { player, updatePlayer, matches, navigateTo } = useApp();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(player.name);
  const [editSkill, setEditSkill] = useState(player.skillLevel);
  const [editStyle, setEditStyle] = useState(player.playingStyle);
  const [editHand, setEditHand] = useState(player.dominantHand);

  const completedMatches = matches.filter(m => m.status === 'completed');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlayer({
      name: editName,
      skillLevel: editSkill,
      playingStyle: editStyle,
      dominantHand: editHand
    });
    setShowEditModal(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header
        title="My Profile"
        rightAction={
          <button className="header-btn" onClick={() => setShowEditModal(true)} title="Edit Profile">
            <Edit3 size={16} />
          </button>
        }
      />

      <div className="scroll-container" style={{ paddingBottom: 28 }}>
        {/* Profile Card */}
        <div
          className="rally-card"
          style={{
            background: 'linear-gradient(135deg, #152238 0%, #0E1624 100%)',
            textAlign: 'center',
            padding: 20
          }}
        >
          <div style={{ position: 'relative', width: 76, height: 76, margin: '0 auto 8px' }}>
            <img
              src={player.avatar}
              alt={player.name}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--brand-volt)',
                boxShadow: '0 0 20px var(--brand-volt-glow)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: 'var(--brand-volt)',
                color: '#080B11',
                fontSize: '0.66rem',
                fontWeight: 900,
                padding: '2px 6px',
                borderRadius: 999
              }}
            >
              Lvl {player.skillLevel.toFixed(1)}
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
            {player.name}
          </h2>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
            {player.city} • {player.dominantHand} Handed • {player.playingStyle}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10 }}>
            <span className="badge-volt">ELO {player.eloRating}</span>
            <span className="badge-tag">🔥 {player.activityStreakWeeks} Wk Streak</span>
          </div>
        </div>

        {/* Career Stats Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          <div className="stats-pill">
            <span className="stats-val" style={{ fontSize: '1.1rem' }}>{player.matchHistoryCount}</span>
            <span className="stats-label" style={{ fontSize: '0.62rem' }}>Matches</span>
          </div>
          <div className="stats-pill">
            <span className="stats-val" style={{ fontSize: '1.1rem', color: 'var(--brand-volt)' }}>{player.wins}</span>
            <span className="stats-label" style={{ fontSize: '0.62rem' }}>Wins</span>
          </div>
          <div className="stats-pill">
            <span className="stats-val" style={{ fontSize: '1.1rem', color: '#EF4444' }}>{player.losses}</span>
            <span className="stats-label" style={{ fontSize: '0.62rem' }}>Losses</span>
          </div>
          <div className="stats-pill">
            <span className="stats-val" style={{ fontSize: '1.1rem', color: '#38BDF8' }}>{player.winRate}%</span>
            <span className="stats-label" style={{ fontSize: '0.62rem' }}>Win Rate</span>
          </div>
        </div>

        {/* Wallet & Split Balance */}
        <div
          className="rally-card"
          style={{
            background: 'var(--bg-card)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'rgba(0, 245, 118, 0.15)', color: 'var(--brand-volt)', padding: 8, borderRadius: 8 }}>
              <Wallet size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>RALLYO Wallet</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFF' }}>
                €{player.walletBalance.toFixed(2)}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn-secondary"
            style={{ fontSize: '0.74rem', padding: '6px 12px' }}
            onClick={() => updatePlayer({ walletBalance: player.walletBalance + 50 })}
          >
            <Plus size={14} />
            <span>Top Up €50</span>
          </button>
        </div>

        {/* Badges Preview */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#FFF' }}>
              Unlocked Badges ({player.badges.filter(b => b.unlockedAt).length})
            </span>
            <span
              style={{ fontSize: '0.74rem', color: 'var(--brand-volt)', cursor: 'pointer', fontWeight: 700 }}
              onClick={() => navigateTo('achievements')}
            >
              Show All &gt;
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {player.badges.filter(b => b.unlockedAt).map(b => (
              <div
                key={b.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{b.icon}</span>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#FFF' }}>{b.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Match History */}
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#FFF', display: 'block', marginBottom: 8 }}>
            Recent Match History & Scorecards
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {completedMatches.map(m => (
              <div
                key={m.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 12
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFF' }}>{m.title}</h5>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.clubName} • {m.date}</span>
                  </div>
                  <span className="badge-volt" style={{ fontSize: '0.7rem' }}>
                    VICTORY (+18 ELO)
                  </span>
                </div>

                {m.score && (
                  <div style={{ marginTop: 8, background: 'rgba(255, 255, 255, 0.04)', padding: '6px 10px', borderRadius: 6, display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem' }}>
                    <span>Sets: 6-4, 7-5</span>
                    <span style={{ color: 'var(--brand-volt)', fontWeight: 700 }}>Confirmed ✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 1200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
          >
            <form onSubmit={handleSaveProfile} className="rally-card" style={{ background: '#111724', width: '100%', maxWidth: 340, gap: 12 }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF' }}>Edit Player Profile</h4>

              <div>
                <label className="input-label">Full Name</label>
                <input
                  className="rally-input"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="input-label">Skill Rating (1.0 - 7.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1.0"
                  max="7.0"
                  className="rally-input"
                  value={editSkill}
                  onChange={e => setEditSkill(parseFloat(e.target.value))}
                />
              </div>

              <div>
                <label className="input-label">Dominant Hand</label>
                <select
                  className="rally-input"
                  value={editHand}
                  onChange={e => setEditHand(e.target.value as any)}
                >
                  <option value="Right">Right Handed</option>
                  <option value="Left">Left Handed (Lefty)</option>
                </select>
              </div>

              <div>
                <label className="input-label">Playing Style</label>
                <select
                  className="rally-input"
                  value={editStyle}
                  onChange={e => setEditStyle(e.target.value as any)}
                >
                  <option value="Attacking">Attacking</option>
                  <option value="Tactical">Tactical</option>
                  <option value="All-Court">All-Court</option>
                  <option value="Defensive">Defensive</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ flex: 1, fontSize: '0.78rem' }}
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-volt"
                  style={{ flex: 1, fontSize: '0.78rem' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
