// @ts-check
const { test, expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("table#cart_info_table>tbody>tr").last();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("a.btn.btn-default.check_out");

    }

    getProductLocator(productName) {
        console.log(this.page.locator("h4:has-text('" + productName + "')"))
        return this.page.locator("h4:has-text('" + productName + "')");
    }

    async verifyProductIsDisplayed(productName) {

        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }

    async checkOut() {
        await this.checkout.click();
    }



}
module.exports = { CartPage };