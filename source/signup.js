// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'cse-112-tarot-card-reader.firebaseapp.com',
  projectId: 'cse-112-tarot-card-reader',
  storageBucket: 'cse-112-tarot-card-reader.appspot.com',
  messagingSenderId: '610618527051',
  appId: '1:610618527051:web:b803c1458dd133bc6c6cce',
  measurementId: 'G-J13L8M0WRX'
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//register button
const register = document.getElementById('signup-button');
register.addEventListener('click', function (event) {
  event.preventDefault();

  //inputs
  const email = document.getElementById('login').value;
  const password = document.getElementById('password').value;

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      // const user = userCredential.user;
      console.log('User created:', userCredential.user);
      alert('Creating Account...');
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(error.code, error.message);
      // ..
    });
});