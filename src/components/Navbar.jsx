import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = () => {

  const closeMenu = () => {
    const menu = document.getElementById('navMenu');
    if (menu && menu.classList.contains('show')) {
      menu.classList.remove('show');
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom px-4 py-3">

      <h3 className="navbar-brand snapseat-logo mb-0">Snapseat</h3>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
        aria-controls="navMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navMenu">
        <div className="d-flex flex-column flex-md-row gap-2 mt-3 mt-md-0">
          <Link to="/" className="btn btn-outline-dark btn-sm" onClick={closeMenu}>Explore Events</Link>
          <Link to="/addeventticket" className="btn btn-outline-dark btn-sm" onClick={closeMenu}>Create Event</Link>
          <Link to="/login" className="btn btn-outline-dark btn-sm" onClick={closeMenu}>Log In</Link>
          <Link to="/signup" className="btn btn-dark btn-sm" onClick={closeMenu}>Register</Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;