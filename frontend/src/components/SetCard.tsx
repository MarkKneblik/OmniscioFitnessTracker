//External Libraries
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface SetCardProps {
  index: number;
  onDeleteSet: (index: number) => void; // Callback to notify parent of state change
  onAddSet: (index: number) => void; // Callback to notify parent of state change
}

const SetCard: React.FC<SetCardProps> = ({ index, onDeleteSet, onAddSet }) => {
  const handleDeleteSet = () => {
    onDeleteSet(index);
  };

  const handleAddSet = () => {
    onAddSet(index);
  };
  const setNum = 0;

  return (
    <div>
      <div>{setNum}</div>
    </div>
  );
};

export default SetCard;
