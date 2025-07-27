import { test } from '../app/fixtures/messagingAppFixture';
import { mockSendMessage } from '../utils/mockApi';
import { ErrorMessage } from '../app/models/ErrorMessage';

const MAX_LENGTH = 15;

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
        const validMin = 'a';

        await messagingAppPage.openDummyMessagingApp();
        await messagingAppPage.typeMessage(validMin);
        await messagingAppPage.sendMessage();
        await messagingAppPage.isMessageDisplayed(validMin);
    });

    test('Verify message is sent for maximum valid input (15 chars)', async ({ messagingAppPage }) => {
        const validMax = 'a'.repeat(MAX_LENGTH);

        await messagingAppPage.openDummyMessagingApp();
        await messagingAppPage.typeMessage(validMax);
        await messagingAppPage.sendMessage();
        await messagingAppPage.isMessageDisplayed(validMax);
    });

    test('Verify error is shown and send button is disabled for input above maximum (16 chars)', async ({ messagingAppPage }) => {
        const aboveMax = 'a'.repeat(MAX_LENGTH + 1);

        await messagingAppPage.openDummyMessagingApp();
        await messagingAppPage.typeMessage(aboveMax);
        await messagingAppPage.isErrorMessagePresent(ErrorMessage.TooLong);
        await messagingAppPage.isSendButtonDisabled();
    });
});
