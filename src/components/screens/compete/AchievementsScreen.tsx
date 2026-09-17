import React from 'react';
import { Award, Share2, ShieldCheck, Star } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const AchievementsScreen: React.FC = () => {
  const { player, showToast } = useApp();

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'diamond': return '#38BDF8';
      case 'gold': return '#F59E0B';
      case 'silver': return '#94A3B8';
      default: return '#CD7F32';
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Badge Showcase" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Banner */}
        <div className="rally-card" style={{ background: 'linear-gradient(135deg, #152A3F 0%, #0D1625 100%)', textAlign: 'center', padding: 16 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 4 }}>🏆</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
            Padel Mastery Milestones
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: 280, margin: '4px auto 0' }}>
            Permanent credentials on your public RALLYO player identity.
          </p>
        </div>

        {/* Badges Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {player.badges.map(b => {
            const isUnlocked = b.unlockedAt !== undefined || b.progress >= b.maxProgress;
            const tierColor = getTierBadgeColor(b.tier);

            return (
              <div
                key={b.id}
                className="rally-card"
                style={{
                  background: isUnlocked ? 'var(--bg-card)' : 'rgba(255, 255, 255, 0.02)',
                  borderColor: isUnlocked ? tierColor : 'var(--border-subtle)',
                  opacity: isUnlocked ? 1 : 0.65,
                  padding: 12,
                  gap: 8,
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.8rem' }}>{b.icon}</span>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: tierColor,
                      border: `1px solid ${tierColor}`,
                      padding: '2px 6px',
                      borderRadius: 999
                    }}
                  >
                    {b.tier}
                  </span>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFF' }}>{b.title}</h4>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.3 }}>
                    {b.description}
                  </p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 6, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: isUnlocked ? 'var(--brand-volt)' : 'var(--text-muted)', fontWeight: 700 }}>
                    {isUnlocked ? '✓ Unlocked' : `${b.progress}/${b.maxProgress}`}
                  </span>
                  {isUnlocked && (
                    <button
                      type="button"
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      onClick={() => showToast(`Shared ${b.title} badge!`)}
                      title="Share Badge"
                    >
                      <Share2 size={13} />
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
