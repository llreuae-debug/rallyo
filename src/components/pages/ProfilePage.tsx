import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User, Shield, Trophy, Flame, Wallet, Edit3,
  CheckCircle2, Plus, ArrowRight, Award, Zap
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { player, updatePlayer, formatMoney, matches, currency, t, showToast } = useApp();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [editName, setEditName] = useState(player.name);
  const [editCity, setEditCity] = useState(player.city);
  const [editAvatar, setEditAvatar] = useState(player.avatar);
  const [editArea, setEditArea] = useState(player.preferred_area || '');

  const completedMatches = matches.filter(m => m.status === 'completed');

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlayer({ name: editName, city: editCity, avatar: editAvatar, preferred_area: editArea });
    setShowEditModal(false);
  };

  const handleTopUp = (amountMinor: number) => {
    updatePlayer({
      wallet_balance_minor: (player.wallet_balance_minor || 12000) + amountMinor,
      walletBalance: (player.walletBalance || 120) + (amountMinor / 100)
    });
    setShowTopUpModal(false);
    showToast(`💰 Wallet recharged with ${formatMoney(amountMinor, currency)}!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* 3D-STYLE PLAYER IDENTITY CARD */}
      <div className="bento-card" style={{
        background: 'linear-gradient(135deg, rgba(20, 28, 44, 0.98) 0%, rgba(10, 15, 25, 0.98) 100%)',
        border: '1px solid rgba(0, 245, 118, 0.3)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(0, 245, 118, 0.15)',
        padding: 36
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <img
              src={player.avatar}
              alt={player.name}
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid var(--brand-volt)',
                boxShadow: '0 0 20px var(--brand-volt-glow)'
              }}
            />
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span className="volt-badge">
                  Level {player.skillLevel.toFixed(1)} Padel Athlete
                </span>
                <span className="volt-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                  {player.dominantHand} Handed
                </span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900 }}>
                {player.name}
              </h1>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {player.city} • {player.playingStyle} Archetype • {player.competitiveness}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-secondary" onClick={() => setShowEditModal(true)}>
              <Edit3 size={16} /> Edit Profile
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 16,
          marginTop: 32,
          paddingTop: 24,
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Official ELO</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--brand-volt)' }}>
              {player.eloRating}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Win Rate</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#38BDF8' }}>
              {player.winRate}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Matches</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#FFF' }}>
              {player.matchHistoryCount}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Record</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#A3E635' }}>
              {player.wins}W - {player.losses}L
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Weekly Streak</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#FF5E36', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Flame size={20} fill="#FF5E36" /> {player.activityStreakWeeks}w
            </div>
          </div>
        </div>
      </div>

      {/* WALLET & RECENT MATCHES BENTO */}
      <div className="bento-grid">
        {/* WALLET CARD */}
        <div className="bento-card bento-col-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="bento-header">
              <div className="bento-title">
                <Wallet size={20} color="var(--brand-volt)" /> {t.profile.wallet}
              </div>
              <span className="volt-badge">
                Instant Split Ready
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>
              Available Balance
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--brand-volt)', marginBottom: 8 }}>
              {formatMoney(player.wallet_balance_minor || 12000, player.preferred_currency || 'AED')}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Used for instant one-tap court split payments, tournament entries, and match deposits.
            </p>
          </div>

          <button
            className="btn-volt"
            style={{ width: '100%', padding: '12px', marginTop: 24 }}
            onClick={() => setShowTopUpModal(true)}
          >
            <Plus size={16} /> {t.profile.topUp}
          </button>
        </div>

        {/* MATCH HISTORY LOG */}
        <div className="bento-card bento-col-8">
          <div className="bento-header">
            <div className="bento-title">
              <Trophy size={20} color="#38BDF8" /> {t.profile.recentHistory}
            </div>
            <span className="volt-badge">
              Verified Matches
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {completedMatches.map((m) => (
              <div
                key={m.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{m.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                    {m.clubName} • {m.date}
                  </div>
                  {m.score && (
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--brand-volt)', marginTop: 4 }}>
                      Score: {m.score.teamASets.join('-')} / {m.score.teamBSets.join('-')} (Winner: Team {m.score.winner})
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="volt-badge" style={{ background: 'rgba(0, 245, 118, 0.15)', color: 'var(--brand-volt)' }}>
                    +18 ELO
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOP-UP MODAL */}
      {showTopUpModal && (
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
          <div className="bento-card" style={{ maxWidth: 440, width: '100%', padding: 28 }}>
            <div className="bento-header">
              <div className="bento-title">
                <Wallet size={20} color="var(--brand-volt)" /> Top Up RALLYO Wallet
              </div>
              <button
                onClick={() => setShowTopUpModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
              Select an amount to recharge in your preferred currency ({currency}):
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[10000, 25000, 50000, 100000].map((minor) => (
                <button
                  key={minor}
                  onClick={() => handleTopUp(minor)}
                  className="btn-secondary"
                  style={{ padding: '14px', fontSize: '1rem', fontWeight: 800 }}
                >
                  +{formatMoney(minor, currency)}
                </button>
              ))}
            </div>

            <button className="btn-secondary" style={{ width: '100%' }} onClick={() => setShowTopUpModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
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
              <div className="bento-title">
                <Edit3 size={20} color="var(--brand-volt)" /> Edit Player Profile
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Photo Upload & Preview */}
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Profile Photo
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <img
                    src={editAvatar}
                    alt="Preview"
                    style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--brand-volt)' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="profile-photo-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') setEditAvatar(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label
                      htmlFor="profile-photo-upload"
                      className="btn-secondary"
                      style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.78rem', width: 'fit-content' }}
                    >
                      Upload from Device
                    </label>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      PNG, JPG up to 5MB
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  className="web-search-box"
                  style={{ width: '100%' }}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Home City
                </label>
                <input
                  type="text"
                  className="web-search-box"
                  style={{ width: '100%' }}
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Preferred Area / District
                </label>
                <input
                  type="text"
                  className="web-search-box"
                  style={{ width: '100%' }}
                  value={editArea}
                  onChange={(e) => setEditArea(e.target.value)}
                  placeholder="e.g. Downtown / Al Quoz"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-volt">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
