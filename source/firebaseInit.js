import { getApps, getApp, initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {getVertexAI, getGenerativeModel } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-vertexai-preview.js';
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
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig): getApp();

// Initialize AI model
const vertexAI = getVertexAI(firebaseApp);
export const model = getGenerativeModel(vertexAI, {model:'gemini-1.0-pro'});

export default firebaseApp;
