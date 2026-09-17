import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare, Send, Users, ShieldAlert, Flag,
  Sparkles, CheckCircle2, Search, MoreVertical
} from 'lucide-react';

export const ChatCommunityPage: React.FC = () => {
  const { chatThreads, activeChatId, setActiveChatId, sendChatMessage, player, showToast, t } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);

  const currentThread = chatThreads.find(th => th.id === activeChatId) || chatThreads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentThread) return;
    sendChatMessage(currentThread.id, messageInput.trim());
    setMessageInput('');
  };

  const handleReport = () => {
    setShowReportModal(false);
    showToast('🛡️ Report submitted to RALLYO Trust & Safety. Review within 1 hour.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="volt-badge" style={{ marginBottom: 6 }}>
            <MessageSquare size={14} /> Real-Time Padel Social Network
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800 }}>
            {t.nav.chat} & Community Hub
          </h1>
        </div>

        <button
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.8rem', color: '#FF5E36', borderColor: 'rgba(255, 94, 54, 0.3)' }}
          onClick={() => setShowReportModal(true)}
        >
          <Flag size={14} /> Report User / Incident
        </button>
      </div>

      {/* CHAT SPLIT INTERFACE */}
      <div className="bento-card" style={{
        padding: 0,
        height: 'calc(100vh - 250px)',
        minHeight: 520,
        display: 'flex',
        overflow: 'hidden'
      }}>
        {/* LEFT THREADS LIST (300px) */}
        <div style={{
          width: 320,
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ padding: 16, borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="web-search-box" style={{ width: '100%' }}>
              <Search size={14} />
              <input
                type="text"
                className="web-search-input"
                placeholder="Search conversations..."
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {chatThreads.map((thread) => {
              const isActive = thread.id === currentThread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveChatId(thread.id)}
                  style={{
                    padding: '14px 18px',
                    borderBottom: '1px solid var(--border-subtle)',
                    background: isActive ? 'rgba(0, 245, 118, 0.08)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--brand-volt)' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>
                      {thread.title}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {thread.lastMessageTime}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {thread.lastMessageText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT ACTIVE CHAT STREAM */}
        {currentThread && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            {/* Thread Header */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(8, 11, 17, 0.6)'
            }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                  {currentThread.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {currentThread.subtitle}
                </div>
              </div>

              <span className="volt-badge" style={{ fontSize: '0.7rem' }}>
                Active Channel
              </span>
            </div>

            {/* Messages Feed */}
            <div style={{
              flex: 1,
              padding: 24,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}>
              {currentThread.messages.map((msg) => {
                const isMe = msg.isMe || msg.senderId === player.id;
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: isMe ? 'row-reverse' : 'row',
                      alignItems: 'flex-end',
                      gap: 10
                    }}
                  >
                    {!isMe && (
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
                      />
                    )}

                    <div style={{
                      maxWidth: '68%',
                      background: isMe ? 'var(--brand-volt)' : 'rgba(255, 255, 255, 0.06)',
                      color: isMe ? '#080B11' : 'var(--text-primary)',
                      padding: '10px 16px',
                      borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      boxShadow: isMe ? '0 2px 10px var(--brand-volt-glow)' : 'none'
                    }}>
                      {!isMe && (
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--brand-volt-bright)', marginBottom: 2 }}>
                          {msg.senderName}
                        </div>
                      )}
                      <div style={{ fontSize: '0.88rem', lineHeight: 1.4 }}>
                        {msg.text}
                      </div>
                      <div style={{
                        fontSize: '0.65rem',
                        textAlign: isMe ? 'right' : 'left',
                        marginTop: 4,
                        opacity: 0.75
                      }}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={handleSend}
              style={{
                padding: '16px 24px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(8, 11, 17, 0.8)'
              }}
            >
              <input
                type="text"
                className="web-search-input"
                style={{
                  background: 'var(--bg-input)',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                  color: '#FFF'
                }}
                placeholder="Type your message to the match lobby..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                type="submit"
                className="btn-volt"
                style={{ padding: '12px 20px', borderRadius: 'var(--radius-full)' }}
              >
                <Send size={16} /> Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* REPORT MODAL */}
      {showReportModal && (
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
          <div className="bento-card" style={{ maxWidth: 460, width: '100%', padding: 28 }}>
            <div className="bento-header">
              <div className="bento-title" style={{ color: '#FF5E36' }}>
                <Flag size={20} /> Report Community Violation
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Select the reason for reporting this player or conversation:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {['No-Show / Unsportsmanlike Conduct', 'Inappropriate or Abusive Messages', 'Score Dispute / Rating Manipulation', 'Commercial Spam'].map((reason) => (
                <label key={reason} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input type="radio" name="report_reason" defaultChecked={reason.startsWith('No-Show')} />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn-secondary" onClick={() => setShowReportModal(false)}>
                Cancel
              </button>
              <button className="btn-volt" style={{ background: '#FF5E36', color: '#FFF' }} onClick={handleReport}>
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
