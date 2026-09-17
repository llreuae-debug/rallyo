import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalInitialRole,
    authModalInitialMode,
    login,
    loginWithGoogle,
    signup,
    t
  } = useApp();

  const [role, setRole] = useState<'player' | 'club_owner'>(authModalInitialRole);
  const [mode, setMode] = useState<'login' | 'signup'>(authModalInitialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);

  // Sync role and mode when modal opens or initial props change
  useEffect(() => {
    if (isAuthModalOpen) {
      setRole(authModalInitialRole);
      setMode(authModalInitialMode);
      setError(null);
      setEmail('');
      setPassword('');
      setFullName('');
      setShowGoogleChooser(false);
    }
  }, [isAuthModalOpen, authModalInitialRole, authModalInitialMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'signup' && !fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password, role);
      } else {
        await signup({ full_name: fullName, email, password, role });
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSelect = async (accountName: string, accountEmail: string) => {
    setShowGoogleChooser(false);
    setIsSubmitting(true);
    try {
      await loginWithGoogle(role, accountEmail, accountName);
    } catch (err: any) {
      setError('Google sign-in could not be completed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={closeAuthModal} />

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden z-10 animate-scaleUp">
        {/* Glow Header */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-750 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-sm"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-6 sm:p-8">
          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-2xl mb-3 shadow-inner">
              🎾
            </div>
            <h2 className="text-2xl font-black text-white tracking-wider flex items-center justify-center gap-2">
              RALLYO
            </h2>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-0.5">
              {t.tagline}
            </p>
            <p className="text-sm text-slate-400 mt-2">
              {mode === 'login' ? 'Sign in to access your padel account' : 'Join the fastest growing padel community'}
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Account Role
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => setRole('player')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-all ${
                  role === 'player'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>🎾</span>
                <span>Player</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('club_owner')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-all ${
                  role === 'club_owner'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>🏛️</span>
                <span>Club Owner</span>
              </button>
            </div>

            {/* Role Context Pill */}
            <p className="text-xs text-slate-400 mt-2 text-center">
              {role === 'player'
                ? '⚡ Access matchmaking, court booking, ELO rating, & community'
                : '💼 Manage club inventory, court rates, bookings, & revenue'}
            </p>
          </div>

          {/* Mode Switcher (Sign In vs Create Account) */}
          <div className="flex border-b border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${
                mode === 'login'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(null); }}
              className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${
                mode === 'signup'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Continue with Google */}
          <div className="mb-5">
            <button
              type="button"
              onClick={() => setShowGoogleChooser(true)}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm flex items-center justify-center gap-3 transition-all shadow-md active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-xs uppercase tracking-wider text-slate-500 absolute font-medium">
              or with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 flex items-start gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder={role === 'player' ? 'e.g. Alex Rivera' : 'e.g. Carlos Mendoza'}
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@rallyo.app"
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Demo password reset link simulated to ' + (email || 'your email'))}
                    className="text-xs text-emerald-400 hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                role === 'club_owner'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
                  : 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:opacity-95 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : mode === 'login' ? (
                `Sign In as ${role === 'club_owner' ? 'Club Owner' : 'Player'}`
              ) : (
                `Get Started as ${role === 'club_owner' ? 'Club Owner' : 'Player'}`
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fills for Testing */}
          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">
              ⚡ Quick 1-Click Demo Accounts:
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setRole('player');
                  setEmail('alex.rivera@rallyo.app');
                  setPassword('rallyo2026');
                }}
                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-[11px] text-slate-300 font-medium border border-slate-700/50 transition-colors"
              >
                🎾 Demo Player
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('club_owner');
                  setEmail('marcus.vance@rallyo.app');
                  setPassword('rallyo2026');
                }}
                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-[11px] text-amber-300 font-medium border border-amber-500/30 transition-colors"
              >
                🏛️ Demo Club Owner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Google Realistic Account Chooser Modal */}
      {showGoogleChooser && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white text-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="font-semibold text-slate-800 text-sm">Sign in with Google</span>
              </div>
              <button
                onClick={() => setShowGoogleChooser(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Choose an account to continue to <strong className="text-slate-900">RALLYO ({role === 'player' ? 'Player' : 'Club Owner'})</strong>
            </p>

            <div className="space-y-2 mb-4">
              <button
                type="button"
                onClick={() => handleGoogleSelect('Alex Rivera', 'alex.rivera@gmail.com')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left border border-slate-100"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Alex"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900">Alex Rivera</p>
                  <p className="text-xs text-slate-500 truncate">alex.rivera@gmail.com</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleGoogleSelect('Carlos Mendoza', 'carlos.mendoza@padelgroup.com')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left border border-slate-100"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Carlos"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900">Carlos Mendoza</p>
                  <p className="text-xs text-slate-500 truncate">carlos.mendoza@padelgroup.com</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  const customName = prompt('Enter Google Account Name:', 'Jordan Vance') || 'Jordan Vance';
                  const customEmail = prompt('Enter Google Account Email:', 'jordan.vance@gmail.com') || 'jordan.vance@gmail.com';
                  handleGoogleSelect(customName, customEmail);
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left border border-dashed border-slate-300"
              >
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                  +
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Use another account</p>
                  <p className="text-xs text-slate-500">Sign in with another Google ID</p>
                </div>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              To continue, Google will share your name, email address, and profile picture with RALLYO. See RALLYO’s Privacy Policy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
