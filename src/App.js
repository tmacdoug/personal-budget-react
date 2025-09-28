import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import Menu from './Menu/Menu'
import Hero from './Hero/Hero'
import HomePage from './HomePage/HomePage'
import Footer from './Footer/Footer'
import LoginPage from './LoginPage/LoginPage'
import AboutPage from './AboutPage/AboutPage'
import PieChart from './PieChart/PieChart';

function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
