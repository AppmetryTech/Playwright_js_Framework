
const { test } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { testConfig } = require('../../Data/login_data');
const { Orderdata } = require('../../Data/orderData')

// JSON -> String -> JS Object
//const credentials_login_dataSet = JSON.parse(JSON.stringify(require('../../Data/credentials_login.json')));



test.describe('Smoke Suit', () => {

    test('TC_01 Login User with correct email and password', async ({ page }) => {


        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        await loginpage.navigateToUrl(testConfig.url);
        await loginpage.validateLogin(testConfig.username, testConfig.password, Orderdata.expectedUserName);

    })

    test("TC_02 Logout", async ({ page }) => {
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();

        await loginpage.navigateToUrl(testConfig.url);
        await loginpage.validateLogin(testConfig.username, testConfig.password, Orderdata.expectedUserName);
        await loginpage.logOut();

    })

})