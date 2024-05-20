// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA7wAhdHvKUOrv8ixnX2lxkr5cZu_8kYrw",
    authDomain: "schedule-54f48.firebaseapp.com",
    databaseURL: "https://schedule-54f48-default-rtdb.firebaseio.com",
    projectId: "schedule-54f48",
    storageBucket: "schedule-54f48.appspot.com",
    messagingSenderId: "216400301512",
    appId: "1:216400301512:web:0efe5075a36dcfbd81c4fd"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
