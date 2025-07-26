import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  fullyParallel: true,
  reporter: [['html', { open: 'never' }]],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:5000',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'off',
    baseURL: 'http://localhost:5000',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
