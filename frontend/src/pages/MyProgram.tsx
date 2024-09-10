// External Libraries
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select, { StylesConfig } from "react-select";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Internal Imports
import Menu from "../components/Menu";
import DayCard from "../components/DayCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Configuration
import config from "../../config.json";

// Styles
import "../styles/button.css";
import "../styles/day.css";
import "../styles/container.css";
import "../styles/simplebar.css";

// Options for react-select dropdown
const options = [
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
  { value: "7", label: "Sunday" },
];

// Custom styles for react-select
const customStyles: StylesConfig<any, false> = {
  container: (provided) => ({
    ...provided,
    width: "160px",
  }),
  control: (provided) => ({
    ...provided,
    width: "160px",
    borderColor: `${config.colorPalette.blueGrey}`,
    fontFamily: "Inter",
    borderRadius: "10px",
    borderWidth: "3px",
    textAlign: "center",
    boxShadow: "none",
    "&:hover": {
      borderColor: `${config.colorPalette.darkBlueGrey}`,
    },
  }),
  menu: (provided) => ({
    ...provided,
    width: "160px",
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: "Inter",
    backgroundColor: state.isFocused
      ? `${config.colorPalette.blueGrey}`
      : "white",
    color: `${config.colorPalette.navy}`,
    cursor: "pointer",
    textAlign: "center",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontFamily: "Inter",
    textAlign: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: "Inter",
    color: `${config.colorPalette.navy}`,
  }),
};

// Variants for animations
const listItemVariants = {
  hidden: { opacity: 0, height: 0, scaleY: 0, marginTop: 0 },
  visible: { opacity: 1, height: "auto", scaleY: 1, marginTop: 10 }, // Add margin bottom parameter to prevent margin collapse
  exit: { opacity: 0, height: 0, scaleY: 0, marginTop: 0 },
};

const menuAndDaySelectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

// Define the Framer Motion layout transition for the DayCard list items
const layoutTransition = {
  type: "spring",
  stiffness: 300, // Adjusted stiffness for smoother transitions
  damping: 25, // Adjusted damping for smoother transitions
  mass: 2,
};

// Define the Framer Motion transition for the menu Cheeseburger and Add Day button and dropdown
const menuAndDaySelectionTransition = {
  delay: 0.5,
  duration: 1,
  ease: "easeInOut",
};

export default function MyProgram() {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [daysOfProgram, setDaysOfProgram] = useState<{
    [key: string]: boolean;
  }>({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (selected: any) => {
    setSelectedOption(selected);
  };

  const handleAddDay = async () => {
    if (selectedOption && selectedOption.label) {
      const dayOfWeek = selectedOption.label;

      setDaysOfProgram((prevDaysOfProgram) => ({
        ...prevDaysOfProgram,
        [dayOfWeek]: true,
      }));

      // Create the request body object matching the AddMyProgramDataRequestModel on the backend
      const requestBody = {
        Type: "Day", // Specify the type of data being saved as "Day"
        DayOfWeek: dayOfWeek, // The day of the week that the user just added to their program on the frontend
        Exercise: null,
        Set: null,
      };

      try {
        await axios.post(
          `${config.apiURL}/MyProgram/AddMyProgramDataAsync`,
          requestBody, // Pass the request body
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      } catch (error: any) {
        console.error("Error posting days of program: ", error.message);
      }
    } else {
      console.log("No valid day selected");
    }
  };

  const handleDeleteDay = (dayOfWeek: string) => {
    setDaysOfProgram((prevDaysOfProgram) => ({
      ...prevDaysOfProgram,
      [dayOfWeek]: false,
    }));
  };

  return (
    <SimpleBar
      style={{
        height: "100vh",
        width: "100%",
      }}
      className="simplebar.css"
    >
      <div>
        <motion.div
          variants={menuAndDaySelectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={menuAndDaySelectionTransition}
        >
          <Menu />
        </motion.div>
      </div>

      <div className="page-container">
        <Header title="My Program" icon="dumbbell" />

        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
            marginTop: "100px",
          }}
          variants={menuAndDaySelectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={menuAndDaySelectionTransition}
        >
          <Select
            options={options}
            styles={customStyles}
            onChange={handleChange}
            value={selectedOption}
            placeholder="Select a day"
            isSearchable={false}
          />

          <button
            type="submit"
            className="button-base default-button"
            style={{ marginTop: "0px" }}
            onClick={handleAddDay}
          >
            <FontAwesomeIcon icon={faCalendar} /> Add Day
          </button>
        </motion.div>

        <motion.ul
          className="day-ul"
          variants={menuAndDaySelectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={layoutTransition}
        >
          <AnimatePresence>
            {daysOfWeek.map(
              (day) =>
                daysOfProgram[day] && (
                  <motion.li
                    key={day}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    transition={layoutTransition}
                  >
                    <DayCard dayOfWeek={day} onDeleteDay={handleDeleteDay} />
                  </motion.li>
                )
            )}
          </AnimatePresence>
        </motion.ul>
      </div>
    </SimpleBar>
  );
}
