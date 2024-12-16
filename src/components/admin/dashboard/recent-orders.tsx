import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { formatDate } from '../../../lib/date-utils';

interface Order {
  code: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: Date;
}

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary-900">Recent Orders</h2>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
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
              <th className="pb-3 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <motion.tr
                key={order.code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm"
              >
                <td className="py-2 px-2">{order.code}</td>
                <td className="py-2 px-2">{order.customer}</td>
                <td className="py-2 px-2">{order.items} items</td>
                <td className="py-2 px-2">${order.total.toFixed(2)}</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'completed' 
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-2">{formatDate(order.date)}</td>
                <td className="py-2 px-2">
                  <button className="p-1 hover:bg-white/50 rounded-full">
                    <Eye className="w-4 h-4 text-primary-600" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}