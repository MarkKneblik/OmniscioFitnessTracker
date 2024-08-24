// External Libraries
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Styles
import '../styles/day.css';

// Types
interface Exercise {
  name: string;
}

interface DayProps {
  dayOfWeek: string;
}

const Day: React.FC<DayProps> = ({ dayOfWeek }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const handleAddExercise = () => {
    const newExercise = { name: `Exercise ${exercises.length + 1}` };
    setExercises([...exercises, newExercise]);
  };

  const bounceVariants = {
    hidden: { x: '100vw', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
        mass: 3
      }
    },
    exit: { x: '100vw', opacity: 0 }
  };

  return (
    <div>
      <AnimatePresence>
        <motion.h2
          className="day-header"
          variants={bounceVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
        >
          {dayOfWeek}
        </motion.h2>
      </AnimatePresence>

      <ul className="day-ul">
        {exercises.map((exercise, index) => (
          <li key={index} className="day-li">
            {exercise.name}
          </li>
        ))}
      </ul>

      <AnimatePresence>
        <motion.button
          onClick={handleAddExercise}
          variants={bounceVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
        >
          Add Exercise
        </motion.button>
      </AnimatePresence>
    </div>
  );
};

export default Day;
