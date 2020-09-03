import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navigation-bar">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <Link to="/">
          <p className="navbar-brand" href="#">
            Business Finder
          </p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to="/">
              <li className="nav-item active">
                <p className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </p>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
