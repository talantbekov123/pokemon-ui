import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { getDistance } from 'geolib';
import axios from 'axios';
import './Map.css';

const mapContainerStyle = {
  width: '100%',
  height: `calc(100% - 60px)`
};

const mapOptions = {
  fullscreenControl: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  clickableIcons: false,
};

const predefinedPokemonLocations = [
  {
    id: 1,
    name: 'Charmander',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    elementIcon: 'https://img.icons8.com/fluency/48/fire-element.png',
    sellPrice: 150,
    upgradePrice: 300,
  },
  {
    id: 2,
    name: 'Bulbasaur',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    elementIcon: 'https://img.icons8.com/color/48/grass.png',
    sellPrice: 200,
    upgradePrice: 400,
  },
];

const PokemonMap = () => {
  const [pokemons, setPokemons] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null); // Holds the directions
  const [travelTimes, setTravelTimes] = useState({ walk: '', drive: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      () => {
        console.error('Geolocation not available');
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      const { lat, lng } = userLocation;
      const newPokemons = predefinedPokemonLocations.map((pokemon) => {
        const offsetLat = (Math.random() - 0.5) * 0.02;
        const offsetLng = (Math.random() - 0.5) * 0.02;
        return { ...pokemon, lat: lat + offsetLat, lng: lng + offsetLng };
      });
      setPokemons(newPokemons);
    }
  }, [userLocation]);

  const handlePokemonClick = (pokemon) => {
    if (!userLocation) {
      alert('User location not found.');
      return;
    }

    const distance = getDistance(
      { latitude: userLocation.lat, longitude: userLocation.lng },
      { latitude: pokemon.lat, longitude: pokemon.lng }
    );

    if (distance <= 50) {
      setSelectedPokemon({ ...pokemon, isCatchable: true });
    } else {
      setSelectedPokemon({ ...pokemon, isCatchable: false });
      handleTravelTime(pokemon);
    }

    setShowModal(true);
  };


  const handleClose = () => {
    setShowModal(false);
  }

  const handleTravelTime = (pokemon) => {
    const distanceMatrixService = new window.google.maps.DistanceMatrixService();

    distanceMatrixService.getDistanceMatrix(
      {
        origins: [userLocation],
        destinations: [{ lat: pokemon.lat, lng: pokemon.lng }],
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (response, status) => {
        if (status === 'OK') {
          setTravelTimes((prev) => ({
            ...prev,
            walk: response.rows[0].elements[0].duration.text,
          }));
        }
      }
    );

    distanceMatrixService.getDistanceMatrix(
      {
        origins: [userLocation],
        destinations: [{ lat: pokemon.lat, lng: pokemon.lng }],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          setTravelTimes((prev) => ({
            ...prev,
            drive: response.rows[0].elements[0].duration.text,
          }));
        }
      }
    );
  };

  const handleGoClick = (mode) => {
    const directionsService = new window.google.maps.DirectionsService();

    // Clear the previous directions before fetching new ones
    setDirectionsResponse(null);

    directionsService.route(
      {
        origin: userLocation,
        destination: { lat: selectedPokemon.lat, lng: selectedPokemon.lng },
        travelMode: mode,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          setShowModal(false);
        } else {
          console.error('Error fetching directions', result);
        }
      }
    );
  };

  const handleCatchPokemon = () => {
    axios.post('/api/catch-pokemon', { pokemonId: selectedPokemon.id, userLocation })
      .then((response) => {
        setPokemons((prev) => prev.filter((p) => p.id !== selectedPokemon.id));
        setSelectedPokemon(null);
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error catching Pokémon', error);
      });
  };

  return (
    <div className="pokemon-map-container">
      <LoadScript googleMapsApiKey="AIzaSyDHsKlfltWvKN-1BGBrxQGlwJ5I3PxruT8">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || { lat: 37.7749, lng: -122.4194 }}
          zoom={14}
          options={mapOptions}
        >
          {userLocation && (
            <Marker position={userLocation} icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
          )}

          {pokemons.map((pokemon) => (
            <Marker
              key={pokemon.id}
              position={{ lat: pokemon.lat, lng: pokemon.lng }}
              icon={{ url: pokemon.sprite, scaledSize: new window.google.maps.Size(100, 100) }}
              onClick={() => handlePokemonClick(pokemon)}
            />
          ))}

          {/* Render the directions only if available */}
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </LoadScript>

      {/* Modal for the Pokemon Card */}
      {showModal && selectedPokemon && (
        <div className="pokemon-modal-overlay">
          <div className="pokemon-card-modal">
            <button className="close-button" onClick={handleClose}>X</button> {/* Close button */}
            <img src={selectedPokemon.sprite} alt={selectedPokemon.name} />
            <h2>{selectedPokemon.name}</h2>
            <p>Sell Price: ${selectedPokemon.sellPrice}</p>
            <p>Upgrade Price: ${selectedPokemon.upgradePrice}</p>
            {selectedPokemon.isCatchable ? (
              <button onClick={handleCatchPokemon}>Catch Pokémon</button>
            ) : (
              <div>
                <p>Walk time: {travelTimes.walk || 'Calculating...'}</p>
                <p>Drive time: {travelTimes.drive || 'Calculating...'}</p>
                <div className='action-buttons'>
                  <button style={{ backgroundColor: 'rgb(255, 204, 203)' }} className="action-button" onClick={() => handleGoClick(window.google.maps.TravelMode.WALKING)}>Go by Walk</button>
                  <button style={{ backgroundColor: 'rgb(200, 230, 201)' }} className="action-button" onClick={() => handleGoClick(window.google.maps.TravelMode.DRIVING)}>Go by Car</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonMap;
