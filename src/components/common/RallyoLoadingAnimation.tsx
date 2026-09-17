import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SupportedLanguage, LOCALES } from '../../i18n/locales';

interface RallyoLoadingAnimationProps {
  width?: number | string;
  height?: number | string;
  showTagline?: boolean;
  loop?: boolean;
  language?: SupportedLanguage;
  customTagline?: string;
  onComplete?: () => void;
}

export const RallyoLoadingAnimation: React.FC<RallyoLoadingAnimationProps> = ({
  width = '100%',
  height = 360,
  showTagline = true,
  loop = true,
  language: propLanguage,
  customTagline,
  onComplete
}) => {
  const { currentLocale: globalLocale, language: globalLanguage } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active locale resolution
  const activeLang = propLanguage || globalLanguage || 'en';
  const locale = LOCALES[activeLang] || globalLocale || LOCALES.en;
  const activeTagline = customTagline || locale.tagline;
  const isRTL = locale.isRTL;

  // Track text visibility synced with animation
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();
    const duration = 2400; // 2.4 seconds loop

    // Bounce connection points
    const ripples: { x: number; y: number; birth: number }[] = [];

    // Impact sparks
    const sparks: { x: number; y: number; vx: number; vy: number; birth: number }[] = [];

    const render = (now: number) => {
      const elapsed = (now - startTime) % duration;
      const progress = elapsed / duration;

      // Synchronize DOM text reveal at 72% of the loop
      if (progress >= 0.72) {
        setTextVisible(true);
      } else if (progress < 0.65) {
        setTextVisible(false);
      }

      const w = canvas.width;
      const h = canvas.height;

      // Deep midnight navy canvas background
      ctx.fillStyle = '#080C14';
      ctx.fillRect(0, 0, w, h);

      // -------------------------------------------------------------
      // 1. ISOMETRIC MINIMALIST COURT LINES
      // -------------------------------------------------------------
      const courtAlpha = progress < 0.62 ? 0.35 : Math.max(0.10, 0.35 - (progress - 0.62) * 1.5);
      ctx.save();
      ctx.strokeStyle = `rgba(148, 163, 184, ${courtAlpha})`;
      ctx.lineWidth = 1.5;

      // Outer boundary
      ctx.beginPath();
      ctx.moveTo(w * 0.12, h * 0.44);
      ctx.lineTo(w * 0.50, h * 0.24);
      ctx.lineTo(w * 0.88, h * 0.44);
      ctx.lineTo(w * 0.50, h * 0.68);
      ctx.closePath();
      ctx.stroke();

      // Net divider line
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 245, 118, ${courtAlpha * 1.2})`;
      ctx.lineWidth = 2;
      ctx.moveTo(w * 0.50, h * 0.24);
      ctx.lineTo(w * 0.50, h * 0.68);
      ctx.stroke();

      // Service boxes
      ctx.beginPath();
      ctx.strokeStyle = `rgba(148, 163, 184, ${courtAlpha * 0.7})`;
      ctx.lineWidth = 1;
      ctx.moveTo(w * 0.31, h * 0.34);
      ctx.lineTo(w * 0.69, h * 0.56);
      ctx.stroke();
      ctx.restore();

      // -------------------------------------------------------------
      // 2. RALLY BALL MOTION & CONNECTION RIPPLES (0.0s - 1.4s)
      // -------------------------------------------------------------
      let ballX = w * 0.5;
      let ballY = h * 0.45;
      let ballVisible = true;
      let ballGlow = 14;

      if (progress < 0.58) {
        const subP = progress / 0.58;
        let bouncePoint: { x: number; y: number } | null = null;

        if (subP < 0.33) {
          // Bounce 1: Left court
          const t = subP / 0.33;
          ballX = w * (0.24 + t * 0.24);
          const arc = Math.sin(t * Math.PI) * 55;
          ballY = h * (0.60 - t * 0.18) - arc;

          if (t > 0.92 && ripples.length === 0) {
            bouncePoint = { x: w * 0.48, y: h * 0.42 };
          }
        } else if (subP < 0.66) {
          // Bounce 2: Cross court to right
          const t = (subP - 0.33) / 0.33;
          ballX = w * (0.48 + t * 0.24);
          const arc = Math.sin(t * Math.PI) * 65;
          ballY = h * (0.42 + t * 0.08) - arc;

          if (t > 0.92 && ripples.length === 1) {
            bouncePoint = { x: w * 0.72, y: h * 0.50 };
          }
        } else {
          // Bounce 3: Back towards center
          const t = (subP - 0.66) / 0.34;
          ballX = w * (0.72 - t * 0.22);
          const arc = Math.sin(t * Math.PI) * 70;
          ballY = h * (0.50 - t * 0.14) - arc;

          if (t > 0.90 && ripples.length === 2) {
            bouncePoint = { x: w * 0.50, y: h * 0.36 };
          }
        }

        // Add matching connection ripple at bounce
        if (bouncePoint) {
          ripples.push({ x: bouncePoint.x, y: bouncePoint.y, birth: now });
          for (let s = 0; s < 8; s++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 2.5;
            sparks.push({
              x: bouncePoint.x,
              y: bouncePoint.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              birth: now
            });
          }
        }
      } else if (progress < 0.78) {
        // Orbit swoosh morphing into dynamic "R"
        const t = (progress - 0.58) / 0.20;
        const angle = -Math.PI * 0.5 + t * Math.PI * 2.2;
        const radius = 48 * (1 - t * 0.2);
        ballX = w * 0.50 + Math.cos(angle) * radius;
        ballY = h * 0.36 + Math.sin(angle) * (radius * 0.85);
        ballGlow = 22;
      } else {
        ballVisible = false;
      }

      // Draw connection ripples ("Players Matched")
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const age = now - r.birth;
        if (age > 900) {
          ripples.splice(i, 1);
          continue;
        }
        const rippleP = age / 900;
        const radius = rippleP * 34;
        const alpha = (1 - rippleP) * 0.8;

        ctx.save();
        ctx.strokeStyle = `rgba(0, 245, 118, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, radius * 1.5, radius * 0.8, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(204, 255, 0, ${alpha * 1.2})`;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3 * (1 - rippleP), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw spark pulses
      for (let s = sparks.length - 1; s >= 0; s--) {
        const sp = sparks[s];
        const age = now - sp.birth;
        if (age > 500) {
          sparks.splice(s, 1);
          continue;
        }
        sp.x += sp.vx;
        sp.y += sp.vy;
        const sparkP = age / 500;
        ctx.fillStyle = `rgba(57, 255, 136, ${1 - sparkP})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 1.8 * (1 - sparkP), 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Glowing Electric Lime Padel Ball
      if (ballVisible) {
        ctx.save();
        ctx.shadowColor = '#00F576';
        ctx.shadowBlur = ballGlow;

        ctx.fillStyle = '#CCFF00';
        ctx.beginPath();
        ctx.arc(ballX, ballY, 7.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#080C14';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(ballX - 1, ballY, 5, -0.6, 0.6);
        ctx.stroke();
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 3. RALLYO "R" EMBLEM ILLUMINATION (0.65s - 2.4s)
      // -------------------------------------------------------------
      if (progress >= 0.65) {
        const logoAlpha = Math.min(1, (progress - 0.65) / 0.18);
        const scale = 0.85 + Math.min(0.15, (progress - 0.65) * 0.4);

        ctx.save();
        ctx.translate(w * 0.50, h * 0.35);
        ctx.scale(scale, scale);
        ctx.globalAlpha = logoAlpha;

        ctx.shadowColor = '#00F576';
        ctx.shadowBlur = 24 * logoAlpha;

        // Padel Racket Loop (Head of R)
        ctx.strokeStyle = '#00F576';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.ellipse(2, -10, 28, 24, -0.15, 0, Math.PI * 2);
        ctx.stroke();

        // Padel Holes
        ctx.fillStyle = '#39FF88';
        const holeCoords = [
          [-6, -14], [6, -14],
          [-10, -8], [0, -8], [10, -8],
          [-6, -2], [6, -2]
        ];
        holeCoords.forEach(([hx, hy]) => {
          ctx.beginPath();
          ctx.arc(hx, hy, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        // R Handle (Left leg)
        ctx.beginPath();
        ctx.moveTo(-16, 8);
        ctx.lineTo(-30, 36);
        ctx.lineWidth = 7;
        ctx.strokeStyle = '#00F576';
        ctx.stroke();

        // Right leg of 'R'
        ctx.beginPath();
        ctx.moveTo(12, 10);
        ctx.lineTo(28, 38);
        ctx.lineWidth = 7;
        ctx.stroke();

        // Connection Arc / Orbit Swoosh across racket
        ctx.beginPath();
        ctx.arc(0, -6, 36, -Math.PI * 0.8, Math.PI * 0.3);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#CCFF00';
        ctx.stroke();

        // Location Pin Motif at Apex
        ctx.fillStyle = '#00F576';
        ctx.beginPath();
        ctx.arc(28, -26, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#080C14';
        ctx.beginPath();
        ctx.arc(28, -26, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height, loop, onComplete]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#080C14',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        position: 'relative',
        width: width
      }}
    >
      <canvas
        ref={canvasRef}
        width={360}
        height={typeof height === 'number' ? height : 360}
        style={{
          width: '100%',
          maxWidth: 360,
          height: height,
          display: 'block'
        }}
      />

      {/* Localizable Multilingual Tagline Overlay */}
      {showTagline && (
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          style={{
            position: 'absolute',
            bottom: 22,
            left: 16,
            right: 16,
            textAlign: 'center',
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.96)',
            transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none'
          }}
        >
          {/* Brand Name Unchanged Globally */}
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              lineHeight: 1.1
            }}
          >
            RALLYO
          </div>

          {/* Localized Tagline */}
          <div
            style={{
              fontFamily: isRTL ? 'system-ui, -apple-system, sans-serif' : 'var(--font-body)',
              fontSize: isRTL ? '1.05rem' : '0.82rem',
              fontWeight: 800,
              color: 'var(--brand-volt)',
              letterSpacing: isRTL ? '0px' : '0.08em',
              textTransform: isRTL ? 'none' : 'uppercase',
              marginTop: 4,
              textShadow: '0 0 16px var(--brand-volt-glow)'
            }}
          >
            {activeTagline}
          </div>
        </div>
      )}
    </div>
  );
};
