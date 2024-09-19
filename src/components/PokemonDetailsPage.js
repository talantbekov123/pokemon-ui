import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Pokemon.css';

const evolutions = [
  { id: 1, name: 'Raichu', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png' },
  { id: 2, name: 'Charmeleon', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png' },
  { id: 3, name: 'Ivysaur', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
  { id: 4, name: 'Wartortle', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png' },
];

const PokemonDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const pokemon = evolutions.find((evolution) => evolution.id === parseInt(id));

  return (
    <div className="pokemon-details-container">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.img} alt={pokemon.name} className="pokemon-image" />

      <div className="actions">
        <button className="sell-button">Sell for Coins</button>
        <button className="upgrade-button">Upgrade / Evolution</button>
      </div>

      <h3>Evolution Line</h3>
      <div className="evolution-line">
        {evolutions.map((evolution, index) => (
          <img
            key={index}
            src={evolution.img}
            alt={evolution.name}
            className={index <= pokemon.id ? 'evolved' : 'dim'}
          />
        ))}
      </div>

      {/* Button to go back to the Pokemons list */}
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default PokemonDetailsPage;
