const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');

test.describe("TC_VISUAL_Verify Logo", () => {



    test("VISUAL TEST", async ({ page }) => {

        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();

        await loginpage.navigateToUrl("https://automationexercise.com/");
        await loginpage.validateLogo();

    })
})