// global-setup.js
const { firefox, chromium } = require('@playwright/test');
//import dotenv from "dotenv"
import path from "path";




module.exports = async config => {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();


  try {
    await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto(baseURL);
    await page.getByRole('link', { name: ' Signup / Login' }).click();

    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('test_chetan@gmail.com');
    await page.getByPlaceholder('Password').fill('Test@1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await context.storageState({ path: storageState });
    await context.tracing.stop({
      path: './test-results/setup-trace.zip',
    })
    await browser.close();
  } catch (error) {
    await context.tracing.stop({
      path: './test-results/failed-setup-trace.zip',
    });
    await browser.close();
    throw error;
  }

};