import './PeopleCard.css'
import { dataStarWars } from '../../data'
import { Link, useParams, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PeopleCard.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const PeopleCard = (index) => {
    const navigate = useNavigate()

    const { id } = useParams()
    //console.log('id :',id);

    const dataId = id - 1
    //console.log(dataStarWars[dataId])

    const [data, setData] = useState([])
    const [dataWorld, setDataHomeWorld] = useState([])
    const [dataFilmsApi, setDataFilms] = useState([])

    let urlPeopleCard = `${'https://swapi.dev/api/people/'}${id}`

    let urlHomeWorld = 'https://swapi.dev/api/planets/'

    let urlFilms = 'https://swapi.dev/api/films/'

    const axiosPromise = async (url, setdata) => {
        try {
            const response = await axios.get(url)
            setdata(response.data)
            //console.log('response data', response.data.films)
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

    useEffect(() => {
        axiosPromise(urlFilms, setDataFilms)
    }, [urlFilms])

    const dataFilmsResults = dataFilmsApi.results
    //console.log('data film api',dataFilmsResults)

    const dataPeopleFilm = data.films
    //console.log('data people film :', dataPeopleFilm)

    const dataWorldResult = dataWorld.results
    //console.log('data world results', dataWorldResult)

    //const dataFilms = data.films
    //console.log(dataFilms)

    const birthYear = data?.birth_year
    const birthYearWithoutBBY = birthYear?.replace('BBY', '') || ''
    //console.log(birthYearWithoutBBY)

    const skinColorTranslations = {
        gold: ' or',
        fair: ' claire',
        light: ' claire',
        'white, blue': ' blanc et bleu',
        white: ' claire',
        'white, red': ' blanc et rouge',
    }

    const eyesColorTranslation = {
        blue: ' bleu',
        yellow: ' jaune',
        red: 'rouge',
        brown: ' marron',
        'blue-gray': ' bleu-gris',
    }

    const hairColorTranslation = {
        'auburn, white': 'bruns-roux, blancs',
        black: 'noirs',
        'n/a': '',
        none: '',
        brown: 'bruns',
        'brown, grey': 'bruns, gris',
        blond: 'blonds',
    }

    const filmList = {
        'A New Hope': 'Un nouvel espoir',
        'The Empire Strikes Back': "L'Empire contre-attaque",
        'Return of the Jedi': 'Le Retour du Jedi',
        'The Phantom Menace': 'La menace fantôme',
        'Attack of the Clones': "L'attaque des clones",
        'Revenge of the Sith': 'La revanche des Sith',
    }

    const generateFilmLink = (episode_id) => {
        switch (episode_id) {
            case 1:
                return 'https://www.starwars.com/films/star-wars-episode-iv-a-new-hope'
            case 2:
                return 'https://www.starwars.com/films/star-wars-episode-v-the-empire-strikes-back'
            case 3:
                return 'https://www.starwars.com/films/star-wars-episode-vi-return-of-the-jedi'
            case 4:
                return 'https://www.starwars.com/films/star-wars-episode-i-the-phantom-menace'
            case 5:
                return 'https://www.starwars.com/films/star-wars-episode-ii-attack-of-the-clones'
            case 6:
                return 'https://www.starwars.com/films/star-wars-episode-iii-revenge-of-the-sith'
            default:
                return ''
        }
    }

    function homeWorldPeople(ApiData, ApiDataWorldResult, index) {
        const urlWorld = ApiData.homeworld
        const segments = urlWorld.split('/')
        const planetNumber = segments[segments.length - 2]
        const numbervalue = parseInt(planetNumber, 10)
        const adjustedIndex = numbervalue - 1
        const planetName = ApiDataWorldResult[adjustedIndex]?.name || 'Stewjon'
        return (
            <span key={index} className="span-people-text">
                {planetName}
            </span>
        )
    }

    const handleNextclick = () => {
        let id = data.url.split('/').filter(Boolean).pop()
        let idNumber = parseInt(id, 10)
        let nextId
        if (idNumber === 10) {
            nextId = 1
        } else {
            nextId = idNumber + 1
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        navigate(`/people/${nextId}`)
    }
    const handlePreviousclick = () => {
        let id = data.url.split('/').filter(Boolean).pop()
        let idNumber = parseInt(id, 10)
        let nextId = idNumber - 1
        if (idNumber === 1) {
            nextId = 10
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        navigate(`/people/${nextId}`)
    }

    return (
        <section className="people-card-section">
            <div>
                {data && dataStarWars && (
                    <div className="div-card-people">
                        <h1>{data.name}</h1>
                        <div className="people-img-div">
                            <button
                                className="previous-btn"
                                onClick={handlePreviousclick}
                            >
                                <FaChevronLeft />
                            </button>
                            <img
                                src={dataStarWars[dataId].picture}
                                alt={data.name}
                                className="people-img-card"
                            ></img>
                            <button
                                className="next-btn"
                                onClick={handleNextclick}
                            >
                                <FaChevronRight />
                            </button>
                        </div>

                        <p className="people-card-text">
                            {data.gender === 'n/a'
                                ? 'Est un droid '
                                : (data.gender === 'male'
                                      ? 'Est un homme '
                                      : '') ||
                                  (data.gender === 'female'
                                      ? 'Est une femme '
                                      : '')}
                        </p>
                        <p className="people-card-text">
                            Originaire de la planète :{' '}
                            {dataWorldResult && (
                                <span className="span-people-text">
                                    {homeWorldPeople(data, dataWorldResult)}
                                </span>
                            )}
                        </p>
                        {data.birth_year === 'unknown' ? (
                            ''
                        ) : (
                            <p className="people-card-text">
                                Date de naissance :{' '}
                                <span className="span-people-text">
                                    {birthYearWithoutBBY} années avant la
                                    baitaille de Yavin
                                </span>
                            </p>
                        )}
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
                            Couleur des yeux :{' '}
                            <span className="span-people-text">
                                {eyesColorTranslation[data.eye_color] || ''}
                            </span>
                        </p>
                        <p className="people-card-text">
                            Couleur de peau ou de revêtement :
                            <span className="span-people-text">
                                {skinColorTranslations[data.skin_color] || ''}
                            </span>
                        </p>
                        {data.hair_color === 'none' ||
                        data.hair_color === 'n/a' ? (
                            ''
                        ) : (
                            <p className="people-card-text">
                                Couleur de cheveux :{' '}
                                <span className="span-people-text">
                                    {hairColorTranslation[data.hair_color] ||
                                        ''}
                                </span>
                            </p>
                        )}
                        <p className="people-card-text">
                            Présent dans les films :
                            {dataPeopleFilm &&
                                dataFilmsResults &&
                                dataPeopleFilm.map((element, index) => {
                                    const segments = element.split('/')
                                    //console.log('segments', segments)
                                    const filmNumber =
                                        segments[segments.length - 2]
                                    //console.log('file number : ', filmNumber)
                                    const numberValue = parseInt(filmNumber, 10)
                                    const numberFilm = numberValue - 1
                                    //console.log('number value :', numberValue)
                                    return (
                                        <li className="li-films" key={index}>
                                            <a
                                                href={generateFilmLink(
                                                    numberValue
                                                )}
                                            >
                                                {
                                                    filmList[
                                                        dataFilmsResults[
                                                            numberFilm
                                                        ] &&
                                                            dataFilmsResults[
                                                                numberFilm
                                                            ].title
                                                    ]
                                                }
                                            </a>
                                        </li>
                                    )
                                })}
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default PeopleCard
