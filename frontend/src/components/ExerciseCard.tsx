// External Libraries
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// Styles
import "../styles/day.css";
import "../styles/exercise.css";

// Types
interface ExerciseCardProps {
  name: string;
  onDeleteExercise: (name: string) => void; // Callback to notify parent of state change
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  onDeleteExercise,
}) => {
  const handleDeleteExercise = () => {
    onDeleteExercise(name);
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
