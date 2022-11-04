import axios from 'axios';
import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { IDataType, Role } from '../components/access-control-management/types';
import { AUTH_ENDPOINTS, ENDPOINTS, LoginMethod } from '../consts';

interface IAuthContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  isLoggedIn: boolean;
  jwtToken: string;
  setJwtToken: Dispatch<SetStateAction<string>>;
  organisationId: string;
  setOrganisationId: Dispatch<SetStateAction<string>>;
  organisationName: string;
  setOrganisationName: Dispatch<SetStateAction<string>>;
  loginMethod: LoginMethod | undefined;
  setLoginMethod: Dispatch<SetStateAction<LoginMethod | undefined>>;
  userDetails: IDataType | undefined;
  setUserDetails: Dispatch<SetStateAction<IDataType | undefined>>;
  roles: Role[];
  setRoles: Dispatch<SetStateAction<Role[]>>;
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
  organisationName: '',
  setOrganisationName: () => {},
  loginMethod: undefined,
  setLoginMethod: () => {},
  userDetails: undefined,
  setUserDetails: () => {},
  roles: [],
  setRoles: () => {}
});

export const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string>('');
  const [organisationId, setOrganisationId] = useState<string>('');
  const [organisationName, setOrganisationName] = useState<string>('');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>();
  const [userDetails, setUserDetails] = useState<IDataType>();
  const [roles, setRoles] = useState<Role[]>([]);
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem('jwtToken');
    if (jwt) {
      setJwtToken(jwt);
    }
    const orgId = localStorage.getItem('organisationId');
    if (orgId) {
      setOrganisationId(orgId);
    }
    const orgName = localStorage.getItem('organisationName');
    if (orgName) {
      setOrganisationName(orgName);
    }
    const login = localStorage.getItem('loginMethod');
    if (login) {
      setLoginMethod(login as LoginMethod);
    }
  }, []);

  const fetchValidateJwt = async (jwt: string | null) => {
    if (!jwt) {
      logout();
    }
    if (!loginMethod) {
      return;
    }
    try {
      await axios.get(`${ENDPOINTS.GATEWAY}${AUTH_ENDPOINTS.VALIDATE_JWT}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'login-method': loginMethod
        }
      });
    } catch (e) {
      logout();
    }
  };

  useEffect(() => {
    if (
      !['/', '/login', '/2fa', '/organisations'].includes(router.pathname) &&
      !router.pathname.includes('/register')
    ) {
      const jwt = localStorage.getItem('jwtToken');
      fetchValidateJwt(jwt);
    }
  }, [router.pathname, loginMethod]);

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
    setUserDetails(undefined);
    setRoles([]);
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
        organisationName,
        setOrganisationName,
        loginMethod,
        setLoginMethod,
        userDetails,
        setUserDetails,
        roles,
        setRoles
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
