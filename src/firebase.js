import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDrw0ZE3_Yq1VhxTHOkDvuOx6nzI6m_lmQ",
    authDomain: "habit-tracker-673ab.firebaseapp.com",
    databaseURL: "https://habit-tracker-673ab-default-rtdb.firebaseio.com",
    projectId: "habit-tracker-673ab",
    storageBucket: "habit-tracker-673ab.appspot.com",
    messagingSenderId: "551616390320",
    appId: "1:551616390320:web:7b923588376fa5c4980775",
    measurementId: "G-7DCTV2EV8R"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

