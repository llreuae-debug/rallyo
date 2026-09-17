import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, Plus, QrCode, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ClubManagerPortal: React.FC = () => {
  const { clubs, courts, bookings, showToast } = useApp();
  const [selectedClub, setSelectedClub] = useState(clubs[0]);
  const [activeTab, setActiveTab] = useState<'calendar' | 'courts' | 'revenue'>('calendar');

  const myCourts = courts.filter(c => c.clubId === selectedClub.id);

  return (
    <div className="desktop-portal-container">
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-volt">Venue Operations</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#FFF', marginTop: 4 }}>
            {selectedClub.name} — Manager Portal
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {selectedClub.address} • {selectedClub.courtsCount} Championship Courts • Daily {selectedClub.operatingHours}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn-volt"
            style={{ fontSize: '0.82rem', padding: '8px 16px' }}
            onClick={() => showToast('New court time slots published to mobile app!')}
          >
            <Plus size={16} />
            <span>Add Court Slot</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="portal-grid-kpis">
        <div className="kpi-card">
          <span className="kpi-title">Today's Court Utilization</span>
          <div className="kpi-val">88.5%</div>
          <span className="kpi-delta">⚡ 32 slots booked / 36 slots total</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Weekly Gross Revenue</span>
          <div className="kpi-val">€18,640</div>
          <span className="kpi-delta">▲ +12.8% vs last week</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Player Rating</span>
          <div className="kpi-val" style={{ color: '#F59E0B' }}>★ {selectedClub.rating}</div>
          <span className="kpi-delta" style={{ color: 'var(--text-muted)' }}>From {selectedClub.reviewCount} verified player reviews</span>
        </div>
      </div>

      {/* Portal Tabs */}
      <div className="portal-tabs">
        {[
          { id: 'calendar', label: '📅 Court Bookings & Gate Check-in' },
          { id: 'courts', label: '🎾 Court Inventory & Pricing' },
          { id: 'revenue', label: '📈 Revenue & Payouts' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`portal-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings Ledger */}
      {activeTab === 'calendar' && (
        <div className="rally-card" style={{ background: 'var(--bg-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>
              Live Reservations & Digital Gate Pass Ledger
            </h3>
            <span className="badge-tag">Auto-Synced with RALLYO App</span>
          </div>

          <table className="portal-table" style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>Booking Pass ID</th>
                <th>Court Name</th>
                <th>Date & Slot</th>
                <th>Format</th>
                <th>Total Fee</th>
                <th>Payment Status</th>
                <th>Gate Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <QrCode size={16} color="var(--brand-volt)" />
                      <strong>{b.qrCode}</strong>
                    </div>
                  </td>
                  <td>{b.courtName}</td>
                  <td>{b.date} • {b.timeSlot}</td>
                  <td>{b.splitCount}-Way Split</td>
                  <td>€{b.totalAmount}</td>
                  <td>
                    <span className="badge-volt" style={{ fontSize: '0.68rem', textTransform: 'capitalize' }}>
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-secondary"
                      style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                      onClick={() => showToast(`Verified Pass ${b.qrCode}! Court lighting activated.`)}
                    >
                      Verify & Open Gate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Courts Inventory */}
      {activeTab === 'courts' && (
        <div className="rally-card" style={{ background: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF', marginBottom: 12 }}>
            Court Specifications & Hourly Rates
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
            {myCourts.map(crt => (
              <div
                key={crt.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#FFF' }}>{crt.name}</h4>
                  <span className="badge-volt">Active</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Surface: {crt.surface.replace('_', ' ')} • Enclosure: {crt.type.replace('_', ' ')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Standard Hourly Rate:</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--brand-volt)' }}>€{crt.hourlyRate}/hr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revenue */}
      {activeTab === 'revenue' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="rally-card" style={{ background: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>
              Automated Payout Schedule
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Stripe Connect payouts are settled directly every Monday morning into your verified IBAN.
            </p>
            <div style={{ marginTop: 12, padding: 12, background: 'rgba(0, 245, 118, 0.08)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Next Estimated Payout:</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--brand-volt)' }}>€14,820.00</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>Settling on Monday, 06:00 AM</div>
            </div>
          </div>

          <div className="rally-card" style={{ background: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>
              Club Amenities & Features Editor
            </h3>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
              {selectedClub.amenities.map((a, i) => (
                <span key={i} className="badge-tag" style={{ fontSize: '0.74rem' }}>
                  ✓ {a}
                </span>
              ))}
            </div>
            <button
              className="btn-secondary"
              style={{ marginTop: 16, fontSize: '0.78rem' }}
              onClick={() => showToast('Amenities saved to public profile.')}
            >
              Update Amenities & Photos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
