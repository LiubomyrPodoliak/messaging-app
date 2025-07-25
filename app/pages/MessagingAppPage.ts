import { Page, Locator, expect } from '@playwright/test';

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

  async openDummyMessagingApp() {
    // Open the HTML file via local HTTP server for CORS compatibility
    await this.page.goto('http://localhost:5000/dummy-messaging-app.html');
  }

  async typeMessage(message: string) {
    await this.messageInput.fill(message);
  }

  async sendMessage() {
    await this.sendButton.click();
  }

  async getLastMessage() {
    return this.messageList.locator('li:last-child').textContent();
  }

  async verifyMessagePresnt(message: string) {
    const lastMessage = this.messageList.locator('li:last-child');
    await lastMessage.waitFor({ state: 'attached', timeout: 5000 });
    await expect(lastMessage).toHaveText(message, { timeout: 5000 });
  }
}
