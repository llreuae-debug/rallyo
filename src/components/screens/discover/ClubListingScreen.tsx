import React, { useState } from 'react';
import { Map, List, MapPin, Star, Clock, ChevronRight, Filter } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const ClubListingScreen: React.FC = () => {
  const { clubs, navigateTo, setSelectedClubId } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Padel Clubs & Courts" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Toggle Mode */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Showing {clubs.length} verified venues
          </span>

          <div className="view-toggle-pill">
            <button
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={14} />
              <span>List</span>
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <Map size={14} />
              <span>Map</span>
            </button>
          </div>
        </div>

        {/* Map View Simulation */}
        {viewMode === 'map' ? (
          <div
            style={{
              height: 380,
              background: '#0D1624',
              borderRadius: 'var(--radius-lg)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Map grid lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(0, 245, 118, 0.15) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Radar Sweep Effect */}
            <div
              style={{
                position: 'absolute',
                width: 200,
                height: 200,
                borderRadius: '50%',
                border: '1px solid rgba(0, 245, 118, 0.3)',
                boxShadow: '0 0 30px rgba(0, 245, 118, 0.1)'
              }}
            />

            {/* Club Pins */}
            {clubs.map((c, i) => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedClubId(c.id);
                  navigateTo('club_detail', { clubId: c.id });
                }}
                style={{
                  position: 'absolute',
                  top: 80 + i * 65,
                  left: 60 + (i % 2) * 160,
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--brand-volt)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 16px rgba(0, 245, 118, 0.4)',
                  zIndex: 20
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-volt)' }} />
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FFF' }}>{c.name.split(' ')[0]}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--brand-volt)', fontWeight: 800 }}>€{c.pricePerHour}</span>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {clubs.map(club => (
              <div
                key={club.id}
                className="rally-card"
                onClick={() => {
                  setSelectedClubId(club.id);
                  navigateTo('club_detail', { clubId: club.id });
                }}
                style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
              >
                <div style={{ position: 'relative' }}>
                  <img src={club.imageUrl} alt={club.name} style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: 'rgba(8, 11, 17, 0.85)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 8px',
                      borderRadius: 999,
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#F59E0B'
                    }}
                  >
                    ★ {club.rating} ({club.reviewCount})
                  </div>
                </div>

                <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>{club.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        <MapPin size={12} />
                        <span>{club.address} • {club.distance}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--brand-volt)' }}>
                        €{club.pricePerHour}
                      </span>
                      <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)', display: 'block' }}>
                        / hour
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {club.amenities.slice(0, 4).map((a, idx) => (
                      <span key={idx} className="badge-tag" style={{ fontSize: '0.66rem' }}>
                        {a}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--brand-volt)', fontWeight: 700 }}>
                      ⚡ {club.availableCourts} courts available today
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--brand-volt)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                      Book Court &gt;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
