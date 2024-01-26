import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import PeopleCard from './Components/PeopleCard/PeopleCard';
import './index.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';


const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
      <Router>
          <Header />
            <Routes>                       
              <Route path="/home" element={<Home />} />         
              <Route path="/people" element={<PeopleCard />} />
            </Routes>
          <Footer />
      </Router>   
  </React.StrictMode>
);


