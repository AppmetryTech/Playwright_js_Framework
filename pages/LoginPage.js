// @ts-check
const { expect } = require('@playwright/test');
const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright')
import fetch from 'cross-fetch';
class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginbtn = page.locator("//a[contains(text(),'Signup / Login')]");
        this.emailField = page.locator("input[data-qa='login-email']");
        this.password = page.locator("input[type='password']");
        this.clickLogin = page.locator("button[data-qa='login-button']");
        this.loginUserName = page.locator("//ul[@class='nav navbar-nav']//b[1]");
        this.logoutbtn = page.getByRole('link', { name: ' Logout' });
        this.logo = page.locator("img[alt='Website for automation practice']");

    }
    async navigateToUrl(url) { await this.page.goto(url); }
    async validateLogin(username, password) {
        await this.loginbtn.click()
        await this.emailField.fill(username)
        await this.password.fill(password)
        await this.clickLogin.click()
        /* const actualUsername = await this.loginUserName.textContent()
         expect(actualUsername).toContain(userName)*/
    }

    async logOut() { await this.logoutbtn.click(); }

    async validateLogo() { expect(await this.logo.screenshot()).toMatchSnapshot('test_practice_logo.png'); }
    async waitForSomeTime(timeInSeconds) {
        console.log('Additional Wait for ' + timeInSeconds + ' seconds.');
        await new Promise(resolve => setTimeout(resolve, (timeInSeconds * 1000)));
    }

    async adsBlocker() {
        PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInPage(this.page);
        })

    }
}
module.exports = { LoginPage }
