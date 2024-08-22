import React, { useState, useCallback } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Cheeseburger from './CheeseBurger';
import NavBar from '../pages/NavBar';
import '../styles/navbar.css';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Track whether the Drawer is open or closed
  const [drawerWidth, setDrawerWidth] = useState('21%'); // Used to dynamically size the width of the Drawer

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  // Memoize the callback to avoid recreating it on every render
  const handleMeasureWidth = useCallback((width: number) => {
    setDrawerWidth(width + 50 + 'px');  // Add some padding to the width
  }, []); // No dependencies ensures this function reference is stable

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

          <NavBar onMeasureWidth={handleMeasureWidth} /> {/* Pass the callback to NavBar */}

      </Drawer>
    </div>
  );
};

export default Menu;
