import { test } from '../app/fixtures/messagingAppFixture';
import { mockSendMessage } from '../utils/mockApi';
import { ErrorMessage } from '../app/models/ErrorMessage';

// Boundary Values Analysis for message input
// Assumes input maxlength is 15
const MAX_LENGTH = 15;
const VALID_MIN = 'a';
const VALID_MAX = 'a'.repeat(MAX_LENGTH);
const ABOVE_MAX = 'a'.repeat(MAX_LENGTH + 1);

test.describe('Boundary Values Analysis: Message Input', () => {
    test.beforeEach(async ({ page }) => {
        mockSendMessage(page);
    });

    test('Verify error is shown for empty input', async ({ messagingAppPage }) => {
        await messagingAppPage.openDummyMessagingApp();
        await messagingAppPage.typeMessage('');
        await messagingAppPage.sendMessage();
        await messagingAppPage.isErrorMessagePresent(ErrorMessage.Empty);
    });

    test('Verify message is sent for minimum valid input (1 char)', async ({ messagingAppPage }) => {
        await messagingAppPage.openDummyMessagingApp();
        await messagingAppPage.typeMessage(VALID_MIN);
        await messagingAppPage.sendMessage();
        await messagingAppPage.isMessageDisplayed(VALID_MIN);
    });

    test('Verify message is sent for maximum valid input (15 chars)', async ({ messagingAppPage }) => {
        await messagingAppPage.openDummyMessagingApp();
        await messagingAppPage.typeMessage(VALID_MAX);
        await messagingAppPage.sendMessage();
        await messagingAppPage.isMessageDisplayed(VALID_MAX);
    });

    test('Verify error is shown and send button is disabled for input above maximum (16 chars)', async ({ messagingAppPage }) => {
        await messagingAppPage.openDummyMessagingApp();
        await messagingAppPage.typeMessage(ABOVE_MAX);
        await messagingAppPage.isErrorMessagePresent(ErrorMessage.TooLong);
        await messagingAppPage.isSendButtonDisabled();
    });
});
