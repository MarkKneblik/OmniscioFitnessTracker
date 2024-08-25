// External Libraries
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

// Styles
import '../styles/day.css';

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
        <div className="list-of-days-container">
          <div className='day-container'>
            <button
              className="button-base delete-day-button"
              onClick={handleDeleteDay}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>

            <button
              className="button-base add-exercise-button"
              onClick={handleDeleteDay}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Exercise
            </button>

            <h2 className="day-header">{dayOfWeek}</h2>
          </div>
        </div>
  );
};

export default DayCard;
