/* eslint-disable max-len */
import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
    this.removeTagButton = page.locator('form i').first(); 
    this.tagLabel = page.locator('[class="tag-default tag-pill"]');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertArticleTitle(title) {
    await this.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await this.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }


  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click(); 
      await expect(this.updateArticleButton).toBeHidden();
      await this.page.reload();
    });
  }

  async removeTag() {
    await this.step(`Remove the tag`, async () => {
        await this.removeTagButton.click();
    });
  }

  async removeAllTags() {
    await this.step(`Remove all article tags`, async () => {
      while (await this.removeTagButton.isVisible()) {
        await this.removeTagButton.click();
      }
    });
  }

  async assertTagIsNotVisible(tag) {
    await this.step(`Assert the '${tag}' tag is not visible`, async () => {
      await expect(this.tagLabel).not.toContainText(tag);
    });
  } 
}
