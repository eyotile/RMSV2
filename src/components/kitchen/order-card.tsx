import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';
import { GlassCard } from '../ui/glass-card';
import type { Order } from '../../types/order';
import { formatDistanceToNow } from '../../lib/date-utils';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: Order['status']) => void;
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const statusColors = {
    pending: 'bg-yellow-500',
    preparing: 'bg-blue-500',
    ready: 'bg-green-500',
    completed: 'bg-gray-500',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <GlassCard>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-primary-900">
              Order #{order.id}
            </h3>
            <p className="text-sm text-primary-600">
              Table {order.tableNumber}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-600" />
            <span className="text-sm text-primary-600">
              {formatDistanceToNow(order.createdAt)}
            </span>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span className="text-primary-800">{item.menuItem.name}</span>
              <span className="font-medium text-primary-900">×{item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          {Object.keys(statusColors).map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(order.id, status as Order['status'])}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${order.status === status 
                  ? statusColors[status as keyof typeof statusColors] + ' text-white'
                  : 'bg-white/50 text-primary-700 hover:bg-primary-100'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}