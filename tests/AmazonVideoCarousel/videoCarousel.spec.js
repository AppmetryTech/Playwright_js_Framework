const { test } = require('@playwright/test');



/*test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.goto("https://www.primevideo.com/");

    
})*/




test('amazon prime login', async ({ browser }) => {
    const context = await browser.newContext({ storageState: 'auth.json' });
    const page = await context.newPage();
    await page.goto('https://www.primevideo.com/');
    /* await page.getByRole('button', { name: 'Sign in to join Prime' }).click();
     await page.getByLabel('Email or mobile phone number').click();
     await page.getByLabel('Email or mobile phone number').fill('your mobile number');
     await page.getByLabel('Password').click();
     await page.getByLabel('Password').press('CapsLock');
     await page.getByLabel('Password').fill('S');
     await page.getByLabel('Password').press('CapsLock');
     await page.getByLabel('Password').fill('****** ');
     await page.getByLabel('Keep me signed in.\n          \n            \n              Details').check();
     await page.getByRole('button', { name: 'Sign in' }).click();
     await page.getByLabel('Don\'t require OTP on this browser').check();
     await page.getByLabel('Enter OTP:').click();
     await page.getByLabel('Enter OTP:').fill('333460');
     await page.getByRole('button', { name: 'Sign in' }).click();*/
    // Wait for carousel to load
    await page.waitForSelector('//ul[@class="_70Gje9 Jy2YJ6"]//li');

    // Get carousel items
    const items = await page.locator('//ul[@class="_70Gje9 Jy2YJ6"]//li');
    console.log("Items in Carousel --> " + await items.count());
    console.log(items)
    const carouselItems = await page.$$('//ul[@class="_70Gje9 Jy2YJ6"]//li//section//picture//img');
    page.pause()

    // wait for each live window to appear and extract the alt text
    const liveWindows = await page.$$('//ul[@class="jVpjZD qYc0AS"]//li');
    //const liveWindows = await page.$$(`//ul[@class="cIbiJK Dz+gPK"]//li`)
    const activeWindows = await page.locator(`//li[@class="cIbiJK Dz+gPK"]`)
    console.log(liveWindows.length)

    let currentDate = new Date();;
    let startTime;
    let endTime;
    
    for (let i = 0; i < liveWindows.length; i++) {
        await page.waitForSelector(`//li[@class="cIbiJK Dz+gPK"]`)
        const activeWindow = await activeWindows.getAttribute("data-testid")
        //console.log(activeWindow)
        if (activeWindow === "active-dot") {

            startTime = currentDate.getMilliseconds();
            console.log(await carouselItems[i].getAttribute('alt'))
            //await page.hover(`//button[@aria-label="next title"]`)
            // await page.waitForSelector(`//button[@aria-label="next title"]`)


            await page.locator(`//button[@aria-label="next title"]`).click()
            endTime = currentDate.getMilliseconds();
        }
    }


    console.log("start time " + startTime + " end time " + endTime)
    console.log("Total Time " + number(endTime) - number(startTime))


    /* for (let i = 0; i < liveWindows.length; i++) {
         await page.waitForSelector(`//ul[@class="jVpjZD qYc0AS"]//li[@data-testid="active-dot"]`);
         const altText = await carouselItems[i].getAttribute('alt');
         console.log(`Live window ${i + 1} alt text: ${altText}`);
         if (i < liveWindows.length - 1) {
             await page.waitForTimeout(scrollTime * 1000);
         }
     }*/


    await browser.close();

});

