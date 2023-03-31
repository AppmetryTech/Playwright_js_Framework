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

    await page.waitForSelector('//ul[@class="_70Gje9 Jy2YJ6"]//li');

    // Get carousel items
    const items = await page.locator('//ul[@class="_70Gje9 Jy2YJ6"]//li');
    console.log("Items in Carousel --> " + await items.count());
    console.log(items)
    const carouselItems = await page.$$('//ul[@class="_70Gje9 Jy2YJ6"]//li//section//picture//img');
    // page.pause()

    // wait for each live window to appear and extract the alt text
    const liveWindows = await page.$$('//ul[@class="jVpjZD qYc0AS"]//li');
    //const liveWindows = await page.$$(`//ul[@class="cIbiJK Dz+gPK"]//li`)
    const activeWindows = await page.locator(`//li[@class="cIbiJK Dz+gPK"]`)
    console.log(liveWindows.length)

    // next button arrow co-ordinate
    const x = 1491;
    const y = 281;

    let previousTime = new Date().getTime();

    for (let i = 0; i < liveWindows.length; i++) {
        await page.waitForSelector(`//li[@class="cIbiJK Dz+gPK"]`)
        //const activeWindow = await activeWindows.getAttribute("data-testid")
        //console.log(activeWindow)
        //if (activeWindow === "active-dot") {
        const movieTitle = await carouselItems[i].getAttribute('alt')
        await page.mouse.move(x, y);
        await page.locator(`//button[@aria-label="next title"]`).click()
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - previousTime;
        console.log(`Time taken to scroll: ${movieTitle} is ${timeDifference} ms`);

        previousTime = currentTime;


        // }
    }






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

