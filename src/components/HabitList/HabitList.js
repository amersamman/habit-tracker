// src/components/HabitList.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import HabitItem from '../HabitItem/HabitItem';

function HabitList({ user }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'habits'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const habitsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHabits(habitsData);
    });
    return unsubscribe;
  }, [user]);

  return (
    <div>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
}

export default HabitList;
