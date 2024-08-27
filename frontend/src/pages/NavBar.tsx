import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
  onMeasureWidth: (width: number) => void; // Callback function prop to pass max width of links up to parent component
}

const NavBar: React.FC<NavBarProps> = ({ onMeasureWidth }) => {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]); // An empty array of Link refs. This will be used to find the
  // max width of all the Links, allowing the Drawer parent component
  // to have dynamic width

  useEffect(() => {
    const widths = linkRefs.current
      .filter((ref) => ref !== null) // Filter out null values from the array of refs, resulting in array of Links
      .map((ref) => (ref as HTMLAnchorElement).getBoundingClientRect().width); // Cast refs as Links (aka HTMLAnchorElements)
    // and get the width of these Links

    const maxWidth = Math.max(...widths); // Use spread operator to pass each width into Math.max(), obtaining the maxWidth
    onMeasureWidth(maxWidth); // Pass the max width up to the parent via callback
  }, [onMeasureWidth]); // Only call UseEffect when component mounts

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link
            ref={(linkRef) => (linkRefs.current[0] = linkRef)}
            to="/MyProgram"
          >
            {/* Assign reference to this Link to linkRefs array*/}
            <FontAwesomeIcon icon={faDumbbell} /> My Program
          </Link>
        </li>
        <li>
          <Link
            ref={(linkRef) => (linkRefs.current[1] = linkRef)}
            to="/MyMeasurements"
          >
            <FontAwesomeIcon icon={faRuler} /> My Measurements
          </Link>
        </li>
        <li>
          <Link
            ref={(linkRef) => (linkRefs.current[2] = linkRef)}
            to="/MyTrends"
          >
            <FontAwesomeIcon icon={faChartLine} /> My Trends
          </Link>
        </li>
        <li>
          <Link
            ref={(linkRef) => (linkRefs.current[3] = linkRef)}
            to="/MyAccount"
          >
            <FontAwesomeIcon icon={faUser} /> My Account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
