import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar       from './components/Navbar';
import HomePage     from './pages/HomePage';
import GuestbookPage from './pages/GuestbookPage';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/guestbook" element={<GuestbookPage />} />
      </Routes>
    </>
  );
}
