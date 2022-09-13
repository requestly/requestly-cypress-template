const path = require('path');
const { defineConfig } = require('cypress');

const REQUESTLY_FOLDER_PATH = path.resolve(process.cwd(), 'requestly');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://testheaders.com', // Your application URL
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // NOTE: extensions cannot be loaded in headless Chrome
          launchOptions.extensions.push(REQUESTLY_FOLDER_PATH);

          // Workaround to launch chrome in headless mode, despite Cypress running in headed mode
          launchOptions.args.push('--headless=chrome');
        }

        return launchOptions;
      });
    },
  },
});
