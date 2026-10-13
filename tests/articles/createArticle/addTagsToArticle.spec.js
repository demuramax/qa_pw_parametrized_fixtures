import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Add tags to an article when editing', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Add ${testNameEnding} on edit to an article`, async ({
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      const article = generateNewArticleData(logger);
      const tagsToAdd = generateNewArticleData(logger, tagsNumber).tags;

      await homePage.clickNewArticleLink();

      await createArticlePage.fillTitleField(article.title);
      await createArticlePage.fillDescriptionField(article.description);
      await createArticlePage.fillTextField(article.text);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
      await viewArticlePage.clickEditArticleButton();

      for (const tag of tagsToAdd) {
        await editArticlePage.addTag(tag);
      }
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.assertArticleTagsAreVisible(tagsToAdd);
    });
  });
});
