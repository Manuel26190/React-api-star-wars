import './PeopleCard.css'
import { dataStarWars } from '../../data'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PeopleCard.css'

const PeopleCard = () => {
    const { id } = useParams()
    //console.log('id :',id);

    const dataId = id - 1
    //console.log(dataStarWars[dataId])

    const [data, setData] = useState([])
    const [dataWorld, setDataHomeWorld] = useState([])

    let urlPeopleCard = `${'https://swapi.dev/api/people/'}${id}`
    //console.log('url people card :',urlPeopleCard);

    let urlHomeWorld = 'https://swapi.dev/api/planets/'
    //console.log('url planete :', urlHomeWorld);

    const axiosPromise = async (url, setdata) => {
        try {
            const response = await axios.get(url)
            setdata(response.data)
            //console.log('response data', response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        axiosPromise(urlPeopleCard, setData)
    }, [urlPeopleCard])

    useEffect(() => {
        axiosPromise(urlHomeWorld, setDataHomeWorld)
    }, [urlHomeWorld])

    const birthYear = data?.birth_year // Utilisation de l'optional chaining pour éviter une erreur si data est undefined
    const birthYearWithoutBBY = birthYear?.replace('BBY', '') || '' // Utilisation de l'optional chaining et du nullish coalescing pour éviter une erreur si birthYear est undefined
    console.log(birthYearWithoutBBY)

    const urlWorld = data.homeworld
    let planetName

    if (urlWorld) {
        const segments = urlWorld.split('/')
        const planetNumber = segments[segments.length - 2]
        const numbervalue = parseInt(planetNumber, 10)
        const adjustedIndex = numbervalue - 1
        planetName = dataWorld[adjustedIndex]?.name || ''
    }

    //console.log(planetName)

    // Utilisez planetName comme nécessaire dans votre composant.

    return (
        <section className="people-card-section">
            <div>
                {data && dataStarWars && (
                    <div className="div-card-people">
                        <h1>{data.name}</h1>
                        <img
                            src={dataStarWars[dataId].picture}
                            alt={data.name}
                            className="people-img-card"
                        ></img>
                        <p className="people-card-text">
                            {data.gender === 'n/a'
                                ? 'Est un robot '
                                : (data.gender === 'male'
                                      ? 'Est un homme '
                                      : '') ||
                                  (data.gender === 'female'
                                      ? 'Est une femme '
                                      : '')}
                        </p>
                        <p className="people-card-text">
                            Originaire de la planète :
                            <span className="span-people-text">
                                {planetName ? planetName : ' Skeltow'}
                            </span>
                        </p>
                        <p className="people-card-text">
                            Date de naissance :{' '}
                            <span className="span-people-text">
                                {birthYearWithoutBBY} années avant la baitaille
                                de Yavin
                            </span>
                        </p>

                        <p className="people-card-text">
                            Taille :{' '}
                            <span className="span-people-text">
                                {data.height > 100
                                    ? data.height + ' m'
                                    : data.height + ' cm'}
                            </span>
                        </p>
                        <p className="people-card-text">
                            Poids :
                            <span className="span-people-text">
                                {' '}
                                {data.mass}
                                {' kg'}
                            </span>
                        </p>
                        <p className="people-card-text">
                            Ses yeux sont de couleur :{' '}
                            <span className="span-people-text">
                                {data.eye_color}
                            </span>
                        </p>
                        <p className="people-card-text">
                            Couleur de peau ou de revêtement :
                            <span className="span-people-text">
                                {data.skin_color === 'gold' ? ' or' : ''}
                                {data.skin_color === 'fair' ? ' claire' : ''}
                                {data.skin_color === 'light' ? ' claire' : ''}
                                {data.skin_color === 'white, blue'
                                    ? ' blanc et bleu'
                                    : ''}
                                {data.skin_color === 'white' ? ' blanche' : ''}
                                {data.skin_color === 'white, red'
                                    ? ' blanc et rouge'
                                    : ''}
                            </span>
                        </p>
                        {data.hair_color === 'n/a' ? (
                            ''
                        ) : (
                            <p className="people-card-text">
                                Couleur de cheveux :{' '}
                                <span className="span-people-text">
                                    {data.hair_color}
                                </span>
                            </p>
                        )}
                    </div>
                )}
                ;
            </div>
        </section>
    )
}

export default PeopleCard
