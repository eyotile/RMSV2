import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { auth } from '../lib/api/auth';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuthStore();

  const login = useCallback(async (username: string, password: string) => {
    try {
      const { token, user } = await auth.login(username, password);
      setUser(user);
      setIsAuthenticated(true);
      return { token, user };
    } catch (error) {
      throw error;
    }
  }, [setUser, setIsAuthenticated]);

  const logout = useCallback(() => {
    auth.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  }, [navigate, setUser, setIsAuthenticated]);

  return { login, logout };
}