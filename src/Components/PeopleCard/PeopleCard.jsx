import './PeopleCard.css'
import { dataStarWars } from '../../data';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PeopleCard.css';

const PeopleCard = () => {

  const {id} = useParams();
  //console.log('id :',id);
  
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
      console.log('response data result',response.data)
    } catch (error) {
      console.error(error);
    } 
  };
  
  useEffect(() => {
    axiosPromise(urlPeopleCard, setData);
    //axiosPromise(urlHomeWorld, setDataHomeWorld);
  }, []);

  
  return (
    <div>
      {data && (        
        <div>
          <h3 className='people-card-title'>{data.name}</h3>
          <p className='people-card-text'>Poids : {data.mass} kg</p>
          <p></p>
          <p></p>
        </div>
      )}
    </div>    
  );
}        

export default PeopleCard;
