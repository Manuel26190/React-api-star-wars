import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';
import { dataStarWars } from '../../data';
import PeopleCard from '../PeopleCard/PeopleCard';

function Home() {
  const [data, setData] = useState([]);
  const [dataWorld, setDataHomeWorld] = useState([]);
  const [loading, setLoading] = useState(true);

  let urlPeople = 'https://swapi.dev/api/people/';
  let urlHomeWorld = 'https://swapi.dev/api/planets/';

  const axiosPromise = async (url, setdata) => {
    try {
      const response = await axios.get(url);
      setdata(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axiosPromise(urlPeople, setData);
    axiosPromise(urlHomeWorld, setDataHomeWorld);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <p>Chargement en cours...</p>
        ) : (
          <div>
            <h2>De nos jours grâce à l'API Star Wars...</h2>
            <div className='div-people'>
              <ul className='ul-people'>
                {data.map((element, index) => {
                  const matchingStarWarsCharacter = dataStarWars.find((char) => char.name === element.name);
                  const id = element.url.split('/').filter(Boolean).pop();

                  const urlWorld = element.homeworld;
                  const segments = urlWorld.split('/');
                  const planetNumber = segments[segments.length - 2];
                  const numbervalue = parseInt(planetNumber, 10);
                  const adjustedIndex = numbervalue - 1;
                  const planetName = dataWorld[adjustedIndex]?.name;

                  return (
                    <Link to={`/people/${id}`} key={index}>
                      <li className='li-name'>
                        
                        
                        {matchingStarWarsCharacter && (                          
                          <img
                            className='people-img'
                            src={matchingStarWarsCharacter.picture}
                            alt={element.name}
                          />                          
                        )}
                        <p>Originaire de : {planetName ? planetName : "Skeltow"}</p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Home;
