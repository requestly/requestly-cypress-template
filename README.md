# [Template] Cypress Automation with Requestly

[Requestly](https://requestly.io) enables you to setup rules to modify parts of network requests like URL, headers, response.

If you use [Cypress](https://www.cypress.io) as the automation framework for end-to-end testing of your web application, you might want to integrate Requestly extension in the browser to unlock all its powers.

Here are the easy steps you can follow:

1. Clone this project.
```sh
git clone git@github.com:requestly/requestly-cypress-template.git
```

2. Install the dependencies.
```sh
npm install
```

3. Export your rules from Requestly: https://app.requestly.io/rules/my-rules 

4. Replace `rules.json` in `requestly` directory with above exported file. Make sure you name it as `rules.json`. If you are moving `requestly` directory from project root to a different location, you need to update `REQUESTLY_FOLDER_PATH` in `cypress.config.js`.

5. Set `baseUrl` in `cypress.config.js` file as your application URL.

6. Modify or add tests in `cypress/e2e` directory.

7. Run tests using command:
```sh
npm run test
```

By default, it runs on `Chrome` browser. To run on `Edge` browser:
```sh
npm run test:edge
```

**Note:** To enable extension in browser, Cypress needs to run in headed mode.
