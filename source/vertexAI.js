import { initializeApp } from 'firebase/app';
import {getVertexAI, getGenerativeModel } from 'firebase/vertexai-preview';

const firebaseConfig = {
    apiKey: 'AIzaSyAg-V91iKbuab9_xlFqMLFVIDmLmJ_5WrE',
    authDomain: 'cse-112-tarot-card-reader.firebaseapp.com',
    projectId: 'cse-112-tarot-card-reader',
    storageBucket: 'cse-112-tarot-card-reader.appspot.com',
    messagingSenderId: '610618527051',
    appId: '1:610618527051:web:b803c1458dd133bc6c6cce',
    measurementId: 'G-J13L8M0WRX'
};

const firebaseApp = initializeApp(firebaseConfig);

const vertexAI = getVertexAI(firebaseApp);
const model = getGenerativeModel(vertexAI, {model:'gemini-1.0-pro'});



export async function generateDailyFortune(card1, card2, card3) {
    const prompt = `Create a daily fortune based on these three tarot cards: ${card1}, ${card2}, ${card3}. Answer in 40 words or less.`;

    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = response.text();
    console.log(text);
    return text;
}

generateDailyFortune('Death', 'Wheel of Fortune', 'Justice');
