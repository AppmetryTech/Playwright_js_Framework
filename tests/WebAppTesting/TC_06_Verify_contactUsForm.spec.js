// @ts-check
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { ContactForm } = require('../../Data/ContactForm');

//const { testConfig } = require('./Data/login_data');

/*test.beforeAll(async ({ browser }) => {
    await page.goto('/');
})*/
test.describe.configure({ mode: 'serial' });
test.describe('@smoke Test Case 6: Contact Us Form', () => {
    let poManager;
    let contactFormPage;

    test('Verify ContactUs Button on HomePage', async ({ page }) => {
        await page.goto('/');
        poManager = new POManager(page);
        contactFormPage = poManager.getContacFormPage();
        contactFormPage.verifyContactFormBtn();
    });

    //to block ads 
    test('Validate the ContactUs Form', async ({ page }) => {
        await page.goto('/');
        await page.route("**/*", (request) => {
            request.request().url().startsWith("https://googleads.g.doubleclick.net")
                ? request.abort()
                : request.continue();
            return;
        });

        poManager = new POManager(page);
        contactFormPage = poManager.getContacFormPage();
        await contactFormPage.clickContactFormBtn();
        await contactFormPage.fillContactUsForm(ContactForm.Name, ContactForm.Email, ContactForm.Subject, ContactForm.MessageBody, ContactForm.filePath);
        await contactFormPage.clickSubmitButton();
        await contactFormPage.validateSucessMessage(ContactForm.successMessage);
        await contactFormPage.clickHomeBtn();

    });



})