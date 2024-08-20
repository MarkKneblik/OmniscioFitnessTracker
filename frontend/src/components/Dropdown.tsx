import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome component
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'; // Import the barbell icon
import '../styles/dropdown.css';
import Cheeseburger from './CheeseBurger';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div id="outer-container">
      <Menu
        width={'20%'}
        isOpen={isOpen}
        onStateChange={({ isOpen }) => setIsOpen(isOpen)}
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        className='bm-overlay'
      >
        <Link to="/MyProgram" className="menu-item">
          My Program <FontAwesomeIcon icon={faDumbbell} />
        </Link>
        <Link to="/MyMeasurements" className="menu-item">My Measurements</Link>
        <Link to="/Trends" className="menu-item">My Trends</Link>
        
      </Menu>

      <main id="page-wrap">

        <Cheeseburger
          color={'#303030'}
          width={60}
          height={60}
          isToggled={isOpen}
          onClick={toggle}
        />

      </main>

    </div>
  );
}
