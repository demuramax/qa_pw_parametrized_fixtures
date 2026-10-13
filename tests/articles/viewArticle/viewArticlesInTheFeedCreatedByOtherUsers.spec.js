/* eslint-disable max-len */
import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await createArticle(pages[0], articleWithoutTags, 1);
});

test('User can see in their feed articles from two different users', async ({
  articleWithoutTags,
  pages,
  users,
  logger,
}) => {
  const secondArticle = generateNewArticleData(logger);

  await createArticle(pages[1], secondArticle, 2);
  const viewer = new ViewArticlePage(pages[2], 3);

  await viewer.open(articleWithoutTags.url);

  await viewer.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewer.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewer.assertArticleAuthorNameIsVisible(users[0].username);

  await viewer.followAuthorProfile(users[0].username);

  await viewer.open(secondArticle.url);
  await viewer.assertArticleTitleIsVisible(secondArticle.title);
  await viewer.assertArticleTextIsVisible(secondArticle.text);
  await viewer.assertArticleAuthorNameIsVisible(users[1].username);

  await viewer.followAuthorProfile(users[1].username);
  await viewer.goToHomeLink();

  const homePage = new HomePage(pages[2], 3);
  await homePage.assertArticleInFeedIsVisible(articleWithoutTags.title, users[0].username);
  await homePage.assertArticleInFeedIsVisible(secondArticle.title, users[1].username);





});
