// @ts-check
const { expect } = require('@playwright/test');

class ContactFormPage {

    constructor(page) {
        this.page = page;
        this.ContactUsBtn = page.locator("//a[contains(text(),'Contact us')]");
        this.Heading = page.getByRole('heading', { name: 'Get In Touch' });
        this.EnterName = page.getByPlaceholder('Name');
        this.EnterEmail = page.getByPlaceholder('Email', { exact: true });
        this.EnterSubject = page.locator("input[data-qa='subject']");
        this.EnterMessage = page.locator("textarea.form-control");
        this.ClickUploadFileBtn = page.locator('input[name="upload_file"]');
        this.SubmitBtn = page.locator("//input[@value='Submit']");
        this.SucessMessage = page.locator('div.status.alert');
        this.HomeBtn = page.locator("//span[text()=' Home']");
    }

    async verifyContactFormBtn() {
        expect(await this.ContactUsBtn).toBeVisible();
        console.log(await this.ContactUsBtn.textContent())
    }

    async clickContactFormBtn() {
        await this.ContactUsBtn.click();
    }

    async clickSubmitButton() {
        await this.page.on('dialog', dialog => dialog.accept());
        await this.SubmitBtn.click()
    }

    async fillContactUsForm(name, email, subject, messageBody, filePath) {
        await this.EnterName.fill(name);
        await this.EnterEmail.fill(email);
        await this.EnterSubject.fill(subject);
        await this.EnterMessage.fill(messageBody);
        await this.ClickUploadFileBtn.setInputFiles(filePath)

    }

    async validateSucessMessage(exp_sucess_message) {
        const sucessMesssage = await this.SucessMessage.textContent();
        console.log(sucessMesssage);
        expect(sucessMesssage).toBe(exp_sucess_message)
    }

    async clickHomeBtn() {
        await this.HomeBtn.click();
        const url = await this.page.url();
        console.log(url)
        //expect(url).toHaveURL("https://automationexercise.com/")
    }


}
module.exports = { ContactFormPage }