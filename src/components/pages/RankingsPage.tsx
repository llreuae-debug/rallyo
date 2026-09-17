import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy, Medal, Flame, Star, ArrowUpRight,
  Filter, Shield, Users, Sparkles
} from 'lucide-react';

export const RankingsPage: React.FC = () => {
  const { player, otherPlayers, t, navigateTo } = useApp();

  const [leaderboardScope, setLeaderboardScope] = useState<'city' | 'club' | 'friends'>('city');

  // Combine player with others and sort by ELO descending
  const allRanked = [player, ...otherPlayers].sort((a, b) => b.eloRating - a.eloRating);

  const top1 = allRanked[0];
  const top2 = allRanked[1];
  const top3 = allRanked[2];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="volt-badge" style={{ marginBottom: 8 }}>
            <Trophy size={14} /> Official ELO Ratings
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>
            {t.compete.leaderboard}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: 4 }}>
            Real-time calculated padel standings across Dubai, home clubs, and peer groups.
          </p>
        </div>

        {/* Scope Tabs */}
        <div className="view-toggle-pill">
          <button
            className={`view-toggle-btn ${leaderboardScope === 'city' ? 'active' : ''}`}
            onClick={() => setLeaderboardScope('city')}
          >
            Dubai City
          </button>
          <button
            className={`view-toggle-btn ${leaderboardScope === 'club' ? 'active' : ''}`}
            onClick={() => setLeaderboardScope('club')}
          >
            Downtown Club
          </button>
          <button
            className={`view-toggle-btn ${leaderboardScope === 'friends' ? 'active' : ''}`}
            onClick={() => setLeaderboardScope('friends')}
          >
            Friends & Rivals
          </button>
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 20,
        alignItems: 'end'
      }}>
        {/* Rank 2 (Silver) */}
        {top2 && (
          <div className="bento-card" style={{
            textAlign: 'center',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            padding: 24,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(14, 19, 31, 0.95) 100%)'
          }}>
            <div style={{
              display: 'inline-block',
              background: '#94A3B8',
              color: '#080B11',
              fontWeight: 900,
              fontSize: '0.82rem',
              padding: '2px 10px',
              borderRadius: 999,
              marginBottom: 12
            }}>
              #2 SILVER
            </div>
            <img
              src={top2.avatar}
              alt={top2.name}
              style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', border: '3px solid #94A3B8' }}
            />
            <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{top2.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{top2.city}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#94A3B8' }}>
              {top2.eloRating} ELO
            </div>
          </div>
        )}

        {/* Rank 1 (Gold / Champion) */}
        {top1 && (
          <div className="bento-card" style={{
            textAlign: 'center',
            border: '2px solid var(--brand-volt)',
            padding: '32px 24px',
            boxShadow: '0 0 30px var(--brand-volt-glow)',
            background: 'linear-gradient(180deg, rgba(0, 245, 118, 0.1) 0%, rgba(14, 19, 31, 0.98) 100%)'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'var(--brand-volt)',
              color: '#080B11',
              fontWeight: 900,
              fontSize: '0.85rem',
              padding: '3px 12px',
              borderRadius: 999,
              marginBottom: 14,
              boxShadow: '0 0 10px var(--brand-volt-glow)'
            }}>
              👑 #1 CHAMPION
            </div>
            <img
              src={top1.avatar}
              alt={top1.name}
              style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 14px', border: '4px solid var(--brand-volt)' }}
            />
            <div style={{ fontWeight: 900, fontSize: '1.25rem' }}>{top1.name}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--brand-volt-bright)', marginBottom: 8 }}>{top1.city}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--brand-volt)' }}>
              {top1.eloRating} ELO
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Win Rate: {top1.winRate}% • {top1.wins}W - {top1.losses}L
            </div>
          </div>
        )}

        {/* Rank 3 (Bronze) */}
        {top3 && (
          <div className="bento-card" style={{
            textAlign: 'center',
            border: '1px solid rgba(255, 94, 54, 0.3)',
            padding: 24,
            background: 'linear-gradient(180deg, rgba(255, 94, 54, 0.05) 0%, rgba(14, 19, 31, 0.95) 100%)'
          }}>
            <div style={{
              display: 'inline-block',
              background: '#FF5E36',
              color: '#080B11',
              fontWeight: 900,
              fontSize: '0.82rem',
              padding: '2px 10px',
              borderRadius: 999,
              marginBottom: 12
            }}>
              #3 BRONZE
            </div>
            <img
              src={top3.avatar}
              alt={top3.name}
              style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', border: '3px solid #FF5E36' }}
            />
            <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{top3.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{top3.city}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#FF5E36' }}>
              {top3.eloRating} ELO
            </div>
          </div>
        )}
      </div>

      {/* FULL LEADERBOARD TABLE */}
      <div className="bento-card">
        <div className="bento-header">
          <div className="bento-title">
            <Shield size={20} color="var(--brand-volt)" /> Full Leaderboard Standings
          </div>
          <span className="volt-badge">
            Updated Post-Match
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="portal-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Skill Level</th>
                <th>Style</th>
                <th>Streak</th>
                <th>Win Rate</th>
                <th>Official ELO</th>
              </tr>
            </thead>
            <tbody>
              {allRanked.map((p, index) => {
                const isMe = p.id === player.id;
                return (
                  <tr
                    key={p.id}
                    style={{
                      background: isMe ? 'rgba(0, 245, 118, 0.06)' : 'transparent',
                      fontWeight: isMe ? 700 : 400
                    }}
                  >
                    <td style={{ fontWeight: 800, color: index < 3 ? 'var(--brand-volt)' : 'var(--text-secondary)' }}>
                      #{index + 1}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img
                          src={p.avatar}
                          alt={p.name}
                          style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: isMe ? '2px solid var(--brand-volt)' : 'none' }}
                        />
                        <span>{p.name} {isMe && '(You)'}</span>
                      </div>
                    </td>
                    <td>
                      <span className="volt-badge" style={{ fontSize: '0.7rem' }}>
                        {p.skillLevel.toFixed(1)}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {p.playingStyle}
                    </td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#FF5E36', fontSize: '0.85rem', fontWeight: 700 }}>
                        <Flame size={14} fill="#FF5E36" /> {p.activityStreakWeeks}w
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {p.winRate}% ({p.wins}W - {p.losses}L)
                    </td>
                    <td style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                      {p.eloRating}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
