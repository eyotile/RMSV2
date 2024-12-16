import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, AlertCircle } from 'lucide-react';
import { GlassCard } from '../ui/glass-card';
import { useAuth } from '../../hooks/use-auth';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { user } = await login(username, password);
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'cashier') {
        navigate('/dashboard');
      } else if (user.role === 'kitchen') {
        navigate('/kitchen');
      }
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassCard className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <LogIn className="w-12 h-12 mx-auto mb-4 text-primary-600" />
        <h2 className="text-2xl font-bold text-primary-900 mb-6">Welcome Back</h2>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-primary-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm 
                     focus:border-primary-500 focus:ring focus:ring-primary-200"
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-primary-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm 
                     focus:border-primary-500 focus:ring focus:ring-primary-200"
            placeholder="Enter password"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                   disabled:opacity-50 transition-colors"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </motion.button>

        <div className="mt-4 text-sm text-center text-primary-600">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <div className="space-y-1">
            <p>Admin: admin / admin123</p>
            <p>Cashier: cashier / cash123</p>
            <p>Kitchen: kitchen / kitchen123</p>
          </div>
        </div>
      </form>
    </GlassCard>
  );
}