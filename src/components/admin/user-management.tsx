import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Loader } from 'lucide-react';
import { GlassCard } from '../ui/glass-card';
import { useUserManagement } from '../../hooks/use-user-management';

export function UserManagement() {
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'cashier' });
  const { addUser, isLoading, error } = useUserManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addUser(newUser);
    setNewUser({ username: '', password: '', role: 'cashier' });
  };

  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-primary-900 mb-6">Add New Staff</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary-700">Username</label>
          <input
            type="text"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm 
                     focus:border-primary-500 focus:ring focus:ring-primary-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700">Password</label>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm 
                     focus:border-primary-500 focus:ring focus:ring-primary-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700">Role</label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm 
                     focus:border-primary-500 focus:ring focus:ring-primary-200"
          >
            <option value="cashier">Cashier</option>
            <option value="kitchen">Kitchen Staff</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                   flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <UserPlus className="w-5 h-5" />
          )}
          Add Staff Member
        </motion.button>
      </form>
    </GlassCard>
  );
}