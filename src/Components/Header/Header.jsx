import React from "react";
import './Header.css';
import logoStarWars from '../../assets/Logo.png';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <section className="section-header">
            <div className="logo-div">
                <img className="img-logo" src={logoStarWars} alt="" />
            </div>
            <nav>
                <ul>                        
                    <Link to='/home'><li className="li-header">Home</li></Link>
                    <a href="https://swapi.dev/"><li className="li-header">Api Star Wars</li></a>
                </ul>
            </nav>
        </section>
        
    )
}

export default Header