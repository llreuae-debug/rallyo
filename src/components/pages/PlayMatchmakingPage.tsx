import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Match } from '../../types';
import {
  Swords, Zap, Plus, Filter, MapPin, Clock, Users,
  CheckCircle2, Sparkles, Shield, Trophy, ChevronRight
} from 'lucide-react';

export const PlayMatchmakingPage: React.FC = () => {
  const { matches, player, clubs, createMatch, joinMatch, navigateTo, formatMoney, t } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'ranked' | 'casual'>('all');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showAIModal, setShowAIModal] = useState<boolean>(false);

  // New Match Form State
  const [newTitle, setNewTitle] = useState('');
  const [selectedClub, setSelectedClub] = useState(clubs[0]?.id || 'club_1');
  const [matchFormat, setMatchFormat] = useState<'doubles' | 'singles'>('doubles');
  const [matchType, setMatchType] = useState<'ranked' | 'casual'>('ranked');

  const filteredMatches = matches.filter((m) => {
    if (activeFilter === 'all') return true;
    return m.matchType === activeFilter;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const club = clubs.find(c => c.id === selectedClub);
    createMatch({
      title: newTitle || `${matchType === 'ranked' ? 'Ranked' : 'Casual'} ${matchFormat === 'doubles' ? 'Doubles' : 'Singles'} Clash`,
      clubId: selectedClub,
      clubName: club?.name || 'The Padel Club Downtown',
      format: matchFormat,
      matchType,
      date: 'Today',
      time: '20:00 - 21:30',
      totalFee: 240,
      total_fee_minor: 24000,
      feePerPlayer: 60,
      fee_per_player_minor: 6000,
      currency_code: club?.operating_currency || 'AED'
    });
    setShowCreateModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* PLAY HUB HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="volt-badge" style={{ marginBottom: 8 }}>
            <Swords size={14} /> Matchmaking & Lobbies
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>
            {t.play.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: 4 }}>
            Find balanced doubles matches, host your own game, or launch the AI Matchmaker algorithm.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-secondary" onClick={() => setShowAIModal(true)}>
            <Sparkles size={16} color="var(--brand-volt)" /> AI Matchmaker
          </button>
          <button className="btn-volt" onClick={() => setShowCreateModal(true)}>
            <Plus size={18} /> {t.play.hostMatch}
          </button>
        </div>
      </div>

      {/* FILTER PILLS */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
        <button
          className={`btn-secondary ${activeFilter === 'all' ? 'active' : ''}`}
          style={{
            padding: '6px 16px',
            fontSize: '0.82rem',
            background: activeFilter === 'all' ? 'var(--brand-volt)' : 'transparent',
            color: activeFilter === 'all' ? '#080B11' : 'var(--text-secondary)'
          }}
          onClick={() => setActiveFilter('all')}
        >
          All Matches ({matches.length})
        </button>
        <button
          className={`btn-secondary ${activeFilter === 'ranked' ? 'active' : ''}`}
          style={{
            padding: '6px 16px',
            fontSize: '0.82rem',
            background: activeFilter === 'ranked' ? 'var(--brand-volt)' : 'transparent',
            color: activeFilter === 'ranked' ? '#080B11' : 'var(--text-secondary)'
          }}
          onClick={() => setActiveFilter('ranked')}
        >
          Ranked ELO
        </button>
        <button
          className={`btn-secondary ${activeFilter === 'casual' ? 'active' : ''}`}
          style={{
            padding: '6px 16px',
            fontSize: '0.82rem',
            background: activeFilter === 'casual' ? 'var(--brand-volt)' : 'transparent',
            color: activeFilter === 'casual' ? '#080B11' : 'var(--text-secondary)'
          }}
          onClick={() => setActiveFilter('casual')}
        >
          Casual & Social
        </button>
      </div>

      {/* MATCHES GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
        {filteredMatches.map((match) => {
          const isFull = match.players.length >= (match.format === 'singles' ? 2 : 4);
          const userJoined = match.players.some(p => p.id === player.id);

          return (
            <div
              key={match.id}
              className="bento-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 22,
                border: userJoined ? '1px solid var(--brand-volt)' : '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span className="volt-badge" style={{ fontSize: '0.7rem' }}>
                    {match.matchType.toUpperCase()} • {match.format.toUpperCase()}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                      {formatMoney(match.fee_per_player_minor || 6000, match.currency_code || 'AED')}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                      {t.play.feePerPlayer}
                    </span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
                  {match.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={14} /> {match.clubName} ({match.courtName})
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={14} /> {match.date} • {match.time}
                  </div>
                </div>

                {/* AI Badge if available */}
                {match.aiCompatibilityScore && (
                  <div style={{
                    background: 'rgba(0, 245, 118, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                    color: 'var(--brand-volt-bright)',
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    <Sparkles size={14} />
                    <span>{match.aiCompatibilityScore}% Match Compatibility</span>
                  </div>
                )}

                {/* Players Avatars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex' }}>
                      {match.players.map((p, i) => (
                        <img
                          key={p.id}
                          src={p.avatar}
                          alt={p.name}
                          title={`${p.name} (ELO ${p.elo})`}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            border: '2px solid var(--bg-card)',
                            marginLeft: i > 0 ? -10 : 0,
                            objectFit: 'cover'
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: 4 }}>
                      {match.players.length}/{match.format === 'singles' ? 2 : 4} Joined
                    </span>
                  </div>

                  {userJoined && (
                    <span className="volt-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                      You Joined
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                <button
                  className="btn-secondary"
                  style={{ padding: '8px', fontSize: '0.82rem' }}
                  onClick={() => navigateTo('match_detail', { matchId: match.id })}
                >
                  Lobby Info
                </button>

                {userJoined ? (
                  <button
                    className="btn-secondary"
                    style={{ padding: '8px', fontSize: '0.82rem', borderColor: '#EF4444', color: '#EF4444' }}
                    onClick={() => navigateTo('match_lobby', { matchId: match.id })}
                  >
                    Open Lobby
                  </button>
                ) : isFull ? (
                  <button
                    className="btn-secondary"
                    style={{ padding: '8px', fontSize: '0.82rem', opacity: 0.6 }}
                    onClick={() => joinMatch(match.id)}
                  >
                    Waitlist
                  </button>
                ) : (
                  <button
                    className="btn-volt"
                    style={{ padding: '8px', fontSize: '0.82rem' }}
                    onClick={() => joinMatch(match.id)}
                  >
                    Join Match
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE MATCH MODAL */}
      {showCreateModal && (
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
          <div className="bento-card" style={{ maxWidth: 520, width: '100%', padding: 28 }}>
            <div className="bento-header">
              <div className="bento-title">
                <Plus size={20} color="var(--brand-volt)" /> Host a New Match
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Match Title
                </label>
                <input
                  type="text"
                  className="web-search-box"
                  style={{ width: '100%' }}
                  placeholder="e.g. Sunset Doubles Clash (Level 4.5+)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Select Club & Venue
                </label>
                <select
                  className="web-pill-select"
                  style={{ width: '100%', padding: '10px 14px' }}
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                >
                  {clubs.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.operating_currency} • {c.location})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                    Format
                  </label>
                  <select
                    className="web-pill-select"
                    style={{ width: '100%', padding: '10px 14px' }}
                    value={matchFormat}
                    onChange={(e) => setMatchFormat(e.target.value as any)}
                  >
                    <option value="doubles">Doubles (4 Players)</option>
                    <option value="singles">Singles (2 Players)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                    Match Type
                  </label>
                  <select
                    className="web-pill-select"
                    style={{ width: '100%', padding: '10px 14px' }}
                    value={matchType}
                    onChange={(e) => setMatchType(e.target.value as any)}
                  >
                    <option value="ranked">Ranked (Official ELO)</option>
                    <option value="casual">Casual (Friendly)</option>
                  </select>
                </div>
              </div>

              <div style={{
                background: 'rgba(0, 245, 118, 0.08)',
                border: '1px solid rgba(0, 245, 118, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)'
              }}>
                💡 Split payment enabled: Total fee 240 AED will be automatically split into 60 AED per player.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-volt">
                  Publish Match Lobby
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI MATCHMAKER ALGORITHM BREAKDOWN MODAL */}
      {showAIModal && (
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
          <div className="bento-card" style={{ maxWidth: 580, width: '100%', padding: 28 }}>
            <div className="bento-header">
              <div className="bento-title">
                <Sparkles size={22} color="var(--brand-volt)" /> AI Matchmaker Engine
              </div>
              <button
                onClick={() => setShowAIModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
              RALLYO proprietary matchmaking model calibrates 8 distinct behavioral and performance signals:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--brand-volt)', fontWeight: 700 }}>30% Skill Balance</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Calibrated ELO & verified rating gap &lt; 0.4</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--brand-volt)', fontWeight: 700 }}>20% Schedule Match</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Peak availability slot alignment</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--brand-volt)', fontWeight: 700 }}>15% Location / Distance</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Radius radius optimization (&lt; 5km)</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--brand-volt)', fontWeight: 700 }}>10% Playstyle Pairings</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Attacking + Tactical doubles chemistry</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--brand-volt)', fontWeight: 700 }}>10% Reliability Score</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>No-show history & punctuality index</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--brand-volt)', fontWeight: 700 }}>15% Social & Venue</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Social graph & preferred court surfaces</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn-secondary" onClick={() => setShowAIModal(false)}>
                Close
              </button>
              <button
                className="btn-volt"
                onClick={() => {
                  setShowAIModal(false);
                  joinMatch('match_1');
                }}
              >
                Join Recommended Match (94% Compatibility)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
