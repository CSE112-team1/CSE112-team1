
import {drawCards, generateAIHandler} from './scripts.js';
import {model} from './firebaseInit.js';

const aiModel = model;

const genButton = document.getElementById('daily-generate-btn');

/**
 * Provides and AI-generated fortune for the day based on three randomly selected tarot cards.
 * @param card1 First randomly generated card
 * @param card2 Second randomly generated card
 * @param card3 Third randomly generated card
 * @returns {Promise<*>} String that contains AI-generated daily fortune
 */
async function generateDailyFortune(card1, card2, card3) {
    const prompt = `Create a fortune for the day based on these three tarot cards: ${card1}, ${card2}, ${card3}. Answer in 50 to 60 words.`;

    const result = await aiModel.generateContent(prompt);

    const response = result.response;
    const text = response.text();
    console.log(text);
    return text;
}

/**
 * Event Listener for 'daily-generate-btn'. Populates the daily login section with required content
 */
genButton.addEventListener('click', function(event)  {
    event.preventDefault();

    let drawnCards = drawCards();
    generateDailyFortune(drawnCards[0], drawnCards[1], drawnCards[2])
        .then((text) => {
            generateAIHandler(text,drawnCards);
        })
        .catch((error) => {
            console.log(error.code, error.message);
            console.log('Failure');
        });
});


