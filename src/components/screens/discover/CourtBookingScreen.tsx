import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, QrCode, CheckCircle2, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const CourtBookingScreen: React.FC = () => {
  const { clubs, courts, selectedClubId, bookCourt, navigateTo } = useApp();
  const club = clubs.find(c => c.id === selectedClubId) || clubs[0];
  const clubCourts = courts.filter(c => c.clubId === club.id);

  const [selectedCourtId, setSelectedCourtId] = useState(clubCourts[0]?.id || 'crt_1');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, Sep 18');
  const [selectedSlot, setSelectedSlot] = useState('19:30 - 21:00');
  const [splitCount, setSplitCount] = useState<number>(4);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  const activeCourt = clubCourts.find(c => c.id === selectedCourtId) || clubCourts[0];
  const totalAmount = activeCourt ? activeCourt.hourlyRate : 220;
  const splitAmount = Math.round(totalAmount / splitCount);

  const handleConfirmPay = () => {
    const booking = bookCourt(club.id, activeCourt.id, selectedDate, selectedSlot, splitCount);
    setConfirmedBooking(booking);
    setShowCheckoutModal(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Court Reservation" showBack />

      <div className="scroll-container" style={{ paddingBottom: 28 }}>
        {confirmedBooking ? (
          /* Confirmation Pass */
          <div className="rally-card" style={{ background: 'linear-gradient(145deg, #152A3F 0%, #0D1625 100%)', textAlign: 'center', padding: 24, gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0, 245, 118, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <CheckCircle2 size={36} color="var(--brand-volt)" />
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: '#FFF' }}>
              Court Confirmed!
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Your reservation is verified on the club grid. Present the digital pass below at reception or automated court gate.
            </p>

            {/* QR Pass */}
            <div style={{ background: '#FFF', padding: 16, borderRadius: 'var(--radius-md)', display: 'inline-block', margin: '8px auto' }}>
              <div style={{ width: 140, height: 140, background: '#0D1117', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <QrCode size={110} color="var(--brand-volt)" />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#080B11', marginTop: 6, display: 'block' }}>
                {confirmedBooking.qrCode}
              </span>
            </div>

            <div style={{ textAlign: 'left', background: 'rgba(255, 255, 255, 0.05)', padding: 12, borderRadius: 8, fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div><strong>Venue:</strong> {confirmedBooking.clubName}</div>
              <div><strong>Court:</strong> {confirmedBooking.courtName}</div>
              <div><strong>Slot:</strong> {confirmedBooking.date} • {confirmedBooking.timeSlot}</div>
              <div><strong>Amount Paid:</strong> €{confirmedBooking.splitPerPerson} ({confirmedBooking.splitCount}-way split)</div>
            </div>

            <button
              className="btn-volt"
              style={{ width: '100%' }}
              onClick={() => navigateTo('home')}
            >
              Back to Home Feed
            </button>
          </div>
        ) : (
          /* Selection Flow */
          <>
            {/* Club Banner */}
            <div className="rally-card" style={{ background: 'var(--bg-card)', padding: 12 }}>
              <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#FFF' }}>{club.name}</h3>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{club.address}</span>
            </div>

            {/* Select Date */}
            <div>
              <label className="input-label">Select Date</label>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                {['Today, Sep 17', 'Tomorrow, Sep 18', 'Fri, Sep 19', 'Sat, Sep 20'].map(d => (
                  <button
                    key={d}
                    type="button"
                    className="btn-secondary"
                    style={{
                      padding: '8px 12px',
                      fontSize: '0.76rem',
                      whiteSpace: 'nowrap',
                      borderColor: selectedDate === d ? 'var(--brand-volt)' : 'var(--border-subtle)',
                      background: selectedDate === d ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                      color: selectedDate === d ? 'var(--brand-volt)' : 'var(--text-secondary)'
                    }}
                    onClick={() => setSelectedDate(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Court */}
            <div>
              <label className="input-label">Select Court</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {clubCourts.map(crt => (
                  <div
                    key={crt.id}
                    onClick={() => setSelectedCourtId(crt.id)}
                    style={{
                      background: selectedCourtId === crt.id ? 'rgba(0, 245, 118, 0.12)' : 'var(--bg-card)',
                      border: `1px solid ${selectedCourtId === crt.id ? 'var(--brand-volt)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: 12,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFF' }}>{crt.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{crt.type.replace('_', ' ')}</div>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--brand-volt)' }}>
                      €{crt.hourlyRate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slots Matrix */}
            <div>
              <label className="input-label">Available Time Slots (90 min)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { time: '16:30 - 18:00', peak: false },
                  { time: '18:00 - 19:30', peak: true },
                  { time: '19:30 - 21:00', peak: true },
                  { time: '21:00 - 22:30', peak: true },
                  { time: '22:30 - Midnight', peak: false }
                ].map(slot => (
                  <button
                    key={slot.time}
                    type="button"
                    className="btn-secondary"
                    style={{
                      padding: '10px 8px',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      borderColor: selectedSlot === slot.time ? 'var(--brand-volt)' : 'var(--border-subtle)',
                      background: selectedSlot === slot.time ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                      color: selectedSlot === slot.time ? 'var(--brand-volt)' : '#FFF'
                    }}
                    onClick={() => setSelectedSlot(slot.time)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} />
                      <span style={{ fontSize: '0.76rem', fontWeight: 700 }}>{slot.time}</span>
                    </div>
                    {slot.peak && (
                      <span style={{ fontSize: '0.62rem', color: '#F59E0B', fontWeight: 700, marginTop: 2 }}>
                        ⚡ Peak Hours
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Payment Options */}
            <div>
              <label className="input-label">Payment Split Mode</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {[
                  { count: 1, label: 'Full (€' + totalAmount + ')' },
                  { count: 2, label: 'Split 2 (€' + Math.round(totalAmount / 2) + ')' },
                  { count: 4, label: 'Split 4 (€' + Math.round(totalAmount / 4) + ')' }
                ].map(opt => (
                  <button
                    key={opt.count}
                    type="button"
                    className="btn-secondary"
                    style={{
                      fontSize: '0.74rem',
                      padding: '8px 4px',
                      borderColor: splitCount === opt.count ? 'var(--brand-volt)' : 'var(--border-subtle)',
                      background: splitCount === opt.count ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                      color: splitCount === opt.count ? 'var(--brand-volt)' : '#FFF'
                    }}
                    onClick={() => setSplitCount(opt.count)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkout CTA */}
            <div style={{ marginTop: 12 }}>
              <button
                className="btn-volt"
                style={{ width: '100%' }}
                onClick={() => setShowCheckoutModal(true)}
              >
                <span>Pay €{splitAmount} & Confirm Booking</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* Stripe Mock Modal */}
        {showCheckoutModal && (
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
            <div className="rally-card" style={{ background: '#111723', width: '100%', maxWidth: 340, gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>
                  Stripe Secure Checkout
                </span>
                <span className="badge-tag">256-bit SSL</span>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: 12, borderRadius: 8, fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Court:</span>
                  <strong>{activeCourt?.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Time:</span>
                  <span>{selectedSlot}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, paddingTop: 6, borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--brand-volt)', fontWeight: 800 }}>Your Share:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--brand-volt)' }}>€{splitAmount}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  className="btn-volt"
                  style={{ width: '100%', padding: 10, background: '#FFF', color: '#000' }}
                  onClick={handleConfirmPay}
                >
                  <span> Pay with Apple Pay</span>
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ width: '100%', padding: 10 }}
                  onClick={handleConfirmPay}
                >
                  <CreditCard size={16} />
                  <span>Pay with Credit Card</span>
                </button>
              </div>

              <button
                type="button"
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}
                onClick={() => setShowCheckoutModal(false)}
              >
                Cancel Transaction
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
