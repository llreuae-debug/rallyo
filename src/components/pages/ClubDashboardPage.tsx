import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2, Calendar, CreditCard, Users, QrCode,
  CheckCircle2, DollarSign, ArrowRight, ShieldCheck, Sparkles,
  MapPin, Clock, Image as ImageIcon, Settings, Star, Plus, Trash2, Edit3
} from 'lucide-react';
import { CURRENCIES, CurrencyCode } from '../../currency/currencies';

const ALL_FACILITIES_OPTIONS = [
  'Indoor courts',
  'Outdoor courts',
  'Parking',
  'Showers',
  'Changing rooms',
  'Locker rooms',
  'Cafe',
  'Pro shop',
  'Coaching',
  'Rental rackets',
  'Ball sales',
  'Tournaments',
  'Lighting',
  'Air conditioning',
  'Wi-Fi'
];

type DashboardSection =
  | 'overview'
  | 'profile'
  | 'facilities'
  | 'gallery'
  | 'courts'
  | 'rates'
  | 'hours'
  | 'bookings'
  | 'reviews'
  | 'revenue';

export const ClubDashboardPage: React.FC = () => {
  const {
    myClub,
    clubs,
    courts,
    bookings,
    updateMyClub,
    addClubCourt,
    formatMoney,
    showToast,
    navigateTo
  } = useApp();

  // Active club: prioritize user's own registered club, fallback to first mock club
  const club = myClub || clubs[0];
  const clubCourts = courts.filter(c => c.clubId === club.id);

  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Edit states
  const [editName, setEditName] = useState(club.name);
  const [editTagline, setEditTagline] = useState(club.tagline || '');
  const [editAddress, setEditAddress] = useState(club.address || club.location);
  const [editCity, setEditCity] = useState(club.city || 'Dubai');
  const [editPhone, setEditPhone] = useState(club.contact_phone || '+971 50 882 1993');
  const [editEmail, setEditEmail] = useState(club.contact_email || 'club@rallyo.app');
  const [editHours, setEditHours] = useState(club.opening_hours || club.operatingHours || '07:00 AM - Midnight');

  // Rates in minor units
  const [editStandardRate, setEditStandardRate] = useState(club.rates_standard_minor || club.price_per_hour_minor || 22000);
  const [editPeakRate, setEditPeakRate] = useState(club.rates_peak_minor || 26000);
  const [editOffPeakRate, setEditOffPeakRate] = useState(club.rates_off_peak_minor || 18000);
  const [editWeekendRate, setEditWeekendRate] = useState(club.rates_weekend_minor || 28000);

  // New court modal state
  const [showAddCourtModal, setShowAddCourtModal] = useState(false);
  const [newCourtName, setNewCourtName] = useState('');
  const [newCourtType, setNewCourtType] = useState('panoramic_glass');
  const [newCourtIndoor, setNewCourtIndoor] = useState(club.indoor);

  const handleSimulateScan = () => {
    setScanResult('VALID GATE ENTRY: Alex Ruiz — Court 1 Panoramic (19:00 - 20:30)');
    showToast('✅ Turnstile Gate Activated! Access granted.');
    setTimeout(() => setScanResult(null), 4500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMyClub({
      name: editName,
      tagline: editTagline,
      address: editAddress,
      city: editCity,
      contact_phone: editPhone,
      contact_email: editEmail
    });
  };

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    updateMyClub({
      pricePerHour: Math.round(editStandardRate / 100),
      price_per_hour_minor: editStandardRate,
      rates_standard_minor: editStandardRate,
      rates_peak_minor: editPeakRate,
      rates_off_peak_minor: editOffPeakRate,
      rates_weekend_minor: editWeekendRate
    });
  };

  const handleSaveHours = (e: React.FormEvent) => {
    e.preventDefault();
    updateMyClub({
      operatingHours: editHours,
      opening_hours: editHours
    });
  };

  const toggleFacility = (facility: string) => {
    const current = club.facilities || club.amenities || [];
    const next = current.includes(facility)
      ? current.filter(f => f !== facility)
      : [...current, facility];
    updateMyClub({ facilities: next, amenities: next });
  };

  const handleCreateCourt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourtName.trim()) return;
    addClubCourt({
      name: newCourtName,
      type: newCourtType as any,
      indoor: newCourtIndoor,
      hourly_rate_minor: editStandardRate
    });
    setNewCourtName('');
    setShowAddCourtModal(false);
  };

  const handleAddSampleGalleryImage = () => {
    const samples = [
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1000&auto=format&fit=crop&q=80'
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    const current = club.gallery_image_urls || [];
    updateMyClub({ gallery_image_urls: [...current, picked] });
  };

  const handleRemoveGalleryImage = (idx: number) => {
    const current = club.gallery_image_urls || [];
    updateMyClub({ gallery_image_urls: current.filter((_, i) => i !== idx) });
  };

  const handleSetCover = (idx: number) => {
    const current = club.gallery_image_urls || [];
    const target = current[idx];
    const rest = current.filter((_, i) => i !== idx);
    updateMyClub({
      cover_photo_url: target,
      imageUrl: target,
      gallery_image_urls: [target, ...rest]
    });
  };

  const currentFacilities = club.facilities || club.amenities || [];
  const gallery = club.gallery_image_urls && club.gallery_image_urls.length > 0
    ? club.gallery_image_urls
    : [club.cover_photo_url || club.imageUrl];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* HEADER BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-6 sm:p-8 shadow-xl shadow-amber-500/5">
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="flex items-start gap-4">
            <img
              src={club.club_logo_url || club.cover_photo_url || club.imageUrl}
              alt="Club Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Building2 size={13} /> Official Club Partner Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {club.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-2">
                <span>📍 {club.address || club.location}</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">{club.operating_currency}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('club_detail', { clubId: club.id })}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors shadow-sm"
            >
              Preview in Player Discovery ↗
            </button>
            <button
              onClick={handleSimulateScan}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black tracking-wide flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <QrCode size={15} /> Scan Gate Pass
            </button>
          </div>
        </div>
      </div>

      {/* SCAN RESULT BANNER */}
      {scanResult && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl text-emerald-300 font-bold text-sm flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 size={20} className="text-emerald-400" />
          <span>{scanResult}</span>
        </div>
      )}

      {/* NAVIGATION TABS (10 SECTIONS) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
        {(
          [
            { id: 'overview', label: 'Overview', icon: Building2 },
            { id: 'profile', label: 'Club Profile', icon: Edit3 },
            { id: 'courts', label: 'Courts', icon: Users },
            { id: 'rates', label: 'Rates & Pricing', icon: DollarSign },
            { id: 'facilities', label: 'Facilities', icon: Sparkles },
            { id: 'gallery', label: 'Gallery', icon: ImageIcon },
            { id: 'hours', label: 'Opening Hours', icon: Clock },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'reviews', label: 'Reviews', icon: Star },
            { id: 'revenue', label: 'Revenue Summary', icon: CreditCard }
          ] as const
        ).map(tab => {
          const Icon = tab.icon;
          const active = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <span className="text-xs uppercase font-bold text-slate-400">Total Courts</span>
              <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">{club.courtsCount || 4}</p>
              <span className="text-[11px] text-slate-400">{club.availableCourts || 4} available today</span>
            </div>
            <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <span className="text-xs uppercase font-bold text-slate-400">Daily Revenue</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                {formatMoney(264000, club.operating_currency)}
              </p>
              <span className="text-[11px] text-slate-400">11 booked court hours</span>
            </div>
            <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <span className="text-xs uppercase font-bold text-slate-400">Club Rating</span>
              <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">★ {club.rating}</p>
              <span className="text-[11px] text-slate-400">Based on {club.reviewCount} reviews</span>
            </div>
            <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <span className="text-xs uppercase font-bold text-slate-400">Active Facilities</span>
              <p className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">{currentFacilities.length}</p>
              <span className="text-[11px] text-slate-400">Showers, AC, Cafe, etc.</span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live Courts status */}
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users size={16} className="text-amber-400" /> Court Inventory ({clubCourts.length})
                </h3>
                <button
                  onClick={() => setShowAddCourtModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40"
                >
                  + Add Court
                </button>
              </div>

              <div className="space-y-2">
                {clubCourts.map((c, i) => (
                  <div key={c.id || i} className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-sm font-bold text-white">{c.name}</span>
                      <p className="text-xs text-slate-400">{c.indoor ? 'Indoor AC' : 'Outdoor'} • {c.surface.replace('_', ' ')}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-400">
                      {formatMoney(c.hourly_rate_minor, club.operating_currency)}/hr
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Gate Bookings */}
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={16} className="text-emerald-400" /> Upcoming Reservations ({bookings.length})
                </h3>
                <button
                  onClick={() => setActiveSection('bookings')}
                  className="text-xs text-emerald-400 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2">
                {bookings.slice(0, 3).map(b => (
                  <div key={b.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">{b.courtName}</span>
                      <p className="text-xs text-slate-400">{b.timeSlot} • QR: {b.qrCode}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {b.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CLUB PROFILE EDIT */}
      {activeSection === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">Club Profile & Contact</h2>
            <p className="text-xs text-slate-400">Update public identity, address, and inquiry channels.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Club Name</label>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Tagline</label>
              <input
                type="text"
                value={editTagline}
                onChange={e => setEditTagline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Full Address</label>
              <input
                type="text"
                value={editAddress}
                onChange={e => setEditAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">City</label>
              <input
                type="text"
                value={editCity}
                onChange={e => setEditCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Contact Phone</label>
              <input
                type="text"
                value={editPhone}
                onChange={e => setEditPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Contact Email</label>
              <input
                type="email"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all"
          >
            Save Profile Changes
          </button>
        </form>
      )}

      {/* 3. COURTS INVENTORY */}
      {activeSection === 'courts' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Court Inventory Management</h2>
              <p className="text-xs text-slate-400">Configure your courts, surface specifications, and status.</p>
            </div>
            <button
              onClick={() => setShowAddCourtModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-1.5 shadow"
            >
              <Plus size={14} /> Add Court
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {clubCourts.map((c, i) => (
              <div key={c.id || i} className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{c.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    {c.indoor ? 'Indoor AC' : 'Outdoor'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Surface: {c.surface.replace('_', ' ')} • {c.type.replace('_', ' ')}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-850">
                  <span className="text-xs text-slate-400">Hourly Rate:</span>
                  <span className="text-sm font-black text-amber-400">
                    {formatMoney(c.hourly_rate_minor, club.operating_currency)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. RATES & PRICING */}
      {activeSection === 'rates' && (
        <form onSubmit={handleSaveRates} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">Court Rates & Multi-Tier Pricing</h2>
            <p className="text-xs text-slate-400">
              Set standard, peak, off-peak, and weekend pricing. Values stored safely in integer minor units ({club.operating_currency}).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <label className="block text-xs font-bold text-slate-300 mb-1">Standard Hourly Rate</label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-400">{club.operating_currency}</span>
                <input
                  type="number"
                  step="5"
                  value={editStandardRate / 100}
                  onChange={e => setEditStandardRate(Math.round(parseFloat(e.target.value || '0') * 100))}
                  className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-lg font-black text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Minor units: {editStandardRate}</p>
            </div>

            <div className="p-4 bg-slate-950/70 border border-amber-500/30 rounded-2xl">
              <label className="block text-xs font-bold text-amber-300 mb-1">Peak Hours Rate (6-11 PM)</label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-400">{club.operating_currency}</span>
                <input
                  type="number"
                  step="5"
                  value={editPeakRate / 100}
                  onChange={e => setEditPeakRate(Math.round(parseFloat(e.target.value || '0') * 100))}
                  className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-lg font-black text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Minor units: {editPeakRate}</p>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <label className="block text-xs font-bold text-slate-300 mb-1">Off-Peak Rate (Morning / Midday)</label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-400">{club.operating_currency}</span>
                <input
                  type="number"
                  step="5"
                  value={editOffPeakRate / 100}
                  onChange={e => setEditOffPeakRate(Math.round(parseFloat(e.target.value || '0') * 100))}
                  className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-lg font-black text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Minor units: {editOffPeakRate}</p>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <label className="block text-xs font-bold text-slate-300 mb-1">Weekend Pricing (Fri - Sun)</label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-400">{club.operating_currency}</span>
                <input
                  type="number"
                  step="5"
                  value={editWeekendRate / 100}
                  onChange={e => setEditWeekendRate(Math.round(parseFloat(e.target.value || '0') * 100))}
                  className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-lg font-black text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Minor units: {editWeekendRate}</p>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all"
          >
            Update Tiered Rates
          </button>
        </form>
      )}

      {/* 5. FACILITIES */}
      {activeSection === 'facilities' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">Club Facilities & Amenities</h2>
            <p className="text-xs text-slate-400">Toggle the amenities available at your club. Players see these in discovery filters.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ALL_FACILITIES_OPTIONS.map(fac => {
              const active = currentFacilities.includes(fac);
              return (
                <button
                  key={fac}
                  type="button"
                  onClick={() => toggleFacility(fac)}
                  className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between border transition-all ${
                    active
                      ? 'bg-amber-500/15 border-amber-400 text-amber-300 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{fac}</span>
                  <span>{active ? '✓' : '+'}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. GALLERY */}
      {activeSection === 'gallery' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Club Gallery & Court Pictures</h2>
              <p className="text-xs text-slate-400">High-res photos increase player bookings by 40%.</p>
            </div>
            <button
              type="button"
              onClick={handleAddSampleGalleryImage}
              className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 flex items-center gap-1.5"
            >
              <Plus size={14} /> Add Court Photo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {gallery.map((img, idx) => (
              <div key={idx} className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[4/3]">
                <img src={img} alt={`Club Gallery ${idx}`} className="w-full h-full object-cover" />
                {idx === 0 && (
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow">
                    ★ Main Cover
                  </span>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 gap-2">
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetCover(idx)}
                      className="w-full py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold"
                    >
                      Set As Main Cover
                    </button>
                  )}
                  {gallery.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="w-full py-1.5 rounded-lg bg-rose-500/80 text-white text-xs font-bold hover:bg-rose-500"
                    >
                      Delete Photo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. OPENING HOURS */}
      {activeSection === 'hours' && (
        <form onSubmit={handleSaveHours} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-xl">
          <div>
            <h2 className="text-lg font-bold text-white">Opening Hours & Schedule</h2>
            <p className="text-xs text-slate-400">Specify when courts are open for public and match bookings.</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Weekly Schedule</label>
            <input
              type="text"
              value={editHours}
              onChange={e => setEditHours(e.target.value)}
              placeholder="07:00 AM - Midnight (Daily)"
              className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm"
          >
            Save Operating Hours
          </button>
        </form>
      )}

      {/* 8. BOOKINGS */}
      {activeSection === 'bookings' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Live Reservations & Passes</h2>
              <p className="text-xs text-slate-400">All registered court reservations with instant digital turnstile pass codes.</p>
            </div>
            <button
              onClick={handleSimulateScan}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 flex items-center gap-1.5"
            >
              <QrCode size={14} /> Scan Pass
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Court</th>
                  <th className="py-3 px-4">Time Slot</th>
                  <th className="py-3 px-4">Split</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Pass Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-slate-850/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{b.courtName}</td>
                    <td className="py-3.5 px-4 text-slate-300">{b.timeSlot}</td>
                    <td className="py-3.5 px-4 text-slate-400">{b.splitCount} Players</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase text-[10px]">
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{b.qrCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 9. REVIEWS */}
      {activeSection === 'reviews' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">Player Reviews & Ratings</h2>
            <p className="text-xs text-slate-400">Verified feedback from players who completed matches at your venue.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-1 text-amber-400 text-sm mb-2">
                ★★★★★
              </div>
              <p className="text-xs text-slate-300 italic mb-3">
                "Best panoramic courts in the city. The Mondo turf has incredible grip and the air conditioning is top notch."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center justify-center">
                  AR
                </div>
                <span className="text-xs font-bold text-white">Alex Rivera</span>
                <span className="text-[10px] text-slate-500">Yesterday</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-1 text-amber-400 text-sm mb-2">
                ★★★★★
              </div>
              <p className="text-xs text-slate-300 italic mb-3">
                "Instant QR gate access worked smoothly. Cafe serves great post-match matcha and shakes."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan-500/30 text-cyan-300 text-[10px] font-bold flex items-center justify-center">
                  SL
                </div>
                <span className="text-xs font-bold text-white">Sara Lindqvist</span>
                <span className="text-[10px] text-slate-500">2 days ago</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-1 text-amber-400 text-sm mb-2">
                ★★★★☆
              </div>
              <p className="text-xs text-slate-300 italic mb-3">
                "Lighting is high quality without any glare. Will be booking our weekly Americano here."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500/30 text-purple-300 text-[10px] font-bold flex items-center justify-center">
                  MB
                </div>
                <span className="text-xs font-bold text-white">Matteo Bellini</span>
                <span className="text-[10px] text-slate-500">4 days ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. REVENUE SUMMARY */}
      {activeSection === 'revenue' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">Revenue Summary & Settlements</h2>
            <p className="text-xs text-slate-400">All court bookings, tournament fees, and split payments collected via Stripe.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <span className="text-xs uppercase font-bold text-slate-400">This Month Revenue</span>
              <p className="text-2xl font-black text-emerald-400 mt-1">
                {formatMoney(7480000, club.operating_currency)}
              </p>
              <span className="text-[11px] text-emerald-400 font-semibold">+18.4% vs last month</span>
            </div>

            <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <span className="text-xs uppercase font-bold text-slate-400">Upcoming Payout</span>
              <p className="text-2xl font-black text-amber-400 mt-1">
                {formatMoney(1850000, club.operating_currency)}
              </p>
              <span className="text-[11px] text-slate-400">Direct transfer to IBAN ending 4402</span>
            </div>

            <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <span className="text-xs uppercase font-bold text-slate-400">Average Court Utilization</span>
              <p className="text-2xl font-black text-cyan-400 mt-1">82.6%</p>
              <span className="text-[11px] text-slate-400">Peak hours 96% booked</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD COURT */}
      {showAddCourtModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-750 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Add New Court</h3>
              <button
                onClick={() => setShowAddCourtModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourt} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Court Name
                </label>
                <input
                  type="text"
                  required
                  value={newCourtName}
                  onChange={e => setNewCourtName(e.target.value)}
                  placeholder={`Court ${clubCourts.length + 1} (Panoramic Pro)`}
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Court Type
                </label>
                <select
                  value={newCourtType}
                  onChange={e => setNewCourtType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="panoramic_glass">Panoramic Glass (Full View)</option>
                  <option value="super_panoramic">Super Panoramic Center Court</option>
                  <option value="standard_glass">Standard Glass with Pillars</option>
                  <option value="covered_outdoor">Covered Outdoor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Environment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewCourtIndoor(true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      newCourtIndoor
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Indoor AC
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCourtIndoor(false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      !newCourtIndoor
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Outdoor
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourtModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  Create Court
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
