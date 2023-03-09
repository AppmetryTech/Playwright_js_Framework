//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');



test('TC_01 Login User with correct email and password', async ({ page }) => {
    const expectedUserName = "Chetan Motghare"
    const poManager = new POManager(page);
    const loginpage = poManager.getLoginPage();

    await loginpage.navigateToUrl("https://automationexercise.com/");
    await loginpage.validateLogin("test_chetan@gmail.com", "Test@1234", expectedUserName);
})

