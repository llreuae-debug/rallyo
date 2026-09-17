import React, { useState } from 'react';
import { MessageSquare, Send, ChevronLeft, Users, Shield, CheckCheck } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const MessagesCommunityScreen: React.FC = () => {
  const { chatThreads, activeChatId, setActiveChatId, sendChatMessage, player } = useApp();
  const [inputText, setInputText] = useState('');

  const activeThread = chatThreads.find(t => t.id === activeChatId) || chatThreads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(activeThread.id, inputText);
    setInputText('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header
        title={activeChatId ? activeThread.title : 'Messages & Community'}
        showBack={!!activeChatId}
        onBack={activeChatId ? () => setActiveChatId(null) : undefined}
      />

      {activeChatId ? (
        /* Active Conversation View */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          {/* Messages Feed */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ textAlign: 'center', margin: '4px 0 12px' }}>
              <span className="badge-tag" style={{ fontSize: '0.66rem' }}>
                🔒 End-to-end encrypted sports coordination
              </span>
            </div>

            {activeThread.messages.map(m => {
              const isMine = m.isMe || m.senderId === player.id;
              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignSelf: isMine ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                    gap: 8,
                    flexDirection: isMine ? 'row-reverse' : 'row'
                  }}
                >
                  {!isMine && (
                    <img
                      src={m.senderAvatar}
                      alt={m.senderName}
                      style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', alignSelf: 'flex-end' }}
                    />
                  )}

                  <div
                    style={{
                      background: isMine ? 'rgba(0, 245, 118, 0.2)' : 'var(--bg-card)',
                      border: `1px solid ${isMine ? 'rgba(0, 245, 118, 0.4)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '8px 12px',
                      color: '#FFF'
                    }}
                  >
                    {!isMine && (
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--brand-volt)', marginBottom: 2 }}>
                        {m.senderName}
                      </div>
                    )}
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>{m.text}</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4, marginTop: 4 }}>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{m.timestamp}</span>
                      {isMine && <CheckCheck size={12} color="var(--brand-volt)" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '10px 14px',
              background: 'rgba(14, 19, 31, 0.95)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: 8,
              alignItems: 'center'
            }}
          >
            <input
              className="rally-input"
              style={{ padding: '10px 14px', fontSize: '0.82rem' }}
              placeholder="Send a message..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button type="submit" className="btn-volt" style={{ padding: '10px 14px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        /* Threads List View */
        <div className="scroll-container" style={{ paddingBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {chatThreads.map(thread => (
              <div
                key={thread.id}
                onClick={() => setActiveChatId(thread.id)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    overflow: 'hidden'
                  }}
                >
                  {thread.avatar.startsWith('http') ? (
                    <img src={thread.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    thread.avatar
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {thread.title}
                    </h4>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {thread.lastMessageTime}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {thread.lastMessageText}
                  </p>
                </div>

                {thread.unreadCount > 0 && (
                  <div style={{ background: 'var(--brand-volt)', color: '#080B11', fontSize: '0.68rem', fontWeight: 900, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {thread.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
