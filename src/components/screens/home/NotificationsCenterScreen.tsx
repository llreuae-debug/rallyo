import React, { useState } from 'react';
import { Bell, Check, Calendar, Trophy, MessageSquare, ShieldAlert, Award } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const NotificationsCenterScreen: React.FC = () => {
  const { notifications, markNotificationRead, navigateTo, setSelectedMatchId, setSelectedClubId } = useApp();
  const [filter, setFilter] = useState<'all' | 'matches' | 'bookings' | 'achievements'>('all');

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'matches') return n.type.includes('match') || n.type.includes('score');
    if (filter === 'bookings') return n.type.includes('booking');
    if (filter === 'achievements') return n.type.includes('achievement') || n.type.includes('tournament');
    return true;
  });

  const getIcon = (type: string) => {
    if (type.includes('match')) return <Bell size={16} color="var(--brand-volt)" />;
    if (type.includes('booking')) return <Calendar size={16} color="var(--brand-clay)" />;
    if (type.includes('score')) return <Trophy size={16} color="#F59E0B" />;
    if (type.includes('achievement')) return <Award size={16} color="#A855F7" />;
    return <MessageSquare size={16} color="#38BDF8" />;
  };

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.actionScreen === 'play_match_detail' && notif.actionId) {
      setSelectedMatchId(notif.actionId);
      navigateTo('match_detail', { matchId: notif.actionId });
    } else if (notif.actionScreen === 'discover_club_detail' && notif.actionId) {
      setSelectedClubId(notif.actionId);
      navigateTo('club_detail', { clubId: notif.actionId });
    } else if (notif.actionScreen === 'profile') {
      navigateTo('own_profile');
    } else if (notif.actionScreen === 'compete_achievements') {
      navigateTo('achievements');
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Notification Center" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'matches', label: '🎾 Matches & Scores' },
            { id: 'bookings', label: '📅 Court Bookings' },
            { id: 'achievements', label: '🏆 Badges & Ranks' }
          ].map(tab => (
            <button
              key={tab.id}
              className="btn-secondary"
              style={{
                fontSize: '0.75rem',
                padding: '6px 12px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                background: filter === tab.id ? 'var(--brand-volt)' : 'var(--bg-card)',
                color: filter === tab.id ? '#080B11' : 'var(--text-secondary)',
                borderColor: filter === tab.id ? 'var(--brand-volt)' : 'var(--border-subtle)'
              }}
              onClick={() => setFilter(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredNotifs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Bell size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <p style={{ fontSize: '0.88rem' }}>No new notifications</p>
            </div>
          ) : (
            filteredNotifs.map(notif => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                style={{
                  background: notif.read ? 'var(--bg-card)' : 'rgba(22, 33, 52, 0.95)',
                  border: `1px solid ${notif.read ? 'var(--border-subtle)' : 'var(--border-highlight)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: 14,
                  display: 'flex',
                  gap: 12,
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {!notif.read && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: 'var(--brand-volt)',
                      boxShadow: '0 0 6px var(--brand-volt)'
                    }}
                  />
                )}

                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getIcon(notif.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: notif.read ? 'var(--text-primary)' : '#FFF' }}>
                      {notif.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.4 }}>
                    {notif.body}
                  </p>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4, display: 'inline-block' }}>
                    {notif.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
