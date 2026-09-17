import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame, Zap, Trophy, Swords, Compass, ArrowRight,
  MapPin, Clock, Users, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { player, t, navigateTo, matches, clubs, challenges, formatMoney, joinMatch } = useApp();

  const recommendedMatch = matches[0];
  const activeQuest = challenges[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* PLAYER HERO STATS BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(14, 24, 42, 0.95) 0%, rgba(8, 12, 20, 0.98) 100%)',
        border: '1px solid rgba(0, 245, 118, 0.2)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 24,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <img
            src={player.avatar}
            alt={player.name}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              border: '3px solid var(--brand-volt)',
              boxShadow: '0 0 16px var(--brand-volt-glow)',
              objectFit: 'cover'
            }}
          />
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {t.dashboard.welcome}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800 }}>
              {player.name}
            </h1>
            <div style={{ display: 'flex', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
              <span className="volt-badge">
                Level {player.skillLevel.toFixed(1)} • {player.playingStyle}
              </span>
              <span className="volt-badge" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38BDF8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                {player.city}
              </span>
            </div>
          </div>
        </div>

        {/* ELO & Streak Badges */}
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.dashboard.eloRating}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
              {player.eloRating}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--brand-volt-bright)', fontWeight: 600 }}>
              +18 this week
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.dashboard.streak}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: '#FF5E36', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <Flame size={20} fill="#FF5E36" /> {player.activityStreakWeeks}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
              Active Rallyer
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS BAR */}
      <section style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <button className="btn-volt" onClick={() => navigateTo('play')}>
          <Swords size={18} /> {t.dashboard.quickHost}
        </button>
        <button className="btn-secondary" onClick={() => navigateTo('play')}>
          <Zap size={18} /> {t.dashboard.quickFind}
        </button>
        <button className="btn-secondary" onClick={() => navigateTo('discover')}>
          <Compass size={18} /> {t.dashboard.quickBook}
        </button>
      </section>

      {/* DASHBOARD BENTO GRID */}
      <section className="bento-grid">
        {/* Left Column: AI Match Recommendation Card */}
        <div className="bento-card bento-col-8">
          <div className="bento-header">
            <div className="bento-title">
              <Zap size={20} color="var(--brand-volt)" /> {t.dashboard.aiRecommendation}
            </div>
            <span className="volt-badge" style={{ background: 'rgba(0, 245, 118, 0.2)' }}>
              94% Match Score
            </span>
          </div>

          {recommendedMatch && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(0, 245, 118, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>
                    {recommendedMatch.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={14} /> {recommendedMatch.clubName}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={14} /> {recommendedMatch.time}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                    {formatMoney(recommendedMatch.fee_per_player_minor || 6000, recommendedMatch.currency_code || 'AED')}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {t.play.feePerPlayer}
                  </div>
                </div>
              </div>

              {/* AI Explanation Pill */}
              <div style={{
                background: 'rgba(0, 245, 118, 0.08)',
                border: '1px solid rgba(0, 245, 118, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                fontSize: '0.82rem',
                color: 'var(--brand-volt-bright)'
              }}>
                {recommendedMatch.aiExplanation}
              </div>

              {/* Player Lineup Roster */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', marginLeft: 8 }}>
                    {recommendedMatch.players.map((p, i) => (
                      <img
                        key={p.id}
                        src={p.avatar}
                        alt={p.name}
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          border: '2px solid var(--bg-card)',
                          marginLeft: i > 0 ? -10 : 0
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {recommendedMatch.players.length}/4 Spots Filled
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                    onClick={() => navigateTo('match_detail', { matchId: recommendedMatch.id })}
                  >
                    Match Details
                  </button>
                  <button
                    className="btn-volt"
                    style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                    onClick={() => joinMatch(recommendedMatch.id)}
                  >
                    {t.dashboard.joinMatch}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Weekly Quest Card */}
        <div className="bento-card bento-col-4">
          <div className="bento-header">
            <div className="bento-title">
              <Trophy size={18} color="#FF5E36" /> {t.dashboard.weeklyChallenge}
            </div>
            <span className="volt-badge" style={{ background: 'rgba(255, 94, 54, 0.15)', color: '#FF5E36', borderColor: 'rgba(255, 94, 54, 0.3)' }}>
              {activeQuest?.expiresAt}
            </span>
          </div>

          {activeQuest && (
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>
                {activeQuest.title}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                {activeQuest.description}
              </p>

              {/* Progress Bar */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 6 }}>
                  <span>Progress</span>
                  <span style={{ fontWeight: 700, color: 'var(--brand-volt)' }}>
                    {activeQuest.current} / {activeQuest.target} {activeQuest.unit}
                  </span>
                </div>
                <div style={{ width: '100%', height: 8, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{
                    width: `${(activeQuest.current / activeQuest.target) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #00F576, #39FF88)',
                    borderRadius: 999
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <span className="volt-badge">
                  +{activeQuest.xpReward} XP
                </span>
                <button
                  onClick={() => navigateTo('challenges')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--brand-volt)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    cursor: 'pointer'
                  }}
                >
                  All Quests <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lower Row: Premier Clubs Discovery */}
        <div className="bento-card bento-col-12">
          <div className="bento-header">
            <div className="bento-title">
              <Compass size={20} color="#38BDF8" /> {t.dashboard.premierCourts}
            </div>
            <button
              onClick={() => navigateTo('discover')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--brand-volt)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Explore All Clubs & Radar &rarr;
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {clubs.slice(0, 3).map((club) => (
              <div
                key={club.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => navigateTo('club_detail', { clubId: club.id })}
              >
                <img
                  src={club.imageUrl}
                  alt={club.name}
                  style={{ width: '100%', height: 130, objectFit: 'cover' }}
                />
                <div style={{ padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{club.name}</div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--brand-volt)', fontWeight: 700 }}>
                      ★ {club.rating}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                    {club.location} • {club.distance}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {club.availableCourts} courts available
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF' }}>
                      {formatMoney(club.price_per_hour_minor || 22000, club.operating_currency || 'AED')}/hr
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
