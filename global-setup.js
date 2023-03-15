// global-setup.js
//const { FullConfig, firefox } = require('@playwright/test');
const { firefox } = require('@playwright/test');
const { testConfig } = require('./Data/login_data');

/*const { test } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { testConfig } = require('../../Data/login_data');
import dotenv from "dotenv"*/

module.exports = async config => {
  const { baseURL, storageState } = config.projects[0].use;
  /* const context = await browser.newContext();
   const page = await context.newPage();
   const poManager = new POManager(page);
   const loginpage = poManager.getLoginPage();
   await loginpage.navigateToUrl(testConfig.url)
   const context = await browser.newContext();
     const page = await context.newPage();
   */
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto(baseURL);
  await page.getByRole('link', { name: ' Signup / Login' }).click();

  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('test_chetan@gmail.com');

  await page.getByPlaceholder('Password').fill('Test@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.context().storageState({ path: storageState });
  await browser.close();
};