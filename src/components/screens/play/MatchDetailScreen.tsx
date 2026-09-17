import React from 'react';
import { Clock, MapPin, Shield, Users, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const MatchDetailScreen: React.FC = () => {
  const { matches, selectedMatchId, player, joinMatch, navigateTo } = useApp();
  const match = matches.find(m => m.id === selectedMatchId) || matches[0];

  const isAlreadyJoined = match.players.some(p => p.id === player.id);
  const isFull = match.players.length >= (match.format === 'singles' ? 2 : 4);

  const teamA = match.players.filter(p => p.team === 'A');
  const teamB = match.players.filter(p => p.team === 'B');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Match Overview" showBack />

      <div className="scroll-container" style={{ paddingBottom: 28 }}>
        {/* Match Header Card */}
        <div className="rally-card" style={{ background: 'linear-gradient(135deg, #152238 0%, #0E1624 100%)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="badge-volt">
              Level {match.skillRange.min} - {match.skillRange.max} • {match.matchType.toUpperCase()}
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--brand-volt)' }}>
              €{match.feePerPlayer}
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>/player</span>
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#FFF', marginTop: 4 }}>
            {match.title}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} color="var(--brand-volt)" />
              <span>{match.date} • {match.time} (90 min)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={14} color="var(--brand-clay)" />
              <span>{match.clubName} • {match.courtName}</span>
            </div>
          </div>
        </div>

        {/* Team Lineup Roster */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.94rem', fontWeight: 800, color: '#FFF' }}>
              Court Lineup (Doubles)
            </span>
            <span className="badge-tag">{match.players.length}/4 Confirmed</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {/* Team A */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(0, 245, 118, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--brand-volt)', textTransform: 'uppercase' }}>
                Team Alpha
              </div>
              {teamA.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={p.avatar} alt={p.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 100 }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Lvl {p.skillLevel} • ELO {p.elo}
                    </div>
                  </div>
                </div>
              ))}
              {teamA.length < 2 && (
                <div style={{ border: '1px dashed rgba(255, 255, 255, 0.15)', borderRadius: 8, padding: 8, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                  + Spot Open
                </div>
              )}
            </div>

            {/* Team B */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase' }}>
                Team Bravo
              </div>
              {teamB.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={p.avatar} alt={p.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 100 }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Lvl {p.skillLevel} • ELO {p.elo}
                    </div>
                  </div>
                </div>
              ))}
              {teamB.length < 2 && (
                <div style={{ border: '1px dashed rgba(255, 255, 255, 0.15)', borderRadius: 8, padding: 8, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                  + Spot Open
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cancellation Policy & Split Guarantee */}
        <div className="rally-card" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Shield size={16} color="var(--brand-volt)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF' }}>
              RALLYO Match Protection & Rules
            </span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: 4 }}>
            Free cancellation up to 6 hours before match start. In case of rain or late cancellation, substitutes from the waitlist are automatically alerted and fees refunded.
          </p>
        </div>

        {/* Join CTA */}
        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          {isAlreadyJoined ? (
            <button
              className="btn-volt"
              style={{ width: '100%' }}
              onClick={() => navigateTo('match_lobby', { matchId: match.id })}
            >
              <span>Enter Match Lobby & Chat</span>
              <ArrowRight size={18} />
            </button>
          ) : isFull ? (
            <button
              className="btn-secondary"
              style={{ width: '100%', borderColor: '#F59E0B', color: '#F59E0B' }}
              onClick={() => joinMatch(match.id)}
            >
              <span>Match Full — Join Waitlist</span>
            </button>
          ) : (
            <button
              className="btn-volt"
              style={{ width: '100%' }}
              onClick={() => joinMatch(match.id)}
            >
              <span>Join Match (Pay €{match.feePerPlayer})</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
