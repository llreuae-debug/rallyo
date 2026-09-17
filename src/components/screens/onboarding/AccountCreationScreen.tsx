import React, { useState } from 'react';
import { ArrowRight, User, Mail, Lock, Phone } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const AccountCreationScreen: React.FC = () => {
  const { navigateTo, updatePlayer, player } = useApp();
  const [name, setName] = useState(player.name || '');
  const [email, setEmail] = useState(player.email || '');
  const [phone, setPhone] = useState(player.phone || '');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<'player' | 'club_manager' | 'tournament_organizer'>('player');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    updatePlayer({ name, email, phone, role: selectedRole });
    navigateTo('player_setup');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Create Account" showBack onBack={() => navigateTo('welcome')} />

      <form onSubmit={handleContinue} className="scroll-container" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <span className="badge-volt">Step 1 of 4</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginTop: 6 }}>
              Join the Padel Network
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Set up your RALLYO credentials to begin finding matches and booking courts.
            </p>
          </div>

          {/* Role Toggle */}
          <div>
            <label className="input-label">I want to join primarily as:</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                type="button"
                className={`btn-secondary ${selectedRole === 'player' ? 'active' : ''}`}
                style={{
                  background: selectedRole === 'player' ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                  borderColor: selectedRole === 'player' ? 'var(--brand-volt)' : 'var(--border-subtle)',
                  color: selectedRole === 'player' ? 'var(--brand-volt)' : '#FFF'
                }}
                onClick={() => setSelectedRole('player')}
              >
                🎾 Player
              </button>
              <button
                type="button"
                className={`btn-secondary ${selectedRole === 'club_manager' ? 'active' : ''}`}
                style={{
                  background: selectedRole === 'club_manager' ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                  borderColor: selectedRole === 'club_manager' ? 'var(--brand-volt)' : 'var(--border-subtle)',
                  color: selectedRole === 'club_manager' ? 'var(--brand-volt)' : '#FFF'
                }}
                onClick={() => setSelectedRole('club_manager')}
              >
                🏛️ Club Owner
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div>
            <label className="input-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <input
                className="rally-input"
                type="text"
                placeholder="e.g. Alex Ruiz"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="input-label">Email Address</label>
            <input
              className="rally-input"
              type="email"
              placeholder="alex@rallyo.app"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">Phone Number (Optional for SMS match alerts)</label>
            <input
              className="rally-input"
              type="tel"
              placeholder="+971 50 123 4567"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="input-label">Password</label>
            <input
              className="rally-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ marginTop: 24, paddingBottom: 16 }}>
          <button type="submit" className="btn-volt" style={{ width: '100%' }}>
            <span>Continue to Profile Setup</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
