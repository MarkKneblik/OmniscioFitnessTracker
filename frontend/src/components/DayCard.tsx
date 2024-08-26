// External Libraries
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

// Styles
import '../styles/day.css';
import '../styles/exercise.css';

// Types
interface Exercise {
  name: string;
}

interface DayCardProps {
  dayOfWeek: string;
  onDeleteDay: (dayOfWeek: string) => void; // Callback to notify parent of state change
}

const DayCard: React.FC<DayCardProps> = ({ dayOfWeek, onDeleteDay }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const handleAddExercise = () => {
    const newExercise = { name: `Exercise ${exercises.length + 1}` };
    setExercises([...exercises, newExercise]);
  };

  const handleDeleteDay = () => {
      onDeleteDay(dayOfWeek);
  };

  return (
    <div>
      <div className='day-container'>
        <div className="header-and-button">
          <button
            className="button-base delete-day-button"
            onClick={handleDeleteDay}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          
          <h2 className="day-header">{dayOfWeek}</h2>
        </div>

        <div className='add-exercise-container'>
          <button
            className="button-base add-exercise-button"
            onClick={handleAddExercise}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Exercise
          </button>

          <form className='add-exercise-form'>
            <label htmlFor="exercise-name">
              <input 
                id="exercise-name" 
                type="text" 
                placeholder="Enter exercise name"
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};


export default DayCard;
