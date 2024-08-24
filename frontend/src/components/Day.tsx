import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Styles
import '../styles/day.css';

// Types
interface Exercise {
  name: string;
}

interface DayProps {
  dayOfWeek: string;
  onDeleteDay: (dayOfWeek: string) => void; // Callback to notify parent of state change
}

const Day: React.FC<DayProps> = ({ dayOfWeek, onDeleteDay }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const handleAddExercise = () => {
    const newExercise = { name: `Exercise ${exercises.length + 1}` };
    setExercises([...exercises, newExercise]);
  };

  const handleDeleteDay = () => {
    setIsVisible(false);

    // Delay removal of the day to let the exit animation complete
    setTimeout(() => {
      onDeleteDay(dayOfWeek);
    }, 500); // Adjust timeout to match the exit animation duration
  };

  // Variants for Framer Motion
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
    exit: { x: '-100vw', opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="day-container"
          variants={bounceVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h2 className="day-header">{dayOfWeek}</motion.h2>

          <motion.button
            className="button-base delete-day-button"
            onClick={handleDeleteDay}
          >
            <FontAwesomeIcon icon={faTrash} /> Delete Day
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Day;
