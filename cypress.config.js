const path = require('path');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://testheaders.com', // Your application URL
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // NOTE: extensions cannot be loaded in headless Chrome
          launchOptions.extensions.push(path.resolve(process.cwd(), 'requestly'));
        }

        return launchOptions;
      });
    },
  },
});
