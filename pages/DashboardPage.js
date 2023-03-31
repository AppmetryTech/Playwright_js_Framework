// @ts-check
class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator("//div[@class='features_items']//div[@class='productinfo text-center']");
        this.viewCart = page.locator("//u[text()='View Cart']");
    }
    async searchProduct(productName) {
        const count = await this.products.count();
        console.log("No of Product -->" + count);
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("//p").textContent() === productName) {
                console.log(await this.products.nth(i).locator("//p").textContent())
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