import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin, Star, Clock, ShieldCheck, Check,
  Compass, ArrowLeft, ArrowRight, Zap, Coffee, Car, Sparkles,
  Phone, Mail, Image as ImageIcon
} from 'lucide-react';

export const ClubDetailPage: React.FC = () => {
  const { clubs, courts, selectedClubId, navParams, navigateTo, formatMoney } = useApp();

  const clubId = navParams.clubId || selectedClubId || 'club_1';
  const club = clubs.find(c => c.id === clubId) || clubs[0];
  const clubCourts = courts.filter(crt => crt.clubId === club.id);

  const [activePhoto, setActivePhoto] = useState<string>(club.cover_photo_url || club.imageUrl);

  const gallery = club.gallery_image_urls && club.gallery_image_urls.length > 0
    ? club.gallery_image_urls
    : [club.cover_photo_url || club.imageUrl];

  const facilities = club.facilities || club.amenities || [
    'Indoor courts',
    'Parking',
    'Showers',
    'Changing rooms',
    'Cafe',
    'Wi-Fi'
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigateTo('discover')}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Back to Discover Clubs
      </button>

      {/* HERO BANNER & GALLERY PREVIEW */}
      <div className="space-y-3">
        <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96 shadow-2xl border border-slate-800 group">
          <img
            src={activePhoto}
            alt={club.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold w-fit mb-3 backdrop-blur-sm">
              ★ {club.rating} ({club.reviewCount} verified player reviews)
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
              {club.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-emerald-400" /> {club.address || club.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={14} className="text-cyan-400" /> {club.opening_hours || club.operatingHours || '07:00 AM - Midnight'}
              </span>
            </p>
          </div>
        </div>

        {/* Gallery Thumbnails Strip */}
        {gallery.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {gallery.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActivePhoto(img)}
                className={`relative rounded-xl overflow-hidden w-20 h-16 sm:w-24 sm:h-20 shrink-0 border-2 transition-all ${
                  activePhoto === img ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VENUE OVERVIEW & TIERED PRICING BENTO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* About & Facilities (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">About the Venue</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {club.description || 'Modern padel facility featuring world-class panoramic glass courts, pro turf, and player lounge.'}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400" /> Available Facilities & Amenities ({facilities.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {facilities.map((fac, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200"
                >
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span className="truncate">{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          {(club.contact_phone || club.contact_email) && (
            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-6 text-xs text-slate-400">
              {club.contact_phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-amber-400" />
                  <span>Phone: <strong className="text-slate-200">{club.contact_phone}</strong></span>
                </div>
              )}
              {club.contact_email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-amber-400" />
                  <span>Email: <strong className="text-slate-200">{club.contact_email}</strong></span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tiered Rates & Quick Booking (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400">Hourly Court Pricing</span>
            <div className="mt-2 space-y-3">
              {/* Standard */}
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Standard Hours</p>
                  <span className="text-[10px] text-slate-400">Regular booking</span>
                </div>
                <span className="text-sm font-black text-amber-400">
                  {formatMoney(club.rates_standard_minor || club.price_per_hour_minor || 22000, club.operating_currency || 'AED')}
                </span>
              </div>

              {/* Peak */}
              <div className="p-3 bg-slate-950/70 border border-amber-500/30 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-300">Peak (6 - 11 PM)</p>
                  <span className="text-[10px] text-slate-400">Evenings</span>
                </div>
                <span className="text-sm font-black text-amber-400">
                  {formatMoney(club.rates_peak_minor || 26000, club.operating_currency || 'AED')}
                </span>
              </div>

              {/* Weekend */}
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-indigo-300">Weekend Rates</p>
                  <span className="text-[10px] text-slate-400">Fri - Sun</span>
                </div>
                <span className="text-sm font-black text-amber-400">
                  {formatMoney(club.rates_weekend_minor || 28000, club.operating_currency || 'AED')}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 leading-tight">
              Settled in <strong>{club.operating_currency || 'AED'}</strong>. Automated turnstile pass generated instantly upon split checkout.
            </p>
          </div>

          <button
            onClick={() => navigateTo('court_booking', { clubId: club.id })}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Select Court & Book Slot</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* COURTS INVENTORY */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass size={18} className="text-emerald-400" /> Court Inventory ({clubCourts.length})
            </h2>
            <p className="text-xs text-slate-400">Select any court to book your match slot or casual rally.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-bold text-xs">
            {club.availableCourts} Available Today
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {clubCourts.map(court => (
            <div
              key={court.id}
              className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold uppercase">
                    {court.indoor ? 'Indoor A/C' : 'Outdoor'}
                  </span>
                  <span className="text-sm font-black text-emerald-400">
                    {formatMoney(court.hourly_rate_minor || 22000, court.currency_code || 'AED')}/hr
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{court.name}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Surface: {court.surface.replace('_', ' ').toUpperCase()} • {court.type.replace('_', ' ')}
                </p>
              </div>

              <button
                onClick={() => navigateTo('court_booking', { clubId: club.id, courtId: court.id })}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
              >
                Book This Court
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
