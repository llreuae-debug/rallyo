import React from 'react';
import { MapPin, Trophy, Zap, MessageSquare, Swords, Flame, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const PlayerPublicProfileScreen: React.FC = () => {
  const { otherPlayers, selectedPlayerId, player, navigateTo, showToast } = useApp();
  const targetPlayer = otherPlayers.find(p => p.id === selectedPlayerId) || otherPlayers[0];

  const eloDelta = targetPlayer.eloRating - player.eloRating;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Player Profile" showBack />

      <div className="scroll-container" style={{ paddingBottom: 28 }}>
        {/* Profile Card */}
        <div className="rally-card" style={{ background: 'linear-gradient(135deg, #152238 0%, #0E1624 100%)', textAlign: 'center', padding: 20 }}>
          <img
            src={targetPlayer.avatar}
            alt={targetPlayer.name}
            style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 8px', border: '3px solid var(--brand-volt)', boxShadow: '0 0 20px var(--brand-volt-glow)' }}
          />

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
            {targetPlayer.name}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
            <MapPin size={13} />
            <span>{targetPlayer.city} • {targetPlayer.dominantHand} Handed</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10 }}>
            <span className="badge-volt">Level {targetPlayer.skillLevel}</span>
            <span className="badge-tag">ELO {targetPlayer.eloRating}</span>
            <span className="badge-tag">{targetPlayer.playingStyle}</span>
          </div>
        </div>

        {/* Head to Head Comparison */}
        <div className="rally-card" style={{ background: 'var(--bg-card)', padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FFF', textTransform: 'uppercase' }}>
              Head-to-Head Calibration
            </span>
            <span style={{ fontSize: '0.7rem', color: eloDelta >= 0 ? '#F59E0B' : 'var(--brand-volt)', fontWeight: 700 }}>
              {eloDelta >= 0 ? `+${eloDelta} ELO higher` : `${Math.abs(eloDelta)} ELO lower`}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--brand-volt)' }}>{player.name}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>{player.eloRating}</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '4px 10px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)' }}>
              VS
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38BDF8' }}>{targetPlayer.name.split(' ')[0]}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>{targetPlayer.eloRating}</div>
            </div>
          </div>
        </div>

        {/* Career Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <div className="stats-pill">
            <span className="stats-val">{targetPlayer.matchHistoryCount}</span>
            <span className="stats-label">Matches</span>
          </div>
          <div className="stats-pill">
            <span className="stats-val" style={{ color: 'var(--brand-volt)' }}>{targetPlayer.winRate}%</span>
            <span className="stats-label">Win Rate</span>
          </div>
          <div className="stats-pill">
            <span className="stats-val" style={{ color: 'var(--brand-clay)' }}>{targetPlayer.activityStreakWeeks}w</span>
            <span className="stats-label">Streak</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
          <button
            className="btn-volt"
            style={{ width: '100%' }}
            onClick={() => {
              showToast(`Challenge sent to ${targetPlayer.name}!`);
              navigateTo('create_match');
            }}
          >
            <Swords size={18} />
            <span>Challenge to Ranked Match</span>
          </button>

          <button
            className="btn-secondary"
            style={{ width: '100%' }}
            onClick={() => navigateTo('messages')}
          >
            <MessageSquare size={16} />
            <span>Direct Message</span>
          </button>
        </div>
      </div>
    </div>
  );
};
