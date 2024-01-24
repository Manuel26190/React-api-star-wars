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
      // console.log('response . data : ',response.data.results);      
    } catch (error) {
      console.error(error);
    }    
  };
  //axiosPromise();
  //console.log(dataStarWars[0].picture)

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
            <h3>Personnages </h3>
            <div className='div-people'>
              {data.results.map((element, index) => (
                <div>
                    <ul className='ul-people' key={index}>
                        <li className='li-name'>{element.name}</li>                
                    </ul>
                    <ul>
                        {dataStarWars.map((el, id) => {                  
                          return (
                            <img 
                                key={id}
                                className='people-img'
                                src={el.picture}
                                alt=''                    
                            />
                          );
                        })}
                    </ul>
                </div>               
              ))}              
            </div>
          </div>          
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
