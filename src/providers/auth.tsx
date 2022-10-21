import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';

interface IAuthContext {
  getAccessToken: () => string;
  ssoCode: string;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSsoCode: Dispatch<SetStateAction<string>>;
  setSsoAccessToken: Dispatch<SetStateAction<string>>;
  setHostedAccessToken: Dispatch<SetStateAction<string>>;
  logout: () => void;
  isLoggedIn: boolean;
}

interface IProps {
  children?: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  getAccessToken: () => '',
  ssoCode: '',
  isLoading: false,
  setIsLoading: () => {},
  setSsoCode: () => {},
  setSsoAccessToken: () => {},
  setHostedAccessToken: () => {},
  logout: () => {},
  isLoggedIn: false
});

export const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [ssoCode, setSsoCode] = useState<string>('');
  const [ssoAccessToken, setSsoAccessToken] = useState<string>('');
  const [hostedAccessToken, setHostedAccessToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoading || ssoCode || ssoAccessToken || hostedAccessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [ssoCode, ssoAccessToken, hostedAccessToken, isLoading]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      logout();
    }
  }, [isLoading, isLoggedIn]);

  const getAccessToken = (): string => {
    return ssoAccessToken || hostedAccessToken;
  };

  const resetAllToken = (): void => {
    setSsoCode('');
    setSsoAccessToken('');
    setHostedAccessToken('');
  };

  const logout = () => {
    resetAllToken();
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        getAccessToken,
        ssoCode,
        isLoading,
        setIsLoading,
        setSsoCode,
        setSsoAccessToken,
        setHostedAccessToken,
        logout,
        isLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
