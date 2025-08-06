import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
const selectAuthState = (state: RootState) => state.auth;
export const selectAuthData = (state: RootState) => state.auth?.data;
const selectAuthUser = (state: RootState) => state.auth?.data?.user;
const selectAuthUserData = (state: RootState) => state.auth?.userData?.data;

// Memoized auth selectors
export const selectToken = createSelector(
  [selectAuthData],
  (authData) => authData?.token
);

export const selectUserData = createSelector(
  [selectAuthUserData],
  (userData) => userData?.user
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth?.isLoading
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth?.error
);

export const selectUserId = createSelector(
  [selectAuthUser],
  (user) => user?.id
);

export const selectUserEmail = createSelector(
  [selectAuthUser],
  (user) => user?.email
);

export const selectIsAuthenticated = createSelector(
  [selectToken],
  (token) => !!token
); 