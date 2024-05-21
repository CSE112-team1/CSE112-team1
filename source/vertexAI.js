
import {drawCards, generateAIHandler} from './scripts.js';
import {model} from './firebaseInit.js';
import {getFunctions, httpsCallable} from 'firebase/functions';
import cards from './scripts.js';


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
    //Serialize the three cards based on their index in the cards array
    const cardindex1 = cards.indexOf(card1);
    const cardindex2 = cards.indexOf(card2);
    const cardindex3 = cards.indexOf(card3);

    //Check if the cards are valid
    if (cardindex1 === -1 || cardindex2 === -1 || cardindex3 === -1) {
        console.log('Invalid card');
        return;
    }

    //Call the cloud function to generate the fortune
    const functions = getFunctions();
    const genFortune = httpsCallable(functions, 'genFortune');
    return genFortune({cardindex1, cardindex2, cardindex3}).then(
        (result) => {
            result.data;
        }
    ).catch((error) => {
        console.log('Fortune generation failed, attempting direct ai response: ', error);
        const result = aiModel.generateContent(prompt);

        const response = result.response;
        const text = response.text();
        console.log(text);
        return text;
    });

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


