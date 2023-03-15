// @ts-check
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { testConfig } = require('../../Data/login_data');
const { Orderdata } = require('../../Data/orderData');

//const { testConfig } = require('./Data/login_data');

/*test.beforeAll(async ({ browser }) => {
    await page.goto('/');
})*/

test.describe('Test Case 6: Contact Us Form', () => {
    let poManager;
    let contactFormPage;

    test('Verify ContactUs Button on HomePage', async ({ page }) => {
        await page.goto('/');
        poManager = new POManager(page);
        contactFormPage = poManager.getContacFormPage();
        contactFormPage.verifyContactFormBtn();
    });

    test('Validate the ContactUs Form', async ({ page }) => {
        await page.goto('/');
        await page.route("**/*", (request) => {
            request.request().url().startsWith("https://googleads.g.doubleclick.net")
                ? request.abort()
                : request.continue();
            return;
        });
        //   await page.route("**", (request) => {*/
        /*     console.log(request.request().url())
             request.continue();
             return;
           });*/
        poManager = new POManager(page);
        contactFormPage = poManager.getContacFormPage();
        await contactFormPage.clickContactFormBtn();
        await contactFormPage.fillContactUsForm("Chetan", "test@gmail.com", "test", "test body", "Upload_Files/test_practice_logo.png");

        await contactFormPage.clickSubmitButton();
        await contactFormPage.validateSucessMessage("Success! Your details have been submitted successfully.");
        await contactFormPage.clickHomeBtn();

    });



})