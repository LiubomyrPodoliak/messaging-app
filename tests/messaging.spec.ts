import { test } from '../app/fixtures/messagingAppFixture';
import { mockSendMessage } from '../utils/mockApi';

test.describe('Messaging App', () => {
  test('Verify User cannot send empty message', async ({ page, messagingAppPage }) => {
    mockSendMessage(page);
    await messagingAppPage.openDummyMessagingApp();

    await messagingAppPage.typeMessage('');
    await messagingAppPage.sendMessage();

    await messagingAppPage.isErrorMessagePresent('Message cannot be empty!');
  });

  test('Verify User can send multiple messages', async ({ page, messagingAppPage }) => {
    mockSendMessage(page);
    await messagingAppPage.openDummyMessagingApp();

    const testMessages = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];

    for (const msg of testMessages) {
      await messagingAppPage.typeMessageWithDelay(msg, 100);
      await messagingAppPage.sendMessage();

      await messagingAppPage.isMessageDisplayed(msg);
    }
  });

  test('Verify User can send a single message', async ({ page, messagingAppPage }) => {
    mockSendMessage(page);
    await messagingAppPage.openDummyMessagingApp();

    const testMessage = 'Test 777 Message';

    await messagingAppPage.typeMessage(testMessage);
    await messagingAppPage.sendMessage();
    
    await messagingAppPage.isMessageDisplayed(testMessage);
  });
});