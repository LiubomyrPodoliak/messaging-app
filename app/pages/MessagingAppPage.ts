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

  @step("Typed message: {message} with delay {delayMs} ms")
  async typeMessageWithDelay(message: string, delayMs?: number) {
    // Use pressSequentially for per-key delays (for special keyboard handling)
    await this.messageInput.pressSequentially(message, { delay: delayMs ?? 0 });
  }

  @step("Sent message")
  async sendMessage() {
    await this.sendButton.click();
  }

  @step("Verified message display: {message}")
  async isMessageDisplayed(message: string) {
    const messageLocator = this.messageList.locator('li', { hasText: message });
    
    await messageLocator.waitFor({ state: 'visible', timeout: 5000 });
    await expect(messageLocator).toContainText(message, { timeout: 5000 });
  }
}