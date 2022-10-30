export const AUTH_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  GENERATE_2FA: '/auth/generate-2fa-token',
  VALIDATE_2FA: '/auth/validate-2fa-token',
  SSO_LOGIN: '/auth/sso/login',
  SSO_CALLBACK: '/auth/sso/callback',
  USER_SIGNUP_STATUS: '/auth/user-signup-status',
  GENERATE_JWT: '/auth/generate-jwt-token',
  VALIDATE_JWT: '/auth/validate-jwt-token'
};

export const USER_ENDPOINTS = {
  GET_BY_ID: '/user/id',
  GET_USERS_FROM_ORG: '/user/org',
  GET_FULL_USER_DETAILS: '/user/full',
  FETCH_ORGANIZATIONS: '/user/fetch-organizations',
  FETCH_USERS_LIST: '/user/fetch-users-list'
};
