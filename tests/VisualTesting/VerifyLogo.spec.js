const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { testConfig } = require('../../Data/login_data')

test.describe("TC_VISUAL_Verify Logo", () => {

    test("VISUAL TEST", async ({ page }) => {
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        await loginpage.navigateToUrl(testConfig.url);
        await loginpage.validateLogo();
    })
})