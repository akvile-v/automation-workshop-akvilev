const { test, expect } = require('@playwright/test');
const { HomeworkStartPage } = require('../homework-pages/homework-start-page');

const num1 = Math.floor(Math.random() * 50) + 1;
const num2 = Math.floor(Math.random() * 50) + 1;
const buildSelector = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
buildSelector.forEach(calculatorBuild => {
  test.describe('', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      startPage = new HomeworkStartPage(page);

    });
    test.beforeEach(async () => {
      await startPage.goto(calculatorBuild);
    });

    const formFields = ['#calcForm', '#number1Field', '#number2Field', '#selectOperationDropdown',
      '#calculateButton', '#numberAnswerField', '#integerSelect', '#clearButton'];
    formFields.forEach(field => {
      test.only(`Testing if calculator build ${calculatorBuild} is loading with ${field} field`, async () => {
        const calculatorForm = await page.isVisible(field);
        expect(calculatorForm).toBe(true);
      });
    });

    const calculations = ['0', '1', '2', '3', '4'];
    calculations.forEach(calc => {
      let expectedValue = num1 + num2;
      let calcName = "Add";
      switch (calc) {
        case '1':
          expectedValue = num1 - num2;
          calcName = "Substract";
          break;
        case '2':
          expectedValue = num1 * num2;
          calcName = "Multiply";
          break;
        case '3':
          expectedValue = num1 / num2;
          calcName = "Divide";
          break;
        case '4':
          expectedValue = num1.toString() + num2.toString();
          calcName = "Concatenate";
      }
      test.only(`Testing calculator build ${calculatorBuild} ${calc}-${calcName} calculations`, async () => {
        await startPage.simpleCalculation(num1.toString(), num2.toString(), calc);
        const answerFieldResults = await page.inputValue(startPage.answerField);
        expect(answerFieldResults).toBe(expectedValue.toString());
      });
    })

    test.only(`Testing calculator build ${calculatorBuild} division by 0`, async () => {
      let num = Math.floor(Math.random() * 50) + 1;
      await startPage.simpleCalculation(num.toString(), '0', '3');
      const errorMessage = await page.isVisible('#errorMsgField');
      expect(errorMessage).toBe(true);
    });

    test.only(`Testing if integer checkmark works in calculator build ${calculatorBuild}`, async () => {
      await startPage.simpleCalculation('10', '3', '3');
      await page.click('#integerSelect');
      const expectedValue = Math.trunc(10 / 3);
      const answerFieldResults = await page.inputValue(startPage.answerField);
      expect(answerFieldResults).toBe(expectedValue.toString());
    });

    test.only(`Testing if clear button works in calculator build ${calculatorBuild}`, async () => {
      await startPage.simpleCalculation(num1.toString(), num2.toString(), '0');
      await page.click('#clearButton');
      const answerFieldResults = await page.inputValue(startPage.answerField);
      expect(answerFieldResults).toBe("");
    });

  });
});

/*test('Testing calculations with negative numbers', async ({page}) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator')
    await page.fill('#number1Field', '-100');
    await page.fill('#number2Field', '-123');
    const DropdownObjects = ['0', '1', '2', '3', '4'];
    let ExpectedValue = (-100) + (-123);
    for (let i = 0; i < 5; i++) {
      await page.selectOption('select#selectOperationDropdown', DropdownObjects[i]);
      await page.click('#calculateButton');
      const AnswerFieldResults = await page.inputValue('#numberAnswerField');
      if (DropdownObjects[i] == '1'){ ExpectedValue = (-100) - (-123);}
        else if (DropdownObjects[i] == '2') { ExpectedValue = (-100) * (-123);}
          else if (DropdownObjects[i] == '3') { ExpectedValue = (-100) / (-123);}
            else if (DropdownObjects[i] == '4'){  ExpectedValue = '-100-123';}
      expect(AnswerFieldResults).toBe("" + ExpectedValue + "");
    }
  });
test('Test for testing', async ({page}) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator')
    //await page.click('#selectBuild');
    await page.selectOption('select#selectBuild', '1');
    await page.fill('#number1Field', '5');
    await page.fill('#number2Field', '7');
    await page.selectOption('select#selectOperationDropdown', '1');
    await page.click('#calculateButton');
      const AnswerFieldResults = await page.inputValue('#numberAnswerField');
      const ExpectedValue = 5-7;
      expect(AnswerFieldResults).toBe("" + ExpectedValue + "");
    }); */