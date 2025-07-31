import { test } from '../app/fixtures/messagingAppFixture';
import { mockSendMessage } from '../utils/mockApi';

test.describe('Messaging App', () => {
  test.describe.configure({ mode: "parallel" });

  test.beforeEach(async ({ page }) => {
    mockSendMessage(page);
  });

  test('Verify User can send multiple messages',
    {
      // help to run the tests with the same tag e.g. npx playwright test --grep @smoke
      tag: '@smoke',
      annotation: {
        // it could be different type e.g. TC type to help interation with TMS 
        type: 'issue',
        description: 'https://Jira.com/issue/123'
      }
    },

    async ({ messagingAppPage }) => {
      await messagingAppPage.openDummyMessagingApp();

      const testMessages = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];

      for (const msg of testMessages) {
        await messagingAppPage.typeMessageWithDelay(msg, 100);
        await messagingAppPage.sendMessage();

        await messagingAppPage.isMessageDisplayed(msg);
      }
    });

  test('Verify User can send a single message', { tag: '@regression' },
    async ({ messagingAppPage }) => {
      await messagingAppPage.openDummyMessagingApp();

      const testMessage = 'Test Message';

      await messagingAppPage.typeMessage(testMessage);
      await messagingAppPage.sendMessage();

      await messagingAppPage.isMessageDisplayed(testMessage);
    });
});