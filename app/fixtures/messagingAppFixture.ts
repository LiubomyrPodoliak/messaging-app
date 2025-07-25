import { test as base, Page } from '@playwright/test';
import { MessagingAppPage } from '../pages/MessagingAppPage';

export type Fixtures = {
  messagingAppPage: MessagingAppPage;
};

export const test = base.extend<Fixtures>({
  messagingAppPage: async ({ page }, use) => {
    const messagingAppPage = new MessagingAppPage(page);
    await use(messagingAppPage);
  },
});
