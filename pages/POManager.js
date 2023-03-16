const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { CheckOutPage } = require('./CheckOutPage');
const { PaymentPage } = require('./PaymentPage');
const { ConfimationPage } = require('./ConfirmationPage');
const { ContactFormPage } = require('./ContactFormPage');
const { ProductsPage } = require('./ProductsPage');
const { ApiDataPage } = require('./API_Actions/ApiDataPage');

class POManager {
    constructor(page, request) {
        this.page = page;
        this.request = request;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartpage = new CartPage(this.page);
        this.CheckOutPage = new CheckOutPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.confirmationPage = new ConfimationPage(this.page)
        this.contactFormPage = new ContactFormPage(this.page)
        this.productsPage = new ProductsPage(this.page)
        this.apiDataPage = new ApiDataPage(this.request)

    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartpage;
    }

    getCheckOutPage() {
        return this.CheckOutPage;
    }

    getPaymentPage() {
        return this.paymentPage;
    }

    getContacFormPage() {
        return this.contactFormPage;
    }

    getConfirmationPage() {
        return this.confirmationPage;
    }

    getProductsPage() {
        return this.productsPage;
    }

    getAPIData() {
        return this.apiDataPage;
    }


}
module.exports = { POManager };