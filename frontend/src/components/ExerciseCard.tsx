// External Libraries
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
    <div>
      <button
        className="button-base delete-exercise-button"
        onClick={handleDeleteExercise}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {name}
      <button onClick={handleAddSet}>Add Set</button>
      <button onClick={handleDeleteSet}>Delete Set</button>

      {/* Render set components here if needed */}
      {sets.map((set) => (
        <SetCard
          index={set.index} // Use ID
          onDeleteSet={handleDeleteSet}
          onAddSet={handleAddSet}
        />
      ))}
    </div>
  );
};

export default ExerciseCard;
