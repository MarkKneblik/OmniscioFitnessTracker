import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import '../styles/myprogram.css' //import navbar styling
import axios from 'axios';
import config from "../../config.json";
import Menu from '../components/Menu'; 

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


    return (
        <div>
        <Menu></Menu>
        

        {/* <motion.h1 className='myprogram-header'
        initial={{ opacity: 0, x: '-10w' }}
        animate={{ opacity: 1, x: '0vw'}}
        transition={{ duration: 1, ease: 'linear' }}
        >
        Customize Your Program
        </motion.h1> */}
        
        </div>

    );
}
