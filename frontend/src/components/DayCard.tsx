// External Libraries
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Internal Imports
import ExerciseCard from "./ExerciseCard";

// Configuration
import config from "../../config.json";

// Styles
import "../styles/day.css";
import "../styles/exercise.css";

interface Exercise {
  name: string;
  id: number;
}

interface DayCardProps {
  dayOfWeek: string;
  onDeleteDay: (dayOfWeek: string) => void; // Callback to notify parent of state change
}

// Variants for animations
const listItemVariants = {
  hidden: { opacity: 0, height: 0, scaleY: 0, marginBottom: 0 },
  visible: { opacity: 1, height: "auto", scaleY: 1, marginBottom: 20 }, // Add margin bottom parameter to prevent margin collapse
  exit: { opacity: 0, height: 0, scaleY: 0, marginBottom: 0 },
};

// Layout transition settings
const layoutTransition = {
  type: "spring",
  stiffness: 300, // Adjust stiffness for smoother transitions
  damping: 25, // Adjust damping for smoother transitions
  mass: 2,
};

const DayCard: React.FC<DayCardProps> = ({ dayOfWeek, onDeleteDay }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [inputText, setInputText] = useState("");

  const handleAddExercise = async () => {
    let newExercise = { name: inputText, id: 0 }; // Use unique ID
    setExercises((prevExercises) => [...prevExercises, newExercise]);
    setInputText("");

    // Create the request body object matching the AddMyProgramDataRequestModel on the backend
    const requestBody = {
      Type: "Exercise", // Specify the type of data being saved as "Exercise"
      DayOfWeek: dayOfWeek,
      Exercise: newExercise.name,
      Set: null,
    };

    try {
      const response = await axios.post(
        `${config.apiURL}/MyProgram/AddMyProgramDataAsync`,
        requestBody, // Pass the request body
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const exerciseId = response.data.exerciseId; // Get the exerciseId from the response

      // Update the state by finding and updating the newly added exercise
      setExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.name === newExercise.name && exercise.id === 0
            ? { ...exercise, id: exerciseId } // Update the id of the newly added exercise
            : exercise
        )
      );
    } catch (error: any) {
      console.error("Error posting days of program: ", error.message);
    }
  };

  const handleDeleteExercise = (id: number) => {
    setExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id)
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <motion.div
      className="day-card-container"
      layout // Apply layout prop here for layout animations
    >
      <div className="header-and-delete-button">
        <button
          className="button-base delete-day-button"
          onClick={() => onDeleteDay(dayOfWeek)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>

        <h2 className="day-header">{dayOfWeek}</h2>
      </div>

      <motion.div className="add-exercise-container" layout>
        <button
          className="button-base add-exercise-button"
          onClick={handleAddExercise}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Exercise
        </button>

        <form className="add-exercise-form">
          <label htmlFor="exercise-name">
            <input
              id="exercise-name"
              type="text"
              value={inputText}
              placeholder="Enter exercise name"
              onChange={handleInputChange}
            />
          </label>
        </form>
      </motion.div>

      <motion.ul className="exercises-ul">
        <AnimatePresence>
          {exercises.map((exercise) => (
            <motion.li
              key={exercise.id} // Use ID as key
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={layoutTransition} // Ensure transition is set
              layout // Apply layout prop here for layout animations
            >
              <ExerciseCard
                id={exercise.id} // Pass unique ID
                name={exercise.name}
                onDeleteExercise={handleDeleteExercise}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
};

export default DayCard;
