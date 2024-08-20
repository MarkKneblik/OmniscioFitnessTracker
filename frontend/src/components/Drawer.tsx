import React, { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Cheeseburger from './CheeseBurger';
import NavBar from '../pages/NavBar';
import '../styles/navbar.css';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Track whether the Drawer is open or closed
  const [drawerWidth, setDrawerWidth] = useState('21%'); // Used to dynamically size the width of the Drawer

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleMeasure = (width: number) => { // Callback function passed to NavBar to calculate the max width of all of the Links
    setDrawerWidth(width + 20 + 'px'); // Add some padding to the width
  };

  return (
    <div>
      <div style={{
        position: 'fixed',
        zIndex: 1000              // Z-index is larger than that of the Drawer so the Cheeseburger icon always overlays the Drawer
      }}>

        <Cheeseburger
          color={'#303030'}
          width={40}
          height={40}
          isToggled={isOpen}      // This state will match that of the Drawer to ensure they are synchronized
          onClick={toggleDrawer}
        />

      </div>

      <Drawer
        open={isOpen}         // This state will match that of the Cheeseburger icon to ensure they are synchronized
        onClose={toggleDrawer}
        direction='left'
        style={{
          width: drawerWidth,
          zIndex: 999         // Z-index is smaller than that of the Cheeseburger icon so the Drawer does not cover up the Cheeseburger icon
        }}
      >
        <div className='drawer-content'>
          <NavBar onMeasure={handleMeasure} /> {/* Pass the callback to NavBar */}
        </div>
      </Drawer>
    </div>
  );
};

export default Dropdown;
