import { AUTH_ENDPOINTS, ENDPOINTS } from '../consts';

export const AuthService = {
  ssoLoginRedirect: (): string | undefined => {
    const bankSsoUrl = `${ENDPOINTS.GATEWAY}${AUTH_ENDPOINTS.SSO_LOGIN}`;

    const redirectUrl =
      process.env.NODE_ENV === 'production'
        ? bankSsoUrl
        : 'http://localhost:3000/auth/sso/login';

    return redirectUrl;
  }
};
