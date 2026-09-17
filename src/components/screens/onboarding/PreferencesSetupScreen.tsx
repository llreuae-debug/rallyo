import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';

export const PreferencesSetupScreen: React.FC = () => {
  const { navigateTo, updatePlayer, clubs } = useApp();
  const [selectedClubs, setSelectedClubs] = useState<string[]>(['club_1', 'club_2']);
  const [availability, setAvailability] = useState<string[]>(['weekday_evening', 'weekend_morning']);
  const [matchFormat, setMatchFormat] = useState<'doubles' | 'both'>('doubles');

  const toggleClub = (id: string) => {
    setSelectedClubs(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAvailability = (slot: string) => {
    setAvailability(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleFinish = () => {
    updatePlayer({ preferredClubs: selectedClubs });
    navigateTo('home');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Match Preferences" showBack onBack={() => navigateTo('skill_calibration')} />

      <div className="scroll-container" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <span className="badge-volt">Step 4 of 4</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginTop: 6 }}>
              Where & When You Play
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              RALLYO's AI engine uses these signals to notify you of nearby matches with matching time slots.
            </p>
          </div>

          {/* Preferred Clubs */}
          <div>
            <label className="input-label">Select Your Home & Favorite Clubs</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {clubs.map(club => {
                const isSelected = selectedClubs.includes(club.id);
                return (
                  <div
                    key={club.id}
                    onClick={() => toggleClub(club.id)}
                    style={{
                      background: isSelected ? 'rgba(0, 245, 118, 0.1)' : 'var(--bg-card)',
                      border: `1px solid ${isSelected ? 'var(--brand-volt)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFF' }}>{club.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={12} />
                        <span>{club.location} • {club.distance}</span>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 size={18} color="var(--brand-volt)" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slot Availability */}
          <div>
            <label className="input-label">Typical Playing Hours</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { id: 'weekday_evening', label: 'Weekday Evenings (18:00 - 23:00)' },
                { id: 'weekday_morning', label: 'Weekday Mornings (07:00 - 10:00)' },
                { id: 'weekend_morning', label: 'Weekend Mornings (08:00 - 12:00)' },
                { id: 'weekend_evening', label: 'Weekend Sunset / Night' }
              ].map(slot => {
                const isSelected = availability.includes(slot.id);
                return (
                  <button
                    key={slot.id}
                    type="button"
                    className="btn-secondary"
                    style={{
                      fontSize: '0.74rem',
                      padding: '10px 8px',
                      textAlign: 'left',
                      borderColor: isSelected ? 'var(--brand-volt)' : 'var(--border-subtle)',
                      background: isSelected ? 'rgba(0, 245, 118, 0.15)' : 'var(--bg-card)',
                      color: isSelected ? 'var(--brand-volt)' : '#FFF'
                    }}
                    onClick={() => toggleAvailability(slot.id)}
                  >
                    <Clock size={14} />
                    <span>{slot.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, paddingBottom: 16 }}>
          <button type="button" className="btn-volt" style={{ width: '100%' }} onClick={handleFinish}>
            <span>Complete Setup & Enter RALLYO</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
