// External Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

// Types
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
  return (
    <div>
      <button
        className="button-base delete-exercise-button"
        onClick={() => handleDeleteSet()}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete Set
      </button>

      <button
        className="button-base delete-exercise-button"
        onClick={() => handleAddSet()}
      >
        <FontAwesomeIcon icon={faPlus} /> Add Set
      </button>
    </div>
  );
};

export default SetCard;
