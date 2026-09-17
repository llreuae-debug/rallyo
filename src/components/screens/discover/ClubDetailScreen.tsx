import React from 'react';
import { MapPin, Star, Clock, ShieldCheck, Check, ArrowRight, Phone, Share2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const ClubDetailScreen: React.FC = () => {
  const { clubs, courts, selectedClubId, navigateTo } = useApp();
  const club = clubs.find(c => c.id === selectedClubId) || clubs[0];
  const clubCourts = courts.filter(crt => crt.clubId === club.id);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header
        title={club.name}
        showBack
        rightAction={
          <button className="header-btn" title="Share Club">
            <Share2 size={16} />
          </button>
        }
      />

      <div className="scroll-container" style={{ paddingBottom: 28 }}>
        {/* Cover Image Banner */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 160 }}>
          <img src={club.imageUrl} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              background: 'rgba(8, 11, 17, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: '0.74rem',
              fontWeight: 800,
              color: 'var(--brand-volt)'
            }}
          >
            {club.courtsCount} Championship Courts
          </div>
        </div>

        {/* Club Information */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
                {club.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                <MapPin size={13} />
                <span>{club.address}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(245, 158, 11, 0.15)', padding: '4px 8px', borderRadius: 8 }}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#F59E0B' }}>{club.rating}</span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 }}>
            {club.description}
          </p>
        </div>

        {/* Operating Hours */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-card)', padding: 10, borderRadius: 'var(--radius-md)' }}>
          <Clock size={16} color="var(--brand-volt)" />
          <div style={{ fontSize: '0.78rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Daily Hours: </span>
            <strong style={{ color: '#FFF' }}>{club.operatingHours}</strong>
          </div>
        </div>

        {/* Amenities Grid */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 800, color: '#FFF', marginBottom: 8 }}>
            Club Amenities & Infrastructure
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {club.amenities.map((amenity, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.76rem',
                  color: 'var(--text-primary)'
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-volt)' }} />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Courts Preview */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 800, color: '#FFF', marginBottom: 8 }}>
            Courts Available at Venue
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {clubCourts.map(crt => (
              <div
                key={crt.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFF' }}>{crt.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {crt.type.replace('_', ' ')} • {crt.surface.replace('_', ' ')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                    €{crt.hourlyRate}
                  </span>
                  <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)', display: 'block' }}>/hr</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Court CTA */}
        <button
          className="btn-volt"
          style={{ width: '100%', marginTop: 8 }}
          onClick={() => navigateTo('court_booking', { clubId: club.id })}
        >
          <span>Select Date & Book Court</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
