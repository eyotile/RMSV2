import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { GlassCard } from '../../ui/glass-card';
import type { MenuItem } from '../../../types/order';

interface MenuFormProps {
  onSubmit: (item: Omit<MenuItem, 'id'>) => void;
  isLoading?: boolean;
}

export function MenuForm({ onSubmit, isLoading }: MenuFormProps) {
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    price: 0,
    category: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', price: 0, category: '', description: '', image: '' });
  };

  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-primary-900 mb-6">Add Menu Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary-700">Item Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700">Price</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                   flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={isLoading}
          type="submit"
        >
          <Plus className="w-5 h-5" />
          Add Menu Item
        </motion.button>
      </form>
    </GlassCard>
  );
}