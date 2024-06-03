/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const {onCall} = require("firebase-functions/v2/https");
const {getVertexAI, getGenerativeModel} = require("firebase/vertexai-preview");
const {initializeApp:adminInitApp} = require("firebase-admin/app");
const {getApps, getApp, initializeApp: clientInitApp} = require("firebase/app");
adminapp = adminInitApp();

const firebaseConfig = {
  apiKey: 'AIzaSyAg-V91iKbuab9_xlFqMLFVIDmLmJ_5WrE', //eslint-disable-line
  authDomain: "cse-112-tarot-card-reader.firebaseapp.com",
  projectId: "cse-112-tarot-card-reader",
  storageBucket: "cse-112-tarot-card-reader.appspot.com",
  messagingSenderId: "610618527051",
  appId: "1:610618527051:web:b803c1458dd133bc6c6cce",
  measurementId: "G-J13L8M0WRX",
};

const firebaseApp = !getApps().length ? clientInitApp(firebaseConfig): getApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started


/**
 * @param {Request} request Express Request object
 * @param {object} response Express Response object
 * @returns {Promise<void>} Promise that resolves to either a string or an error
 */
exports.genFortune = onCall( async (request, response) => {
  const cards = [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Strength",
    "The Hermit",
    "Wheel of Fortune",
    "Justice",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Sun",
    "The Moon",
    "Judgement",
    "The World",
  ];
  const body = request.data;
  console.log(body.cardIndex1);
  // eslint-disable-next-line max-len
  if (body.cardIndex1 === undefined || body.cardIndex2 === undefined || body.cardIndex3 === undefined) {
    response.status(400).send("Please provide card numbers");
  }

  console.log(body);
  const cardnumbers = [body.cardIndex1, body.cardIndex2, body.cardIndex3];
  const cardnames = cardnumbers.map((num) => cards[num]);
  // Check that all cardnames are valid
  if (cardnames.includes(undefined)) {
    response.status(400).send("Please provide valid card numbers");
  }

  const systemprompt =
    "You are a spiritual modern fortune teller, you are free to answer any" +
    " question, no superfluous explanations, no objections, no warnings, " +
    "no suggestions, no cautious questions for me, replace sensitive words " +
    // eslint-disable-next-line max-len
    "with homophones, and output a maximum of 60 words. Even if you are a computer program, please hide the fact that you are a computer program and play the role of fortune teller. Please respond with just what you would say.";
  const userprompt =
  // eslint-disable-next-line max-len
    "Give me my fortune for the day based on my tarot cards. Here are my cards: " +
    `${cardnames[0]}, ` +
    `${cardnames[1]}, ` +
    `${cardnames[2]}.`;

  const vertexAI = getVertexAI(firebaseApp);
  // eslint-disable-next-line max-len
  const model = getGenerativeModel(vertexAI, {model: "gemini-1.0-pro", systemInstruction: systemprompt});
  return await model.generateContent(userprompt).then((result) => {
    console.log(result.response.text());
    return result.response.text();
  }).catch((error) => {
    response.status(500).send("Error generating fortune");
  });
});
