import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { Toast } from './Toast';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="device-frame">
      {/* Dynamic Island */}
      <div className="device-island">
        <div className="island-camera" />
        <div className="island-sensor" title="RALLYO Live Active" />
      </div>

      {/* Top Status Bar */}
      <div className="device-status-bar">
        <span>{time}</span>
        <div className="status-indicators">
          <span style={{ fontSize: '0.68rem', fontWeight: 800 }}>5G</span>
          <Wifi size={14} />
          <Battery size={16} />
        </div>
      </div>

      {/* Main Screen Content Viewport */}
      <div className="device-screen-content">
        <Toast />
        {children}
      </div>

      {/* Persistent Bottom Nav (when applicable) */}
      <BottomNav />

      {/* Home Gesture Bar */}
      <div className="device-home-indicator">
        <div className="home-bar" />
      </div>
    </div>
  );
};
