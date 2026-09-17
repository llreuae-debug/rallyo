import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Swords, MapPin, Clock, Users, ArrowLeft,
  Sparkles, CheckCircle2, MessageSquare, Trophy, AlertTriangle
} from 'lucide-react';

export const MatchDetailPage: React.FC = () => {
  const { matches, selectedMatchId, navParams, navigateTo, player, joinMatch, leaveMatch, submitScore, disputeScore, formatMoney } = useApp();

  const matchId = navParams.matchId || selectedMatchId || 'match_1';
  const match = matches.find(m => m.id === matchId) || matches[0];

  const [scoreSet1A, setScoreSet1A] = useState(6);
  const [scoreSet1B, setScoreSet1B] = useState(4);
  const [scoreSet2A, setScoreSet2A] = useState(6);
  const [scoreSet2B, setScoreSet2B] = useState(3);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const isUserJoined = match.players.some(p => p.id === player.id);
  const teamAPlayers = match.players.filter(p => p.team === 'A');
  const teamBPlayers = match.players.filter(p => p.team === 'B');

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitScore(match.id, [scoreSet1A, scoreSet2A], [scoreSet1B, scoreSet2B]);
    setShowScoreModal(false);
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* BACK BUTTON */}
      <button
        onClick={() => navigateTo('play')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '0.88rem',
          cursor: 'pointer',
          width: 'fit-content'
        }}
      >
        <ArrowLeft size={16} /> Back to Matches
      </button>

      {/* MATCH HEADER CARD */}
      <div className="bento-card" style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <span className="volt-badge">
                {match.matchType.toUpperCase()} • {match.format.toUpperCase()}
              </span>
              <span className="volt-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                Target Level: {match.skillRange.min.toFixed(1)} - {match.skillRange.max.toFixed(1)}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800 }}>
              {match.title}
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
              {formatMoney(match.fee_per_player_minor || 6000, match.currency_code || 'AED')}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              per player share
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={16} /> {match.clubName} ({match.courtName})
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={16} /> {match.date} • {match.time}
          </span>
        </div>
      </div>

      {/* ROSTER & TEAMS BENTO */}
      <div className="bento-grid">
        {/* Team A */}
        <div className="bento-card bento-col-6">
          <div className="bento-header">
            <div className="bento-title" style={{ color: 'var(--brand-volt)' }}>
              Team A Lineup
            </div>
            <span className="volt-badge">
              Avg ELO: {teamAPlayers.length > 0 ? Math.round(teamAPlayers.reduce((acc, p) => acc + p.elo, 0) / teamAPlayers.length) : 0}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {teamAPlayers.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 10,
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Level {p.skillLevel.toFixed(1)} • ELO {p.elo}
                  </div>
                </div>
                <span className="volt-badge" style={{ fontSize: '0.68rem' }}>Ready</span>
              </div>
            ))}

            {teamAPlayers.length < (match.format === 'singles' ? 1 : 2) && (
              <div style={{
                padding: 14,
                border: '2px dashed var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.85rem'
              }}>
                Open Spot for Team A
              </div>
            )}
          </div>
        </div>

        {/* Team B */}
        <div className="bento-card bento-col-6">
          <div className="bento-header">
            <div className="bento-title" style={{ color: '#38BDF8' }}>
              Team B Lineup
            </div>
            <span className="volt-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
              Avg ELO: {teamBPlayers.length > 0 ? Math.round(teamBPlayers.reduce((acc, p) => acc + p.elo, 0) / teamBPlayers.length) : 0}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {teamBPlayers.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 10,
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Level {p.skillLevel.toFixed(1)} • ELO {p.elo}
                  </div>
                </div>
                <span className="volt-badge" style={{ fontSize: '0.68rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>Ready</span>
              </div>
            ))}

            {teamBPlayers.length < (match.format === 'singles' ? 1 : 2) && (
              <div style={{
                padding: 14,
                border: '2px dashed var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.85rem'
              }}>
                Open Spot for Team B
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MATCH CHAT TEASER & ACTIONS */}
      <div className="bento-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-volt)'
          }}>
            <MessageSquare size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Match Lobby Chat</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Coordinate with teammates, equipment checks, and court arrivals.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {isUserJoined && (
            <button className="btn-secondary" onClick={() => setShowScoreModal(true)}>
              <Trophy size={16} /> Submit Score
            </button>
          )}

          <button className="btn-secondary" onClick={() => navigateTo('chat')}>
            Open Match Chat
          </button>

          {isUserJoined ? (
            <button
              className="btn-secondary"
              style={{ borderColor: '#EF4444', color: '#EF4444' }}
              onClick={() => leaveMatch(match.id)}
            >
              Leave Match
            </button>
          ) : (
            <button className="btn-volt" onClick={() => joinMatch(match.id)}>
              Join This Match
            </button>
          )}
        </div>
      </div>

      {/* SCORE SUBMISSION MODAL */}
      {showScoreModal && (
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
                <Trophy size={20} color="var(--brand-volt)" /> Submit Official Match Score
              </div>
              <button
                onClick={() => setShowScoreModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScoreSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Set 1 Games
                </label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', width: 60 }}>Team A</span>
                  <input
                    type="number"
                    className="web-search-box"
                    style={{ width: 80, textAlign: 'center' }}
                    value={scoreSet1A}
                    onChange={(e) => setScoreSet1A(parseInt(e.target.value) || 0)}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="web-search-box"
                    style={{ width: 80, textAlign: 'center' }}
                    value={scoreSet1B}
                    onChange={(e) => setScoreSet1B(parseInt(e.target.value) || 0)}
                  />
                  <span style={{ fontSize: '0.85rem', width: 60 }}>Team B</span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Set 2 Games
                </label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', width: 60 }}>Team A</span>
                  <input
                    type="number"
                    className="web-search-box"
                    style={{ width: 80, textAlign: 'center' }}
                    value={scoreSet2A}
                    onChange={(e) => setScoreSet2A(parseInt(e.target.value) || 0)}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="web-search-box"
                    style={{ width: 80, textAlign: 'center' }}
                    value={scoreSet2B}
                    onChange={(e) => setScoreSet2B(parseInt(e.target.value) || 0)}
                  />
                  <span style={{ fontSize: '0.85rem', width: 60 }}>Team B</span>
                </div>
              </div>

              <div style={{
                background: 'rgba(0, 245, 118, 0.08)',
                border: '1px solid rgba(0, 245, 118, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: 12,
                fontSize: '0.78rem',
                color: 'var(--brand-volt-bright)'
              }}>
                ⚡ Winner receives +22 ELO rating points. Confirmed by players within 24 hours.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button type="button" className="btn-secondary" onClick={() => setShowScoreModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-volt">
                  Submit Score
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
