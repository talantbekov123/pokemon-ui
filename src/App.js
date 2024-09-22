import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';
import Referral from './components/Referral';
import Nav from './components/Nav';
import Pokemon from './components/Pokemon';
import './App.css';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/pokemons" element={<Pokemon />} />
          <Route path="/referrals" element={<Referral />} />
        </Routes>
        <Nav />
      </div>
    </Router>
  );
};

export default App;
