import React from 'react';
import styles from './FloatingPetals.module.css';

// Simple petal SVG shapes - you can customize these
const PetalShape = ({ delay, duration, left }) => (
  <div 
    className={styles.petal}
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  >
    <svg width="30" height="34" viewBox="0 0 20 24" fill="currentColor">
      <path d="M10 0C5 0 2 5 2 10c0 3 1 5 3 7 1 1 2 3 5 7 3-4 4-6 5-7 2-2 3-4 3-7 0-5-3-10-8-10z" opacity="0.6"/>
    </svg>
  </div>
);

export default function FloatingPetals() {
  // Generate 15 petals with random positions and timings
  const petals = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 15,
    duration: 15 + Math.random() * 10,
    left: Math.random() * 100,
  }));

  return (
    <div className={styles.container} aria-hidden="true">
      {petals.map(p => (
        <PetalShape key={p.id} delay={p.delay} duration={p.duration} left={p.left} />
      ))}
    </div>
  );
}
