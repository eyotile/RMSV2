import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import type { Order } from '../../types/order';

interface OrderNotificationProps {
  order: Order;
  onClose: () => void;
}

export function OrderNotification({ order, onClose }: OrderNotificationProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg p-4"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Bell className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">New Order #{order.id}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {order.items.length} items - Table {order.tableNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}