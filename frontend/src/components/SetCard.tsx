//External Libraries
import React, { useState } from "react";

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
            placeholder="Enter weight and/or reps"
            onChange={handleInputChange}
          />
        </label>
      </form>
    </div>
  );
};

export default SetCard;
