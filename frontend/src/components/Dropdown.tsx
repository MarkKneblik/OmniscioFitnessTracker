import { fallDown as Menu } from 'react-burger-menu';
import { Spin as Hamburger } from 'hamburger-react'
import {useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome component
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'; // Import the barbell (dumbbell) icon
import '../styles/dropdown.css'


export default function Dropdown() {
    
    const [isOpen, setIsOpen] = useState(false);

    return (

        <div>
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
            
            <Menu width={'20%'} isOpen={isOpen} onStateChange={({ isOpen }) => setIsOpen(isOpen)} className='bm-overlay'>
                <Link to="/MyProgram" className="menu-item">My Program <FontAwesomeIcon icon={faDumbbell} /></Link>
                <Link to="/MyMeasurements" className="menu-item">My Measurements</Link>
                <Link to="/Trends" className="menu-item">My Trends</Link>
            </Menu>
        </div>

    );
}
