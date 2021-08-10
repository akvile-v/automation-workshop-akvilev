const { test, expect } = require('@playwright/test');

test('Testing if calculator is loading with all fields', async ({page}) => {
  await page.goto('https://testsheepnz.github.io/BasicCalculator')
    const fields = ['#calcForm', '#number1Field', '#number2Field', '#selectOperationDropdown', 
    '#calculateButton', '#numberAnswerField', '#integerSelect', '#clearButton'];
     for (let i = 0; i < fields.length; i++) {
      const calculatorForm = await page.isVisible(fields[i]);
      expect(calculatorForm).toBe(true);
    }
  });