import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { CURRENCIES, CurrencyCode } from '../../currency/currencies';

const ALL_FACILITIES_LIST = [
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

const DEFAULT_GALLERY_SAMPLES = [
  'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1000&auto=format&fit=crop&q=80'
];

export const ClubOwnerOnboardingPage: React.FC = () => {
  const {
    currentUser,
    registerClubOwnerOnboarding,
    currency,
    formatMoney,
    t
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  // Step 1: Owner & Club Info
  const [ownerName, setOwnerName] = useState(currentUser?.full_name || 'Carlos Mendoza');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || 'owner@rallyo.app');
  const [contactPhone, setContactPhone] = useState('+971 50 882 1993');
  const [clubName, setClubName] = useState('Padel Prime Club & Academy');
  const [tagline, setTagline] = useState('World-class panoramic padel courts & pro training');
  const [city, setCity] = useState('Dubai');
  const [address, setAddress] = useState('Plot 418, Al Quoz Industrial 3, Dubai');
  const [latitude, setLatitude] = useState(25.1324);
  const [longitude, setLongitude] = useState(55.2289);

  // Step 2: Logo & Gallery Photos
  const [clubLogo, setClubLogo] = useState<string>('https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&auto=format&fit=crop&q=80');
  const [galleryImages, setGalleryImages] = useState<string[]>(DEFAULT_GALLERY_SAMPLES);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Step 3: Courts & Facilities
  const [courtsCount, setCourtsCount] = useState<number>(6);
  const [hasIndoor, setHasIndoor] = useState<boolean>(true);
  const [courtTypes, setCourtTypes] = useState<string[]>(['Panoramic Glass', 'Mondo Supercourt Turf', 'LED Lighting System']);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([
    'Indoor courts',
    'Parking',
    'Showers',
    'Changing rooms',
    'Cafe',
    'Pro shop',
    'Rental rackets',
    'Ball sales',
    'Air conditioning',
    'Wi-Fi'
  ]);

  // Step 4: Operating Hours & Rates (Minor Units)
  const [openingHours, setOpeningHours] = useState('07:00 AM - Midnight (Daily)');
  const [operatingCurrency, setOperatingCurrency] = useState<CurrencyCode>(currency || 'AED');

  // Rates in minor units (cents / fils)
  const [standardRateMinor, setStandardRateMinor] = useState<number>(22000); // 220 AED
  const [peakRateMinor, setPeakRateMinor] = useState<number>(26000); // 260 AED
  const [offPeakRateMinor, setOffPeakRateMinor] = useState<number>(18000); // 180 AED
  const [weekendRateMinor, setWeekendRateMinor] = useState<number>(28000); // 280 AED

  // Logo upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') setClubLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gallery multi-image handler
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setGalleryImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const setAsCover = (index: number) => {
    setGalleryImages(prev => {
      const target = prev[index];
      const remaining = prev.filter((_, i) => i !== index);
      return [target, ...remaining];
    });
  };

  const toggleFacility = (facility: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
  };

  const handleFinish = () => {
    const coverUrl = galleryImages[0] || clubLogo;
    registerClubOwnerOnboarding({
      name: clubName,
      tagline,
      location: `${city} • ${address.split(',')[0]}`,
      address,
      city,
      country: 'United Arab Emirates',
      club_logo_url: clubLogo,
      cover_photo_url: coverUrl,
      imageUrl: coverUrl,
      gallery_image_urls: galleryImages,
      facilities: selectedFacilities,
      amenities: selectedFacilities,
      courtsCount,
      availableCourts: courtsCount,
      indoor: hasIndoor,
      pricePerHour: Math.round(standardRateMinor / 100),
      price_per_hour_minor: standardRateMinor,
      rates_standard_minor: standardRateMinor,
      rates_peak_minor: peakRateMinor,
      rates_off_peak_minor: offPeakRateMinor,
      rates_weekend_minor: weekendRateMinor,
      operating_currency: operatingCurrency,
      operatingHours: openingHours,
      opening_hours: openingHours,
      contact_phone: contactPhone,
      contact_email: contactEmail,
      latitude,
      longitude
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <span>🏛️</span> Club Owner Partner Onboarding
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Register Your <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500 bg-clip-text text-transparent">Padel Venue</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Step {step} of {totalSteps} • RALLYO Partner Network — {t.tagline}
          </p>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Basic Club & Contact Information */}
        {step === 1 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-amber-500/5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span>📍</span> Venue & Contact Information
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Enter your club's public profile, address, and primary contact details for booking inquiries.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Club / Venue Name
                  </label>
                  <input
                    type="text"
                    value={clubName}
                    onChange={e => setClubName(e.target.value)}
                    placeholder="e.g. Padel Prime Club"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    placeholder="e.g. World-class panoramic padel"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Street Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. Plot 418, Al Quoz Industrial 3, Dubai"
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Latitude Coordinates
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={latitude}
                    onChange={e => setLatitude(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Longitude Coordinates
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={longitude}
                    onChange={e => setLongitude(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Owner Full Name
                  </label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Contact / Booking Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all"
              >
                Next: Media & Gallery Photos →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Club Logo & Gallery Photos */}
        {step === 2 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-amber-500/5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span>🖼️</span> Club Logo & Photo Gallery
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Upload your club logo and court photos. The first gallery image will be featured as your main club cover banner.
            </p>

            {/* Club Logo Upload */}
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 mb-6 flex flex-col sm:flex-row items-center gap-5">
              <div className="relative">
                <img
                  src={clubLogo}
                  alt="Club Logo"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold border border-slate-700 transition-colors shadow-sm mb-1.5"
                >
                  Upload Club Logo
                </button>
                <p className="text-[11px] text-slate-400">
                  Square image recommended (e.g. 400x400). Displayed on court cards and booking tickets.
                </p>
              </div>
            </div>

            {/* Gallery Upload */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Club Pictures & Courts ({galleryImages.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Drag or click to add photos. Click "Make Cover" to set the primary header image.
                  </p>
                </div>
                <div>
                  <input
                    type="file"
                    ref={galleryInputRef}
                    onChange={handleGalleryUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>+</span> Add Images
                  </button>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[4/3]"
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />

                    {/* Cover badge on first image */}
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow">
                        ★ Main Cover
                      </span>
                    )}

                    {/* Hover controls */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 gap-1.5">
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => setAsCover(idx)}
                          className="w-full py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
                        >
                          Make Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="w-full py-1 rounded-lg bg-rose-500/80 hover:bg-rose-500 text-white text-xs font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
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
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all"
              >
                Next: Courts & Facilities →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Courts & Facilities */}
        {step === 3 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-amber-500/5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span>🎾</span> Courts & Club Facilities
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Specify your court configuration and tag the amenities available at your club.
            </p>

            {/* Courts Count & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-950/60 rounded-2xl border border-slate-800 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Total Number of Courts
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={courtsCount}
                    onChange={e => setCourtsCount(parseInt(e.target.value) || 1)}
                    className="w-28 bg-slate-900 border border-slate-750 rounded-xl px-4 py-2 text-base font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-xs text-slate-400">Courts available for booking</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Court Environment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHasIndoor(true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      hasIndoor
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    🏢 Indoor AC
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasIndoor(false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      !hasIndoor
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ☀️ Outdoor
                  </button>
                </div>
              </div>
            </div>

            {/* 15 Facilities Selection Chips */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Club Facilities ({selectedFacilities.length}/{ALL_FACILITIES_LIST.length})
                </label>
                <button
                  type="button"
                  onClick={() => setSelectedFacilities([...ALL_FACILITIES_LIST])}
                  className="text-xs text-amber-400 hover:underline"
                >
                  Select All
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ALL_FACILITIES_LIST.map(fac => {
                  const active = selectedFacilities.includes(fac);
                  return (
                    <button
                      key={fac}
                      type="button"
                      onClick={() => toggleFacility(fac)}
                      className={`p-3 rounded-xl text-xs font-medium text-left flex items-center justify-between border transition-all ${
                        active
                          ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-bold shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{fac}</span>
                      <span>{active ? '✓' : '+'}</span>
                    </button>
                  );
                })}
              </div>
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
                onClick={() => setStep(4)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all"
              >
                Next: Operating Hours & Rates →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Hours & Multi-Tier Pricing (Minor Units) */}
        {step === 4 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-amber-500/5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span>💳</span> Operating Hours & Multi-Tier Rates
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Configure your schedule and hourly rates for peak, off-peak, and weekend periods. Prices are stored in integer minor units for precision.
            </p>

            {/* Operating Hours & Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={openingHours}
                  onChange={e => setOpeningHours(e.target.value)}
                  placeholder="07:00 AM - Midnight"
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Operating Currency
                </label>
                <select
                  value={operatingCurrency}
                  onChange={e => setOperatingCurrency(e.target.value as CurrencyCode)}
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {Object.values(CURRENCIES).map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rate Tiers in Minor Units */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Hourly Court Rates (Per 60 Min Booking)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Standard Rate */}
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300">Standard Hourly Rate</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">General</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-amber-400">{operatingCurrency}</span>
                    <input
                      type="number"
                      step="5"
                      value={standardRateMinor / 100}
                      onChange={e => setStandardRateMinor(Math.round(parseFloat(e.target.value || '0') * 100))}
                      className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-lg font-black text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Minor units: {standardRateMinor} cents/fils</p>
                </div>

                {/* Peak Rate */}
                <div className="p-4 bg-slate-950/70 border border-amber-500/30 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-300">Peak Hours (6 PM - 11 PM)</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">High Demand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-amber-400">{operatingCurrency}</span>
                    <input
                      type="number"
                      step="5"
                      value={peakRateMinor / 100}
                      onChange={e => setPeakRateMinor(Math.round(parseFloat(e.target.value || '0') * 100))}
                      className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-lg font-black text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Minor units: {peakRateMinor} cents/fils</p>
                </div>

                {/* Off-Peak Rate */}
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300">Off-Peak (Morning / Midday)</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Discounted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-amber-400">{operatingCurrency}</span>
                    <input
                      type="number"
                      step="5"
                      value={offPeakRateMinor / 100}
                      onChange={e => setOffPeakRateMinor(Math.round(parseFloat(e.target.value || '0') * 100))}
                      className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-lg font-black text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Minor units: {offPeakRateMinor} cents/fils</p>
                </div>

                {/* Weekend Rate */}
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300">Weekend Pricing (Fri - Sun)</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Weekend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-amber-400">{operatingCurrency}</span>
                    <input
                      type="number"
                      step="5"
                      value={weekendRateMinor / 100}
                      onChange={e => setWeekendRateMinor(Math.round(parseFloat(e.target.value || '0') * 100))}
                      className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-lg font-black text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Minor units: {weekendRateMinor} cents/fils</p>
                </div>
              </div>
            </div>

            {/* Launch Summary Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-center mb-6">
              <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                Ready to Publish {clubName}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                {courtsCount} Courts • {selectedFacilities.length} Facilities • Base Rate: {formatMoney(standardRateMinor, operatingCurrency)}/hr
              </p>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-medium text-sm transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:opacity-95 active:scale-95 transition-all"
              >
                Launch Club Dashboard 🏛️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
