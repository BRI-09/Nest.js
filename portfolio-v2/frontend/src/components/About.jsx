import React from 'react';

const education = [
  { level: 'Elementary',       school: 'Lagawe Central School' },
  { level: 'High School',      school: 'Don Bosco (Lagawe, Ifugao)' },
  { level: 'Senior High',      school: 'NVGCHS' },
  { level: 'College (Current)',school: 'Asia Pacific College' },
];
const hobbies = [
  { e:'🍳', l:'Cooking & Baking' },
  { e:'🍜', l:'Eating' },
  { e:'😴', l:'Sleeping' },
  { e:'🎮', l:'Mobile Games' },
];

export default function About() {
  return (
    <section className="section" id="about">
      <h2 className="section-title">About Me</h2>
      <div className="grid">
        <article className="card col-4 fade-in">
          <div className="card-header">Me & My Goals</div>
          <div className="card-body">
            <div className="bullet"><span className="dot"/><div>Curious CS Specialize in Cybersecurity and Forensic student at Asia Pacific College who loves turning ideas into interactive experiences, coding, and caffeinated problem solving. Also with a soft spot for cats. 🐱</div></div>
            <div className="bullet"><span className="dot"/><div>Goals: Own a fat cat. Land a job that supports me and my feline; Build an app to help stray cats &amp; dogs find loving homes. 🐾</div></div>
          </div>
        </article>
        <article className="card col-4 fade-in" style={{animationDelay:'0.08s'}}>
          <div className="card-header">Education</div>
          <div className="card-body">
            {education.map(e => (
              <div className="bullet" key={e.level}>
                <span className="dot"/>
                <div>
                  <strong style={{display:'block',fontSize:13,color:'var(--text)'}}>{e.level}</strong>
                  <span style={{fontSize:13,color:'var(--text-muted)'}}>{e.school}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="card col-4 fade-in" style={{animationDelay:'0.16s'}}>
          <div className="card-header">Hobbies</div>
          <div className="card-body">
            {hobbies.map(h => (
              <div className="bullet" key={h.l}>
                <span className="dot"/>
                <span>{h.e} {h.l}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
