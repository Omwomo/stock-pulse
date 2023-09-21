import React from 'react';
import { FaCog, FaMicrophone } from 'react-icons/fa';

const NavBar = () => (
  <div className="navbar">
    <div className="page-name">
      <p className="name">STOCK PULSE</p>
    </div>
    <ul className="nav-list">
      <FaCog className="nav-item" data-testid="navcons-cog" />
      <FaMicrophone className="nav-item" data-testid="navcons-microphone" />
    </ul>
  </div>
);

export default NavBar;
