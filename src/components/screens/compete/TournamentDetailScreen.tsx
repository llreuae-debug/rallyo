import React, { useState } from 'react';
import { Trophy, Calendar, MapPin, Users, Award, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const TournamentDetailScreen: React.FC = () => {
  const { tournaments, selectedTournamentId, registerTournament } = useApp();
  const tourn = tournaments.find(t => t.id === selectedTournamentId) || tournaments[0];

  const [activeTab, setActiveTab] = useState<'bracket' | 'pairs' | 'rules'>('bracket');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [partnerName, setPartnerName] = useState('Lucas Fernandez');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerTournament(tourn.id, partnerName);
    setShowRegisterModal(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Tournament Bracket" showBack />

      <div className="scroll-container" style={{ paddingBottom: 28 }}>
        {/* Banner */}
        <div className="rally-card" style={{ background: 'linear-gradient(135deg, #182238 0%, #0E1624 100%)', padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge-volt">{tourn.format.toUpperCase()} CUP</span>
            <span style={{ fontSize: '0.74rem', color: '#F59E0B', fontWeight: 700 }}>
              Prize: {tourn.prizePool}
            </span>
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginTop: 4 }}>
            {tourn.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            <span>📍 {tourn.clubName}</span>
            <span>•</span>
            <span>📅 {tourn.date}</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(['bracket', 'pairs', 'rules'] as const).map(t => (
            <button
              key={t}
              type="button"
              className="btn-secondary"
              style={{
                flex: 1,
                fontSize: '0.74rem',
                textTransform: 'capitalize',
                padding: '8px 4px',
                borderColor: activeTab === t ? 'var(--brand-volt)' : 'var(--border-subtle)',
                background: activeTab === t ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                color: activeTab === t ? 'var(--brand-volt)' : 'var(--text-secondary)'
              }}
              onClick={() => setActiveTab(t)}
            >
              {t === 'bracket' ? '🏆 Live Bracket' : t === 'pairs' ? '👥 Pairs List' : '📜 Cup Rules'}
            </button>
          ))}
        </div>

        {/* Bracket Visualizer View */}
        {activeTab === 'bracket' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {tourn.rounds.map(round => (
              <div key={round.roundNumber} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-volt)', textTransform: 'uppercase' }}>
                  {round.roundName}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {round.matches.map(m => (
                    <div
                      key={m.id}
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: 10
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                        <span style={{ fontWeight: 700, color: '#FFF' }}>
                          {m.pair1.seed ? `[#${m.pair1.seed}] ` : ''}{m.pair1.name}
                        </span>
                        <span className="badge-tag" style={{ fontSize: '0.62rem' }}>{m.time}</span>
                      </div>

                      <div style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--text-muted)', margin: '2px 0' }}>
                        vs
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                        <span style={{ fontWeight: 700, color: '#FFF' }}>
                          {m.pair2.seed ? `[#${m.pair2.seed}] ` : ''}{m.pair2.name}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{m.court}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pairs List View */}
        {activeTab === 'pairs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tourn.registeredPairs.map((p, idx) => (
              <div
                key={p.id}
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
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFF' }}>
                    {p.player1} & {p.player2}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Official Seed #{p.seed}
                  </div>
                </div>
                <span className="badge-volt" style={{ fontSize: '0.66rem' }}>Confirmed</span>
              </div>
            ))}
          </div>
        )}

        {/* Rules View */}
        {activeTab === 'rules' && (
          <div className="rally-card" style={{ background: 'var(--bg-card)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <p><strong>Format:</strong> Direct Knockout draw with 3rd place consolation bracket.</p>
            <p style={{ marginTop: 6 }}><strong>Scoring:</strong> Best of 3 sets with Golden Point at deuce. 3rd set is a 10-point Champions Tiebreak.</p>
            <p style={{ marginTop: 6 }}><strong>Equipment:</strong> Official Bullpadel Gold Pro balls provided by venue.</p>
            <p style={{ marginTop: 6 }}><strong>Prizes:</strong> 1st place: 10,000 AED + Bullpadel Pro Rackets. Runner up: 5,000 AED.</p>
          </div>
        )}

        {/* Register CTA */}
        <button
          className="btn-volt"
          style={{ width: '100%', marginTop: 8 }}
          onClick={() => setShowRegisterModal(true)}
        >
          <span>Register Team (€{tourn.entryFee} / pair)</span>
          <ArrowRight size={18} />
        </button>

        {/* Registration Modal */}
        {showRegisterModal && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 1200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
          >
            <form onSubmit={handleRegister} className="rally-card" style={{ background: '#111724', width: '100%', maxWidth: 340, gap: 12 }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF' }}>
                Register for Tournament
              </h4>

              <div>
                <label className="input-label">Player 1 (You)</label>
                <input className="rally-input" disabled value="Alex Ruiz (Level 4.8)" style={{ opacity: 0.7 }} />
              </div>

              <div>
                <label className="input-label">Player 2 (Partner Name)</label>
                <input
                  className="rally-input"
                  value={partnerName}
                  onChange={e => setPartnerName(e.target.value)}
                  placeholder="e.g. Lucas Fernandez"
                  required
                />
              </div>

              <div style={{ background: 'rgba(0, 245, 118, 0.08)', padding: 10, borderRadius: 8, fontSize: '0.76rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Entry Fee (Split 50%):</span>
                <strong style={{ color: 'var(--brand-volt)' }}>€{Math.round(tourn.entryFee / 2)}</strong>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ flex: 1, fontSize: '0.78rem' }}
                  onClick={() => setShowRegisterModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-volt"
                  style={{ flex: 1, fontSize: '0.78rem' }}
                >
                  Confirm & Enter
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
