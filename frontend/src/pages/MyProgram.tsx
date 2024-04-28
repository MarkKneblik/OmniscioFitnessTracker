import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import '../styles/myprogram.css' //import navbar styling

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome component
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'; // Import the barbell (dumbbell) icon

export default function MyProgram() {


    return (
        <motion.h1 className='header'
        initial={{ opacity: 0, x: '-10w' }}
        animate={{ opacity: 1, x: '0vw'}}
        transition={{ duration: 1, ease: 'linear' }}
        >
        Customize Your Program
        </motion.h1>

    );
}
