// global-setup.js
const { firefox, chromium } = require('@playwright/test');
const { POManager } = require('./pages/POManager');
const { testConfig } = require('./Data/login_data');
const fs = require('fs-extra');

const folderPath = './my-allure-results';

module.exports = async config => {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginpage = poManager.getLoginPage();
  // Delete folder before each test run


  try {
    await loginpage.navigateToUrl(baseURL);
    await loginpage.validateLogin(testConfig.username, testConfig.password)
    await context.storageState({ path: storageState });
    await fs.rm(folderPath, { recursive: true, force: true });
   /* await context.tracing.stop({
      path: './test-results/setup-trace.zip',
    })*/

    await browser.close();
  } catch (error) {
    console.error(error.message);
    await context.tracing.stop({
      path: './test-results/failed-setup-trace.zip',

    });
    await browser.close();
    throw error;
  }
};