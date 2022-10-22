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
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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
  isLoading: false,
  setIsLoading: () => {},
  setSsoAccessToken: () => {},
  setHostedAccessToken: () => {},
  logout: () => {},
  isLoggedIn: false
});

export const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [ssoAccessToken, setSsoAccessToken] = useState<string>('');
  const [hostedAccessToken, setHostedAccessToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoading || ssoAccessToken || hostedAccessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [ssoAccessToken, hostedAccessToken, isLoading]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isLoggedIn]);

  const getAccessToken = (): string => {
    return ssoAccessToken || hostedAccessToken;
  };

  const resetAllToken = (): void => {
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
        isLoading,
        setIsLoading,
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
