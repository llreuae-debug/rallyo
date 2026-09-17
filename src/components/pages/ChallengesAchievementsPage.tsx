import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy, Flame, CheckCircle2, Star, Zap,
  Award, Sparkles, Shield, Gift, ChevronRight
} from 'lucide-react';

export const ChallengesAchievementsPage: React.FC = () => {
  const { challenges, completeChallenge, player, t } = useApp();

  const userBadges = player.badges || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* HEADER WITH XP LEVEL */}
      <div className="bento-card" style={{
        background: 'linear-gradient(135deg, rgba(14, 24, 42, 0.95) 0%, rgba(8, 12, 20, 0.98) 100%)',
        border: '1px solid rgba(0, 245, 118, 0.25)',
        padding: 32
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="volt-badge" style={{ marginBottom: 8 }}>
              <Zap size={14} /> Season 4 • Padel Pass
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>
              {t.compete.challenges} & {t.compete.achievements}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: 4 }}>
              Complete weekly training challenges, maintain playing streaks, and collect verified tournament badges.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Total Player XP
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--brand-volt)' }}>
              {player.xp} XP
            </div>
            <div style={{ fontSize: '0.75rem', color: '#38BDF8' }}>
              Level 14 Veteran
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 6 }}>
            <span>Level 14</span>
            <span>Next Level: 4,000 XP (550 XP remaining)</span>
            <span>Level 15</span>
          </div>
          <div style={{ width: '100%', height: 10, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              width: `${(player.xp / 4000) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00F576, #38BDF8)',
              borderRadius: 999
            }} />
          </div>
        </div>
      </div>

      {/* WEEKLY & SEASON QUESTS */}
      <div className="bento-card">
        <div className="bento-header">
          <div className="bento-title">
            <Trophy size={20} color="var(--brand-volt)" /> Active Weekly Quests
          </div>
          <span className="volt-badge">
            Resets in 3 Days
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {challenges.map((ch) => (
            <div
              key={ch.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: ch.completed ? '1px solid var(--brand-volt)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span className="volt-badge" style={{ fontSize: '0.68rem' }}>
                    {ch.category.toUpperCase()} QUEST
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-volt)', fontWeight: 700 }}>
                    +{ch.xpReward} XP
                  </span>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 4 }}>
                  {ch.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 14 }}>
                  {ch.description}
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 4 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                    <span style={{ fontWeight: 700, color: ch.completed ? 'var(--brand-volt)' : '#FFF' }}>
                      {ch.current} / {ch.target} {ch.unit}
                    </span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(100, (ch.current / ch.target) * 100)}%`,
                      height: '100%',
                      background: ch.completed ? 'var(--brand-volt)' : 'linear-gradient(90deg, #38BDF8, #00F576)',
                      borderRadius: 999
                    }} />
                  </div>
                </div>
              </div>

              {ch.completed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--brand-volt)', fontSize: '0.82rem', fontWeight: 700 }}>
                  <CheckCircle2 size={16} /> Completed & Rewarded
                </div>
              ) : (
                <button
                  className="btn-volt"
                  style={{ width: '100%', padding: '8px', fontSize: '0.82rem' }}
                  onClick={() => completeChallenge(ch.id)}
                >
                  Complete Quest
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* BADGES & ACHIEVEMENTS SHOWCASE */}
      <div className="bento-card">
        <div className="bento-header">
          <div className="bento-title">
            <Award size={20} color="#FF5E36" /> Badges & Medals Showcase ({userBadges.length})
          </div>
          <span className="volt-badge" style={{ background: 'rgba(255, 94, 54, 0.15)', color: '#FF5E36' }}>
            Verified Padel Identity
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {userBadges.map((badge) => {
            const tierColors = {
              diamond: '#38BDF8',
              gold: '#F59E0B',
              silver: '#94A3B8',
              bronze: '#CD7F32'
            };
            const color = tierColors[badge.tier] || '#FFF';

            return (
              <div
                key={badge.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${color}40`,
                  borderRadius: 'var(--radius-lg)',
                  padding: 18,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: `${color}15`,
                  border: `2px solid ${color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  boxShadow: `0 0 12px ${color}30`
                }}>
                  {badge.icon}
                </div>

                <div style={{ fontWeight: 800, fontSize: '0.95rem', marginTop: 4 }}>
                  {badge.title}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                  {badge.description}
                </div>

                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color,
                  letterSpacing: '0.05em',
                  marginTop: 6
                }}>
                  {badge.tier} Tier
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
