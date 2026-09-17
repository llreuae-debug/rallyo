import React, { useState } from 'react';
import { Users, DollarSign, Trophy, ShieldAlert, CheckCircle, XCircle, BarChart3, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { matches, clubs, otherPlayers, player, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'disputes' | 'users' | 'revenue'>('overview');

  const disputedMatches = matches.filter(m => m.dispute && m.dispute.status === 'open');

  return (
    <div className="desktop-portal-container">
      {/* Portal Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-volt">Master System</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#FFF', marginTop: 4 }}>
            RALLYO Admin Control Center
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Global platform governance: match liquidity, score disputes, club verifications, and financial commission audits.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn-volt"
            style={{ fontSize: '0.82rem', padding: '8px 16px' }}
            onClick={() => showToast('Platform cache purged & synchronized.')}
          >
            Sync Platform Grid
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="portal-grid-kpis">
        <div className="kpi-card">
          <span className="kpi-title">Active Padel Players</span>
          <div className="kpi-val">12,480</div>
          <span className="kpi-delta">▲ +18.4% this month</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Booking GMV (Monthly)</span>
          <div className="kpi-val">€142,850</div>
          <span className="kpi-delta">▲ +24.1% platform fee volume</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Match Fill Rate</span>
          <div className="kpi-val">93.2%</div>
          <span className="kpi-delta">⚡ Average 18 min to 4-player fill</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Verified Clubs & Arenas</span>
          <div className="kpi-val">{clubs.length + 14}</div>
          <span className="kpi-delta">✓ 68 championship courts live</span>
        </div>
      </div>

      {/* Portal Navigation Tabs */}
      <div className="portal-tabs">
        {[
          { id: 'overview', label: '📊 Operations Overview' },
          { id: 'disputes', label: `⚠️ Score Disputes (${disputedMatches.length})` },
          { id: 'users', label: '👥 User & Club Directory' },
          { id: 'revenue', label: '💳 Revenue & Payouts' }
        ].map(t => (
          <button
            key={t.id}
            className={`portal-tab-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id as any)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Disputes Resolution Queue */}
      {activeTab === 'disputes' && (
        <div className="rally-card" style={{ background: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
            Open Score Disputes
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Review player disputes, anti-cheat score mismatches, and resolve ELO ratings.
          </p>

          {disputedMatches.length === 0 ? (
            <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              <CheckCircle size={36} color="var(--brand-volt)" style={{ margin: '0 auto 8px' }} />
              <p>Zero active disputes! All player scores are confirmed.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              {disputedMatches.map(m => (
                <div
                  key={m.id}
                  style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFF' }}>{m.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#EF4444', marginTop: 2 }}>
                      <strong>Dispute Reason:</strong> {m.dispute?.reason}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                      Venue: {m.clubName} • Time: {m.date} {m.time}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn-volt"
                      style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                      onClick={() => showToast('Dispute resolved: Score verified & ELO upheld.')}
                    >
                      Approve Score
                    </button>
                    <button
                      className="btn-secondary"
                      style={{ fontSize: '0.78rem', padding: '6px 14px', color: '#EF4444' }}
                      onClick={() => showToast('Dispute resolved: Score voided & players refunded.')}
                    >
                      Void Match
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Users Directory */}
      {activeTab === 'users' && (
        <div className="rally-card" style={{ background: 'var(--bg-card)', overflowX: 'auto' }}>
          <table className="portal-table">
            <thead>
              <tr>
                <th>Player / User</th>
                <th>City</th>
                <th>Level</th>
                <th>ELO Rating</th>
                <th>Win Rate</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[player, ...otherPlayers].map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={u.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                      <strong>{u.name}</strong>
                    </div>
                  </td>
                  <td>{u.city}</td>
                  <td>Level {u.skillLevel}</td>
                  <td><span className="badge-volt">{u.eloRating}</span></td>
                  <td>{u.winRate}%</td>
                  <td style={{ textTransform: 'capitalize' }}>{u.role}</td>
                  <td>
                    <button
                      className="btn-secondary"
                      style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      onClick={() => showToast(`Verified badges refreshed for ${u.name}`)}
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Operations Overview / Revenue */}
      {(activeTab === 'overview' || activeTab === 'revenue') && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
          <div className="rally-card" style={{ background: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>
              Live Platform Matches Grid
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {matches.slice(0, 4).map(m => (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFF' }}>{m.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.clubName} • {m.date} {m.time}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge-volt" style={{ fontSize: '0.68rem', textTransform: 'capitalize' }}>{m.status}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Fee: €{m.totalFee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rally-card" style={{ background: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>
              Monetization Breakdown
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8, fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Court Booking Fee (6%):</span>
                <strong>€8,571</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Club SaaS Subscriptions:</span>
                <strong>€5,200</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tournament Entry Take (10%):</span>
                <strong>€3,400</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: 8 }}>
                <span style={{ color: 'var(--brand-volt)', fontWeight: 800 }}>Total Platform Net:</span>
                <strong style={{ color: 'var(--brand-volt)', fontSize: '1.05rem' }}>€17,171</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
