import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { LoginMethod } from '../consts';

interface IAuthContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  isLoggedIn: boolean;
  jwtToken: string;
  setJwtToken: Dispatch<SetStateAction<string>>;
  organisationId: string;
  setOrganisationId: Dispatch<SetStateAction<string>>;
  loginMethod: LoginMethod | undefined;
  setLoginMethod: Dispatch<SetStateAction<LoginMethod | undefined>>;
}

interface IProps {
  children?: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  isLoading: false,
  setIsLoading: () => {},
  logout: () => {},
  isLoggedIn: false,
  jwtToken: '',
  setJwtToken: () => {},
  organisationId: '',
  setOrganisationId: () => {},
  loginMethod: undefined,
  setLoginMethod: () => {}
});

export const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string>('');
  const [organisationId, setOrganisationId] = useState<string>('');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>();
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem('jwtToken');
    if (jwt) {
      setJwtToken(jwt);
    }
    const org = localStorage.getItem('organisationId');
    if (org) {
      setOrganisationId(org);
    }
    const login = localStorage.getItem('loginMethod');
    if (login) {
      setLoginMethod(login as LoginMethod);
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      logout();
    }
  }, [isLoading, isLoggedIn]);

  const logout = () => {
    setJwtToken('');
    localStorage.removeItem('jwtToken');
    setOrganisationId('');
    localStorage.removeItem('organisationId');
    setLoginMethod(undefined);
    localStorage.removeItem('loginMethod');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        logout,
        isLoggedIn,
        jwtToken,
        setJwtToken,
        organisationId,
        setOrganisationId,
        loginMethod,
        setLoginMethod
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
