// @ts-check
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { Orderdata } = require('../../Data/orderData');
const { testConfig } = require('../../Data/login_data');

// JSON -> String -> JS Object
const multiProductdata = JSON.parse(JSON.stringify(require('../../Data/multi_products.json')));



test.describe('@e2e Verify Purchase Order', () => {

    for (const data of multiProductdata) {

        test(`TC_03 Add ${data.productName} Product to Cart`, async ({ page }) => {


            const poManager = new POManager(page);
            const loginpage = poManager.getLoginPage();
            const dashboardPage = poManager.getDashboardPage();
            const cartPage = poManager.getCartPage();

            // await loginpage.navigateToUrl(testConfig.url);
            await page.goto('/');
            await loginpage.adsBlocker();
            await dashboardPage.searchProduct(data.productName);
            await dashboardPage.navigateToCart();
            await cartPage.verifyProductIsDisplayed(data.productName);
            await loginpage.waitForSomeTime(2);
        })
    }

    test("@e2e TC_04 PlaceOrder", async ({ page }) => {

        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkoutpage = poManager.getCheckOutPage();
        const paymentpage = poManager.getPaymentPage();
        const confirmationpage = poManager.getConfirmationPage();

        //await loginpage.navigateToUrl(testConfig.url);
        await page.goto('/');
        await loginpage.waitForSomeTime(2);
        /* await page.route("**/ /*", (request) => {
             request.request().url().startsWith("https://googleads.")
                 ? request.abort()
                 : request.continue();
             return;
         });*/
       // await loginpage.adblocker();
        await dashboardPage.searchProduct(Orderdata.productName);
        await dashboardPage.navigateToCart();
        await cartPage.verifyProductIsDisplayed(Orderdata.productName);
        await cartPage.checkOut();
        await checkoutpage.verifyAddress(Orderdata.ordererName, Orderdata.mobileNumber);
        await checkoutpage.clickPlaceOrder();
        await paymentpage.enterPaymentDetail(Orderdata.nameOnCard, Orderdata.cardNumber, Orderdata.cvc, Orderdata.expiryMonth, Orderdata.expiryYear);
        await paymentpage.clickOnPlaceOrder();
        await confirmationpage.verifyOrderConfirmation(Orderdata.confirmationMessage)
        await loginpage.waitForSomeTime(2);

    })
})