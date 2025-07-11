import { AuthenticationContext } from '@/contexts/Authentication';
import { useContext } from 'react';

export const useAuthentication = () => {
  const ctx = useContext(AuthenticationContext);

  if (!ctx) {
    throw new Error('useAuthentication must be used within a AuthenticationProvider');
  }

  return ctx;
};
