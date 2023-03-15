// @ts-check
const { test } = require('@playwright/test');
const { chromium } = require('@playwright/test');
//const { testConfig } = require('./Data/login_data');
let webContext;

test('test', async ({page}) => {
   /* const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://automationexercise.com/");
    await page.locator("//a[contains(text(),'Signup / Login')]").click();
    await page.locator("input[data-qa='login-email']").fill(testConfig.username);
    await page.locator("input[type='password']").fill(testConfig.password);*/
   /* webContext = await browser.newContext({ storageState: 'state.json' });
    const page = await webContext.newPage();
    await page.goto('https://automationexercise.com/');*/
    // You are signed in!
    await page.goto('/');
});