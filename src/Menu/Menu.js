import React from 'react';

import { Link } from "react-router-dom"

function Menu() {
  return (
    <nav>
        <ul>
            <li><Link to="/" aria-label="Go to homepage">Home</Link></li>
            <li><Link to="about" aria-label="Learn more about this app">About</Link></li>
            <li><Link to="login" aria-label="Login to your account">Login</Link></li>
            <li><Link to="https://google.com" aria-label="Open Google in a new tab">Google</Link></li>
        </ul>
    </nav>
  );
}

export default Menu;
