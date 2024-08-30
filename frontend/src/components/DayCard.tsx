// External Libraries
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs

// Internal Imports
import ExerciseCard from "./ExerciseCard";

// Styles
import "../styles/day.css";
import "../styles/exercise.css";

interface Exercise {
  name: string;
  id: string; // Use unique ID
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

  const handleAddExercise = () => {
    const newExercise = { name: inputText, id: uuidv4() }; // Use unique ID
    setExercises((prevExercises) => [...prevExercises, newExercise]);
    setInputText("");
  };

  const handleDeleteExercise = (id: string) => {
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

      <motion.ul
        className="exercises-ul"
        layout // Apply layout prop here for layout animations
      >
        <AnimatePresence>
          {exercises.map((exercise) => (
            <motion.li
              key={exercise.id} // Use ID as key
              className="exercise-item"
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
