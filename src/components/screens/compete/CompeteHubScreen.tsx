import React from 'react';
import { Trophy, Award, Flame, Zap, ChevronRight, Swords, ShieldCheck, Users } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const CompeteHubScreen: React.FC = () => {
  const { player, tournaments, challenges, navigateTo, setSelectedTournamentId } = useApp();

  const activeTourn = tournaments[0];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Compete Hub" />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* ELO Rank Hero Card */}
        <div
          className="rally-card"
          style={{
            background: 'linear-gradient(135deg, #152A3F 0%, #0D1625 100%)',
            borderColor: 'var(--brand-volt)',
            padding: 16
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--brand-volt)', textTransform: 'uppercase' }}>
              Official Player Calibration
            </span>
            <span className="badge-tag">Dubai Region</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '8px 0' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: '#FFF' }}>
              {player.eloRating}
            </span>
            <span style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--brand-volt)' }}>
              ELO Rating (Top 8%)
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button
              className="btn-secondary"
              style={{ flex: 1, padding: '8px 10px', fontSize: '0.76rem', background: 'rgba(0, 245, 118, 0.1)', color: 'var(--brand-volt)' }}
              onClick={() => navigateTo('rankings_leaderboard')}
            >
              <Trophy size={14} />
              <span>Leaderboards</span>
            </button>
            <button
              className="btn-secondary"
              style={{ flex: 1, padding: '8px 10px', fontSize: '0.76rem' }}
              onClick={() => navigateTo('challenges')}
            >
              <Zap size={14} />
              <span>Challenges</span>
            </button>
          </div>
        </div>

        {/* Action Navigation Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div
            className="rally-card"
            style={{ background: 'var(--bg-card)', cursor: 'pointer', padding: 14 }}
            onClick={() => navigateTo('tournament_listing')}
          >
            <div style={{ background: 'rgba(255, 94, 54, 0.15)', color: 'var(--brand-clay)', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF' }}>Tournaments</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Brackets & Cups</div>
            </div>
          </div>

          <div
            className="rally-card"
            style={{ background: 'var(--bg-card)', cursor: 'pointer', padding: 14 }}
            onClick={() => navigateTo('achievements')}
          >
            <div style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#C084FC', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF' }}>Achievements</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Badges & Streaks</div>
            </div>
          </div>
        </div>

        {/* Featured Tournament Spotlight */}
        {activeTourn && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.94rem', fontWeight: 800, color: '#FFF' }}>
                Featured Championship
              </span>
              <span
                style={{ fontSize: '0.75rem', color: 'var(--brand-volt)', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => navigateTo('tournament_listing')}
              >
                View All &gt;
              </span>
            </div>

            <div
              className="rally-card"
              style={{ background: 'var(--bg-card)', padding: 0, overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => {
                setSelectedTournamentId(activeTourn.id);
                navigateTo('tournament_detail', { tournamentId: activeTourn.id });
              }}
            >
              <div style={{ position: 'relative' }}>
                <img src={activeTourn.bannerUrl} alt={activeTourn.title} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(8, 11, 17, 0.85)', padding: '4px 8px', borderRadius: 999, fontSize: '0.68rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                  {activeTourn.format.toUpperCase()}
                </div>
              </div>

              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#FFF' }}>{activeTourn.title}</h4>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  📍 {activeTourn.clubName} • 📅 {activeTourn.date}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingTop: 6, borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.74rem', color: '#F59E0B', fontWeight: 700 }}>
                    Prize: {activeTourn.prizePool}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--brand-volt)', fontWeight: 700 }}>
                    {activeTourn.registeredCount}/{activeTourn.maxPairs} Pairs
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
