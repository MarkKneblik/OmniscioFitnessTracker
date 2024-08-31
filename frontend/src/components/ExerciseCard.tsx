// External Libraries
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Internal Imports
import SetCard from "./SetCard";

// Styles
import "../styles/day.css";
import "../styles/exercise.css";

interface Set {
  index: number; // Use index for unique identification
}

interface ExerciseCardProps {
  id: string; // Use string ID for the exercise card itself
  name: string;
  onDeleteExercise: (id: string) => void;
}

// Variants for animations
const listItemVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: { opacity: 1, scaleY: 1 },
  exit: { opacity: 0, scaleY: 0 },
};

// Layout transition settings
const layoutTransition = {
  type: "spring",
  stiffness: 300, // Adjust stiffness for smoother transitions
  damping: 25, // Adjust damping for smoother transitions
  mass: 2,
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  id,
  name,
  onDeleteExercise,
}) => {
  const [sets, setSets] = useState<Set[]>([]);

  const handleDeleteExercise = () => {
    onDeleteExercise(id); // Pass the exercise ID for deletion
  };

  const handleAddSet = () => {
    const newSet = { index: Math.floor(Math.random() * 1000000) }; // Random number as index
    setSets((prevSets) => [...prevSets, newSet]);
  };

  const handleDeleteSet = (index: number) => {
    setSets((prevSets) => prevSets.filter((set) => set.index !== index));
  };

  return (
    <motion.div layout>
      <div className="exercise-card-header">
        {name}
        <button
          className="button-base delete-exercise-button"
          onClick={handleDeleteExercise}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div className="exercise-card-container">
        <button className="button-base add-set-button" onClick={handleAddSet}>
          <FontAwesomeIcon icon={faPlus} /> Add Set
        </button>

        <button
          className="button-base delete-set-button"
          onClick={() =>
            sets.length > 0 && handleDeleteSet(sets[sets.length - 1].index)
          }
        >
          <FontAwesomeIcon icon={faTrash} /> Delete Set
        </button>

        <motion.div>
          <motion.ul className="set-ul">
            <AnimatePresence>
              {sets.map((set) => (
                <motion.li
                  key={set.index}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={layoutTransition}
                  layout
                >
                  <SetCard />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExerciseCard;
