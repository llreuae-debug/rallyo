import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { CURRENCIES, CurrencyCode } from '../../currency/currencies';
import { LOCALES, SupportedLanguage } from '../../i18n/locales';
import { DominantHand } from '../../types';

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
];

const AVAILABILITY_OPTIONS = [
  'Weekday Evenings (6-10 PM)',
  'Weekend Mornings (7-11 AM)',
  'Weekend Afternoons (4-8 PM)',
  'Weekday Lunchtime (12-2 PM)',
  'Early Bird (6-8 AM)',
  'Late Night (10 PM-Midnight)'
];

const MATCH_TYPE_OPTIONS: { id: 'doubles' | 'singles' | 'both'; label: string }[] = [
  { id: 'doubles', label: 'Competitive Doubles (Ranked)' },
  { id: 'both', label: 'Both Doubles & King of Court' },
  { id: 'singles', label: '1v1 Singles Match' }
];

export const PlayerOnboardingPage: React.FC = () => {
  const {
    player,
    currentUser,
    registerPlayerOnboarding,
    currency,
    setCurrency,
    language,
    setLanguage,
    t
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 3;

  // Form State
  const [name, setName] = useState(currentUser?.full_name || player.name || 'Alex Rivera');
  const [email] = useState(currentUser?.email || 'alex.rivera@rallyo.app');
  const [photoUrl, setPhotoUrl] = useState(player.avatar || DEFAULT_AVATARS[0]);
  const [city, setCity] = useState(player.city || 'Dubai');
  const [preferredArea, setPreferredArea] = useState(player.preferred_area || 'Downtown / Business Bay');
  const [skillLevel, setSkillLevel] = useState<number>(player.skillLevel || 3.8);
  const [preferredMatchType, setPreferredMatchType] = useState<'doubles' | 'singles' | 'both'>('doubles');
  const [availability, setAvailability] = useState<string[]>(
    player.availability && player.availability.length > 0
      ? player.availability
      : ['Weekday Evenings (6-10 PM)', 'Weekend Mornings (7-11 AM)']
  );
  const [dominantHand, setDominantHand] = useState<DominantHand>(player.dominantHand || 'Right');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Device Photo Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file size must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleAvailability = (opt: string) => {
    setAvailability(prev =>
      prev.includes(opt) ? prev.filter(item => item !== opt) : [...prev, opt]
    );
  };

  const getSkillDescriptor = (rating: number) => {
    if (rating < 2.0) return { label: 'Novice / Beginner', desc: 'Learning racket coordination, walls, and scoring.', color: 'text-blue-400' };
    if (rating < 3.0) return { label: 'Recreational', desc: 'Can sustain rallies, learning bandehas and glass returns.', color: 'text-teal-400' };
    if (rating < 4.0) return { label: 'Intermediate (Club Player)', desc: 'Consistent smash, positioning, and tactical shot selection.', color: 'text-emerald-400' };
    if (rating < 5.0) return { label: 'Advanced', desc: 'Tournament regular, executes viboras, chiquitas, high match IQ.', color: 'text-amber-400' };
    return { label: 'Elite / Semi-Pro', desc: 'Premier Padel circuit level, master of power and defensive lobbing.', color: 'text-purple-400' };
  };

  const skillInfo = getSkillDescriptor(skillLevel);

  const handleFinish = () => {
    registerPlayerOnboarding({
      name,
      avatar: photoUrl,
      city,
      preferred_area: preferredArea,
      skillLevel,
      preferred_match_type: preferredMatchType,
      availability,
      dominantHand
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
            <span>🎾</span> Player Calibration
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Build Your <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Padel Identity</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Step {step} of {totalSteps} • RALLYO — {t.tagline}
          </p>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Profile & Photo Upload */}
        {step === 1 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-emerald-500/5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span>📸</span> Profile & Photo
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Upload a clear photo or select a default padel avatar. Your photo will appear in matchmaking and court check-ins.
            </p>

            {/* Photo Preview & Upload */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
              <div className="relative group">
                <img
                  src={photoUrl}
                  alt="Avatar Preview"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-emerald-400/80 shadow-lg shadow-emerald-500/20"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-transform active:scale-95"
                  title="Upload from device"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold border border-slate-700 transition-colors shadow-sm mb-2"
                >
                  Upload from Device
                </button>
                <p className="text-[11px] text-slate-400">
                  PNG, JPG, or WEBP up to 5MB. Circular preview automatically applied.
                </p>

                {/* Quick Avatar Presets */}
                <div className="mt-3">
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5">
                    Or select a preset avatar:
                  </p>
                  <div className="flex gap-2 justify-center sm:justify-start">
                    {DEFAULT_AVATARS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPhotoUrl(av)}
                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                          photoUrl === av ? 'border-emerald-400 scale-110' : 'border-slate-700 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={av} alt="Preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Name & Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                  placeholder="e.g. Alex Rivera"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    City / Country
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                    placeholder="e.g. Dubai, UAE"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Preferred Playing Area / District
                  </label>
                  <input
                    type="text"
                    value={preferredArea}
                    onChange={e => setPreferredArea(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                    placeholder="e.g. Downtown / Al Quoz"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all"
              >
                Next: Skill Calibration →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Skill Calibration & Playing Style */}
        {step === 2 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-emerald-500/5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span>⚡</span> Skill Level & Play Style
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Our AI Matchmaker uses your calibrated level to recommend competitive, balanced games.
            </p>

            {/* Rating Slider */}
            <div className="p-5 bg-slate-950/70 rounded-2xl border border-slate-800 mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  RALLYO Playtomic / FIP Level:
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {skillLevel.toFixed(1)}
                </span>
              </div>

              <input
                type="range"
                min="1.0"
                max="7.0"
                step="0.1"
                value={skillLevel}
                onChange={e => setSkillLevel(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1">
                <span>1.0 Beginner</span>
                <span>3.0 Club</span>
                <span>5.0 Advanced</span>
                <span>7.0 World Padel Tour</span>
              </div>

              {/* Dynamic Badge */}
              <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <p className={`text-sm font-bold ${skillInfo.color}`}>
                  Level {skillLevel.toFixed(1)}: {skillInfo.label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {skillInfo.desc}
                </p>
              </div>
            </div>

            {/* Dominant Hand */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Dominant Hand
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Right', 'Left'] as const).map(hand => (
                  <button
                    key={hand}
                    type="button"
                    onClick={() => setDominantHand(hand)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      dominantHand === hand
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {hand === 'Right' ? 'Right Handed' : 'Left Handed'}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Match Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Preferred Match Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {MATCH_TYPE_OPTIONS.map(format => (
                  <button
                    key={format.id}
                    type="button"
                    onClick={() => setPreferredMatchType(format.id)}
                    className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all ${
                      preferredMatchType === format.id
                        ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-medium text-sm transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all"
              >
                Next: Availability & Localization →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Availability, Language & Currency */}
        {step === 3 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-emerald-500/5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span>📅</span> Availability & Preferences
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              When are you ready to rally? Pick your typical playing windows and currency display.
            </p>

            {/* Availability Chips */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select Your Regular Windows
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AVAILABILITY_OPTIONS.map(window => {
                  const selected = availability.includes(window);
                  return (
                    <button
                      key={window}
                      type="button"
                      onClick={() => toggleAvailability(window)}
                      className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                        selected
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{window}</span>
                      <span>{selected ? '✓' : '+'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Localization Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-950/60 rounded-2xl border border-slate-800 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  App Language
                </label>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value as SupportedLanguage)}
                  className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                >
                  {Object.values(LOCALES).map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Preferred Currency
                </label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value as CurrencyCode)}
                  className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                >
                  {Object.values(CURRENCIES).map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Summary Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 text-center">
              <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Ready to Find Your Rally
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Starting ELO: <strong className="text-white">1200</strong> • Level: <strong className="text-white">{skillLevel.toFixed(1)}</strong> • City: <strong className="text-white">{city}</strong>
              </p>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-medium text-sm transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 hover:opacity-95 active:scale-95 transition-all"
              >
                Enter Player Dashboard 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
