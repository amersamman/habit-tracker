import React, {useState, useEffect} from 'react';
import HabitForm from './components/HabitForm/HabitForm';
import HabitList from './components/HabitList/HabitList';
import ProgressChart from './components/ProgressChart/ProgressChart';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import './App.css';

function App() {

  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      history: [],
    };
    setHabits([...habits, newHabit]);
  };

  const removeHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const [user, setUser] = useState(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    });
  };


  if (!user) {
    return (
      <div className="auth-container">
        <SignIn />
        <SignUp />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <HabitForm addHabit={addHabit} user={user}/>
      <HabitList habits={habits} removeHabit={removeHabit} user={user}/>
      <ProgressChart habits={habits} user={user}/>
      <button onClick={handleSignOut} className='sign-out'>Sign Out</button>
    </div>
  );
}

export default App;
