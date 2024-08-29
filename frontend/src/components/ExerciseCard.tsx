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
  index: number;
}

interface ExerciseCardProps {
  id: string; // Use ID instead of index
  name: string;
  onDeleteExercise: (id: string) => void; // Callback to notify parent of state change
}

const listItemVariants = {
  hidden: { opacity: 0, height: 0, scaleY: 0 },
  visible: { opacity: 1, height: "auto", scaleY: 1 },
  exit: { opacity: 0, height: 0, scaleY: 0 },
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
    onDeleteExercise(id); // Pass ID for deletion
  };

  const handleAddSet = () => {
    const newSet = { index: sets.length }; // Use unique ID for sets
    setSets((prevSets) => [...prevSets, newSet]);
  };

  const handleDeleteSet = () => {
    setSets((prevSets) =>
      prevSets.filter((set) => set.index !== sets.length - 1)
    );
  };

  return (
    <div>
      <div className="exercise-card-header">
        {" "}
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
          {" "}
          <FontAwesomeIcon icon={faPlus} /> Add Set
        </button>

        <button
          className="button-base delete-set-button"
          onClick={handleDeleteSet}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete Set
        </button>

        <motion.ul className="set-ul">
          {/* Render set components here if there are any */}
          <AnimatePresence>
            {sets.map(() => (
              <motion.li
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
      </div>
    </div>
  );
};

export default ExerciseCard;
