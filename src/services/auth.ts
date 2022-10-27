import { AUTH_ENDPOINTS } from '../consts/consts';

export const AuthService = {
  ssoLoginRedirect: (): string | undefined => {
    const bankSsoUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}${AUTH_ENDPOINTS.SSO_LOGIN}`;

    if (!bankSsoUrl) {
      return;
    }

    const redirectUrl =
      process.env.NODE_ENV === 'production'
        ? bankSsoUrl
        : 'http://localhost:3000/auth/sso/login';

    return redirectUrl;
  }
};
