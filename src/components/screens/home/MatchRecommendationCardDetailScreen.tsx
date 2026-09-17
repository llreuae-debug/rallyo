import React from 'react';
import { Zap, ShieldCheck, MapPin, Clock, ArrowRight, Star, HeartHandshake } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const MatchRecommendationCardDetailScreen: React.FC = () => {
  const { matches, selectedMatchId, navigateTo, joinMatch } = useApp();
  const match = matches.find(m => m.id === selectedMatchId) || matches[0];

  const breakdownFactors = [
    { title: 'Skill Balance (30%)', value: '98%', description: 'Both pairs average 4.8 - 5.0 rating for maximum competitiveness.' },
    { title: 'Schedule Compatibility (20%)', value: '100%', description: 'Matches your saved preference for Thursday 19:30 evening slots.' },
    { title: 'Location & Distance (15%)', value: '94%', description: `Only 1.4 km from your registered zone at ${match.clubName}.` },
    { title: 'Playstyle Synergy (10%)', value: '92%', description: 'Sofia operates on the left side with tactical placement, complementing your attacking drives.' },
    { title: 'Reliability & No-Show (10%)', value: '100%', description: 'All 3 registered players boast 0% cancellation and 100% on-time attendance.' },
    { title: 'Social & Mutuals (5%)', value: '85%', description: 'Carlos Vega is a mutual contact and regular practice partner.' },
    { title: 'Club Preference (5%)', value: '100%', description: 'The Padel Club Downtown is marked as one of your favorite home courts.' },
    { title: 'Past Match Satisfaction (5%)', value: '95%', description: 'Previous matches in this bracket resulted in 4.9/5 player reviews.' }
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="AI Recommendation Intel" showBack />

      <div className="scroll-container" style={{ paddingBottom: 24 }}>
        {/* Radar Score Hero Banner */}
        <div
          className="rally-card"
          style={{
            background: 'linear-gradient(135deg, #152A3F 0%, #0D1625 100%)',
            borderColor: 'var(--brand-volt)',
            textAlign: 'center',
            padding: 20
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, margin: '0 auto' }}>
            <Zap size={18} color="var(--brand-volt)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-volt)', textTransform: 'uppercase' }}>
              RALLYO AI Match Engine
            </span>
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', fontWeight: 900, color: '#FFF', margin: '4px 0' }}>
            {match.aiCompatibilityScore || 94}%
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFF' }}>
            Ultra-Calibrated Compatibility
          </span>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 6, maxWidth: 280, margin: '6px auto 0' }}>
            {match.aiExplanation}
          </p>
        </div>

        {/* Match Preview Strip */}
        <div className="rally-card" style={{ background: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>{match.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={14} />
              <span>{match.date} • {match.time}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <MapPin size={14} />
            <span>{match.clubName} • {match.courtName}</span>
          </div>
        </div>

        {/* Weighted Scoring Breakdown List */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 800, color: '#FFF', marginBottom: 8 }}>
            Scoring Matrix Breakdown
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {breakdownFactors.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 12
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFF' }}>{item.title}</span>
                  <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--brand-volt)' }}>{item.value}</span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="btn-volt"
          style={{ width: '100%', marginTop: 8 }}
          onClick={() => {
            joinMatch(match.id);
          }}
        >
          <span>Claim Open Spot (€{match.feePerPlayer})</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
