import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          Breneth<span>.</span>
        </NavLink>

        <ul className={styles.links}>
          <li><NavLink to="/"          end className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#skills">Skills</a></li>
          <li><a href="/#gallery">Gallery</a></li>
          <li>
            <NavLink to="/guestbook" className={({ isActive }) => `${styles.gbLink} ${isActive ? styles.active : ''}`}>
              ✍ Guestbook
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
