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
import '../styles/button.css';
import Day from '../components/Day';
import '../styles/day.css';

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
    const [daysOfProgram, setDaysOfProgram] = useState<{ [key: string]: boolean }>({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      });




    // Define variants for Framer Motion
    const headerVariant = {
        hidden: { opacity: 0, fontSize: '20px' },
        visible: { opacity: 1, fontSize: '35px'}
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 }, // Start from below and hidden
        visible: { opacity: 1, y: 0 } // End at original position
    };


    const [newDay, setNewDay] = useState<string>(''); // State for the new day input

    // Handle form submission
    const handleAddDay = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if the input is a valid day and if it does not already exist
    if (newDay && !daysOfProgram[newDay]) {
      setDaysOfProgram(prevDays => ({
        ...prevDays,
        [newDay]: true
      }));
      setNewDay(''); // Clear the input field
    } else if (newDay && daysOfProgram[newDay]) {
      alert(`${newDay} is already added to the program.`);
    }
  };


    const handleDeleteDay = () =>{



    }




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

            <motion.div
                className="actions-pane"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
                >
                {/* Form to add a new day */}
                <form onSubmit={handleAddDay}>
                    <input
                    type="text"
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                    placeholder="Enter day of the week"
                    required
                    />
                    <button type="submit" className='button'>Add Day</button>
                </form>
            </motion.div>

            {/* Conditionally render list of days of the week */ }
            <ul className='day-ul'>
                <li className='day-li'> {daysOfProgram.Monday && <Day dayOfWeek="Monday" />} </li>
                <li className='day-li'> {daysOfProgram.Tuesday && <Day dayOfWeek="Tuesday" />} </li>
                <li className='day-li'> {daysOfProgram.Wednesday && <Day dayOfWeek="Wednesday" />} </li>
                <li className='day-li'> {daysOfProgram.Thursday && <Day dayOfWeek="Thursday" />} </li>
                <li className='day-li'> {daysOfProgram.Friday && <Day dayOfWeek="Friday" />} </li>
                <li className='day-li'> {daysOfProgram.Saturday && <Day dayOfWeek="Saturday" />} </li>
                <li className='day-li'> {daysOfProgram.Sunday && <Day dayOfWeek="Sunday" />} </li>
            </ul>


        </div>

        
    </SimpleBar>

    );
}
