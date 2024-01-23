import React, { useState } from 'react'; // Importez le crochet 'useState'
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null); // Utilisez l'état pour stocker les données

  const handleAxiosClick = async () => {
    try {
      const response = await axios.get('https://swapi.dev/api/people/1/');
      //console.log(response.data);
      setData(response.data); // Mettez à jour l'état avec les données reçues
    } catch (error) {
      console.error(error);
    }
  };
  //console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Api-test</h1>
        <div>
          <button className="btn-axios" onClick={handleAxiosClick}>
            Appel Axios
          </button>
          <p>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
