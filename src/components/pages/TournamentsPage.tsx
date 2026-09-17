import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy, Calendar, Users, MapPin, ArrowRight,
  ShieldCheck, Check, Sparkles
} from 'lucide-react';

export const TournamentsPage: React.FC = () => {
  const { tournaments, registerTournament, formatMoney, player, t } = useApp();

  const [selectedTourn, setSelectedTourn] = useState<string>(tournaments[0]?.id || 'tourn_1');
  const [showRegModal, setShowRegModal] = useState<boolean>(false);
  const [partnerName, setPartnerName] = useState<string>('Lucas Fernandez');

  const currentTourn = tournaments.find(t => t.id === selectedTourn) || tournaments[0];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerTournament(currentTourn.id, partnerName);
    setShowRegModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="volt-badge" style={{ marginBottom: 8 }}>
            <Trophy size={14} /> Official Competitions
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>
            {t.compete.tournaments}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: 4 }}>
            Verified Americano leagues and championship knockout brackets with cash prize pools.
          </p>
        </div>

        <button className="btn-volt" onClick={() => setShowRegModal(true)}>
          <Users size={16} /> {t.compete.registerTeam}
        </button>
      </div>

      {/* FEATURED TOURNAMENT BANNER */}
      {currentTourn && (
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          minHeight: 260,
          boxShadow: 'var(--shadow-lg)'
        }}>
          <img
            src={currentTourn.bannerUrl}
            alt={currentTourn.title}
            style={{ width: '100%', height: 260, objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(8, 12, 20, 0.96) 0%, rgba(8, 12, 20, 0.7) 60%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '32px 40px',
            maxWidth: 680
          }}>
            <div className="volt-badge" style={{ width: 'fit-content', marginBottom: 10 }}>
              {currentTourn.format.toUpperCase()} • {currentTourn.levelRange}
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, marginBottom: 8 }}>
              {currentTourn.title}
            </h2>

            <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 18, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={14} /> {currentTourn.clubName}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={14} /> {currentTourn.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Users size={14} /> {currentTourn.registeredCount} / {currentTourn.maxPairs} Pairs Registered
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Entry Fee</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
                  {formatMoney(currentTourn.entry_fee_minor || 35000, currentTourn.currency_code || 'AED')}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Prize Pool</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                  {currentTourn.prizePool}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOURNAMENT LIST SELECTOR */}
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
        {tournaments.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTourn(t.id)}
            className="btn-secondary"
            style={{
              padding: '10px 18px',
              fontSize: '0.88rem',
              whiteSpace: 'nowrap',
              background: selectedTourn === t.id ? 'var(--brand-volt)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedTourn === t.id ? '#080B11' : 'var(--text-primary)',
              borderColor: selectedTourn === t.id ? 'var(--brand-volt)' : 'var(--border-subtle)',
              fontWeight: selectedTourn === t.id ? 700 : 500
            }}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* BRACKET VISUALIZER */}
      <div className="bento-card">
        <div className="bento-header">
          <div className="bento-title">
            <Trophy size={20} color="var(--brand-volt)" /> Interactive Digital Bracket
          </div>
          <span className="volt-badge">
            Official Seedings
          </span>
        </div>

        {currentTourn.rounds && currentTourn.rounds.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
            overflowX: 'auto',
            paddingBottom: 10
          }}>
            {currentTourn.rounds.map((round) => (
              <div
                key={round.roundNumber}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  padding: 16
                }}
              >
                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--brand-volt)',
                  letterSpacing: '0.05em',
                  marginBottom: 14,
                  textAlign: 'center'
                }}>
                  {round.roundName}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {round.matches.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: 12
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                        <span>{m.court}</span>
                        <span>{m.time}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                        <span>{m.pair1.name}</span>
                        <span style={{ color: 'var(--text-muted)' }}>ELO {m.pair1.elo}</span>
                      </div>

                      <div style={{ height: 1, background: 'var(--border-subtle)', margin: '4px 0' }} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700 }}>
                        <span>{m.pair2.name}</span>
                        <span style={{ color: 'var(--text-muted)' }}>ELO {m.pair2.elo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-secondary)' }}>
            <Sparkles size={32} color="var(--brand-volt)" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Americano Format Dynamic Round-Robin</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Brackets are generated live at tournament kickoff based on individual player ELO seedings.
            </p>
          </div>
        )}
      </div>

      {/* REGISTRATION MODAL */}
      {showRegModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div className="bento-card" style={{ maxWidth: 480, width: '100%', padding: 28 }}>
            <div className="bento-header">
              <div className="bento-title">
                <Users size={20} color="var(--brand-volt)" /> Register Team for Tournament
              </div>
              <button
                onClick={() => setShowRegModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Player 1 (Captain)
                </label>
                <input
                  type="text"
                  className="web-search-box"
                  style={{ width: '100%' }}
                  value={`${player.name} (You - ELO ${player.eloRating})`}
                  disabled
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Player 2 (Partner Full Name)
                </label>
                <input
                  type="text"
                  className="web-search-box"
                  style={{ width: '100%' }}
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Enter partner name"
                  required
                />
              </div>

              <div style={{
                background: 'rgba(0, 245, 118, 0.08)',
                border: '1px solid rgba(0, 245, 118, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: 14,
                fontSize: '0.82rem',
                color: 'var(--text-secondary)'
              }}>
                Entry Fee: {formatMoney(currentTourn.entry_fee_minor || 35000, currentTourn.currency_code || 'AED')} per pair. Split automated through player wallet.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button type="button" className="btn-secondary" onClick={() => setShowRegModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-volt">
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
