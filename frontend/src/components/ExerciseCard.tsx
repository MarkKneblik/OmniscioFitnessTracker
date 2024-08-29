// External Libraries
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs

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
    <div className="exercise-card-container">
      <button
        className="button-base delete-exercise-button"
        onClick={handleDeleteExercise}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete Exercise
      </button>

      {name}

      {/* Render set components here if there are any */}
      {sets.map(() => (
        <SetCard />
      ))}

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
    </div>
  );
};

export default ExerciseCard;
