import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select, { StylesConfig } from 'react-select';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

// Internal Imports
import Menu from '../components/Menu'; 
import DayCard from '../components/DayCard';
import Header from '../components/Header';

// Styles
import '../styles/header.css';
import '../styles/button.css';
import '../styles/daycard.css';

// Configuration for react-select dropdown
const options = [
    { value: '1', label: 'Monday' },
    { value: '2', label: 'Tuesday' },
    { value: '3', label: 'Wednesday' },
    { value: '4', label: 'Thursday' },
    { value: '5', label: 'Friday' },
    { value: '6', label: 'Saturday' },
    { value: '7', label: 'Sunday' }
];

// Custom styles for react-select
const customStyles: StylesConfig<any, false> = {
    container: (provided, state) => ({
        ...provided,
        width: '160px',
        borderColor: state.isFocused ? '#AFB9B5' : '#EBE2D4',
    }),
    control: (provided) => ({
        ...provided,
        width: '160px',
        borderColor: '#AFB9B5',
        fontFamily: 'Inter',
        borderRadius: '10px', 
        borderWidth: '3px',
        textAlign: 'center',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#8A9C96',
        },
    }),
    menu: (provided) => ({
        ...provided,
        width: '160px'    
    }),
    option: (provided, state) => ({
        ...provided,
        fontFamily: 'Inter',
        backgroundColor: state.isFocused ? '#AFB9B5' : 'white',
        color: '#332727',
        cursor: 'pointer',
        textAlign: 'center'
    }),
    placeholder: (provided) => ({
        ...provided,
        fontFamily: 'Inter',
        textAlign: 'center'
    }),
    singleValue: (provided) => ({
        ...provided,
        fontFamily: 'Inter',
        color: '#332727'
    }),
};

// Variants for animations
const itemVariants = {
    hidden: { opacity: 0, height: 0, scaleY: 0 },
    visible: { opacity: 1, height: 'auto', scaleY: 1 },
    exit: { opacity: 0, height: 0, scaleY: 0 }
};

// Define the layout transition once
const layoutTransition = { type: 'spring', stiffness: 300, damping: 25 };

export default function MyProgram() {
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [daysOfProgram, setDaysOfProgram] = useState<{ [key: string]: boolean }>({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleChange = (selected: any) => {
        setSelectedOption(selected);
    };

    const handleAddDay = () => {
        if (selectedOption && selectedOption.label) {
            const dayOfWeek = selectedOption.label;
            setDaysOfProgram(prevDaysOfProgram => ({
                ...prevDaysOfProgram,
                [dayOfWeek]: true 
            }));
        } else {
            console.log('No valid day selected');
        }
    };

    const handleDeleteDay = (dayOfWeek: string) => {
        setDaysOfProgram(prevDaysOfProgram => ({
            ...prevDaysOfProgram,
            [dayOfWeek]: false
        }));
    };

    return (
        <SimpleBar style={{ height: '100vh', width: '100%' }}>
            <div>
                <Header title='My Program' icon='dumbbell' />

                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={layoutTransition}
                >
                    <Menu />
                </motion.div>

                <motion.div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '30px',
                        marginTop: '100px'
                    }}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={layoutTransition}
                >
                    <Select
                        options={options}
                        styles={customStyles}
                        onChange={handleChange}
                        value={selectedOption}
                        placeholder='Select a day'
                        isSearchable={false}
                    />
                    <button
                        type="submit"
                        className='button-base default-button'
                        style={{ marginTop: '0px' }}
                        onClick={handleAddDay}
                    >
                        <FontAwesomeIcon icon={faCalendar} /> Add Day
                    </button>
                </motion.div>

                <motion.div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={layoutTransition}
                >
                    <AnimatePresence>
                        <motion.ul
                            className='day-ul'
                            layout
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={layoutTransition}
                        >
                            {daysOfWeek.map(day => (
                                daysOfProgram[day] && (
                                    <AnimatePresence>
                                    <motion.li
                                        className='day-li'
                                        key={day}
                                        layout
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={layoutTransition}
                                    >
                                        <DayCard
                                            dayOfWeek={day}
                                            onDeleteDay={handleDeleteDay}
                                        />
                                    </motion.li>
                                    </AnimatePresence>
                                )
                            ))}
                        </motion.ul>
                    </AnimatePresence>
                </motion.div>
            </div>
        </SimpleBar>
    );
}
