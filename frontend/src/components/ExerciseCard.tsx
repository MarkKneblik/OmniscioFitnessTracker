// External Libraries
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// Internal Imports
import SetCard from "./SetCard";

// Styles
import "../styles/day.css";
import "../styles/exercise.css";

// Types
interface Set {
  index: number;
}

interface ExerciseCardProps {
  index: number;
  name: string;
  onDeleteExercise: (index: number) => void; // Callback to notify parent of state change
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  index,
  name,
  onDeleteExercise,
}) => {
  const [sets, setSets] = useState<Set[]>([]); // List of exercises

  const handleDeleteExercise = () => {
    onDeleteExercise(index);
  };

  const updateSets = sets.filter((set) => set.index !== index);
  setSets(updateSets);

  const handleAddSet = (index: number) => {
    const newSet = { index: index };
    setSets((prevSets) => [...prevSets, newSet]);
  };

  const handleDeleteSet = (index: number) => {
    const updatedSets = sets.filter((set) => set.index !== index);
    setSets(updateSets);
  };

  return (
    <div>
      <button
        className="button-base delete-exercise-button"
        onClick={() => handleDeleteExercise()}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {name}
    </div>
  );
};

export default ExerciseCard;
