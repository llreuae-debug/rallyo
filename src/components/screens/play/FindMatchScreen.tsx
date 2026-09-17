import React, { useState } from 'react';
import { Search, Filter, Clock, MapPin, Sliders, ArrowRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const FindMatchScreen: React.FC = () => {
  const { matches, navigateTo, setSelectedMatchId } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'doubles' | 'singles'>('all');
  const [onlyOpenSpots, setOnlyOpenSpots] = useState(true);
  const [maxDistance, setMaxDistance] = useState(15);

  const filteredMatches = matches.filter(m => {
    if (searchQuery && !m.title.toLowerCase().includes(searchQuery.toLowerCase()) && !m.clubName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedFormat !== 'all' && m.format !== selectedFormat) return false;
    if (onlyOpenSpots && m.players.length >= 4) return false;
    return true;
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Find Matches" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--text-muted)' }} />
          <input
            className="rally-input"
            style={{ paddingLeft: 38 }}
            placeholder="Search by club, area or match name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Format & Filters Chips */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {(['all', 'doubles', 'singles'] as const).map(fmt => (
            <button
              key={fmt}
              type="button"
              className="btn-secondary"
              style={{
                fontSize: '0.74rem',
                textTransform: 'capitalize',
                padding: '6px 12px',
                borderRadius: 999,
                borderColor: selectedFormat === fmt ? 'var(--brand-volt)' : 'var(--border-subtle)',
                background: selectedFormat === fmt ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                color: selectedFormat === fmt ? 'var(--brand-volt)' : 'var(--text-secondary)'
              }}
              onClick={() => setSelectedFormat(fmt)}
            >
              {fmt === 'all' ? 'All Formats' : fmt}
            </button>
          ))}

          <button
            type="button"
            className="btn-secondary"
            style={{
              fontSize: '0.74rem',
              padding: '6px 12px',
              borderRadius: 999,
              marginLeft: 'auto',
              borderColor: onlyOpenSpots ? 'var(--brand-volt)' : 'var(--border-subtle)',
              background: onlyOpenSpots ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
              color: onlyOpenSpots ? 'var(--brand-volt)' : 'var(--text-secondary)'
            }}
            onClick={() => setOnlyOpenSpots(!onlyOpenSpots)}
          >
            {onlyOpenSpots ? 'Open Spots Only' : 'Show All'}
          </button>
        </div>

        {/* Distance Slider */}
        <div className="rally-card" style={{ padding: 12, background: 'var(--bg-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Search Radius
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--brand-volt)', fontWeight: 800 }}>
              Within {maxDistance} km
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="30"
            value={maxDistance}
            onChange={e => setMaxDistance(parseInt(e.target.value))}
            style={{ accentColor: 'var(--brand-volt)', marginTop: 6 }}
          />
        </div>

        {/* Matches Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredMatches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '0.88rem' }}>No matches found matching your filters.</p>
              <button
                className="btn-volt"
                style={{ margin: '12px auto 0', fontSize: '0.8rem', padding: '8px 16px' }}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFormat('all');
                  setOnlyOpenSpots(false);
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredMatches.map(m => (
              <div
                key={m.id}
                className="rally-card"
                onClick={() => {
                  setSelectedMatchId(m.id);
                  navigateTo('match_detail', { matchId: m.id });
                }}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge-volt" style={{ fontSize: '0.66rem' }}>
                      Level {m.skillRange.min} - {m.skillRange.max}
                    </span>
                    <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#FFF', marginTop: 4 }}>
                      {m.title}
                    </h4>
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                    €{m.feePerPlayer}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>📅 {m.date} • {m.time}</span>
                  <span>•</span>
                  <span>{m.clubName}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex' }}>
                      {m.players.map((p, idx) => (
                        <img
                          key={p.id}
                          src={p.avatar}
                          alt={p.name}
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft: idx === 0 ? 0 : -6,
                            border: '1.5px solid #080B11'
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--brand-volt)', fontWeight: 700 }}>
                      {4 - m.players.length} spots remaining
                    </span>
                  </div>

                  <span style={{ fontSize: '0.74rem', color: 'var(--brand-volt)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    View & Join &gt;
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
