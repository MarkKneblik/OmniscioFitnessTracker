import config from "../../config.json";
import Menu from '../components/Menu'; 
import LogoutButton from "../components/LogoutButton";
import '../styles/myaccount.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Define animation variants for the parent container and children
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start from below and hidden
    visible: { opacity: 1, y: 0 } // End at original position
};

export default function MyAccount() {

  return (
    <div>
        <motion.h1
            className='header'
            initial={{ fontSize: '20px'}} // Initial font size
            animate={{ fontSize: '35px' }} // Animate font size
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
        >
            <FontAwesomeIcon icon={faUser} /> My Account
        </motion.h1>

        <motion.div
            variants={itemVariants} // Apply variants to the Menu component
            initial="hidden" 
            animate="visible" 
            transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }} 
        >
            <Menu></Menu>
        </motion.div>

        <motion.div
            className="actions-pane"
            variants={itemVariants} // Apply variants to the LogoutButton component
            initial="hidden"
            animate="visible" 
            transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }} 
        >
            <LogoutButton></LogoutButton>
        </motion.div>
        </div>
    
  );

}
