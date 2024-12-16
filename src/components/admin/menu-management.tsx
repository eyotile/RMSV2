import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Loader } from 'lucide-react';
import { GlassCard } from '../ui/glass-card';
import { MenuList } from './menu-list';
import { useMenu } from '../../hooks/use-menu';
import type { MenuItem } from '../../types/order';

export function MenuManagement() {
  const { items, isLoading, error, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    price: 0,
    category: '',
    description: '',
    image: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, newItem);
        setEditingItem(null);
      } else {
        await addMenuItem(newItem);
      }
      
      setNewItem({ name: '', price: 0, category: '', description: '', image: '' });
    } catch (err) {
      console.error('Failed to save menu item:', err);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setNewItem(item);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteMenuItem(id);
      } catch (err) {
        console.error('Failed to delete menu item:', err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <GlassCard>
        <h2 className="text-xl font-semibold text-primary-900 mb-6">
          {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-700">Name</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm 
                       focus:border-primary-500 focus:ring focus:ring-primary-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700">Price</label>
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm 
                       focus:border-primary-500 focus:ring focus:ring-primary-200"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700">Category</label>
            <input
              type="text"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm 
                       focus:border-primary-500 focus:ring focus:ring-primary-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700">Description</label>
            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm 
                       focus:border-primary-500 focus:ring focus:ring-primary-200"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700">Image URL</label>
            <input
              type="url"
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm 
                       focus:border-primary-500 focus:ring focus:ring-primary-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                       flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <PlusCircle className="w-5 h-5" />
              )}
              {editingItem ? 'Update Item' : 'Add Item'}
            </motion.button>

            {editingItem && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setNewItem({ name: '', price: 0, category: '', description: '', image: '' });
                }}
                className="px-4 py-2 border border-primary-300 text-primary-700 rounded-lg 
                         hover:bg-primary-50"
              >
                Cancel
              </motion.button>
            )}
          </div>
        </form>
      </GlassCard>

      <div>
        <h2 className="text-xl font-semibold text-primary-900 mb-6">Menu Items</h2>
        <MenuList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}