
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDcs0MePJedAyn0siyPyW650WKd_nlPKdY",
    authDomain: "calendar-85687.firebaseapp.com",
    databaseURL: "https://calendar-85687-default-rtdb.firebaseio.com",
    projectId: "calendar-85687",
    storageBucket: "calendar-85687.appspot.com",
    messagingSenderId: "896213355790",
    appId: "1:896213355790:web:9e7b1c492825c26f9c5b5f",
    measurementId: "G-DDTZ92MNW9"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
