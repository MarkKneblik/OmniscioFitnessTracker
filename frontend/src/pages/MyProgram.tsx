import { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion'
import '../styles/header.css' //import navbar styling
import axios from 'axios';
import config from "../../config.json";
import Menu from '../components/Menu'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function MyProgram() {

    // const [numOfDays, setNumOfDays] = useState(0); // this state will hold the number of days in the exercise program 
    // const [numOfExercises, setNumOfExercises] = useState(0); // this state will hold the number of exercises contained in a specific day

    // useEffect(() => {
    //     const getNumOfDays = async () => {      // get the number of days from the backend for this specific user
    //         try {
    //           await axios.get(`${config.apiUrl}/MyProgram/GetNumOfDays`, {
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //           });
    //         } 
            
    //         catch (error: any) {
    //           console.error("Error fetching data:", error.message);
    //         }
    //       };
    //       getNumOfDays();

    // }, []); 

    // useEffect(() => {
    //     const getNumOfExercises = async () => {      // get the number of days from the backend for this specific user
    //         try {
    //           await axios.get(`${config.apiUrl}/MyProgram/GetNumOfExercises`, {
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //           });
    //         } 
            
    //         catch (error: any) {
    //           console.error("Error fetching data:", error.message);
    //         }
    //       };
    //       getNumOfExercises();

    // }, []); 

    // Define animation variants for the parent container and children
    const headerVariant = {
        hidden: { opacity: 0, fontSize: '20px' },
        visible: { opacity: 1, fontSize: '35px'}
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 }, // Start from below and hidden
        visible: { opacity: 1, y: 0 } // End at original position
    };



    return (

    <SimpleBar style={{ height: '100vh', width: '100%' }}>
        <div>
   
            <motion.h1
                className='header'
                variants={headerVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
            >
                <FontAwesomeIcon icon={faDumbbell} /> My Program
            </motion.h1>

            <motion.div
                variants={itemVariants} // Apply variants to the Menu component
                initial="hidden" 
                animate="visible" 
                transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }} 
            >
                <Menu />
            </motion.div>

        </div>

        
    </SimpleBar>

    );
}
