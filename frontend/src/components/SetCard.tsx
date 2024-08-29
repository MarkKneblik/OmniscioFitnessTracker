//External Libraries
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

// Styles
import "../styles/set.css";

interface SetCardProps {}

const SetCard: React.FC<SetCardProps> = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <form className="set-form">
        <label htmlFor="exercise-name">
          <input
            id="exercise-name"
            type="text"
            value={inputText}
            placeholder="Enter weight/reps/sets"
            onChange={handleInputChange}
          />
        </label>
      </form>
    </div>
  );
};

export default SetCard;
