// External Libraries
import { useState } from 'react';
import { motion } from 'framer-motion';
import Select, { StylesConfig } from 'react-select';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import config from "../../config.json";

// Internal Imports
import Menu from '../components/Menu'; 
import Day from '../components/Day';
import Header from '../components/Header';

// Styles
import '../styles/header.css';
import '../styles/button.css';
import '../styles/day.css';


// react-select dropdown options
const options = [
    { value: '1', label: 'Monday' },
    { value: '2', label: 'Tuesday' },
    { value: '3', label: 'Wednesday' },
    { value: '4', label: 'Thursday' },
    { value: '5', label: 'Friday' },
    { value: '6', label: 'Saturday' },
    { value: '7', label: 'Sunday' }
];

//  Custom styles for react-select
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
        textAlign: 'center',
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

    // For use when mapping list items to days of the week below
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

    const handleDeleteDay = (dayName:string) => {
        setDaysOfProgram(prevDaysOfProgram => ({
            ...prevDaysOfProgram,
            [dayName]: false // Set the corresponding day to false
            }));
    };


    return (

        <SimpleBar style={{ height: '100vh', width: '100%' }}>

            <div>

                <Header title='My Program' icon='dumbbell'></Header>

                <motion.div
                    variants={itemVariants} // Apply variants to the Menu component
                    initial="hidden" 
                    animate="visible" 
                    transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }} 
                >
                    <Menu></Menu>
                </motion.div>


                <motion.div
                    style={{ display: 'flex',  alignItems: 'center', justifyContent:'center', gap: '30px', marginTop: '100px' }}
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
                        className='button-base default-button'
                        style={{
                            marginTop: '0px', // Adjust the vertical position of the button to match that of Select component
                        }}
                        onClick={handleAddDay}
                    >
                            <FontAwesomeIcon icon={faCalendar} /> Add Day
                    </button>
                </motion.div>


                <motion.div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
                >
                    {/* Conditionally render list of days of the week */ }
                    <ul className='day-ul'>
                        {daysOfWeek.map((day) => (
                            <li className='day-li'>
                                {daysOfProgram[day] && <Day dayOfWeek={day} />}
                                {daysOfProgram[day] && (
                                    <button
                                        className='button-base delete-day-button'
                                        onClick={() => handleDeleteDay(day)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> Delete Day
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                
            </div>

        </SimpleBar>
    );
}
