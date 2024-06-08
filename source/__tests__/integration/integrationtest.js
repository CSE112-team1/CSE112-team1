
describe('Basic user flow for Website', () => {
  // Visit the web app
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/');
  });

  // Next user will generate a fortune 
  it('Generate a fortune', async () => {
    console.log('Generating a fortune...');
    // Select and click generate button
    const generateButton = await page.$('#generate-btn');
    await generateButton.click();

    // Select the text of the fortune
    const fortuneReading = await page.$('#meaning');

    const displayPropertyValue = await fortuneReading.getProperty('style');
    const displayValueHandle = await displayPropertyValue.getProperty('display');
    const displayValue = await displayValueHandle.jsonValue();

    // Expect the `display` property value to be "block"
    expect(displayValue).toBe('block');
  });

  // User will save the fortune
  it('Saving a fortune', async () => {
    console.log('Saving a fortune...');
    // Select and click save button
    const saveButton = await page.$('#save');
    await saveButton.click();

    // Get local storage
    const currentStorage = await page.evaluate(() => {
      return localStorage.getItem('readings');
    });

    // Expect local storage to not be empty
    expect(currentStorage !== '[]').toBe(true);
  });

  // User check history
  it('Checking History', async () => {
      console.log('Checking History...');
      // Select and click history button
      const buttons = await page.$$('a');
      console.log(buttons);
      const histButton = buttons[1];
      await histButton.click();

      // Select the most recent fortune to be displayed
      const histDisplayButton = await page.$('.history-item-btn-display');
      await histDisplayButton.click();

      // Expect fortune displayed to not be empty
      const meaning = await page.$('#meaning');
      let exists =false;
      let classList = await meaning.getProperty('classList');
      if(classList.length !== 0){
        exists = true;
      }
      expect(exists).toBe(true);
  });

  // User deletes fortune from history
  it('Deleting a fortune', async () => {
      console.log('Deleting a fortune...');
      // Select and click delete button
      const deleteButton = await page.$('.history-item-btn-delete');
      await deleteButton.click();

      // Get local storage
      const currentStorage = await page.evaluate(() => {
        return localStorage.getItem('readings');
      });

      // Expect local storage to be empty
      expect(currentStorage).toBe('[]');
  });

  // User returns to homepage
  it('Return to homepage', async () => {
     console.log('Returning to home...');
     // Select and click home button
     const homeButton = await page.$('#nav-btn-home');
     await homeButton.click();

     // Expect local storage to be empty
     const currentStorage = await page.evaluate(() => {
       return localStorage.getItem('readings');
     });

     // Expect local storage to be empty
     expect(currentStorage).toBe('[]');
  });

});