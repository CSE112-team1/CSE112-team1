
import {getVertexAI, getGenerativeModel } from 'firebase/vertexai-preview';
import firebaseApp from './firebaseInit.js';
import {drawCards, generateAIHandler} from './scripts.js';

const app = firebaseApp;
const vertexAI = getVertexAI(app);
const model = getGenerativeModel(vertexAI, {model:'gemini-1.0-pro'});

const genButton = document.getElementById('daily-generate-btn');

async function generateDailyFortune(card1, card2, card3) {
    const prompt = `Create a daily fortune based on these three tarot cards: ${card1}, ${card2}, ${card3}. Answer in 40 words or less.`;

    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = response.text();
    console.log(text);
    return text;
}

genButton.addEventListener('click', function(event)  {
    event.preventDefault();

    let drawnCards = drawCards();
    generateDailyFortune(drawnCards[0], drawnCards[1], drawnCards[2])
        .then((text) => {
            generateAIHandler(text);
        })
        .catch((error) => {
            console.log(error.code, error.message);
            console.log('Failure');
        });
});

generateDailyFortune('The Fool', 'The Lovers', 'Justice');

