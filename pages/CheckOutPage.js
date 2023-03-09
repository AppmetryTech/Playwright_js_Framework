// @ts-check
const { test, expect } = require('@playwright/test');

class CheckOutPage {
    constructor(page) {
        this.page = page;
        this.addressDetail = page.locator("ul#address_delivery>li");
        this.placeOrder = page.locator("a.btn.btn-default");
    }

    async verifyAddress(expectedName, expectedMobNo) {
        const name = await this.addressDetail.nth(1).textContent();
        const mobileNumber = await this.addressDetail.nth(7).textContent();
        console.log("Name --> " + name + " Mobile No :--> " + mobileNumber)
        expect(name).toContain(expectedName);
        expect(mobileNumber).toContain(expectedMobNo);
    }

    async clickPlaceOrder() {
        await this.placeOrder.click()
    }



}
module.exports = { CheckOutPage };