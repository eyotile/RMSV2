import { useState } from 'react';
import type { MenuItem } from '../types/order';

export function useMenuManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMenuItem = async (item: Partial<MenuItem>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an API call to add the menu item
      console.log('Adding menu item:', item);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add menu item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addMenuItem, isLoading, error };
}