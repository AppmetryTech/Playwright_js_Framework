// @ts-check
const { test } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { testConfig } = require('../../Data/login_data');
const { Orderdata } = require('../../Data/orderData')

// JSON -> String -> JS Object
const multiProductdata = JSON.parse(JSON.stringify(require('../../Data/multi_products.json')));
let webContext;
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const loginpage = poManager.getLoginPage();
    await loginpage.navigateToUrl(testConfig.url)

    //to block google ads
    await page.route("**/ /*", (request) => {
        request.request().url().startsWith("https://googleads.")
            ? request.abort()
            : request.continue();
        return;
    });
    await loginpage.validateLogin(testConfig.username, testConfig.password, Orderdata.expectedUserName);
    // Store application stated in json file.
    await context.storageState({ path: 'state.json' });

    // Creating a webContext using this json file
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test.afterEach(async () => {
    await waitForSomeTime(2);

});

async function waitForSomeTime(timeInSeconds) {
    console.log('Additional Wait for ' + timeInSeconds + ' seconds.');
    await new Promise(resolve => setTimeout(resolve, (timeInSeconds * 1000)));
}

test.afterAll(async () => {
    console.log('Done with tests');
});

test.describe('Smoke Suit', () => {

    for (const data of multiProductdata) {

        test(`TC_03 Add ${data.productName} Product to Cart`, async () => {

            const page = await webContext.newPage();
            const poManager = new POManager(page);
            const loginpage = poManager.getLoginPage();
            const dashboardPage = poManager.getDashboardPage();
            const cartPage = poManager.getCartPage();

            await loginpage.navigateToUrl(testConfig.url);
            await dashboardPage.searchProduct(data.productName);
            await dashboardPage.navigateToCart();
            await cartPage.verifyProductIsDisplayed(data.productName);
        })
    }

    /* test("TC_04 PlaceOrder", async () => {
         const page = await webContext.newPage();
         const poManager = new POManager(page);
         const loginpage = poManager.getLoginPage();
         const dashboardPage = poManager.getDashboardPage();
         const cartPage = poManager.getCartPage();
         const checkoutpage = poManager.getCheckOutPage();
         const paymentpage = poManager.getPaymentPage();
         const confirmationpage = poManager.getConfirmationPage();
 
         await loginpage.navigateToUrl(testConfig.url);
         await waitForSomeTime(2);
         await page.route("**/ /*", (request) => {
        request.request().url().startsWith("https://googleads.")
            ? request.abort()
            : request.continue();
        return;
    });

    await dashboardPage.searchProduct(Orderdata.productName);
    await dashboardPage.navigateToCart();
    await cartPage.verifyProductIsDisplayed(Orderdata.productName);
    await cartPage.checkOut();
    await checkoutpage.verifyAddress(Orderdata.ordererName, Orderdata.mobileNumber);
    await checkoutpage.clickPlaceOrder();
    await paymentpage.enterPaymentDetail(Orderdata.nameOnCard, Orderdata.cardNumber, Orderdata.cvc, Orderdata.expiryMonth, Orderdata.expiryYear);
    await paymentpage.clickOnPlaceOrder();

    await confirmationpage.verifyOrderConfirmation(Orderdata.confirmationMessage)

})*/
})


