import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  // console.log("useLocation", useLocation().pathname);
  return (
    <header className="header">
      <div>
        <Link to="/" className="logo">
          <img alt="" src="https://cdn.aertrip.com/resources/assets/scss/skin/img/common/aertip-vertical-logo-white.svg" className="logo-icon" />
          <img alt="" src="https://cdn.aertrip.com/resources/assets/scss/skin/img/common/aertrip-name-vertical-white.svg" className="logo-text" />
        </Link>
      </div>
      <div>
        <ul className="navlinks">
          <li>
            <Link to="/aerin" className={useLocation().pathname === "/aerin" ? "active" : ""}>
              Aerin
            </Link>
          </li>
          <li>
            <Link to="/" className={useLocation().pathname === "/" ? "active" : ""}>
              Flights
            </Link>
          </li>
          <li>
            <Link to="/hotel" className={useLocation().pathname === "/hotel" ? "active" : ""}>
              Hotel
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link to="/login">
          Login
        </Link>
      </div>
    </header>
  );
}

export default Header;