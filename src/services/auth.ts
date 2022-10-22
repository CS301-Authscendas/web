export const AuthService = {
  ssoLoginRedirect: (): string | undefined => {
    const bankSsoUrl = process.env.NEXT_PUBLIC_BANK_SSO_URL;

    if (!bankSsoUrl) {
      return;
    }

    const redirectUrl =
      process.env.NODE_ENV === 'production'
        ? bankSsoUrl
        : 'http://localhost:3001/auth/sso/login';

    return redirectUrl;
  }
};
