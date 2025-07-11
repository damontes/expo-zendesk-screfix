import { createContext, useEffect, useState } from 'react';
import Zendesk from 'expo-zendesk-library';
import { getValue, removeValue, saveValue } from '@/helpers/storage';
import { jwtDecode } from 'jwt-decode';
import generateToken from '@/servicies/generateToken';

type ContextType = {
  logout: () => void;
  login: (params: { name: string; email: string }) => void;
  isAuthenticated: boolean;
  user: null | { name: string; email: string };
};

const ZENDESK_API_KEY = process.env.EXPO_PUBLIC_ZENDESK_API_KEY ?? '';
const ZENDESK_KEY_ID = process.env.EXPO_PUBLIC_ZENDESK_KEY_ID ?? '';

const ZENDESK_TOKEN_KEY = 'ZENDESK_TOKEN';

export const AuthenticationContext = createContext({} as ContextType);

const AuthenticationProvider = ({
  children,
  isInitialized,
}: {
  children: React.ReactNode;
  isInitialized: boolean;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const isTokenExpired = async (savedToken: string) => {
    if (!savedToken) {
      return true;
    }

    const decodedToken = jwtDecode(savedToken);
    return decodedToken?.exp ? decodedToken.exp < Date.now() / 1000 : true;
  };

  const logout = async () => {
    try {
      await Zendesk.logout();
      await removeValue(ZENDESK_TOKEN_KEY);

      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const login = async ({ name, email }: { name: string; email: string }) => {
    try {
      const savedToken = await getValue(ZENDESK_TOKEN_KEY);
      const isExpired = await isTokenExpired(savedToken);

      if (!isExpired) {
        setIsAuthenticated(true);
        return;
      }

      const token = await generateToken({
        keyId: ZENDESK_API_KEY,
        keySecret: ZENDESK_KEY_ID,
        name,
        email,
      });

      await Zendesk.login(token);
      await saveValue(ZENDESK_TOKEN_KEY, token);

      const user: any = jwtDecode(token);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const checkStatus = async () => {
    try {
      const savedToken = await getValue(ZENDESK_TOKEN_KEY);

      if (savedToken) {
        await Zendesk.login(savedToken);
        const user: any = jwtDecode(savedToken);
        setUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  useEffect(() => {
    if (isInitialized) checkStatus();
  }, [isInitialized]);

  return (
    <AuthenticationContext.Provider value={{ logout, login, isAuthenticated, user }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
