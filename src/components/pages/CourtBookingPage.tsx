import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar, Clock, Users, CreditCard, QrCode,
  CheckCircle2, ArrowLeft, ShieldCheck, Sparkles
} from 'lucide-react';

export const CourtBookingPage: React.FC = () => {
  const { clubs, courts, bookCourt, navParams, navigateTo, formatMoney, currency, t } = useApp();

  const clubId = navParams.clubId || 'club_1';
  const club = clubs.find(c => c.id === clubId) || clubs[0];
  const clubCourts = courts.filter(crt => crt.clubId === club.id);

  const [selectedCourtId, setSelectedCourtId] = useState<string>(navParams.courtId || clubCourts[0]?.id || 'crt_1');
  const [selectedDate, setSelectedDate] = useState<string>('Today, Sep 17');
  const [selectedSlot, setSelectedSlot] = useState<string>('19:00 - 20:30');
  const [splitCount, setSplitCount] = useState<number>(4);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  const activeCourt = clubCourts.find(c => c.id === selectedCourtId) || clubCourts[0];
  const totalAmountMinor = activeCourt?.hourly_rate_minor || 24000;
  const splitAmountMinor = Math.round(totalAmountMinor / splitCount);

  const dates = ['Today, Sep 17', 'Tomorrow, Sep 18', 'Fri, Sep 19', 'Sat, Sep 20', 'Sun, Sep 21'];
  const timeSlots = [
    { time: '08:00 - 09:30', prime: false },
    { time: '10:00 - 11:30', prime: false },
    { time: '16:00 - 17:30', prime: false },
    { time: '17:30 - 19:00', prime: true },
    { time: '19:00 - 20:30', prime: true },
    { time: '20:30 - 22:00', prime: true },
    { time: '22:00 - 23:30', prime: false }
  ];

  const handleBook = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const booking = bookCourt(club.id, activeCourt.id, selectedDate, selectedSlot, splitCount);
      setIsProcessing(false);
      setConfirmedBooking(booking);
    }, 900);
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* BACK BUTTON */}
      <button
        onClick={() => navigateTo('club_detail', { clubId: club.id })}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '0.88rem',
          cursor: 'pointer',
          width: 'fit-content'
        }}
      >
        <ArrowLeft size={16} /> Back to {club.name}
      </button>

      {/* IF BOOKING CONFIRMED SUCCESS STATE */}
      {confirmedBooking ? (
        <div className="bento-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(0, 245, 118, 0.15)',
            color: 'var(--brand-volt)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 0 24px var(--brand-volt-glow)'
          }}>
            <CheckCircle2 size={40} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>
            {t.booking.courtConfirmed}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 28 }}>
            {t.booking.passInstructions}
          </p>

          {/* DIGITAL PASS CARD */}
          <div style={{
            maxWidth: 420,
            margin: '0 auto 32px',
            background: 'linear-gradient(135deg, rgba(20, 28, 44, 0.98) 0%, rgba(10, 15, 25, 0.98) 100%)',
            border: '2px dashed var(--brand-volt)',
            borderRadius: 'var(--radius-xl)',
            padding: 24,
            boxShadow: '0 12px 30px rgba(0,0,0,0.6)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-volt)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              Official RALLYO Digital Court Pass
            </div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 4 }}>
              {confirmedBooking.clubName}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              {confirmedBooking.courtName} • {confirmedBooking.date} • {confirmedBooking.timeSlot}
            </div>

            {/* QR Code Mockup */}
            <div style={{
              background: '#FFF',
              padding: 16,
              borderRadius: 'var(--radius-lg)',
              width: 140,
              height: 140,
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QrCode size={110} color="#080B11" />
            </div>

            <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
              {confirmedBooking.qrCode}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6 }}>
              Gate scan & automated turnstile pass
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <button className="btn-volt" onClick={() => navigateTo('play')}>
              View Open Matches
            </button>
            <button className="btn-secondary" onClick={() => navigateTo('dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      ) : (
        /* BOOKING FORM */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>
              {t.booking.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: 4 }}>
              Reserve your court at {club.name}. Settled in {club.operating_currency}.
            </p>
          </div>

          {/* 1. DATE SELECTOR */}
          <div className="bento-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={18} color="var(--brand-volt)" /> {t.booking.selectDate}
            </h3>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className="btn-secondary"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    background: selectedDate === d ? 'var(--brand-volt)' : 'rgba(255, 255, 255, 0.04)',
                    color: selectedDate === d ? '#080B11' : 'var(--text-primary)',
                    borderColor: selectedDate === d ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    fontWeight: selectedDate === d ? 700 : 500
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* 2. COURT SELECTOR */}
          <div className="bento-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} color="var(--brand-volt)" /> {t.booking.selectCourt}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {clubCourts.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCourtId(c.id)}
                  style={{
                    padding: 14,
                    borderRadius: 'var(--radius-md)',
                    border: selectedCourtId === c.id ? '2px solid var(--brand-volt)' : '1px solid var(--border-subtle)',
                    background: selectedCourtId === c.id ? 'rgba(0, 245, 118, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{c.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                    {c.surface.replace('_', ' ')} • {c.indoor ? 'Indoor' : 'Outdoor'}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--brand-volt)', marginTop: 6 }}>
                    {formatMoney(c.hourly_rate_minor, c.currency_code)}/slot
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. TIME SLOT MATRIX */}
          <div className="bento-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={18} color="var(--brand-volt)" /> {t.booking.availableSlots}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedSlot(slot.time)}
                  className="btn-secondary"
                  style={{
                    padding: '10px 14px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    background: selectedSlot === slot.time ? 'var(--brand-volt)' : 'rgba(255, 255, 255, 0.03)',
                    color: selectedSlot === slot.time ? '#080B11' : 'var(--text-primary)',
                    borderColor: selectedSlot === slot.time ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    fontWeight: selectedSlot === slot.time ? 700 : 500
                  }}
                >
                  <span>{slot.time}</span>
                  {slot.prime && (
                    <span style={{ fontSize: '0.65rem', opacity: 0.85, textTransform: 'uppercase' }}>
                      Prime Slot
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 4. SPLIT PAYMENT & CHECKOUT */}
          <div className="bento-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CreditCard size={18} color="var(--brand-volt)" /> {t.booking.splitMode}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 20 }}>
              {[
                { count: 1, label: 'Solo (Pay 100%)' },
                { count: 2, label: 'Split x2 (50% each)' },
                { count: 4, label: 'Split x4 (Doubles)' }
              ].map((sp) => (
                <button
                  key={sp.count}
                  onClick={() => setSplitCount(sp.count)}
                  className="btn-secondary"
                  style={{
                    padding: '10px',
                    fontSize: '0.82rem',
                    background: splitCount === sp.count ? 'rgba(0, 245, 118, 0.15)' : 'transparent',
                    borderColor: splitCount === sp.count ? 'var(--brand-volt)' : 'var(--border-subtle)',
                    color: splitCount === sp.count ? 'var(--brand-volt)' : 'var(--text-primary)'
                  }}
                >
                  {sp.label}
                </button>
              ))}
            </div>

            {/* Minor Units Summary Breakdown */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
              border: '1px solid var(--border-subtle)',
              marginBottom: 20
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: 8 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Court Total (90 min)</span>
                <span style={{ fontWeight: 700 }}>
                  {formatMoney(totalAmountMinor, club.operating_currency)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: 8 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Split Count</span>
                <span style={{ fontWeight: 700 }}>{splitCount} Players</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
                <span>Your Share Due Now</span>
                <span style={{ color: 'var(--brand-volt)' }}>
                  {formatMoney(splitAmountMinor, club.operating_currency)}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
                {t.booking.operatingCurrencyNotice} {club.operating_currency}. Converted to your {currency} preference.
              </div>
            </div>

            <button
              className="btn-volt"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
              onClick={handleBook}
              disabled={isProcessing}
            >
              {isProcessing ? 'Authorizing with Stripe...' : `${t.booking.confirmAndPay} (${formatMoney(splitAmountMinor, club.operating_currency)})`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
