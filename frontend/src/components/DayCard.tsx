// External Libraries
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Internal Imports
import ExerciseCard from "./ExerciseCard";

// Styles
import "../styles/day.css";
import "../styles/exercise.css";

// Types
interface Exercise {
  name: string;
}

interface DayCardProps {
  dayOfWeek: string;
  onDeleteDay: (dayOfWeek: string) => void; // Callback to notify parent of state change
}

// Variants for animations
const listItemVariants = {
  hidden: { opacity: 0, height: 0, scaleY: 0 },
  visible: { opacity: 1, height: "auto", scaleY: 1 },
  exit: { opacity: 0, height: 0, scaleY: 0 },
};

// Define the Framer Motion layout transition for the DayCard list items
const layoutTransition = {
  type: "spring",
  stiffness: 200,
  damping: 50,
  mass: 2,
};

const DayCard: React.FC<DayCardProps> = ({ dayOfWeek, onDeleteDay }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]); // List of exercises
  const [inputText, setInputText] = useState(""); // Input text for add exercise form

  const handleAddExercise = () => {
    const newExercise = { name: inputText };
    setExercises((prevExercises) => [...prevExercises, newExercise]);
    setInputText("");
  };

  useEffect(() => {
    console.log(exercises); // Log the updated exercises list
  }, [exercises]); // Run every time exercises array changes

  const handleDeleteDay = () => {
    onDeleteDay(dayOfWeek);
  };

  const handleDeleteExercise = (name: string) => {
    const updatedExercises = exercises.filter(
      (exercise) => exercise.name !== name
    );
    setExercises(updatedExercises);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <div className="day-card-container">
        <div className="header-and-delete-button">
          <button
            className="button-base delete-day-button"
            onClick={handleDeleteDay}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>

          <h2 className="day-header">{dayOfWeek}</h2>
        </div>

        <motion.ul className="exercises-ul">
          <AnimatePresence>
            {exercises.map((exercise, index) => (
              <motion.li
                key={index}
                className="exercise-item"
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={layoutTransition}
              >
                <ExerciseCard
                  name={exercise.name}
                  onDeleteExercise={handleDeleteExercise}
                ></ExerciseCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="add-exercise-container">
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
        </div>
      </div>
    </div>
  );
};

export default DayCard;
