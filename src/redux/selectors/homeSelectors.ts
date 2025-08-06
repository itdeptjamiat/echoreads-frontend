import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// UI selectors
export const selectActivePostType = (state: RootState) => state.ui.activePostType;
export const selectUILoading = (state: RootState) => state.ui.isLoading;
export const selectUIError = (state: RootState) => state.ui.error;

// Magazines selectors
export const selectMagazinesFeatured = (state: RootState) => state.magazines.featured;
export const selectMagazinesTrending = (state: RootState) => state.magazines.trending;
export const selectMagazinesRecommended = (state: RootState) => state.magazines.recommended;
export const selectMagazinesNew = (state: RootState) => state.magazines.newContent;
export const selectMagazinesCategories = (state: RootState) => state.magazines.categories;
export const selectMagazinesLoading = (state: RootState) => state.magazines.loading;
export const selectMagazinesError = (state: RootState) => state.magazines.error;

// Articles selectors
export const selectArticlesFeatured = (state: RootState) => state.articles.featured;
export const selectArticlesTrending = (state: RootState) => state.articles.trending;
export const selectArticlesRecommended = (state: RootState) => state.articles.recommended;
export const selectArticlesNew = (state: RootState) => state.articles.newContent;
export const selectArticlesCategories = (state: RootState) => state.articles.categories;
export const selectArticlesLoading = (state: RootState) => state.articles.loading;
export const selectArticlesError = (state: RootState) => state.articles.error;

// Digests selectors
export const selectDigestsFeatured = (state: RootState) => state.digests.featured;
export const selectDigestsTrending = (state: RootState) => state.digests.trending;
export const selectDigestsRecommended = (state: RootState) => state.digests.recommended;
export const selectDigestsNew = (state: RootState) => state.digests.newContent;
export const selectDigestsCategories = (state: RootState) => state.digests.categories;
export const selectDigestsLoading = (state: RootState) => state.digests.loading;
export const selectDigestsError = (state: RootState) => state.digests.error;

// Dynamic selectors based on active post type
export const selectCurrentFeatured = createSelector(
  [selectActivePostType, selectMagazinesFeatured, selectArticlesFeatured, selectDigestsFeatured],
  (activeType, magazines, articles, digests) => {
    switch (activeType) {
      case 'magazines':
        return magazines;
      case 'articles':
        return articles;
      case 'digests':
        return digests;
      default:
        return magazines;
    }
  }
);

export const selectCurrentTrending = createSelector(
  [selectActivePostType, selectMagazinesTrending, selectArticlesTrending, selectDigestsTrending],
  (activeType, magazines, articles, digests) => {
    switch (activeType) {
      case 'magazines':
        return magazines;
      case 'articles':
        return articles;
      case 'digests':
        return digests;
      default:
        return magazines;
    }
  }
);

export const selectCurrentRecommended = createSelector(
  [selectActivePostType, selectMagazinesRecommended, selectArticlesRecommended, selectDigestsRecommended],
  (activeType, magazines, articles, digests) => {
    switch (activeType) {
      case 'magazines':
        return magazines;
      case 'articles':
        return articles;
      case 'digests':
        return digests;
      default:
        return magazines;
    }
  }
);

export const selectCurrentNew = createSelector(
  [selectActivePostType, selectMagazinesNew, selectArticlesNew, selectDigestsNew],
  (activeType, magazines, articles, digests) => {
    switch (activeType) {
      case 'magazines':
        return magazines;
      case 'articles':
        return articles;
      case 'digests':
        return digests;
      default:
        return magazines;
    }
  }
);

export const selectCurrentLoading = createSelector(
  [selectActivePostType, selectMagazinesLoading, selectArticlesLoading, selectDigestsLoading],
  (activeType, magazinesLoading, articlesLoading, digestsLoading) => {
    switch (activeType) {
      case 'magazines':
        return magazinesLoading;
      case 'articles':
        return articlesLoading;
      case 'digests':
        return digestsLoading;
      default:
        return magazinesLoading;
    }
  }
);

export const selectCurrentError = createSelector(
  [selectActivePostType, selectMagazinesError, selectArticlesError, selectDigestsError],
  (activeType, magazinesError, articlesError, digestsError) => {
    switch (activeType) {
      case 'magazines':
        return magazinesError;
      case 'articles':
        return articlesError;
      case 'digests':
        return digestsError;
      default:
        return magazinesError;
    }
  }
);

export const selectCurrentCategories = createSelector(
  [selectActivePostType, selectMagazinesCategories, selectArticlesCategories, selectDigestsCategories],
  (activeType, magazinesCategories, articlesCategories, digestsCategories) => {
    switch (activeType) {
      case 'magazines':
        return magazinesCategories;
      case 'articles':
        return articlesCategories;
      case 'digests':
        return digestsCategories;
      default:
        return magazinesCategories;
    }
  }
);