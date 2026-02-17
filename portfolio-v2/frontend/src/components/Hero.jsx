import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.kicker}>✦ CS Student · Asia Pacific College</p>
          <h1 className={styles.title}>
            Breneth<br />
            <em>Ananayo</em>
          </h1>
          <div className={styles.pills}>
            <span>🐱 Wants s Cat</span>
            <span>💻 CS Student</span>
            <span>☕ Caffeinated Coder</span>
          </div>
          <div className={styles.cta}>
            <a href="#contact" className="btn">Get in Touch</a>
            <Link to="/guestbook" className={`btn ${styles.gbBtn}`}> Sign in the Guestbook</Link>
            <a href="#skills" className={`btn btn-outline ${styles.outlineBtn}`}>My Skills →</a>
          </div>
        </div>

        <div className={styles.media}>
          <div className={styles.frame}>
            <img src="/assets/myself3.jpg" alt="Breneth Ananayo" />
          </div>
          <div className={styles.badge}>
            <span>🏫</span>
            <div>
              <strong>Asia Pacific College</strong>
              <p>Computer Science</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
