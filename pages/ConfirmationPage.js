// @ts-check
const { test, expect } = require('@playwright/test');

class ConfimationPage {
    constructor(page) {
        this.page = page;
        this.confirmationMessage = page.locator("//h2[@class='title text-center']/following-sibling::p[1]");
        this.downloadInvoice = page.locator("a.btn.btn-default.check_out");
        this.continue = page.locator("a[data-qa='continue-button']")

    }

    async verifyOrderConfirmation(ConfirmTextMsg) {
        const confirmText = await this.confirmationMessage.textContent();
        expect(confirmText).toContain(ConfirmTextMsg)
    }
    async clickContinue() {
        await this.continue.click()

    }


}
module.exports = { ConfimationPage };