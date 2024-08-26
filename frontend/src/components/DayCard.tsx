// External Libraries
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import {motion, AnimatePresence } from 'framer-motion'

// Internal Imports
import ExerciseCard from './ExerciseCard';

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
  const [exercises, setExercises] = useState<Exercise[]>([]); // List of exercises

  const [inputText, setInputText] = useState(''); // Input text for add exercise form

  const handleAddExercise = () => {
    const newExercise = { name: inputText };
    setExercises([...exercises, newExercise]); // Add input text as new exercise to exercises array
    setInputText(''); // Clear input text after adding exercise
  };

  const handleDeleteDay = () => {
      onDeleteDay(dayOfWeek);
  };

  const handleDeleteExercise = (name: string) => {
    setExercises(exercises.filter((exercise) => exercise.name !== name)); // Filter out exercise that matches the given name
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
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

        <motion.ul className='exercises-ul'>
        {exercises.map((exercise, index) => (
              <motion.li key={index} className='exercise-item'>
                <button
                  className="button-base delete-exercise-button"
                  onClick={() => handleDeleteExercise(exercise.name)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>

                {exercise.name}
              </motion.li>
            ))}
        </motion.ul>

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
                value={inputText}
                placeholder="Enter exercise name"
                onChange={handleInputChange}
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
