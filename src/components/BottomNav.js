import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/map" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Map</NavLink>
      <NavLink to="/pokemons" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Pokemons</NavLink>
      <NavLink to="/referrals" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Referrals</NavLink>
    </nav>
  );
};

export default BottomNav;
