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
  index: number; // Use index instead of id
}

interface ExerciseCardProps {
  id: string; // Use string ID for the exercise card itself
  name: string;
  onDeleteExercise: (id: string) => void;
}

const listItemVariants = {
  hidden: { opacity: 0, scaleX: 0, scaleY: 0 },
  visible: { opacity: 1, scaleX: 1, scaleY: 1 },
  exit: { opacity: 0, scaleX: 0, scaleY: 0 },
};

const layoutTransition = {
  type: "spring",
  stiffness: 200,
  damping: 50,
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
    <div>
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

        <motion.ul className="set-ul" layout>
          {/* Render set components here if there are any */}
          <AnimatePresence>
            {sets.map((set) => (
              <motion.li
                key={set.index} // Use the random number as the key (index)
                layout
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={layoutTransition}
              >
                <SetCard />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
};

export default ExerciseCard;
