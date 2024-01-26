import React from "react";
import './Header.css';
import logoStarWars from '../../assets/Logo.png'

const Header = () => {
    return (
        <section className="section-header">
            <div className="logo-div">
                <img src={logoStarWars} alt="" />
            </div>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Api Star Wars</li>
                    </ul>
            </nav>
        </section>
        
    )
}

export default Header