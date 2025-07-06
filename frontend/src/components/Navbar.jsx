
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    console.log('Logout clicked - clearing localStorage');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    console.log('Token cleared, navigating to login');
    
    // Dispatch custom logout event
    window.dispatchEvent(new Event('logout'));
    
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/home" className="brand-link">
              <span className="brand-icon">📚</span>
              Skillbook
            </Link>
          </div>
          
          <div className="navbar-menu">
            <Link 
              to="/home" 
              className={`nav-link ${isActive('/home') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/stories" 
              className={`nav-link ${isActive('/stories') ? 'active' : ''}`}
            >
              Stories
            </Link>
            <Link 
              to="/profile" 
              className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
            >
              Profile
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary logout-btn">
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
