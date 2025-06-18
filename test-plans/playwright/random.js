import { test } from '@playwright/test';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('Random pass/fail test after Salesforce login', async ({ page }) => {
  test.setTimeout(0);
  page.setDefaultTimeout(120000);
  await page.setViewportSize({ width: 1920, height: 958 });

  await page.goto('https://login.salesforce.com/');
  await page.click('div > form[name="login"] input[type="email"]');
  await delay(1000); // Slight delay to mimic human interaction

  const username = process.env.username;
  const password = process.env.password;

  await page.fill('div > form[name="login"] input[type="email"]', username);
  await page.click('div.gidr-promo-button-enabled > div input[type="password"]');
  await delay(300);
  await page.fill('div.gidr-promo-button-enabled > div input[type="password"]', password);
  await delay(500);
  await page.click('div.gidr-promo-button-enabled > div input[type="submit"]');

  await page.waitForLoadState('domcontentloaded');
  await delay(1000); // Post-login buffer

  // Generate random number
  const randomNumber = Math.floor(Math.random() * 100);
  console.log(`Generated random number: ${randomNumber}`);

  if (randomNumber % 2 === 0) {
    console.log('Even number, marking test as successful.');
    // Optionally perform any post-login validation or action
  } else {
    console.log('Odd number, marking test as failed.');
    throw new Error('Test failed due to odd random number.');
  }
});
