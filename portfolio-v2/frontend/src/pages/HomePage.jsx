import React from 'react';
import Hero    from '../components/Hero';
import About   from '../components/About';
import Skills  from '../components/Skills';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <main className="wrap">
      <Hero />
      <About />
      <Skills />
      <Gallery />
      <Contact />
      <footer className="footer">
        © 2026 Breneth Ananayo &nbsp;·&nbsp; bpananayo@student.apc.edu.ph
      </footer>
    </main>
  );
}
