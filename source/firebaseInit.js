import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';

// Firebase config info
const firebaseConfig = {
    apiKey: 'AIzaSyAg-V91iKbuab9_xlFqMLFVIDmLmJ_5WrE', //eslint-disable-line
    authDomain: 'cse-112-tarot-card-reader.firebaseapp.com',
    projectId: 'cse-112-tarot-card-reader',
    storageBucket: 'cse-112-tarot-card-reader.appspot.com',
    messagingSenderId: '610618527051',
    appId: '1:610618527051:web:b803c1458dd133bc6c6cce',
    measurementId: 'G-J13L8M0WRX'
};

// Initializes Firebase App
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;