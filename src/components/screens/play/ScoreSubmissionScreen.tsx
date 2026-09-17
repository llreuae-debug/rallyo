import React, { useState } from 'react';
import { Trophy, CheckCircle2, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const ScoreSubmissionScreen: React.FC = () => {
  const { matches, selectedMatchId, submitScore, disputeScore, navigateTo } = useApp();
  const match = matches.find(m => m.id === selectedMatchId) || matches[0];

  const [set1A, setSet1A] = useState(6);
  const [set1B, setSet1B] = useState(4);
  const [set2A, setSet2A] = useState(7);
  const [set2B, setSet2B] = useState(5);
  const [tieA, setTieA] = useState(0);
  const [tieB, setTieB] = useState(0);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const winsA = (set1A > set1B ? 1 : 0) + (set2A > set2B ? 1 : 0) + (tieA > tieB ? 1 : 0);
  const winsB = (set1B > set1A ? 1 : 0) + (set2B > set2A ? 1 : 0) + (tieB > tieA ? 1 : 0);
  const projectedWinner = winsA >= winsB ? 'Team Alpha' : 'Team Bravo';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teamASets = tieA > 0 ? [set1A, set2A, tieA] : [set1A, set2A];
    const teamBSets = tieB > 0 ? [set1B, set2B, tieB] : [set1B, set2B];
    submitScore(match.id, teamASets, teamBSets);
  };

  const handleDispute = () => {
    if (!disputeReason.trim()) return;
    disputeScore(match.id, disputeReason);
    setShowDisputeModal(false);
    navigateTo('play_hub');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Submit Match Score" showBack />

      <form onSubmit={handleSubmit} className="scroll-container" style={{ paddingBottom: 28 }}>
        {/* Header Summary */}
        <div className="rally-card" style={{ background: 'linear-gradient(135deg, #152238 0%, #0E1624 100%)', textAlign: 'center' }}>
          <Trophy size={28} color="var(--brand-volt)" style={{ margin: '0 auto 4px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
            Score Confirmation & ELO Settlement
          </h3>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
            Official 2-set format with Super Tiebreak (10-point) decider if 1 set all.
          </p>
        </div>

        {/* Score Grid */}
        <div className="rally-card" style={{ background: 'var(--bg-card)', padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 6, alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Team</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 700 }}>Set 1</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 700 }}>Set 2</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 700 }}>TB (10)</span>
          </div>

          {/* Team Alpha */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 6, alignItems: 'center', padding: '8px 0' }}>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--brand-volt)' }}>Team Alpha</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>You & Partner</div>
            </div>
            <input
              type="number"
              min="0"
              max="7"
              className="rally-input"
              style={{ textAlign: 'center', padding: '6px 2px', fontWeight: 800 }}
              value={set1A}
              onChange={e => setSet1A(parseInt(e.target.value) || 0)}
            />
            <input
              type="number"
              min="0"
              max="7"
              className="rally-input"
              style={{ textAlign: 'center', padding: '6px 2px', fontWeight: 800 }}
              value={set2A}
              onChange={e => setSet2A(parseInt(e.target.value) || 0)}
            />
            <input
              type="number"
              min="0"
              max="20"
              className="rally-input"
              style={{ textAlign: 'center', padding: '6px 2px', fontWeight: 800 }}
              value={tieA}
              onChange={e => setTieA(parseInt(e.target.value) || 0)}
            />
          </div>

          {/* Team Bravo */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 6, alignItems: 'center', padding: '8px 0', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#38BDF8' }}>Team Bravo</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Opponents</div>
            </div>
            <input
              type="number"
              min="0"
              max="7"
              className="rally-input"
              style={{ textAlign: 'center', padding: '6px 2px', fontWeight: 800 }}
              value={set1B}
              onChange={e => setSet1B(parseInt(e.target.value) || 0)}
            />
            <input
              type="number"
              min="0"
              max="7"
              className="rally-input"
              style={{ textAlign: 'center', padding: '6px 2px', fontWeight: 800 }}
              value={set2B}
              onChange={e => setSet2B(parseInt(e.target.value) || 0)}
            />
            <input
              type="number"
              min="0"
              max="20"
              className="rally-input"
              style={{ textAlign: 'center', padding: '6px 2px', fontWeight: 800 }}
              value={tieB}
              onChange={e => setTieB(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Projected ELO Impact Preview */}
        <div
          style={{
            background: 'rgba(0, 245, 118, 0.08)',
            border: '1px solid rgba(0, 245, 118, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#FFF' }}>
              Projected Winner: {projectedWinner}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              ELO rating shift calculated on team strength delta
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: winsA >= winsB ? 'var(--brand-volt)' : '#EF4444' }}>
              {winsA >= winsB ? '+22 ELO' : '-18 ELO'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          <button type="submit" className="btn-volt" style={{ width: '100%' }}>
            <span>Confirm & Publish Official Score</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className="btn-secondary"
            style={{ width: '100%', fontSize: '0.8rem', color: '#F59E0B', borderColor: 'rgba(245, 158, 11, 0.3)' }}
            onClick={() => setShowDisputeModal(true)}
          >
            <ShieldAlert size={15} />
            <span>Score Dispute / Issue with Match?</span>
          </button>
        </div>
      </form>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div className="rally-card" style={{ background: '#121927', width: '100%', maxWidth: 340 }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>File Score Dispute</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              If scores were incorrectly recorded or opponent did not show, report it directly to the RALLYO review team.
            </p>
            <textarea
              className="rally-input"
              rows={3}
              placeholder="Explain the dispute issue..."
              value={disputeReason}
              onChange={e => setDisputeReason(e.target.value)}
              style={{ fontSize: '0.8rem' }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ flex: 1, fontSize: '0.78rem' }}
                onClick={() => setShowDisputeModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-clay"
                style={{ flex: 1, fontSize: '0.78rem' }}
                onClick={handleDispute}
              >
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
