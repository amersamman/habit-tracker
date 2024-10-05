// HabitItem.js
import React, { useState, useEffect } from 'react';
import './HabitItem.css'
import { db } from '../../firebase';
import { doc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';

function HabitItem({ habit }) {
  const [checkedIn, setCheckedIn] = useState(false);
  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

  useEffect(() => {
    setCheckedIn(habit.history.includes(today));
  }, [habit.history, today]);

  const handleCheckIn = async () => {
    if (!checkedIn) {
      const habitRef = doc(db, 'habits', habit.id);
      await updateDoc(habitRef, {
        history: arrayUnion(today),
      });
      setCheckedIn(true);
    }
  };

  const handleRemove = async () => {
    await deleteDoc(doc(db, 'habits', habit.id));
  };

  return (
    <div className="habit-item">
      <h3>{habit.name}</h3>
      <button onClick={handleCheckIn} disabled={checkedIn}>
        {checkedIn ? 'Checked In' : 'Check In'}
      </button>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}

export default HabitItem;
