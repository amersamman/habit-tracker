import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

function HabitForm({ user }) {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (habitName.trim()) {
      await addDoc(collection(db, 'habits'), {
        name: habitName.trim(),
        history: [],
        uid: user.uid,
      });
      setHabitName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Enter habit name"
        required
      />
      <button type="submit">Add Habit</button>
    </form>
  );
}

export default HabitForm;
