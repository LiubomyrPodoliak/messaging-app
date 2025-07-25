import { test, expect } from '@playwright/test';
import { MessagingAppPage } from '../pages/MessagingAppPage';

const MOCK_API_URL = '**/api/sendMessage';

test.describe('Messaging App', () => {
  test('User can send a message and see it in the list', async ({ page }) => {
    // Mock the API call
    page.route(MOCK_API_URL, async (route, request) => {
      if (request.method() !== 'POST') {
        console.log('Route not POST, continuing:', request.method(), request.url());
        return route.continue();
      }
      console.log('Route hit:', request.method(), request.url());
      const postData = JSON.parse(request.postData() || '{}');
      await new Promise(res => setTimeout(res, 200)); // Simulate delay
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: postData.message })
      });
    });

    const app = new MessagingAppPage(page);
    await app.goto();
    const testMessage = 'Test Message';
    await app.typeMessage(testMessage);
    await app.sendMessage();

    const lastMessage = app.messageList.locator('li:last-child');
    await expect(lastMessage).toBeAttached({ timeout: 5000 });
    await expect(lastMessage).toHaveText(testMessage, { timeout: 5000 });
  });
});
