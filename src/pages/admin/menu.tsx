import React from 'react';
import { MenuForm } from '../../components/admin/menu/menu-form';
import { MenuList } from '../../components/admin/menu-list';
import { useMenu } from '../../hooks/use-menu';
import type { MenuItem } from '../../types/order';

export function MenuManagementPage() {
  const { items, isLoading, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();

  const handleAddItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      await addMenuItem(item);
    } catch (error) {
      console.error('Failed to add menu item:', error);
    }
  };

  const handleEditItem = async (item: MenuItem) => {
    try {
      await updateMenuItem(item.id, item);
    } catch (error) {
      console.error('Failed to update menu item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteMenuItem(id);
    } catch (error) {
      console.error('Failed to delete menu item:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-primary-900">Menu Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MenuForm onSubmit={handleAddItem} isLoading={isLoading} />
        
        <div>
          <h2 className="text-xl font-semibold text-primary-900 mb-6">Current Menu Items</h2>
          <MenuList
            items={items}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
}