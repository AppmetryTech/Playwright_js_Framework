const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { CheckOutPage } = require('./CheckOutPage');
const { PaymentPage } = require('./PaymentPage');
const { ConfimationPage } = require('./ConfirmationPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartpage = new CartPage(this.page);
        this.CheckOutPage = new CheckOutPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.confirmationPage = new ConfimationPage(this.page)



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

    getConfirmationPage() {
        return this.confirmationPage;
    }


}
module.exports = { POManager };