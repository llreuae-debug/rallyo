import React from 'react';
import { Trophy, Calendar, MapPin, Users, Award, ChevronRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const TournamentListingScreen: React.FC = () => {
  const { tournaments, navigateTo, setSelectedTournamentId } = useApp();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Championships & Cups" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tournaments.map(t => (
            <div
              key={t.id}
              className="rally-card"
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => {
                setSelectedTournamentId(t.id);
                navigateTo('tournament_detail', { tournamentId: t.id });
              }}
            >
              <div style={{ position: 'relative' }}>
                <img src={t.bannerUrl} alt={t.title} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'rgba(8, 11, 17, 0.85)',
                    padding: '4px 8px',
                    borderRadius: 999,
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    color: 'var(--brand-volt)'
                  }}
                >
                  {t.format.toUpperCase()} CUP
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    background: 'rgba(8, 11, 17, 0.85)',
                    padding: '4px 8px',
                    borderRadius: 8,
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#FFF'
                  }}
                >
                  Entry: €{t.entryFee} / pair
                </div>
              </div>

              <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>{t.title}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={13} />
                    <span>{t.clubName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Calendar size={13} />
                    <span>{t.date} • {t.time}</span>
                  </div>
                </div>

                <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 8, padding: '6px 10px', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Trophy size={14} color="#F59E0B" />
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#F59E0B' }}>
                    Prize Pool: {t.prizePool}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border-subtle)', marginTop: 4 }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--brand-volt)', fontWeight: 700 }}>
                    👥 {t.registeredCount}/{t.maxPairs} Pairs Registered
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--brand-volt)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Bracket & Register &gt;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
