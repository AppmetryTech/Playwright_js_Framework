// @ts-check
const { test } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { Orderdata } = require('../../Data/orderData');
const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright')
const multiProductdata = JSON.parse(JSON.stringify(require('../../Data/multi_products.json'))); // JSON -> String -> JS Object

test.describe('@e2e Scenario:-> Verify Purchase Order', () => {
    for (const data of multiProductdata) {
        test(`TC_01 Add ${data.productName} Product to Cart`, async ({ page }) => {
            const poManager = new POManager(page);
            const loginpage = poManager.getLoginPage();
            const dashboardPage = poManager.getDashboardPage();
            const cartPage = poManager.getCartPage();

            await page.goto('/');
            await loginpage.adsBlocker();
            await dashboardPage.searchProduct(data.productName);
            await dashboardPage.navigateToCart();
            await cartPage.verifyProductIsDisplayed(data.productName);
            await loginpage.waitForSomeTime(2);
        })
    }

    test.only("TC_02 Validate PlaceOrder", async ({ page }) => {
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkoutpage = poManager.getCheckOutPage();
        const paymentpage = poManager.getPaymentPage();
        const confirmationpage = poManager.getConfirmationPage();
        PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInPage(page);
        })
        await page.goto('/');
        await loginpage.waitForSomeTime(2);
        await dashboardPage.searchProduct(Orderdata.productName);
        await dashboardPage.navigateToCart();
        await cartPage.verifyProductIsDisplayed(Orderdata.productName);
        await cartPage.checkOut();
        await loginpage.waitForSomeTime(2);
        await checkoutpage.verifyAddress(Orderdata.ordererName, Orderdata.mobileNumber);
        await checkoutpage.clickPlaceOrder();
        await paymentpage.enterPaymentDetail(Orderdata.nameOnCard, Orderdata.cardNumber, Orderdata.cvc, Orderdata.expiryMonth, Orderdata.expiryYear);
        await paymentpage.clickOnPlaceOrder();
        await confirmationpage.verifyOrderConfirmation(Orderdata.confirmationMessage)
        await loginpage.waitForSomeTime(2);

    })
})