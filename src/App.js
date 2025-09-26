// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FetchTeams from './components/FetchTeams';
import AddTeam from './components/AddTeam';
import UpdateTeam from './components/UpdateTeam';
import ShowStats from './components/ShowStats';
import DeleteTeam from './components/DeleteTeam';
import First10Teams from './components/First10Teams';
import AverageGoals from './components/AverageGoals';
import './style.css'; // Ensure the path is correct
import logo from './assets/logo.png'; // Import the logo

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu open state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when a link is clicked (useful for mobile)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            {/* Logo Integration */}
            <Link to="/" className="nav-logo" onClick={closeMenu}>
              <img src={logo} alt="Logo" className="logo-image" />
            </Link>

            {/* Navigation Links */}
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
              <Link to="/add" className="nav-link" onClick={closeMenu}>Add Team</Link>
              <Link to="/update" className="nav-link" onClick={closeMenu}>Update Team</Link>
              <Link to="/stats" className="nav-link" onClick={closeMenu}>Team Stats</Link>
              <Link to="/delete" className="nav-link" onClick={closeMenu}>Delete Team</Link>
              <Link to="/first10" className="nav-link" onClick={closeMenu}>First 10 Teams</Link>
              <Link to="/average-goals" className="nav-link" onClick={closeMenu}>Average Goals For</Link>
            </div>

            {/* Hamburger Menu */}
            <div
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              role="button"
              tabIndex={0}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<FetchTeams />} />
          <Route path="/add" element={<AddTeam />} />
          <Route path="/update" element={<UpdateTeam />} />
          <Route path="/stats" element={<ShowStats />} />
          <Route path="/delete" element={<DeleteTeam />} />
          <Route path="/first10" element={<First10Teams />} />
          <Route path="/average-goals" element={<AverageGoals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
