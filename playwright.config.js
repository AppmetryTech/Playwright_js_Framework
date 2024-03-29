// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import dotenv from 'dotenv';
import { testConfig } from './testConfig';
let ENV = process.env.ENV;

if (!ENV || ![`qa`, `qaApi`].includes(ENV)) {
  console.log(`Please provide a correct environment value like "npx cross-env ENV=qa|qaApi"`);
  process.exit();
}
ENV = `qa`,

  dotenv.config();
/**
 * Read environment variables from file. * https://github.com/motdotla/dotenv*/
// @see https://playwright.dev/docs/test-configuration
module.exports = defineConfig({
  testDir: './tests/E2E',

  globalSetup: require.resolve('./global-setup'),

  //Global Teardown to run after all tests
  globalTeardown: require.resolve(`./global-teardown`),

  timeout: 70 * 1000, // Maximum time one test can run for.
  expect: {
    timeout: 5000   //Maximum time expect() should wait for the condition to be met.
  },
  fullyParallel: false,  /* Run tests in files in parallel */
  forbidOnly: !!process.env.CI,   /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: process.env.CI ? 2 : 0,     /* Retry on CI only */
  workers: process.env.CI ? 1 : undefined,   /* Opt out of parallel tests on CI. */
  reporter: [[`html`], /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  ["allure-playwright",
    {
      detail: true,
      outputFolder: "my-allure-results",
      suiteTitle: false,
    },]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: testConfig[process.env.ENV],
    storageState: 'state.json',

    actionTimeout: 0,
    launchOptions: {
      slowMo: 2000,
      devtools: false,
    },
    trace: 'on-first-retry',
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: `Chrome`,
      use: {
        browserName: `chromium`,  // Configure the browser to use.
        channel: `chrome`,  //Chrome Browser Config
        baseURL: testConfig[process.env.ENV],  //Picks Base Url based on User input
        storageState: 'state.json',
        headless: false,  //Browser Mode
        viewport: { width: 1500, height: 730 },   //Browser height and width
        ignoreHTTPSErrors: true,
        acceptDownloads: true,//Enable File Downloads in Chrome
        //Artifacts
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        //Slows down execution by ms
        launchOptions: {
          slowMo: 1000
        }
      },
    },
    /*{
      name: `Chromium`,
      use: {
        browserName: `chromium`,
        baseURL: testConfig[process.env.ENV],
        storageState: 'state.json',
        headless: false,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },*/

    /* {
       name: `Firefox`,
       use: {
         browserName: `firefox`,
         baseURL: testConfig[process.env.ENV],
         storageState: 'state.json',
         headless: false,
         viewport: { width: 1500, height: 730 },
         ignoreHTTPSErrors: true,
         acceptDownloads: true,
         screenshot: `only-on-failure`,
         video: `retain-on-failure`,
         trace: `retain-on-failure`,
         launchOptions: {
           slowMo: 0
         }
       },
     },
 
     {
       name: `Edge`,
       use: {
         browserName: `chromium`,
         channel: `msedge`,
         baseURL: testConfig[process.env.ENV],
         storageState: 'state.json',
         headless: false,
         viewport: { width: 1500, height: 730 },
         ignoreHTTPSErrors: true,
         acceptDownloads: true,
         screenshot: `only-on-failure`,
         video: `retain-on-failure`,
         trace: `retain-on-failure`,
         launchOptions: {
           slowMo: 0
         }
       },
     },
     /*{
       name: `WebKit`,
       use: {
         browserName: `webkit`,
         baseURL: testConfig[process.env.ENV],
         storageState: 'state.json',
         headless: false,
         viewport: { width: 1500, height: 730 },
         ignoreHTTPSErrors: true,
         acceptDownloads: true,
         screenshot: `only-on-failure`,
         video: `retain-on-failure`,
         trace: `retain-on-failure`,
         launchOptions: {
           slowMo: 0
         }
       },
     },*/
    /*  {
        name: `Device`,
        use: {
          ...devices[`Pixel 4a (5G)`],
          browserName: `chromium`,
          channel: `chrome`,
          baseURL: testConfig[process.env.ENV],
          storageState: 'state.json',
          headless: false,
          ignoreHTTPSErrors: true,
          acceptDownloads: true,
          screenshot: `only-on-failure`,
          video: `retain-on-failure`,
          trace: `retain-on-failure`,
          launchOptions: {
            slowMo: 0
          }
        },
      },*/
    /* {
       name: `API`,
       use: {
         baseURL: testConfig[process.env.ENV]
       }
     }*/
  ],



});

