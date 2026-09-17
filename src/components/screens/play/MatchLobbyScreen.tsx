import React, { useState } from 'react';
import { Send, CheckCircle2, Clock, MapPin, Shield, Trophy, AlertTriangle } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const MatchLobbyScreen: React.FC = () => {
  const { matches, selectedMatchId, player, navigateTo, leaveMatch } = useApp();
  const match = matches.find(m => m.id === selectedMatchId) || matches[0];

  const [lobbyMessages, setLobbyMessages] = useState<{ sender: string; text: string; time: string; isMe?: boolean }[]>([
    { sender: 'Sofia', text: 'Hey team! Court 1 is confirmed. New Bullpadel balls are ready!', time: '19:12' },
    { sender: 'Carlos', text: 'Stretching now by the cafe. See you all in 15 mins.', time: '19:18' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setLobbyMessages(prev => [
      ...prev,
      { sender: player.name, text: inputText, time: 'Just now', isMe: true }
    ]);
    setInputText('');
  };

  const teamA = match.players.filter(p => p.team === 'A');
  const teamB = match.players.filter(p => p.team === 'B');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Match Lobby" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Match Header */}
        <div className="rally-card" style={{ background: 'linear-gradient(135deg, #152238 0%, #0E1624 100%)', padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge-volt">🟢 Lobby Live</span>
            <span style={{ fontSize: '0.74rem', color: 'var(--brand-volt)', fontWeight: 700 }}>
              {match.players.length}/4 Players Ready
            </span>
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginTop: 4 }}>
            {match.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={13} />
              <span>{match.date} • {match.time}</span>
            </div>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={13} />
              <span>{match.clubName}</span>
            </div>
          </div>
        </div>

        {/* 4-Player Court Lineup Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 800, color: '#FFF' }}>
              Court Pairing & Split Status
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Split: €{match.feePerPlayer} each</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {/* Team A */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(0, 245, 118, 0.3)', borderRadius: 'var(--radius-md)', padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--brand-volt)', textTransform: 'uppercase' }}>
                Team A
              </span>
              {teamA.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <img src={p.avatar} alt={p.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name}
                    </div>
                    <span style={{ fontSize: '0.62rem', color: 'var(--brand-volt)', fontWeight: 700 }}>
                      Paid €{match.feePerPlayer} ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Team B */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 'var(--radius-md)', padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase' }}>
                Team B
              </span>
              {teamB.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <img src={p.avatar} alt={p.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name}
                    </div>
                    <span style={{ fontSize: '0.62rem', color: 'var(--brand-volt)', fontWeight: 700 }}>
                      Paid €{match.feePerPlayer} ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pre-Match Chat */}
        <div className="rally-card" style={{ background: 'var(--bg-card)', padding: 12, flex: 1, minHeight: 180 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 6 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF' }}>
              💬 Pre-Match Coordination Chat
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Only match players can view</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 0', maxHeight: 150, overflowY: 'auto' }}>
            {lobbyMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.isMe ? 'flex-end' : 'flex-start',
                  background: msg.isMe ? 'rgba(0, 245, 118, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 8,
                  padding: '6px 10px',
                  maxWidth: '85%'
                }}
              >
                <div style={{ fontSize: '0.66rem', fontWeight: 700, color: msg.isMe ? 'var(--brand-volt)' : 'var(--text-secondary)' }}>
                  {msg.sender} • {msg.time}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#FFF', marginTop: 2 }}>{msg.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 6, marginTop: 'auto', paddingTop: 8 }}>
            <input
              className="rally-input"
              style={{ padding: '8px 10px', fontSize: '0.8rem' }}
              placeholder="Message your match lobby..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button type="submit" className="btn-volt" style={{ padding: '8px 12px' }}>
              <Send size={15} />
            </button>
          </form>
        </div>

        {/* Actions: Score Submission or Leave */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            className="btn-volt"
            style={{ width: '100%' }}
            onClick={() => navigateTo('score_submission', { matchId: match.id })}
          >
            <Trophy size={18} />
            <span>Submit Final Match Score & ELO</span>
          </button>

          <button
            className="btn-secondary"
            style={{ width: '100%', fontSize: '0.8rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            onClick={() => leaveMatch(match.id)}
          >
            Leave Match & Free Slot
          </button>
        </div>
      </div>
    </div>
  );
};
