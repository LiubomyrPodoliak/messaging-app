import { test } from '../app/fixtures/messagingAppFixture';
import { mockSendMessage } from '../utils/mockApi';

test.describe('Messaging App', () => {
  test('User can send a message and see it in the list', async ({ page, messagingAppPage }) => {
    // Mock the API to simulate sending a message
    mockSendMessage(page);

    await messagingAppPage.openDummyMessagingApp();
    const testMessage = 'Test 777 Message';
    await messagingAppPage.typeMessage(testMessage);
    await messagingAppPage.sendMessage();

    await messagingAppPage.verifyMessagePresnt(testMessage);
  });
});
