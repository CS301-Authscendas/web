import { AUTH_ENDPOINTS } from '../consts/consts';

export const AuthService = {
  ssoLoginRedirect: (): string | undefined => {
    const backendUrl = process.env.NEXT_PUBLIC_GATEWAY_URL;
    const bankSsoUrl = `${backendUrl}${AUTH_ENDPOINTS.SSO_LOGIN}`;

    console.log(backendUrl);
    if (!backendUrl) {
      return;
    }

    const redirectUrl =
      process.env.NODE_ENV === 'production'
        ? bankSsoUrl
        : 'http://localhost:3000/auth/sso/login';

    return redirectUrl;
  }
};
