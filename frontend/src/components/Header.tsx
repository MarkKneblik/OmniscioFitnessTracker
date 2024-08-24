import { motion } from 'framer-motion';
import '../styles/header.css' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDumbbell, faRuler, faChartLine } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    title: string;
    icon: 'user' | 'dumbbell';
}

// Define variants for Framer Motion
const headerVariant = {
    hidden: { opacity: 0, fontSize: '20px' },
    visible: { opacity: 1, fontSize: '35px'}
};


const Header: React.FC<HeaderProps> = ({ title, icon }) => {

    // Map icon string to actual FontAwesomeIcon
    const iconMap = {
        user: faUser,
        dumbbell: faDumbbell,
    };

    const selectedIcon = iconMap[icon]; // Select appropriate icon


    return(

        <div className='header-wrapper'>
            <motion.h1
            className='header'
            variants={headerVariant}
            initial="hidden"
            animate="visible" 
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
            >
                <FontAwesomeIcon icon={selectedIcon} /> {title}
            </motion.h1>
        </div>

    );

};

export default Header;
