// @ts-check
const { expect } = require('@playwright/test');

class ProductsPage {

    constructor(page, request) {
        this.page = page;
        this.request = request;
        // this.ClickOnProducts = page.getByRole('link', { name: ' Products' });
        this.ClickOnProducts = page.getByText("Products");
        this.products = page.locator("//div[@id='cartModal']/following-sibling::div");
        this.saleBanner = page.locator("#sale_image");
        this.productName = page.locator("//div[@class='productinfo text-center']//p")
        this.viewProduct = page.locator("//div[@class='choose']//a")
        this.adsClose = page.locator("//div[@class='ns-vwpk1-e-5 close-button']");
        this.dressName = page.locator("//div[@class='product-information']//h2");
        this.price = page.locator("//div[@class='product-information']//span");
        this.brandName = page.locator("//b[text()='Brand:']");
    }

    async navigateToProductsPage() {
        await this.page.goto("https://automationexercise.com/products");


    }

    async validateSaleBanner() {
        await this.saleBanner.waitFor();

        expect(await this.saleBanner.screenshot()).toMatchSnapshot('VisualTestData/sale_banner.jpg');

    }

    async validateProductCount() {
        const allproducts = await this.products.count();
        console.log("Number Of Present --> " + allproducts)
        expect(allproducts).toBe(34)
    }

    async validateData(apiData) {
        const productCount = await this.productName.count();
        console.log("ProductCount --> " + productCount)

        for (let i = 0; i < productCount; i++) {
            const apiItem = await apiData.products[i].name;
            const rowText = await this.productName.nth(i).textContent();
            // console.log(" **UI TEXT --> " + rowText + " **API TEXT --> " + apiItem)
            console.log(`--UI TEXT-- ${rowText}  --API TEXT--  ${apiItem}`)
            expect(rowText).toBe(apiItem);
        }
    }

    async clickOnViewProduct(ProductName) {

        const count = await this.productName.count();
        console.log(`view product count ${await this.viewProduct.count()}`)
        console.log("No of Product -->" + count);
        for (let i = 0; i < count; ++i) {
            if (await this.productName.nth(i).textContent() === ProductName) {
                //  console.log(await this.products.nth(i).locator("//p").textContent())
                //add to cart
                await this.page.waitForLoadState()
                await this.viewProduct.nth(i).click();
                await this.page.goto('https://automationexercise.com/product_details/' + i)
                break;
            }
        }
    }

    async validateProductDetail() {
        const productName = await this.dressName.textContent();
        const price = await this.price.nth(1).textContent();
        const brandName = await this.brandName.textContent();
        console.log(`productName ${productName} price ${price} brandName ${brandName}`)
    }

}

module.exports = { ProductsPage }