import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

import { dataStarWars } from '../../data';

function Home() {
  const [data, setData] = useState(null);
  const [dataWorld, setDataHomeWorld] = useState(null);

  let urlPeople = 'https://swapi.dev/api/people/';
  let urlHomeWorld = 'https://swapi.dev/api/planets/';

  const axiosPromise = async (url, setdata) => {
    try {
      const response = await axios.get(url);
      setdata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axiosPromise(urlPeople, setData);
    axiosPromise(urlHomeWorld, setDataHomeWorld);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>API Star Wars</h1>
        <div>
          {data && dataWorld && (
            <div>
              <h3>Personnages</h3>
              <div className='div-people'>
                <ul className='ul-people'>
                  {data.results.map((element, index) => {
                    const matchingStarWarsCharacter = dataStarWars.find((char) => char.name === element.name);

                    const urlWorld = element.homeworld;
                    const segments = urlWorld.split('/');
                    const planetNumber = segments[segments.length - 2];
                    const numbervalue = parseInt(planetNumber, 10);
                    const adjustedIndex = numbervalue - 1;

                    const planetName = dataWorld.results[adjustedIndex]?.name;

                    return (
                      <li key={index} className='li-name'>
                        {element.name}
                        {matchingStarWarsCharacter && (
                          <img
                            className='people-img'
                            src={matchingStarWarsCharacter.picture}
                            alt={element.name}
                          />
                        )}
                        <p>Originaire de : {planetName || 'Stewjon'}</p>
                        {/* Utilisez Link pour créer un lien vers PeopleCard */}
                        <Link to="/people">Voir la carte du personnage</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Home;