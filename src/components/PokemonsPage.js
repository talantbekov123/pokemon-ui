import React, { useState } from 'react';
import './PokemonsPage.css';

const PokemonsPage = () => {
  const [pokemons] = useState([
    {
      id: 1,
      name: 'Pikachu',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      sellPrice: 100,
      upgradePrice: 200,
      element: 'electric',
    },
    {
      id: 2,
      name: 'Charmander',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      sellPrice: 150,
      upgradePrice: 300,
      element: 'fire',
    },
    {
      id: 3,
      name: 'Bulbasaur',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      sellPrice: 120,
      upgradePrice: 250,
      element: 'grass',
    },
    {
      id: 4,
      name: 'Squirtle',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
      sellPrice: 130,
      upgradePrice: 270,
      element: 'water',
    },
    {
      id: 7,
      name: 'Gengar',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
      sellPrice: 180,
      upgradePrice: 360,
      element: 'ghost',
    },
    {
      id: 8,
      name: 'Psyduck',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png',
      sellPrice: 110,
      upgradePrice: 220,
      element: 'water',
    },
    {
      id: 5,
      name: 'Jigglypuff',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
      sellPrice: 140,
      upgradePrice: 280,
      element: 'electric',
    },
    {
      id: 6,
      name: 'Eevee',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
      sellPrice: 200,
      upgradePrice: 400,
      element: 'fire',
    },
    {
      id: 9,
      name: 'Machamp',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png',
      sellPrice: 160,
      upgradePrice: 320,
      element: 'fighting',
    },
    {
      id: 10,
      name: 'Alakazam',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png',
      sellPrice: 190,
      upgradePrice: 380,
      element: 'psychic',
    },
  ]);

  const handleSell = (pokemonName) => {
    alert(`Sold ${pokemonName}!`);
  };

  const handleUpgrade = (pokemonName) => {
    alert(`Upgraded ${pokemonName}!`);
  };

  const getElementIcon = (element) => {
    switch (element) {
      case 'fire':
        return '🔥'; // Fire Emoji
      case 'water':
        return '💧'; // Water Emoji
      case 'electric':
        return '⚡'; // Electric Emoji
      case 'grass':
        return '🍃'; // Grass Emoji
      case 'ghost':
        return '👻'; // Ghost Emoji
      case 'normal':
        return '⭐'; // Star for Normal
      case 'fighting':
        return '🥊'; // Boxing glove for Fighting
      case 'psychic':
        return '🔮'; // Crystal ball for Psychic
      default:
        return '❓'; // Default if no element
    }
  };

  return (
    <div className="pokemons-page">
      <h2>Your Pokémon</h2>
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className={`pokemon-card ${pokemon.element}`}>
            <div className="pokemon-image-container">
              <img src={pokemon.img} alt={pokemon.name} className="pokemon-image" />
              <div className="pokemon-element">{getElementIcon(pokemon.element)}</div>
            </div>
            <div className="pokemon-info">
              <h3>{pokemon.name}</h3>
              <p>Sell Price: ${pokemon.sellPrice}</p>
              <p>Upgrade Price: ${pokemon.upgradePrice}</p>
            </div>
            <div className="action-buttons">
              <button onClick={() => handleSell(pokemon.name)} className="action-button sell">Sell</button>
              <button onClick={() => handleUpgrade(pokemon.name)} className="action-button upgrade">Upgrade</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonsPage;
