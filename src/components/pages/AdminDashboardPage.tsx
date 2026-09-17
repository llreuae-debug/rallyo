import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CURRENCIES, CurrencyCode } from '../../currency/currencies';
import {
  ShieldCheck, DollarSign, Users, Building2, Swords,
  AlertTriangle, CheckCircle2, Globe, TrendingUp
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { matches, clubs, bookings, tournaments, formatMoney, showToast } = useApp();

  const [filterCurrency, setFilterCurrency] = useState<CurrencyCode | 'ALL'>('ALL');
  const [resolvedDisputes, setResolvedDisputes] = useState<string[]>([]);

  // Multi-Currency GMV Data Breakdown
  const gmvData = [
    { currency: 'AED', minor: 8450000, country: 'United Arab Emirates', clubs: 3, bookings: 382 },
    { currency: 'SAR', minor: 3250000, country: 'Saudi Arabia', clubs: 1, bookings: 140 },
    { currency: 'EUR', minor: 642000, country: 'Spain', clubs: 1, bookings: 112 },
    { currency: 'GBP', minor: 480000, country: 'United Kingdom', clubs: 1, bookings: 78 },
    { currency: 'USD', minor: 560000, country: 'United States', clubs: 1, bookings: 94 },
    { currency: 'QAR', minor: 1850000, country: 'Qatar', clubs: 1, bookings: 65 },
    { currency: 'KWD', minor: 210000, country: 'Kuwait', clubs: 1, bookings: 42 },
    { currency: 'BHD', minor: 180000, country: 'Bahrain', clubs: 1, bookings: 30 },
    { currency: 'PKR', minor: 142000000, country: 'Pakistan', clubs: 1, bookings: 110 }
  ];

  const disputes = [
    {
      id: 'disp_1',
      matchTitle: 'Downtown Master League - Round 4',
      reportedBy: 'Elena Rostova',
      reason: 'Score discrepancy on tiebreak in set 2. Opponent recorded 7-5 instead of 7-6.',
      status: resolvedDisputes.includes('disp_1') ? 'resolved' : 'pending'
    }
  ];

  const handleResolveDispute = (id: string) => {
    setResolvedDisputes(prev => [...prev, id]);
    showToast('⚖️ Dispute resolved by Admin. ELO rating delta recalibrated.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* HEADER */}
      <div>
        <div className="volt-badge" style={{ marginBottom: 8 }}>
          <ShieldCheck size={14} /> Global Control Center
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>
          RALLYO Platform Administration
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: 4 }}>
          Global telemetry across 9 currencies, club operating ledgers, and match disputes.
        </p>
      </div>

      {/* METRICS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        <div className="bento-card" style={{ padding: 20 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Active Players</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#FFF' }}>
            48,290
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--brand-volt)', marginTop: 2 }}>+14% this month</div>
        </div>

        <div className="bento-card" style={{ padding: 20 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Affiliated Clubs</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--brand-volt)' }}>
            {clubs.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>5 International Cities</div>
        </div>

        <div className="bento-card" style={{ padding: 20 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Matches</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#38BDF8' }}>
            {matches.length + 142}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>98.4% Completion</div>
        </div>

        <div className="bento-card" style={{ padding: 20 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Open Disputes</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: disputes.filter(d => d.status === 'pending').length > 0 ? '#FF5E36' : 'var(--brand-volt)' }}>
            {disputes.filter(d => d.status === 'pending').length}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>Trust & Safety Queue</div>
        </div>
      </div>

      {/* MULTI-CURRENCY GMV LEDGER */}
      <div className="bento-card">
        <div className="bento-header">
          <div className="bento-title">
            <DollarSign size={20} color="var(--brand-volt)" /> Multi-Currency GMV & Club Settlement Ledger
          </div>
          <select
            className="web-pill-select"
            value={filterCurrency}
            onChange={(e) => setFilterCurrency(e.target.value as any)}
          >
            <option value="ALL">All Currencies ({Object.keys(CURRENCIES).length})</option>
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="portal-table">
            <thead>
              <tr>
                <th>Currency (ISO)</th>
                <th>Region / Country</th>
                <th>Clubs</th>
                <th>Monthly Bookings</th>
                <th>Gross Settlement Volume (Minor Units)</th>
                <th>Converted Preview</th>
              </tr>
            </thead>
            <tbody>
              {gmvData
                .filter(row => filterCurrency === 'ALL' || row.currency === filterCurrency)
                .map((row) => (
                  <tr key={row.currency}>
                    <td>
                      <span className="volt-badge">
                        {CURRENCIES[row.currency as CurrencyCode]?.flag} {row.currency}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{row.country}</td>
                    <td>{row.clubs}</td>
                    <td>{row.bookings}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {row.minor.toLocaleString()} {row.currency} minor units
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--brand-volt)' }}>
                      {formatMoney(row.minor, row.currency as CurrencyCode)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCORE DISPUTE AUDIT QUEUE */}
      <div className="bento-card">
        <div className="bento-header">
          <div className="bento-title">
            <AlertTriangle size={20} color="#FF5E36" /> Official Score Dispute & Rating Verification Queue
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {disputes.map((disp) => (
            <div
              key={disp.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: disp.status === 'resolved' ? '1px solid var(--border-subtle)' : '1px solid rgba(255, 94, 54, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: 18,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem' }}>{disp.matchTitle}</span>
                  <span className="volt-badge" style={{
                    fontSize: '0.65rem',
                    background: disp.status === 'resolved' ? 'rgba(0, 245, 118, 0.15)' : 'rgba(255, 94, 54, 0.15)',
                    color: disp.status === 'resolved' ? 'var(--brand-volt)' : '#FF5E36'
                  }}>
                    {disp.status.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Dispute filed by {disp.reportedBy}: "{disp.reason}"
                </div>
              </div>

              {disp.status === 'pending' ? (
                <button
                  className="btn-volt"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  onClick={() => handleResolveDispute(disp.id)}
                >
                  Confirm & Resolve Tiebreak
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--brand-volt)', fontSize: '0.82rem', fontWeight: 700 }}>
                  <CheckCircle2 size={16} /> Resolution Finalized
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
