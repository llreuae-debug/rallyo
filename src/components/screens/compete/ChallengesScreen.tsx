import React from 'react';
import { Trophy, Zap, Clock, CheckCircle2, Gift, ArrowRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const ChallengesScreen: React.FC = () => {
  const { challenges, completeChallenge, player, navigateTo } = useApp();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Challenges & Quests" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Total XP Banner */}
        <div
          className="rally-card"
          style={{
            background: 'linear-gradient(135deg, #2A183D 0%, #111425 100%)',
            borderColor: 'rgba(168, 85, 247, 0.4)',
            padding: 16
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#C084FC', textTransform: 'uppercase' }}>
              Season 1: Court Dominance
            </span>
            <span className="badge-tag">18 Days Left</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '6px 0' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: '#FFF' }}>
              {player.xp.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--brand-volt)' }}>
              Total XP Earned
            </span>
          </div>

          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            Complete quests each week to level up your pass, earn booking fee discounts, and unlock elite profile badges.
          </div>
        </div>

        {/* Challenges Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {challenges.map(ch => {
            const isFinished = ch.current >= ch.target;
            const pct = Math.min(100, Math.round((ch.current / ch.target) * 100));

            return (
              <div
                key={ch.id}
                className="rally-card"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: isFinished ? 'rgba(0, 245, 118, 0.4)' : 'var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge-tag" style={{ textTransform: 'uppercase', fontSize: '0.66rem' }}>
                      {ch.category} Quest
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF', marginTop: 4 }}>
                      {ch.title}
                    </h4>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                    +{ch.xpReward} XP
                  </span>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {ch.description}
                </p>

                {/* Progress bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 8, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 999, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        background: isFinished ? 'var(--brand-volt)' : 'linear-gradient(90deg, #A855F7 0%, #00F576 100%)'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FFF' }}>
                    {ch.current}/{ch.target} {ch.unit}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    ⏳ {ch.expiresAt}
                  </span>

                  {isFinished && !ch.completed ? (
                    <button
                      className="btn-volt"
                      style={{ padding: '6px 12px', fontSize: '0.74rem' }}
                      onClick={() => completeChallenge(ch.id)}
                    >
                      Claim +{ch.xpReward} XP
                    </button>
                  ) : ch.completed ? (
                    <span style={{ fontSize: '0.74rem', color: 'var(--brand-volt)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle2 size={14} /> Completed
                    </span>
                  ) : (
                    <button
                      className="btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                      onClick={() => navigateTo('play_hub')}
                    >
                      Play Match
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
