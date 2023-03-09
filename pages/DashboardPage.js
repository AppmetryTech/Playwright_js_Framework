// @ts-check
const { expect } = require('@playwright/test');

class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator("//div[@class='features_items']//div[@class='productinfo text-center']");
        //this.productsText = this.products.locator("//div[@class='productinfo text-center']//p");
        this.viewCart = page.locator("//u[text()='View Cart']");



    }

    async searchProduct(productName) {
        const titles = await this.products.allTextContents();
        // console.log(titles);
        const count = await this.products.count();
        console.log("No of Product -->" + count);
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("//p").textContent() === productName) {
                console.log(await this.products.nth(i).locator("//p").textContent())
                //add to cart
                await this.page.waitForLoadState()
                await this.products.nth(i).locator("//a").click()

                break;
            }
        }

    }

    async navigateToCart() {
        await this.viewCart.click();
    }


}

module.exports = { DashboardPage }