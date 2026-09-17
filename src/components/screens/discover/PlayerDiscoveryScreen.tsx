import React, { useState } from 'react';
import { Search, MapPin, Zap, UserPlus, MessageSquare, Filter } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const PlayerDiscoveryScreen: React.FC = () => {
  const { otherPlayers, navigateTo, setSelectedPlayerId, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [handFilter, setHandFilter] = useState<'all' | 'Right' | 'Left'>('all');

  const filtered = otherPlayers.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (handFilter !== 'all' && p.dominantHand !== handFilter) return false;
    return true;
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Padel Partners" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--text-muted)' }} />
          <input
            className="rally-input"
            style={{ paddingLeft: 38 }}
            placeholder="Search players by name or level..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Hand Filter */}
        <div style={{ display: 'flex', gap: 8 }}>
          {(['all', 'Right', 'Left'] as const).map(h => (
            <button
              key={h}
              type="button"
              className="btn-secondary"
              style={{
                fontSize: '0.74rem',
                padding: '6px 12px',
                borderRadius: 999,
                borderColor: handFilter === h ? 'var(--brand-volt)' : 'var(--border-subtle)',
                background: handFilter === h ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                color: handFilter === h ? 'var(--brand-volt)' : 'var(--text-secondary)'
              }}
              onClick={() => setHandFilter(h)}
            >
              {h === 'all' ? 'All Hands' : `${h} Handed`}
            </button>
          ))}
        </div>

        {/* Players List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(p => (
            <div
              key={p.id}
              className="rally-card"
              style={{ background: 'var(--bg-card)', cursor: 'pointer' }}
              onClick={() => {
                setSelectedPlayerId(p.id);
                navigateTo('player_public_profile', { playerId: p.id });
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={p.avatar} alt={p.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(0, 245, 118, 0.3)' }} />
                  <div>
                    <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#FFF' }}>{p.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <MapPin size={11} />
                      <span>{p.city} • {p.dominantHand} Handed</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                      <span className="badge-tag" style={{ fontSize: '0.64rem' }}>
                        Lvl {p.skillLevel}
                      </span>
                      <span className="badge-tag" style={{ fontSize: '0.64rem' }}>
                        {p.playingStyle}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge-volt" style={{ fontSize: '0.72rem' }}>
                    ELO {p.eloRating}
                  </span>
                  <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)', display: 'block', marginTop: 4 }}>
                    {p.winRate}% Win Rate
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 4, paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ flex: 1, padding: '6px 8px', fontSize: '0.72rem' }}
                  onClick={e => {
                    e.stopPropagation();
                    showToast(`Invited ${p.name} to match!`);
                  }}
                >
                  <UserPlus size={13} />
                  <span>Invite to Match</span>
                </button>
                <button
                  type="button"
                  className="btn-volt"
                  style={{ padding: '6px 12px', fontSize: '0.72rem' }}
                  onClick={e => {
                    e.stopPropagation();
                    navigateTo('messages');
                  }}
                >
                  <MessageSquare size={13} />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
