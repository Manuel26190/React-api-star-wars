// App.jsx (ou le composant principal qui configure les routes)
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import PeopleCard from './Components/PeopleCard/PeopleCard'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import './index.css'

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/starwars-home" element={<Home />} />
                <Route path="/people/:id" element={<PeopleCard />} />
            </Routes>
            <Footer />
        </Router>
    )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)
