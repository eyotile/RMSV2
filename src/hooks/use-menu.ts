import { useState, useEffect } from 'react';
import { menuApi } from '../lib/api/menu';
import type { MenuItem } from '../types/order';

export function useMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const menuItems = await menuApi.getAll();
      setItems(menuItems);
    } catch (err) {
      setError('Failed to load menu items');
    } finally {
      setIsLoading(false);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newItem = await menuApi.add(item);
      setItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError('Failed to add menu item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedItem = await menuApi.update(id, item);
      setItems(prev => prev.map(i => i.id === id ? updatedItem : i));
      return updatedItem;
    } catch (err) {
      setError('Failed to update menu item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMenuItem = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await menuApi.delete(id);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      setError('Failed to delete menu item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    items,
    isLoading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refreshMenu: loadMenuItems,
  };
}