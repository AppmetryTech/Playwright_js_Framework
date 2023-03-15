// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import dotenv from 'dotenv';

dotenv.config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('./global-setup'),

  /* Maximum time one test can run for. */
  timeout: 90 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],
  ["allure-playwright",
    {
      detail: true,
      outputFolder: "my-allure-results",
      suiteTitle: false,
    },]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://automationexercise.com/',
    // storageState: 'state.json',
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    //channel: 'firefox',
    actionTimeout: 0,
    launchOptions: {
      slowMo: 500
    },
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        storageState: 'state.json',
        screenshot: 'on',
        viewport: { width: 1536, height: 792 },
        video: `on`,

      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: false,
        storageState: 'state.json',
        viewport: { width: 1536, height: 792 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: 'only-on-failure',
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
      },
    },

    /*{
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        headless: false,
        screenshot: 'only-on-failure',
        viewport: { width: 1536, height: 792 }
      },
    },*/

    /* Test against mobile viewports. */
    /*{
      name: 'Mobile Chrome',
      use: {
        ...devices['iPhone 13 Pro Max'],
        headless: false,
        screenshot: 'on'
      },
    },*/
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});

