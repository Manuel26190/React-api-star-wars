import React from 'react';
import './PeopleCard.css'

const PeopleCard = ({ name, height, mass }) => {
  return (
    <div>      
      <h2 className='people-card-title'>Nom :{name}</h2>
      <p className='people-card-text'>Height: {height}</p>
      <p className='people-card-text'>Mass: {mass}</p>
      {/* Ajoutez d'autres informations ici avec leurs étiquettes */}
    </div>
  );
};

export default PeopleCard;
