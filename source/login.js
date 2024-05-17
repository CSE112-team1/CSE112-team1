// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAg-V91iKbuab9_xlFqMLFVIDmLmJ_5WrE',
  authDomain: 'cse-112-tarot-card-reader.firebaseapp.com',
  projectId: 'cse-112-tarot-card-reader',
  storageBucket: 'cse-112-tarot-card-reader.appspot.com',
  messagingSenderId: '610618527051',
  appId: '1:610618527051:web:b803c1458dd133bc6c6cce',
  measurementId: 'G-J13L8M0WRX'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//sign-in button
const login = document.getElementById('login-button');
login.addEventListener('click', function(event){
  event.preventDefault();

  //inputs
  const email = document.getElementById('login').value;
  const password = document.getElementById('password').value;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    console.log('User created:', userCredential.user);
    alert('logged in successfully');
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
    console.log(error.code, error.message);
  });

});