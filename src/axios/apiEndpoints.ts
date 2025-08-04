// src/axios/apiEndpoints.ts

const VERSION = '/api/v1';

export const API_URLS = {
  auth: {
    login: `${VERSION}/user/login`,
    signup: `${VERSION}/user/signup`,
    forgotPassword: `${VERSION}/user/request-password-reset`,
    verifyOTP: `${VERSION}/user/verify-otp`,
    resetPassword: `${VERSION}/user/set-new-password-after-otp`,
    profile: (userId: string) => `${VERSION}/user/profile/${userId}`,
  },
};