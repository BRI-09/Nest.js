import React, { useEffect, useState } from 'react';
import { fetchSkills } from '../api';
import styles from './Skills.module.css';

const LEVEL_STYLE = {
  beginner:     { color:'#a78bfa', bg:'rgba(167,139,250,0.1)'  },
  intermediate: { color:'#c4b5fd', bg:'rgba(196,181,253,0.12)' },
  advanced:     { color:'#ddd6fe', bg:'rgba(221,214,254,0.14)' },
};

export default function Skills() {
  const [skills, setSkills]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    fetchSkills().then(setSkills).catch(e=>setError(e.message)).finally(()=>setLoading(false));
  }, []);

  return (
    <section className="section" id="skills">
      <h2 className="section-title">IT Experience</h2>
      {loading && <div className={styles.center}><span className="spinner" style={{width:28,height:28,borderWidth:3}} /></div>}
      {error   && <div className="alert alert-error">⚠ {error}</div>}
      {!loading && !error && (
        <div className={styles.grid}>
          {skills.map((sk, i) => (
            <article key={sk.id} className={styles.card} style={{animationDelay:`${i*0.06}s`}}>
              <img src={sk.iconUrl} alt={sk.name} className={styles.icon} loading="lazy" />
              <div className={styles.info}>
                <strong className={styles.name}>{sk.name}</strong>
                <p className={styles.desc}>{sk.description}</p>
                <span className={styles.level} style={LEVEL_STYLE[sk.level]||{}}>{sk.level}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
