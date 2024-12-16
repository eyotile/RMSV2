import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { GlassCard } from '../../ui/glass-card';

interface AddStaffFormProps {
  onSubmit: (data: { username: string; password: string; role: string; name: string }) => void;
  isLoading?: boolean;
}

export function AddStaffForm({ onSubmit, isLoading }: AddStaffFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    role: 'cashier'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ username: '', password: '', name: '', role: 'cashier' });
  };

  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-primary-900 mb-6">Add New Staff Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary-700">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
          >
            <option value="cashier">Cashier</option>
            <option value="kitchen">Kitchen Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                   flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={isLoading}
          type="submit"
        >
          <UserPlus className="w-5 h-5" />
          Add Staff Member
        </motion.button>
      </form>
    </GlassCard>
  );
}