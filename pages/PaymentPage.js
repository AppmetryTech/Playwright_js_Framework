// @ts-check
const { expect } = require('@playwright/test');
class PaymentPage {
    constructor(page) {
        this.page = page;
        this.EnterName = page.locator("input[name='name_on_card']");
        this.EnterCardNumber = page.locator("input[name='card_number']");
        this.EnterCVC = page.locator("input[name='cvc']");
        this.EnterExpiry = page.locator("input.form-control.card-expiry-month");
        this.EnterYear = page.locator("input[name='expiry_year']");
        this.payBtn = page.locator("button.form-control.btn");
    }
    async enterPaymentDetail(NameOnCard, CardNumber, CVC, ExpiryMonth, Year) {
        await this.EnterName.fill(NameOnCard);
        await this.EnterCardNumber.fill(CardNumber)
        await this.EnterCVC.fill(CVC);
        await this.EnterExpiry.fill(ExpiryMonth)
        await this.EnterYear.fill(Year)
    }
    async clickOnPlaceOrder() {
        expect(await this.payBtn.isVisible()).toBeTruthy();
        await this.payBtn.click();
    }
}
module.exports = { PaymentPage };