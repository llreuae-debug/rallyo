import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar, Users, Trophy, ChevronRight, Award } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const DiscoverHubScreen: React.FC = () => {
  const { clubs, otherPlayers, tournaments, navigateTo, setSelectedClubId, setSelectedPlayerId, setSelectedTournamentId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<'all' | 'clubs' | 'players' | 'tournaments'>('all');

  const filteredClubs = clubs.filter(c =>
    !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlayers = otherPlayers.filter(p =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Discover" />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Universal Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--text-muted)' }} />
          <input
            className="rally-input"
            style={{ paddingLeft: 38 }}
            placeholder="Search clubs, courts, players, coaches..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'clubs', label: '🏛️ Clubs & Courts' },
            { id: 'players', label: '🎾 Players' },
            { id: 'tournaments', label: '🏆 Tournaments' }
          ].map(cat => (
            <button
              key={cat.id}
              type="button"
              className="btn-secondary"
              style={{
                fontSize: '0.75rem',
                padding: '6px 12px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                borderColor: category === cat.id ? 'var(--brand-volt)' : 'var(--border-subtle)',
                background: category === cat.id ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                color: category === cat.id ? 'var(--brand-volt)' : 'var(--text-secondary)'
              }}
              onClick={() => setCategory(cat.id as any)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clubs Section */}
        {(category === 'all' || category === 'clubs') && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.94rem', fontWeight: 800, color: '#FFF' }}>
                Featured Padel Clubs
              </span>
              <span
                style={{ fontSize: '0.75rem', color: 'var(--brand-volt)', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => navigateTo('club_listing')}
              >
                Map View &gt;
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filteredClubs.slice(0, 2).map(club => (
                <div
                  key={club.id}
                  onClick={() => {
                    setSelectedClubId(club.id);
                    navigateTo('club_detail', { clubId: club.id });
                  }}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                >
                  <img src={club.imageUrl} alt={club.name} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                  <div style={{ padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#FFF' }}>{club.name}</h4>
                      <span style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: 700 }}>★ {club.rating}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
                      <MapPin size={12} />
                      <span>{club.location} • {club.distance}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                      {club.amenities.slice(0, 3).map((a, i) => (
                        <span key={i} className="badge-tag" style={{ fontSize: '0.65rem' }}>{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Players Section */}
        {(category === 'all' || category === 'players') && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.94rem', fontWeight: 800, color: '#FFF' }}>
                Discover Padel Partners
              </span>
              <span
                style={{ fontSize: '0.75rem', color: 'var(--brand-volt)', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => navigateTo('player_discovery')}
              >
                All Players &gt;
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filteredPlayers.slice(0, 3).map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedPlayerId(p.id);
                    navigateTo('player_public_profile', { playerId: p.id });
                  }}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={p.avatar} alt={p.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFF' }}>{p.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        Level {p.skillLevel} • {p.playingStyle} • {p.dominantHand}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge-volt" style={{ fontSize: '0.68rem' }}>ELO {p.eloRating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
