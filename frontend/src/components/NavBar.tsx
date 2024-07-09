//import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome component
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'; // Import the barbell (dumbbell) icon

export default function NavBar() {
  return (
    <nav className='navbar'>
      <ul className="nav-list">
        <li>
          <Link to="/MyProgram"> My Program <FontAwesomeIcon icon={faDumbbell} /> </Link>
        </li>
        <li>
          <Link to="/MyMeasurements">My Measurements</Link>
        </li>
        <li>
          <Link to="/Trends">My Trends</Link>
        </li>
      </ul>
    </nav>
  );
}
