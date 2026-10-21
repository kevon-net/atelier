'use client';

import { Group } from '@mantine/core';
import { images } from '@repo/constants';
import React, { useState, useEffect } from 'react';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

interface MeridianByteComingSoonProps {
  /** Target launch date ISO string or Date object */
  targetLaunchDate?: string | Date;
}

export const MeridianByteComingSoon: React.FC<MeridianByteComingSoonProps> = ({
  targetLaunchDate = '2027-01-01T00:00:00',
}) => {
  const [timeLeft, setTimeLeft] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    const target = new Date(targetLaunchDate).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft((prev) => ({ ...prev, isLive: true }));
        return true; // signal to stop
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false });
      return false;
    };

    const isFinished = updateCountdown();
    if (isFinished) return;

    const interval = setInterval(() => {
      const stop = updateCountdown();
      if (stop) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetLaunchDate]);

  return (
    <>
      {/* Load Space Grotesk Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={styles.container}>
        <div style={styles.bg} />
        <div style={styles.overlay} />
        <main style={styles.main}>
          <Group justify="center">
            <img src={images.brand.icon.bg.light} alt="Kevon Logo" style={styles.logo} />
          </Group>

          <h1 style={styles.h1}>Under Construction</h1>
          <p style={styles.desc}>Something new is on the way. Stay tuned for the reveal.</p>

          <div id="countdown" style={styles.countdown}>
            {timeLeft.isLive ? (
              <span>We're live!</span>
            ) : (
              <>
                <div style={styles.countdownBox}>
                  <span style={styles.countdownNum}>{timeLeft.days}</span>
                  <small style={styles.countdownLabel}>Days</small>
                </div>
                <div style={styles.countdownBox}>
                  <span style={styles.countdownNum}>{timeLeft.hours}</span>
                  <small style={styles.countdownLabel}>Hours</small>
                </div>
                <div style={styles.countdownBox}>
                  <span style={styles.countdownNum}>{timeLeft.minutes}</span>
                  <small style={styles.countdownLabel}>Minutes</small>
                </div>
                <div style={styles.countdownBox}>
                  <span style={styles.countdownNum}>{timeLeft.seconds}</span>
                  <small style={styles.countdownLabel}>Seconds</small>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

// Inline TypeScript CSS style object mapping
const styles: Record<string, React.CSSProperties> = {
  container: {
    margin: 0,
    height: '100vh',
    width: '100vw',
    display: 'grid',
    placeItems: 'center',
    overflow: 'hidden',
    color: '#fff',
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    position: 'relative',
    textAlign: 'center',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    background: 'url("/images/o5md97.webp") no-repeat center center / cover',
    filter: 'blur(24px) saturate(200%)',
    WebkitFilter: 'blur(24px) saturate(200%)',
    transform: 'scale(1.5)',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.45)',
    zIndex: 1,
  },
  main: {
    zIndex: 2,
    position: 'relative',
    maxWidth: '600px',
    padding: '0 1rem',
  },
  logo: {
    width: '60px',
    height: 'auto',
    marginBottom: '1.5rem',
    opacity: 0.95,
  },
  h1: {
    fontSize: '2.25rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    marginTop: 0,
  },
  desc: {
    fontSize: '1.1rem',
    fontWeight: 400,
    opacity: 0.85,
    marginBottom: '2rem',
  },
  countdown: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  countdownBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  countdownNum: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  countdownLabel: {
    fontSize: '0.9rem',
    opacity: 0.8,
    fontWeight: 500,
  },
};

export default MeridianByteComingSoon;
