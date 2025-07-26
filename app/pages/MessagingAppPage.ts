import { Page, Locator, expect } from '@playwright/test';
import { step } from "../../utils/stepHelper";

export class MessagingAppPage {
  readonly page: Page;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly messageList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.messageInput = page.locator('#message-input');
    this.sendButton = page.locator('#send-button');
    this.messageList = page.locator('#message-list');
  }

  @step("Opened dummy messaging app")
  async openDummyMessagingApp() {
    // Open the HTML file using relative path, resolved against baseURL
    await this.page.goto('/dummy-messaging-app.html');
  }

  @step("Typed message: {message}")
  async typeMessage(message: string) {
    await this.messageInput.fill(message);
  }

  @step("Sent message")
  async sendMessage() {
    await this.sendButton.click();
  }
  
  @step("Verified message display: {message}")
  async isMessageDisplayed(messages: string | string[]) {
    const arr = typeof messages === 'string' ? [messages] : messages;
    
    for (const msg of arr) {
      // Wait for any message item containing the expected text
      const messageLocator = this.messageList.locator('li', { hasText: msg });
      await messageLocator.waitFor({ state: 'visible', timeout: 5000 });
      await expect(messageLocator).toContainText(msg, { timeout: 5000 });
    }
  }
}