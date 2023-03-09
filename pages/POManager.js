const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { CheckOutPage } = require('./CheckOutPage');
const { PaymentPage } = require('./PaymentPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartpage = new CartPage(this.page);
        this.CheckOutPage = new CheckOutPage(this.page);
        this.paymentPage = new PaymentPage(this.page);



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


}
module.exports = { POManager };