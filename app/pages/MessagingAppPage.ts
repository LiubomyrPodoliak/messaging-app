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
    // Open the HTML file via local HTTP server for CORS compatibility
    await this.page.goto('http://localhost:5000/dummy-messaging-app.html');
  }

  @step("Typed message: {message}")
  async typeMessage(message: string) {
    await this.messageInput.fill(message);
  }

  @step("Sent message")
  async sendMessage() {
    await this.sendButton.click();
  }
  
  //todo: think if this method needed
  async getLastMessage() {
    return this.messageList.locator('li:last-child').textContent();
  }

  @step("Verified message present: {message}")
  async verifyMessagePresnt(message: string) {
    const lastMessage = this.messageList.locator('li:last-child');
    await lastMessage.waitFor({ state: 'attached', timeout: 5000 });
    await expect(lastMessage).toContainText(message, { timeout: 5000 });
  }
}
