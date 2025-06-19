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

  const fiveMins = 300000;
  await delay(fiveMins);
  // Generate random number between 1 and 9 for 10s to 90s delay
  const delayMultiplier = Math.floor(Math.random() * 9) + 1;
  const delayInMs = delayMultiplier * 10 * 1000;

  console.log(`Delaying for ${delayInMs / 1000} seconds...`);
  await delay(delayInMs);

  // Use a second random number for pass/fail logic
  const randomOutcome = Math.floor(Math.random() * 100);
  console.log(`Generated random number for pass/fail: ${randomOutcome}`);

  if (randomOutcome % 2 === 0) {
    console.log('Even number, marking test as successful.');
    // Optionally perform any post-login validation or action
  } else {
    console.log('Odd number, marking test as failed.');
    throw new Error('Test failed due to odd random number.');
  }
});
