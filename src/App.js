import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { dataStarWars } from './data';

function App() {
  const [data, setData] = useState(null);

  const handleclickAxios = async () => {
    try {
      const response = await axios.get('https://swapi.dev/api/people/');
      setData(response.data);     
    } catch (error) {
      console.error(error);
    }    
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Api Star Wars</h1>
        <div>
          <button className="btn-axios" onClick={handleclickAxios}>
            Voir les personnages
          </button>
          {data && (
            <div>
              <h3>Personnages</h3>
              <div className='div-people'>
                <ul className='ul-people'>
                  {data.results.map((element, index) => {
                    
                    const matchingStarWarsCharacter = dataStarWars.find((char) => char.name === element.name);

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

export default App;
