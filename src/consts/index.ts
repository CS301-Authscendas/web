export const AUTH_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  GENERATE_2FA: '/auth/generate-2fa-token',
  VALIDATE_2FA: '/auth/validate-2fa-token',
  SSO_LOGIN: '/auth/sso/login',
  AUTH0_LOGIN: '/auth/auth0/login',
  SSO_CALLBACK: '/auth/sso/callback',
  USER_SIGNUP_STATUS: '/auth/user-signup-status',
  GENERATE_JWT: '/auth/generate-jwt-token',
  VALIDATE_JWT: '/auth/validate-jwt-token',
  REFRESH_JWT: '/auth/refresh-jwt-token',
  VALIDATE_LOGIN_METHOD: '/auth/validate-login-method'
};

export const USER_ENDPOINTS = {
  GET_BY_ID: '/user/id',
  GET_USERS_FROM_ORG: '/user/org',
  GET_FULL_USER_DETAILS: '/user/full',
  FETCH_ORGANIZATIONS: '/user/fetch-organizations',
  FETCH_USERS_LIST: '/user/fetch/users-list',
  GET_USER: '/user',
  EDIT_USER_DETAILS: '/user/edit-user-details',
  DELETE_MYSELF: '/user/myself'
};

export const ENDPOINTS = {
  FILE_UPLOAD:
    'https://ix727qsigbfpryscilarebnks40pveep.lambda-url.us-east-1.on.aws/',
  GATEWAY:
    process.env.NODE_ENV === 'production'
      ? 'https://api.itsag2t4.com/v1'
      : 'http://localhost:3000/v1'
};

export enum LoginMethod {
  HOSTED = 'HOSTED',
  SSO = 'SSO',
  AUTH0 = 'AUTH0'
}
