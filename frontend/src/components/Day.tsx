import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/day.css'; // Ensure this path is correct

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

  const headerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div>
      <motion.h2
        className='day-header'
        variants={headerVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
      >
        {dayOfWeek}
      </motion.h2>

      <ul className="day-ul">
        {exercises.map((exercise, index) => (
          <li key={index} className="day-li">{exercise.name}</li>
        ))}
      </ul>

      <button onClick={handleAddExercise}>Add Exercise</button>
    </div>
  );
};

export default Day;
