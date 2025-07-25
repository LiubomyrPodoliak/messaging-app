import { Page } from '@playwright/test';

export function mockSendMessage(page: Page) {
  page.route('**/api/sendMessage', async (route, request) => {
    if (request.method() !== 'POST') return route.continue();
    const postData = JSON.parse(request.postData() || '{}');
    await new Promise(res => setTimeout(res, 200));
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: postData.message })
    });
  });
}