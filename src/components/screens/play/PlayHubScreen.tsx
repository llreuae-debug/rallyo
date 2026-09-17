import React, { useState } from 'react';
import { Plus, Search, Sparkles, Zap, Users, ArrowRight, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const PlayHubScreen: React.FC = () => {
  const { matches, player, navigateTo, setSelectedMatchId } = useApp();
  const [activeSegment, setActiveSegment] = useState<'open' | 'my_matches'>('open');

  const openMatches = matches.filter(m => m.status === 'open');
  const myMatches = matches.filter(m => m.players.some(p => p.id === player.id));

  const displayMatches = activeSegment === 'open' ? openMatches : myMatches;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Play Hub" />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Top Action Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            className="rally-card"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 245, 118, 0.18) 0%, rgba(14, 22, 35, 0.9) 100%)',
              borderColor: 'var(--brand-volt)',
              cursor: 'pointer',
              textAlign: 'left',
              padding: 14
            }}
            onClick={() => navigateTo('create_match')}
          >
            <div style={{ background: 'var(--brand-volt)', color: '#080B11', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={20} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.96rem', fontWeight: 800, color: '#FFF' }}>
                Host Match
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Reserve & invite players
              </div>
            </div>
          </button>

          <button
            className="rally-card"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(14, 22, 35, 0.9) 100%)',
              borderColor: 'rgba(168, 85, 247, 0.4)',
              cursor: 'pointer',
              textAlign: 'left',
              padding: 14
            }}
            onClick={() => navigateTo('ai_matchmaker')}
          >
            <div style={{ background: '#A855F7', color: '#FFF', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.96rem', fontWeight: 800, color: '#FFF' }}>
                AI Matchmaker
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Instant calibrated pairing
              </div>
            </div>
          </button>
        </div>

        {/* Quick Filter Bar */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn-secondary"
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '0.78rem',
              borderColor: activeSegment === 'open' ? 'var(--brand-volt)' : 'var(--border-subtle)',
              background: activeSegment === 'open' ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
              color: activeSegment === 'open' ? 'var(--brand-volt)' : '#FFF'
            }}
            onClick={() => setActiveSegment('open')}
          >
            Open Matches ({openMatches.length})
          </button>

          <button
            className="btn-secondary"
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '0.78rem',
              borderColor: activeSegment === 'my_matches' ? 'var(--brand-volt)' : 'var(--border-subtle)',
              background: activeSegment === 'my_matches' ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
              color: activeSegment === 'my_matches' ? 'var(--brand-volt)' : '#FFF'
            }}
            onClick={() => setActiveSegment('my_matches')}
          >
            My Matches ({myMatches.length})
          </button>
        </div>

        {/* Matches Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {displayMatches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Zap size={32} style={{ margin: '0 auto 8px', opacity: 0.3 }} />
              <p style={{ fontSize: '0.85rem' }}>No matches found in this view.</p>
              <button
                className="btn-volt"
                style={{ margin: '14px auto 0', fontSize: '0.8rem', padding: '8px 16px' }}
                onClick={() => navigateTo('create_match')}
              >
                Host a Match Now
              </button>
            </div>
          ) : (
            displayMatches.map(m => {
              const spotsLeft = 4 - m.players.length;
              const isJoined = m.players.some(p => p.id === player.id);

              return (
                <div
                  key={m.id}
                  className="rally-card"
                  onClick={() => {
                    setSelectedMatchId(m.id);
                    if (isJoined) {
                      navigateTo('match_lobby', { matchId: m.id });
                    } else {
                      navigateTo('match_detail', { matchId: m.id });
                    }
                  }}
                  style={{
                    background: 'var(--bg-card)',
                    cursor: 'pointer',
                    borderColor: isJoined ? 'rgba(0, 245, 118, 0.4)' : 'var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span className="badge-volt" style={{ fontSize: '0.68rem' }}>
                          Level {m.skillRange.min} - {m.skillRange.max}
                        </span>
                        <span className="badge-tag" style={{ textTransform: 'capitalize' }}>
                          {m.matchType}
                        </span>
                        {isJoined && (
                          <span style={{ fontSize: '0.68rem', background: 'rgba(0, 245, 118, 0.2)', color: 'var(--brand-volt)', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                            Joined
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#FFF' }}>{m.title}</h4>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                      €{m.feePerPlayer}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={13} />
                      <span>{m.date} • {m.time}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <MapPin size={13} />
                    <span>{m.clubName}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ display: 'flex' }}>
                        {m.players.map((p, idx) => (
                          <img
                            key={p.id}
                            src={p.avatar}
                            alt={p.name}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              objectFit: 'cover',
                              marginLeft: idx === 0 ? 0 : -6,
                              border: '1.5px solid #080B11'
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: spotsLeft === 0 ? 'var(--text-muted)' : 'var(--brand-volt)', fontWeight: 700 }}>
                        {spotsLeft === 0 ? 'Full' : `${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} left`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--brand-volt)', fontSize: '0.75rem', fontWeight: 700 }}>
                      <span>{isJoined ? 'Enter Lobby' : 'Details'}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
