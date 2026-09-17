import React from 'react';
import { Zap, Plus, Search, Calendar, MapPin, Award, Users, ChevronRight, Trophy, Flame } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const HomeFeedScreen: React.FC = () => {
  const { player, matches, clubs, challenges, navigateTo, setSelectedMatchId, setSelectedClubId, setSelectedPlayerId, otherPlayers } = useApp();

  const topMatch = matches.find(m => m.status === 'open');
  const activeWeeklyChallenge = challenges[0];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Player Profile Quick Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #152238 0%, #0E1624 100%)',
            border: '1px solid var(--border-highlight)',
            borderRadius: 'var(--radius-lg)',
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <img
                src={player.avatar}
                alt={player.name}
                style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--brand-volt)' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  background: 'var(--brand-volt)',
                  color: '#080B11',
                  fontSize: '0.62rem',
                  fontWeight: 900,
                  padding: '1px 5px',
                  borderRadius: 999
                }}
              >
                {player.skillLevel.toFixed(1)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Welcome back,</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
                {player.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span className="badge-volt">ELO {player.eloRating}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>• {player.city}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 94, 54, 0.1)',
              border: '1px solid rgba(255, 94, 54, 0.3)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--brand-clay)', fontSize: '0.9rem', fontWeight: 800 }}>
              <Flame size={16} />
              <span>{player.activityStreakWeeks} Wk</span>
            </div>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Streak</span>
          </div>
        </div>

        {/* Quick Action Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <button
            className="btn-secondary"
            style={{ flexDirection: 'column', padding: 12, background: 'var(--bg-card)', gap: 6 }}
            onClick={() => navigateTo('create_match')}
          >
            <div style={{ background: 'rgba(0, 245, 118, 0.15)', color: 'var(--brand-volt)', padding: 8, borderRadius: 10 }}>
              <Plus size={18} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Host Match</span>
          </button>

          <button
            className="btn-secondary"
            style={{ flexDirection: 'column', padding: 12, background: 'var(--bg-card)', gap: 6 }}
            onClick={() => navigateTo('find_match')}
          >
            <div style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: 8, borderRadius: 10 }}>
              <Search size={18} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Find Match</span>
          </button>

          <button
            className="btn-secondary"
            style={{ flexDirection: 'column', padding: 12, background: 'var(--bg-card)', gap: 6 }}
            onClick={() => navigateTo('club_listing')}
          >
            <div style={{ background: 'rgba(255, 94, 54, 0.15)', color: 'var(--brand-clay)', padding: 8, borderRadius: 10 }}>
              <Calendar size={18} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Book Court</span>
          </button>
        </div>

        {/* Top AI Match Recommendation Card */}
        {topMatch && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Zap size={16} color="var(--brand-volt)" />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 800, color: '#FFF' }}>
                  AI Recommended Match
                </span>
              </div>
              <span
                style={{ fontSize: '0.75rem', color: 'var(--brand-volt)', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => {
                  setSelectedMatchId(topMatch.id);
                  navigateTo('match_recommendation');
                }}
              >
                Why Match? &gt;
              </span>
            </div>

            <div
              className="rally-card"
              style={{
                background: 'linear-gradient(145deg, #16243A 0%, #10192A 100%)',
                borderColor: 'rgba(0, 245, 118, 0.35)',
                boxShadow: '0 8px 24px rgba(0, 245, 118, 0.12)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge-volt">🎯 {topMatch.aiCompatibilityScore}% Compatibility</span>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#FFF', marginTop: 6 }}>
                    {topMatch.title}
                  </h3>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                  €{topMatch.feePerPlayer}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <span>📅 {topMatch.date} • {topMatch.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <MapPin size={13} />
                <span>{topMatch.clubName}</span>
              </div>

              {/* Players Joined Avatars */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', marginLeft: 4 }}>
                    {topMatch.players.map((p, idx) => (
                      <img
                        key={p.id}
                        src={p.avatar}
                        alt={p.name}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          marginLeft: idx === 0 ? 0 : -8,
                          border: '2px solid #0E1624'
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-volt)', fontWeight: 700 }}>
                    {topMatch.players.length}/4 Players (1 spot open!)
                  </span>
                </div>

                <button
                  className="btn-volt"
                  style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                  onClick={() => {
                    setSelectedMatchId(topMatch.id);
                    navigateTo('match_detail', { matchId: topMatch.id });
                  }}
                >
                  Join Match
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Challenge Banner */}
        {activeWeeklyChallenge && (
          <div
            className="rally-card"
            style={{
              background: 'linear-gradient(135deg, #1E1A2E 0%, #131422 100%)',
              borderColor: 'rgba(168, 85, 247, 0.3)',
              cursor: 'pointer'
            }}
            onClick={() => navigateTo('challenges')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Trophy size={16} color="#C084FC" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#C084FC', textTransform: 'uppercase' }}>
                  Weekly Quest: {activeWeeklyChallenge.title}
                </span>
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--brand-lime)', fontWeight: 800 }}>
                +{activeWeeklyChallenge.xpReward} XP
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: -4 }}>
              {activeWeeklyChallenge.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 6, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 999, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${(activeWeeklyChallenge.current / activeWeeklyChallenge.target) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #A855F7 0%, #00F576 100%)'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#FFF' }}>
                {activeWeeklyChallenge.current}/{activeWeeklyChallenge.target}
              </span>
            </div>
          </div>
        )}

        {/* Recommended Players / Nearby Rivals */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 800, color: '#FFF' }}>
              Recommended Players
            </span>
            <span
              style={{ fontSize: '0.75rem', color: 'var(--brand-volt)', cursor: 'pointer', fontWeight: 700 }}
              onClick={() => navigateTo('player_discovery')}
            >
              See All &gt;
            </span>
          </div>

          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {otherPlayers.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedPlayerId(p.id);
                  navigateTo('player_public_profile', { playerId: p.id });
                }}
                style={{
                  minWidth: 130,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  gap: 6
                }}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                  {p.name}
                </span>
                <span className="badge-tag" style={{ fontSize: '0.65rem' }}>
                  Lvl {p.skillLevel} • {p.playingStyle}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--brand-volt)', fontWeight: 800 }}>
                  ELO {p.eloRating}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Clubs */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 800, color: '#FFF' }}>
              Premier Courts
            </span>
            <span
              style={{ fontSize: '0.75rem', color: 'var(--brand-volt)', cursor: 'pointer', fontWeight: 700 }}
              onClick={() => navigateTo('club_listing')}
            >
              Explore Map &gt;
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {clubs.slice(0, 2).map(club => (
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
                <img
                  src={club.imageUrl}
                  alt={club.name}
                  style={{ width: '100%', height: 110, objectFit: 'cover' }}
                />
                <div style={{ padding: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFF' }}>{club.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700 }}>★ {club.rating}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    <MapPin size={12} />
                    <span>{club.location} • {club.distance} • {club.availableCourts} courts available</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
