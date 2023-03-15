// @ts-check
const { test } = require('@playwright/test');
const { chromium } = require('@playwright/test');
//const { testConfig } = require('./Data/login_data');


test('test', async ({ page }) => {

    await page.goto('/');
});