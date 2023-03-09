//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');



test('TC_01 Login User with correct email and password', async ({ page }) => {
    const expectedUserName = "Chetan Motghare"
    const productName = "Blue Top";
    const ordererName = "Mr. Chetan Motghare";
    const mobileNumber = "23415154123";
    const nameOnCard = "Chetan";
    const cardNumber = "6787134156"
    const cvc = "908"
    const expiryMonth = "02"
    const expiryYear = "2029"

    const poManager = new POManager(page);
    const loginpage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutpage = poManager.getCheckOutPage();
    const paymentpage = poManager.getPaymentPage();

    await loginpage.navigateToUrl("https://automationexercise.com/");
    await loginpage.validateLogin("test_chetan@gmail.com", "Test@1234", expectedUserName);
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkOut();
    await checkoutpage.verifyAddress(ordererName, mobileNumber);
    await checkoutpage.clickPlaceOrder();
    await paymentpage.enterPaymentDetail(nameOnCard, cardNumber, cvc, expiryMonth, expiryYear);
    await paymentpage.clickOnPlaceOrder();



})

