import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar         from './components/Navbar';
import ThemeToggle    from './components/ThemeToggle';
import FloatingPetals from './components/FloatingPetals';
import HomePage       from './pages/HomePage';
import GuestbookPage  from './pages/GuestbookPage';

export default function App() {
  // Check localStorage for saved theme, default to dark
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  // Apply theme to body and save preference
  useEffect(() => {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <>
      <FloatingPetals />
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <Navbar />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/guestbook" element={<GuestbookPage />} />
      </Routes>
    </>
  );
}
