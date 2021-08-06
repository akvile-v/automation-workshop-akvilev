const { test, expect } = require('@playwright/test');

test('basic test', async ({page}) => {
  await page.goto('https://start.duckduckgo.com/')
    const duckLogo = await page.isVisible('#logo_homepage_link');
    expect(duckLogo).toBe(true);
  });