import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selector for auth state
const selectAuthState = (state: RootState) => state.auth;

// Simple state access selectors
export const selectToken = createSelector(
  [selectAuthState],
  (auth) => auth.data?.token
);

export const selectUserId = createSelector(
  [selectAuthState],
  (auth) => auth.data?.user?._id
);

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.data?.user
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.isLoading
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => Boolean(auth.data?.token && auth.data?.user)
);

export const selectIsEmailVerified = createSelector(
  [selectAuthState],
  (auth) => auth.data?.user?.isVerified || false
);

// Computed/derived selectors with memoization
export const selectUserEmail = createSelector(
  [selectAuthState],
  (auth) => auth.data?.user?.email
);

export const selectUserName = createSelector(
  [selectAuthState],
  (auth) => auth.data?.user?.name
);

export const selectHasAuthToken = createSelector(
  [selectToken],
  (token) => Boolean(token)
);

export const selectIsAuthReady = createSelector(
  [selectIsAuthenticated, selectAuthLoading],
  (isAuthenticated, loading) => !loading && isAuthenticated
);

export const selectAuthStatus = createSelector(
  [selectIsAuthenticated, selectIsEmailVerified, selectAuthLoading],
  (isAuthenticated, isEmailVerified, loading) => {
    if (loading) return 'loading';
    if (!isAuthenticated) return 'unauthenticated';
    if (!isEmailVerified) return 'pending-verification';
    return 'authenticated';
  }
);

// Error handling selectors
export const selectHasAuthError = createSelector(
  [selectAuthError],
  (error) => Boolean(error)
);

export const selectAuthErrorMessage = createSelector(
  [selectAuthError],
  (error) => error || 'No error'
);

// Profile update selectors
export const selectProfileUpdateLoading = createSelector(
  [selectAuthState],
  (auth) => auth.profileUpdate.loading
);

export const selectProfileUpdateError = createSelector(
  [selectAuthState],
  (auth) => auth.profileUpdate.error
);

export const selectProfileUpdateData = createSelector(
  [selectAuthState],
  (auth) => auth.profileUpdate.data
);

// User data selectors
export const selectUserDataLoading = createSelector(
  [selectAuthState],
  (auth) => auth.userData.loading
);

export const selectUserDataError = createSelector(
  [selectAuthState],
  (auth) => auth.userData.error
);

export const selectUserData = createSelector(
  [selectAuthState],
  (auth) => auth.userData.data
);