import { message, Modal } from 'antd';
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false);
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
      if (loginMethod !== LoginMethod.HOSTED) {
        logout();
      } else {
        setIsModalOpen(true);
      }
    }
  };

  useEffect(() => {
    if (
      (!['/', '/login', '/2fa', '/organisations'].includes(router.pathname) &&
        !router.pathname.includes('/register')) ||
      (router.pathname === '/2fa' && !router.query.email)
    ) {
      const org = localStorage.getItem('organisationId');
      if (!org) {
        logout();
      }
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
    setIsModalOpen(false);
    setJwtToken('');
    localStorage.removeItem('jwtToken');
    setOrganisationId('');
    localStorage.removeItem('organisationId');
    setOrganisationName('');
    localStorage.removeItem('organisationName');
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
      <Modal
        open={isModalOpen}
        title="Session expired"
        centered
        okButtonProps={{ ghost: true, loading: refreshLoading }}
        closable={false}
        maskClosable={false}
        cancelText="Logout"
        onCancel={logout}
        okText="Yes"
        onOk={async () => {
          setRefreshLoading(true);
          try {
            const res = await axios.get(
              `${ENDPOINTS.GATEWAY}${AUTH_ENDPOINTS.REFRESH_JWT}`,
              {
                headers: {
                  Authorization: `Bearer ${jwtToken}`
                }
              }
            );
            setJwtToken(res.data.token);
            localStorage.setItem('jwtToken', res.data.token);
          } catch (err) {
            message.error('Error refreshing session');
            logout();
          } finally {
            setRefreshLoading(false);
            setIsModalOpen(false);
          }
        }}
      >
        Your session has expired. Do you wish to continue your session?
      </Modal>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
