import { Axios } from 'axios';
import url from 'url';
import { IBankSSOToken } from './types';

export const AuthService = {
  ssoLoginRedirect: (): string | undefined => {
    const bankSsoUrl = process.env.NEXT_PUBLIC_BANK_SSO_URL;
    const bankSsoClientId = process.env.NEXT_PUBLIC_BANK_SSO_CLIENT_ID;
    const bankSsoRedirectUrl = process.env.NEXT_PUBLIC_BANK_SSO_REDIRECT_URL;

    if (!bankSsoUrl || !bankSsoClientId || !bankSsoRedirectUrl) {
      return;
    }

    return url.format({
      host: `${bankSsoUrl}/oauth/authorize`,
      query: {
        client_id: bankSsoClientId,
        redirect_uri: bankSsoRedirectUrl,
        response_type: 'code',
        scope: 'openid profile'
      }
    });
  },

  ssoFetchAccessToken: async (
    code: string
  ): Promise<IBankSSOToken | undefined> => {
    const bankSsoUrl = process.env.NEXT_PUBLIC_BANK_SSO_URL;
    const bankSsoClientId = process.env.NEXT_PUBLIC_BANK_SSO_CLIENT_ID;
    const bankSsoClientSecret = process.env.NEXT_PUBLIC_BANK_SSO_CLIENT_SECRET;
    const bankSsoRedirectUrl = process.env.NEXT_PUBLIC_BANK_SSO_REDIRECT_URL;

    if (
      !bankSsoUrl ||
      !bankSsoClientId ||
      !bankSsoClientSecret ||
      !bankSsoRedirectUrl
    ) {
      return;
    }

    const axiosClient = new Axios({
      baseURL: `${bankSsoUrl}/oauth/token`
    });

    return axiosClient.post('/', {
      client_id: bankSsoClientId,
      client_secret: bankSsoClientId,
      redirect_uri: bankSsoRedirectUrl,
      grant_type: 'authorization_code',
      code
    });
  }
};
