import React, { useState } from 'react';
import { Trophy, Medal, ArrowUp, ArrowDown, MapPin, Search } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const RankingsLeaderboardScreen: React.FC = () => {
  const { player, otherPlayers, navigateTo, setSelectedPlayerId } = useApp();
  const [scope, setScope] = useState<'city' | 'club' | 'friends'>('city');

  // Combined and sorted leaderboard
  const allRanked = [
    { ...player, rankDelta: '+2' },
    ...otherPlayers.map((p, i) => ({ ...p, rankDelta: i % 2 === 0 ? '+1' : '-1' }))
  ].sort((a, b) => b.eloRating - a.eloRating);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Official ELO Rankings" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Scope Selector */}
        <div style={{ display: 'flex', gap: 8 }}>
          {(['city', 'club', 'friends'] as const).map(s => (
            <button
              key={s}
              type="button"
              className="btn-secondary"
              style={{
                flex: 1,
                fontSize: '0.74rem',
                textTransform: 'capitalize',
                padding: '8px 4px',
                borderColor: scope === s ? 'var(--brand-volt)' : 'var(--border-subtle)',
                background: scope === s ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                color: scope === s ? 'var(--brand-volt)' : 'var(--text-secondary)'
              }}
              onClick={() => setScope(s)}
            >
              {s === 'city' ? 'Dubai City' : s === 'club' ? 'Downtown Club' : 'Friends'}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, alignItems: 'flex-end', paddingTop: 12 }}>
          {/* #2 Silver */}
          {allRanked[1] && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 6px',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSelectedPlayerId(allRanked[1].id);
                navigateTo('player_public_profile', { playerId: allRanked[1].id });
              }}
            >
              <div style={{ fontSize: '1rem', marginBottom: 2 }}>🥈</div>
              <img src={allRanked[1].avatar} alt="" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 4px' }} />
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {allRanked[1].name.split(' ')[0]}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--brand-volt)', fontWeight: 800 }}>
                {allRanked[1].eloRating}
              </div>
            </div>
          )}

          {/* #1 Gold */}
          {allRanked[0] && (
            <div
              style={{
                background: 'linear-gradient(145deg, #242D1C 0%, #121A28 100%)',
                border: '2px solid #F59E0B',
                borderRadius: 'var(--radius-md)',
                padding: '16px 6px',
                textAlign: 'center',
                transform: 'translateY(-10px)',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSelectedPlayerId(allRanked[0].id);
                navigateTo('player_public_profile', { playerId: allRanked[0].id });
              }}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: 2 }}>👑 🥇</div>
              <img src={allRanked[0].avatar} alt="" style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 4px', border: '2px solid #F59E0B' }} />
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {allRanked[0].name.split(' ')[0]}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: 900 }}>
                {allRanked[0].eloRating}
              </div>
            </div>
          )}

          {/* #3 Bronze */}
          {allRanked[2] && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(255, 94, 54, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 6px',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSelectedPlayerId(allRanked[2].id);
                navigateTo('player_public_profile', { playerId: allRanked[2].id });
              }}
            >
              <div style={{ fontSize: '1rem', marginBottom: 2 }}>🥉</div>
              <img src={allRanked[2].avatar} alt="" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 4px' }} />
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {allRanked[2].name.split(' ')[0]}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--brand-volt)', fontWeight: 800 }}>
                {allRanked[2].eloRating}
              </div>
            </div>
          )}
        </div>

        {/* Table List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
          {allRanked.map((p, index) => {
            const isMe = p.id === player.id;
            return (
              <div
                key={p.id}
                style={{
                  background: isMe ? 'rgba(0, 245, 118, 0.12)' : 'var(--bg-card)',
                  border: `1px solid ${isMe ? 'var(--brand-volt)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (isMe) navigateTo('own_profile');
                  else {
                    setSelectedPlayerId(p.id);
                    navigateTo('player_public_profile', { playerId: p.id });
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 800, color: isMe ? 'var(--brand-volt)' : 'var(--text-muted)', width: 22 }}>
                    #{index + 1}
                  </span>
                  <img src={p.avatar} alt={p.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFF' }}>
                      {p.name} {isMe && '(You)'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Level {p.skillLevel} • {p.playingStyle}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div>
                    <span style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                      {p.eloRating}
                    </span>
                    <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)', display: 'block' }}>
                      ELO
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: p.rankDelta.startsWith('+') ? 'var(--brand-volt)' : '#EF4444', fontWeight: 700 }}>
                    {p.rankDelta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
