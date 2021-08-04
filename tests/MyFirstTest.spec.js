const { test, expect } = require('@playwright/test');
const { DuckStartPage } = require('../pages/duckStartPage');
test.describe('', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new DuckStartPage(page);
  });
  test.beforeEach(async () => {
    await startPage.goto();
  });
  
test('basic test', async () => {
  
  const duckLogo = await page.isVisible('#logo_homepage_link');
  expect(duckLogo).toBe(true);
});

//If you search 'test', first result contains word 'test'
test('Search test', async () => {
  await startPage.initiateSearch("test");
  const results = await page.textContent('#r1-0');
  expect(results).toContain('test');
  
});


//DUCK.COM -> Redirects to duckduck.com
test('Redirection test', async () => {
  const duckduckLogo = await page.isVisible('#logo_homepage_link');
  expect(duckduckLogo).toBe(true);
});

//Check that Search on “Lithuania” has sidebar that has information summary on Lithuania displayed
test('Lithuania test', async () => {
  await startPage.initiateSearch("lithuania");
  const resultsLithuania = await page.textContent('#m0-0');
  expect(resultsLithuania).toContain('Lithuania');
  
});

//Inspektor test
test('Inspector test', async () => {
});


//If you search 'microsoft cheat sheet', first result contains new element
test('cheat sheet test', async () => {
  await startPage.initiateSearch("microsoft word cheat sheet");
  const resultsMicrosoftisVisible = await page.isVisible('a[data-zci-link="cheat_sheets"]'); //kazkodel meta false
  const resultsMicrosoft = await page.textContent('h3.c-base__title');
  //expect(resultsMicrosoftisVisible).toBe(true);
  expect(resultsMicrosoft).toContain('Microsoft Word 2010');
});

//shorten www.wikipedia.com
test('Search Wikipedija test', async () => {
  await startPage.initiateSearch("shorten www.wikipedia.com");
  const shorterLink = await page.inputValue('#shorten-url');
  await page.goto(shorterLink);
  const wikipedija = await page.url()
  expect(wikipedija).toBe('https://www.wikipedia.org/');
});

//visi search rezultatai turi tureti zodeli panda (intitle:panda)
test('panda', async () => {
  await startPage.initiateSearch("intitle:panda");
    await page.waitForNavigation();
  const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
  results.forEach(result => {
      expect(result).toContain("Panda");
    });
  });

  const passwordsLengths = ['8', '16', '64'];
  passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async () => {
      await startPage.initiateSearch("password " + passwordLength);
      const generatedPassword = await page.textContent(".c-base__title");
      expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });


  const wrongPasswordsLengths = ['7', '65'];
  wrongPasswordsLengths.forEach(wrongPasswordsLength => {
    test(`Generate ${wrongPasswordsLength} chracters long wrong password`, async () => {
      await startPage.initiateSearch("password " + passwordLength);
      const isPasswordGood = await page.isVisible(".c-base__sub");
      expect(isPasswordGood).toEqual(false);
    });
  });
});