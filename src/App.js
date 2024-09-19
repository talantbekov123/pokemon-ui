import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapPage from './components/MapPage';
import ReferralPage from './components/ReferralPage';
import BottomNav from './components/BottomNav';
import PokemonsPage from './components/PokemonsPage';
import './App.css';
import PokemonDetailsPage from './components/PokemonDetailsPage';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/map" element={<MapPage />} />
          <Route path="/pokemons" element={<PokemonsPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          <Route path="/referrals" element={<ReferralPage />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
