import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs

import SetCard from "./SetCard";
import "../styles/day.css";
import "../styles/exercise.css";

interface Set {
  id: string; // Use unique ID for sets
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
    const newSet = { id: uuidv4() }; // Use unique ID for sets
    setSets((prevSets) => [...prevSets, newSet]);
  };

  const handleDeleteSet = (setId: string) => {
    setSets((prevSets) => prevSets.filter((set) => set.id !== setId));
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

      {/* Render set components here if needed */}
      {sets.map((set) => (
        <SetCard
          key={set.id}
          index={set.id} // Use ID
          onDeleteSet={handleDeleteSet}
          onAddSet={handleAddSet}
        />
      ))}
      <button onClick={handleAddSet}>Add Set</button>
    </div>
  );
};

export default ExerciseCard;
