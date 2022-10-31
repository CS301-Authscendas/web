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
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  isLoggedIn: boolean;
  jwtToken: string;
  setJwtToken: Dispatch<SetStateAction<string>>;
  organisation: string;
  setOrganisation: Dispatch<SetStateAction<string>>;
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
  organisation: '',
  setOrganisation: () => {}
});

export const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string>('');
  const [organisation, setOrganisation] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      const jwt = localStorage.getItem('jwtToken');
      setJwtToken(jwt!);
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
        organisation,
        setOrganisation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
