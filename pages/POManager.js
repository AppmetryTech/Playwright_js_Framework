const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartpage = new CartPage(this.page);



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


}
module.exports = { POManager };