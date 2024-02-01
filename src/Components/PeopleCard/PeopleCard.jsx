import './PeopleCard.css'
import { dataStarWars } from '../../data';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PeopleCard.css';

const PeopleCard = () => {

  const {id} = useParams();
  //console.log('id :',id);

  const dataId = id -1;
  //console.log(dataStarWars[dataId])  
  
  const [data, setData] = useState({});
  //const [dataWorld, setDataHomeWorld] = useState([]);

  let urlPeopleCard = `${'https://swapi.dev/api/people/'}${id}`;
  //console.log('url people card :',urlPeopleCard);

  let urlHomeWorld = 'https://swapi.dev/api/planets/';
  //console.log('url planete :', urlHomeWorld);
  
  
  const axiosPromise = async (url, setdata) => {
    try {
      const response = await axios.get(url);
      setdata(response.data);
      //console.log('response data result',response.data)
    } catch (error) {
      console.error(error);
    } 
  };
  
  useEffect(() => {
    axiosPromise(urlPeopleCard, setData);
    //axiosPromise(urlHomeWorld, setDataHomeWorld);
  }, []);

  
  return (
    <section className='people-card-section'>
        <div>
          {data && dataStarWars &&  (        
            <div className='div-card-people'>
              <h1 className='people-card-title'>{data.name}</h1>
              <img src={dataStarWars[dataId].picture} alt={data.name} className='people-img-card'></img>
              <p className='people-card-text'>Taille : {data.height}</p>
              <p className='people-card-text'>Poids : {data.mass} kg</p>
              <p className='people-card-text'>Genre : {data.gender === 'n/a' ? "auncun genre n'est attribué à un robot" : data.gender }</p> 
              <p className='people-card-text'>Couleur de cheveux : {data.hair_color === 'n/a' ? 'ne possède pas de cheveux' : data.hair_color }</p>
            </div>
          )};
      
    </div> 
    </section>
       
  );
}        

export default PeopleCard;
