import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(14, 19, 31, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--brand-volt)',
        boxShadow: '0 8px 32px rgba(0, 245, 118, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        color: '#FFF',
        fontSize: '0.86rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        zIndex: 2000,
        animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--brand-volt)',
          boxShadow: '0 0 8px var(--brand-volt)'
        }}
      />
      <span>{toastMessage}</span>
    </div>
  );
};
