import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion'
import '../styles/header.css' //import navbar styling
import axios from 'axios';
import config from "../../config.json";
import Menu from '../components/Menu'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import '../styles/button.css';
import Day from '../components/Day';
import '../styles/day.css';
import Select, { StylesConfig } from 'react-select'


const handleDeleteDay = () =>{



}

const options = [
    { value: '1', label: 'Monday' },
    { value: '2', label: 'Tuesday' },
    { value: '3', label: 'Wednesday' },
    { value: '4', label: 'Thursday' },
    { value: '5', label: 'Friday' },
    { value: '6', label: 'Saturday' },
    { value: '7', label: 'Sunday' }
];

// 
const customStyles: StylesConfig<any, false> = {
    container: (provided, state) => ({
        ...provided,       // Default styles
        width: '200px',
        borderColor: state.isFocused ? '#AFB9B5' : '#EBE2D4',
    }),
    control: (provided, state) => ({
        ...provided,
        width: '200px',
        borderColor: '#AFB9B5',
        fontFamily: 'Inter',
        borderRadius: '10px', 
        borderWidth: '3px',
        boxShadow: 'none', // Remove default blue shadow
        '&:hover': {
            borderColor: '#8A9C96', // Change border color on hover
        },
    }),
    menu: (provided) => ({
        ...provided,       // Default styles
        width: '200px'    
    }),
    option: (provided, state) => ({
        ...provided,
        fontFamily: 'Inter', // Apply Inter font to all options
        backgroundColor: state.isFocused ? '#AFB9B5' : 'white', // Change background color on hover
        color: '#332727',
        cursor: 'pointer', // Change cursor to pointer on hover
        textAlign: 'center'
    }),
    placeholder: (provided) => ({
        ...provided,
        fontFamily: 'Inter', // Apply Inter font to placeholder text
        textAlign: 'center'
    }),
    singleValue: (provided) => ({
        ...provided,
        fontFamily: 'Inter', // Apply Inter font to single value text
        color: '#332727'
    }),
};

// Define variants for Framer Motion
const headerVariant = {
    hidden: { opacity: 0, fontSize: '20px' },
    visible: { opacity: 1, fontSize: '35px'}
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start from below and hidden
    visible: { opacity: 1, y: 0 } // End at original position
};


export default function MyProgram() {

    const [selectedOption, setSelectedOption] = useState<any>(null); // State for the selected day
    const [daysOfProgram, setDaysOfProgram] = useState<{ [key: string]: boolean }>({ // State for array of bools corresponding to days of the week
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      });

    // Handle change in selected option
    const handleChange = (selected: any) => {
        setSelectedOption(selected);
    };

    const handleAddDay = () => {
        // Check if selectedOption is not null or undefined
        if (selectedOption && selectedOption.label) {
          const dayName = selectedOption.label; // Get the name of the selected day
      
          setDaysOfProgram(prevDaysOfProgram => ({
            ...prevDaysOfProgram,
            [dayName]: true // Set the corresponding day to true
          }));
        } 
        else {
          console.log('No valid day selected');
        }
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
                    <Menu></Menu>

                </motion.div>

                <motion.div
                    className="actions-pane"
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
                >

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
                    
                </motion.div>

                <motion.div
                    style={{ display: 'flex',  alignItems: 'center', justifyContent:'center', gap: '50px' }}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
                >

                    <Select options={options} 
                        styles={customStyles} 
                        onChange={handleChange} 
                        value={selectedOption} 
                        placeholder='Select a day' 
                        isSearchable={false}
                    />

                    <button
                        type="submit"
                        className='button'
                        style={{
                            marginTop: '0px', // Adjust the vertical position of the button to match that of Select component
                        }}
                        onClick={handleAddDay}
                    >
                            <FontAwesomeIcon icon={faCalendar} /> Add Day

                    </button>

                </motion.div>

            </div>

        </SimpleBar>

    );
}
