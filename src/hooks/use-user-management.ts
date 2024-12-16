import { useState } from 'react';
import { auth } from '../lib/api/auth';

interface NewUser {
  username: string;
  password: string;
  role: string;
}

export function useUserManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addUser = async (user: NewUser) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make an API call
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add user to demo credentials
      auth.addUser(user.username, user.password, user.role);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addUser, isLoading, error };
}