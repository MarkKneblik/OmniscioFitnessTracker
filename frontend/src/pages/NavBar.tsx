import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

interface NavBarProps {
  onMeasure: (width: number) => void; // Callback function prop to pass max width of links up to parent component
}

const NavBar: React.FC<NavBarProps> = ({ onMeasure }) => {

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]); // An empty array of Link refs. This will be used to find the 
                                                             // max width of all the Links, allowing the Drawer parent component
                                                             // to have dynamic width

  useEffect(() => {
    const widths = linkRefs.current
      .filter(ref => ref !== null)  // Filter out null values from the array of refs, resulting in array of Links
      .map(ref => (ref as HTMLAnchorElement).getBoundingClientRect().width); // Cast refs as Links (aka HTMLAnchorElements)
                                                                             // and get the width of these Links

    const maxWidth = Math.max(...widths); // Use spread operator to pass each width into Math.max(), obtaining the maxWidth
    onMeasure(maxWidth); // Pass the max width up to the parent
  }, [onMeasure]);
  

  return (

    <nav className='navbar'>
      <ul className="nav-list">
        <li>
          <Link ref={linkRef => linkRefs.current[0] = linkRef} to="/MyProgram">
            My Program <FontAwesomeIcon icon={faDumbbell} />
          </Link>
        </li>
        <li>
          <Link ref={linkRef => linkRefs.current[1] = linkRef} to="/MyMeasurements">
            My Measurements
          </Link>
        </li>
        <li>
          <Link ref={linkRef => linkRefs.current[2] = linkRef} to="/Trends">
            My Trends
          </Link>
        </li>
      </ul>
    </nav>

  );

};

export default NavBar;
