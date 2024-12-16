import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../ui/glass-card';
import { formatDate } from '../../../lib/date-utils';
import type { Order } from '../../../types/order';

interface RecentOrdersTableProps {
  orders: Order[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-primary-900">Recent Orders</h2>
        <button className="text-sm text-primary-600 hover:text-primary-700">
          See all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-primary-600">
              <th className="pb-3 px-2">Code</th>
              <th className="pb-3 px-2">Customer</th>
              <th className="pb-3 px-2">Items</th>
              <th className="pb-3 px-2">Total</th>
              <th className="pb-3 px-2">Status</th>
              <th className="pb-3 px-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm"
              >
                <td className="py-2 px-2">{order.id}</td>
                <td className="py-2 px-2">{order.customerName || 'Guest'}</td>
                <td className="py-2 px-2">{order.items.length} items</td>
                <td className="py-2 px-2">${order.total.toFixed(2)}</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs 
                    ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-2">{formatDate(order.createdAt)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}