// External Libraries
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { motion } from 'framer-motion';

// Internal Imports
import Menu from '../components/Menu';
import LogoutButton from "../components/LogoutButton";
import Header from '../components/Header';

// Styles
import '../styles/myaccount.css';


const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start from below and hidden
    visible: { opacity: 1, y: 0 } // End at original position
};

export default function MyAccount() {

  return (

    <SimpleBar style={{ height: '100vh', width: '100%' }}>

      <div>

        <Header title='My Account' icon='user'></Header>

        <motion.div
          variants={itemVariants} // Apply variants to the Menu component
          initial="hidden" 
          animate="visible" 
          transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }} 
        >
          <Menu />
        </motion.div>

        <motion.div
          className="actions-pane"
          variants={itemVariants} // Apply variants to the LogoutButton component
          initial="hidden"
          animate="visible" 
          transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }} 
        >
          <LogoutButton />
        </motion.div>
        
      </div>

    </SimpleBar>
  );
}
