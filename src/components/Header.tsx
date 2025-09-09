import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="nav-header">
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/projects">PROJECTS</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
          <li><Link to="/skills">SKILLS</Link></li>
        </ul>
      </nav>
    </header>
  );
};