import React from 'react';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome component
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'; // Import the barbell icon
import '../styles/drawer.css';
import Cheeseburger from './CheeseBurger';
import NavBar from '../pages/NavBar';

export default function Dropdown() {

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
  setIsOpen((prevState) => !prevState)
  }

  return (
    <div>
      <div style={{
        position: 'fixed',  // Keep icon fixed
        zIndex: 1000        // Higher z-index to appear over the drawer
      }}>
      <Cheeseburger
      color={'#303030'}
      width={40}
      height={40}
      isToggled={isOpen}
      onClick={toggleDrawer}
      
      />
      </div>

      <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction='left'
          style={{
            width: '21%',
            zIndex:999
          }}
      >
        <NavBar></NavBar>

      </Drawer>

    </div>
  );
}

