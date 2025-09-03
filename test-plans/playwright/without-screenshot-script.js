import { test } from '@playwright/test';

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
  
test('Salesforce Recording - Error Test Without Screenshot', async ({
    page,
}) => {
    test.setTimeout(120000)
    await page.setViewportSize({ width: 1792, height: 974 });
    
    // This will cause an immediate failure before any screenshot can be taken
    await page.goto('https://invalid-nonexistent-domain-12345.com');
    
    // Alternative error scenarios (comment out the above and try these):
    
    // Option 1: Try to click on non-existent element
    // await page.goto('https://sdb30.perf2t.pc-rnd.pc-aws.salesforce.com');
    // await page.click('this-element-does-not-exist', { timeout: 5000 });
    
    // Option 2: Fill a field that doesn't exist
    // await page.goto('https://sdb30.perf2t.pc-rnd.pc-aws.salesforce.com');
    // await page.fill('input[id="nonexistent-field"]', 'test');
    
    // Option 3: Wait for URL that will never match
    // await page.goto('https://sdb30.perf2t.pc-rnd.pc-aws.salesforce.com');
    // await page.waitForURL('https://this-will-never-match.com', { timeout: 10000 });

    // The rest of your script (will never be reached due to the error above)
    const username = process.env.username;
    const password = process.env.password;

    await page.click('div > form[name="login"] input[type="email"]');
    await page.fill('div > form[name="login"] input[type="email"]', username);
    // ... rest of your original script
});
