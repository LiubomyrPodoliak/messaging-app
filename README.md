# Mini Playwright Messaging App Test Framework

## 📦 Setup Instructions



1. Install dependencies:
   npm install

2. The static server is started automatically by Playwright (see `playwright.config.ts`).
   No manual step is needed.

3. Run Playwright tests (in a separate terminal):
   npx playwright test

4. View HTML test report:
   npx playwright show-report

**Note:**
- Playwright's API mocking only works during automated test runs. If you open the app manually in your browser, sending a message will return a 404 unless you implement a real backend.


## 🤖 Tools/AI Used
- GitHub Copilot
- ChatGPT (for code suggestions and explanations)


## 💡 Decisions & Reasoning
- **Playwright + TypeScript**: Modern, robust, and supports POM and API mocking.
- **POM Structure**: `MessagingAppPage` encapsulates UI interactions for maintainability.
- **API Mocking**: Used `page.route('**/api/sendMessage', ...)` to intercept and mock the endpoint, simulating real backend behavior without a server.
- **Static Server**: Required to avoid CORS issues and allow fetch requests to be intercepted by Playwright. The app is served at `http://localhost:5000` using the `serve` package.
- **Reporting**: Playwright’s built-in HTML reporter is used for simplicity and CI compatibility.
- **CI**: GitHub Actions workflow starts the static server, waits for it to be ready, runs tests, and uploads the HTML report as an artifact.


## 🧪 Future Improvements
- Add more test scenarios (e.g., error states, empty input, long messages).
- Integrate Allure for advanced reporting.
- Parameterize tests for broader coverage.
- Add linting and code formatting.
- Add a mock server for manual testing if needed.

---


**dummy-messaging-app.html** is included and used as the test target UI.

## 🏗️ CI/CD (GitHub Actions)

The workflow `.github/workflows/playwright.yml` will:
- Install dependencies
- Start the static server in the background
- Wait for the server to be ready
- Run Playwright tests
- Upload the Playwright HTML report as an artifact

No additional configuration is needed—just push to GitHub and the tests will run automatically.


## 🚦 Manually Triggering CI Job

You can manually run the GitHub Actions job (`Messaging app tests`) without pushing code:

1. Go to your repository on GitHub.
2. Click the **Actions** tab.
3. Select the workflow named **Messaging app tests** from the left sidebar.
4. Click the **Run workflow** button (top right).
5. Optionally, select a branch and click **Run workflow** to start the job.

This will run the full test suite and publish the HTML report as usual.

## 📊 Viewing Test Reports (CI)

After each CI run, the Playwright HTML report is published to GitHub Pages:

- [View Playwright HTML Report](https://liubomyrpodoliak.github.io/messaging-app/)

You can also download the report as an artifact from the workflow run summary.
