//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');



test('TC_01 Login User with correct email and password', async ({ page }) => {
    const expectedUserName = "Chetan Motghare"
    const productName = "Blue Top";
    const poManager = new POManager(page);
    const loginpage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();

    await loginpage.navigateToUrl("https://automationexercise.com/");
    await loginpage.validateLogin("test_chetan@gmail.com", "Test@1234", expectedUserName);
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkOut();


})

