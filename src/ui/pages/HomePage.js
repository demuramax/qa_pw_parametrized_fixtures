/* eslint-disable max-len */
import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  articleCard(title) {
    return this.page.locator(".article-preview").filter({ hasText: `Article title: ${title}` });
  }

  async assertArticleInFeedIsVisible(articleTitle, authorName) {
    await this.step(`Assert the article with title '${articleTitle}' by ${authorName} is visible in the global feed`, async () => {
      await expect(this.articleCard(articleTitle)).toBeVisible();
      await expect(this.articleCard(articleTitle).getByRole('link', { name: authorName })).toBeVisible();
    });
  }
}
