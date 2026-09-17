import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass, MapPin, Star, Filter, List, Map as MapIcon,
  CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2
} from 'lucide-react';

export const DiscoverPage: React.FC = () => {
  const { clubs, navigateTo, formatMoney, t } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClubs = clubs.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedAmenity === 'all') return matchesSearch;
    return matchesSearch && c.amenities.some(a => a.toLowerCase().includes(selectedAmenity.toLowerCase()));
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* DISCOVER HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="volt-badge" style={{ marginBottom: 8 }}>
            <Compass size={14} /> Venues, Courts & Coaches
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>
            {t.discover.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: 4 }}>
            Explore championship panoramic clubs with real-time court availability and instant booking.
          </p>
        </div>

        {/* View Toggle */}
        <div className="view-toggle-pill">
          <button
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={14} /> {t.discover.listView}
          </button>
          <button
            className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            <MapIcon size={14} /> {t.discover.mapView}
          </button>
        </div>
      </div>

      {/* SEARCH & AMENITY CHIPS */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="web-search-box"
          style={{ width: 320 }}
          placeholder="Search by club name, city or district..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Venues' },
            { id: 'panoramic', label: 'Panoramic Glass' },
            { id: 'mondo', label: 'Mondo Supercourt' },
            { id: 'indoor', label: 'Indoor A/C' },
            { id: 'rooftop', label: 'Rooftop Scenic' }
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setSelectedAmenity(chip.id)}
              className="btn-secondary"
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                background: selectedAmenity === chip.id ? 'rgba(0, 245, 118, 0.15)' : 'transparent',
                borderColor: selectedAmenity === chip.id ? 'var(--brand-volt)' : 'var(--border-subtle)',
                color: selectedAmenity === chip.id ? 'var(--brand-volt)' : 'var(--text-secondary)'
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAP VIEW RADAR (If selected) */}
      {viewMode === 'map' && (
        <div style={{
          background: 'radial-gradient(circle at 50% 50%, #15253F 0%, #0A101C 80%)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(0, 245, 118, 0.3)',
          height: 380,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Radar Circles */}
          <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', border: '1px dashed rgba(0, 245, 118, 0.25)' }} />
          <div style={{ position: 'absolute', width: 440, height: 440, borderRadius: '50%', border: '1px solid rgba(0, 245, 118, 0.15)' }} />

          {/* User Center Pin */}
          <div style={{
            position: 'absolute',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'var(--brand-volt)',
              boxShadow: '0 0 20px var(--brand-volt)',
              border: '3px solid #FFF'
            }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, marginTop: 4, background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: 4 }}>
              You Are Here
            </span>
          </div>

          {/* Club Pins on Radar */}
          {filteredClubs.map((club, idx) => {
            const positions = [
              { top: '28%', left: '32%' },
              { top: '35%', right: '28%' },
              { bottom: '26%', right: '35%' },
              { bottom: '32%', left: '26%' }
            ];
            const pos = positions[idx % positions.length];

            return (
              <div
                key={club.id}
                style={{
                  position: 'absolute',
                  ...pos,
                  zIndex: 20,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(14, 19, 31, 0.92)',
                  border: '1px solid var(--border-highlight)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.5)'
                }}
                onClick={() => navigateTo('club_detail', { clubId: club.id })}
              >
                <Building2 size={14} color="var(--brand-volt)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{club.name}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--brand-volt)' }}>★ {club.rating}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* CLUBS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bento-card"
            style={{
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onClick={() => navigateTo('club_detail', { clubId: club.id })}
          >
            <div style={{ position: 'relative', height: 190 }}>
              <img
                src={club.imageUrl}
                alt={club.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: 14,
                left: 14,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--brand-volt)',
                border: '1px solid rgba(0, 245, 118, 0.3)'
              }}>
                ★ {club.rating} ({club.reviewCount} reviews)
              </div>

              <div style={{
                position: 'absolute',
                bottom: 14,
                right: 14,
                background: 'rgba(8, 11, 17, 0.9)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#FFF'
              }}>
                {formatMoney(club.price_per_hour_minor || 22000, club.operating_currency || 'AED')}/hr
              </div>
            </div>

            <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4 }}>
                  {club.name}
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <MapPin size={14} /> {club.address} • {club.distance}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 14 }}>
                  {club.description}
                </p>

                {/* Amenities Tags */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                  {club.amenities.slice(0, 3).map((amenity, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.7rem',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--brand-volt)', fontWeight: 600 }}>
                  ● {club.availableCourts} {t.discover.availableCourts}
                </span>
                <button
                  className="btn-volt"
                  style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('court_booking', { clubId: club.id });
                  }}
                >
                  {t.discover.bookCourt}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
