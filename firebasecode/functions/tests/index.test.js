const test = require("firebase-functions-test")({
  projectId: "cse-112-tarot-card-reader",
}, "/Users/torinfaes/Documents/firebaseapikeys/"+
"cse-112-tarot-card-reader-a8ae9eb5b78b.json");
const {before, after} = require("mocha");
// after firebase-functions-test has been initialized
describe("Cloud Functions", () => {
  let myFunctions;
  before(() => {
    myFunctions = require("../index.js");
  });
  after(() => {
    test.cleanup();
  });
  describe("genFortune", () => {
    it("should return a fortune", async () => {
      const wrapped = test.wrap(myFunctions.genFortune);
      const data = {card1: 1, card2: 2, card3: 3};
      const fortune = await wrapped(data);
      console.log(fortune);
    });
  });
});


