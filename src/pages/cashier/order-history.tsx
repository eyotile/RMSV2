import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye } from 'lucide-react';
import { GlassCard } from '../../components/ui/glass-card';
import { formatDate } from '../../lib/date-utils';

interface OrderHistoryItem {
  id: string;
  customerName: string;
  items: Array<{ name: string; quantity: number }>;
  total: number;
  status: 'completed' | 'cancelled' | 'refunded';
  date: Date;
}

const SAMPLE_ORDERS: OrderHistoryItem[] = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    items: [
      { name: 'Margherita Pizza', quantity: 1 },
      { name: 'Coca Cola', quantity: 2 },
    ],
    total: 17.99,
    status: 'completed',
    date: new Date(),
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    items: [
      { name: 'Chicken Burger', quantity: 1 },
      { name: 'French Fries', quantity: 1 },
    ],
    total: 12.98,
    status: 'cancelled',
    date: new Date(),
  },
];

export function OrderHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = SAMPLE_ORDERS.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-900">Order History</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-primary-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 rounded-lg bg-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-primary-900">{order.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-primary-600">Customer: {order.customerName}</p>
                  <p className="text-sm text-primary-600">Date: {formatDate(order.date)}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-primary-900">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-primary-600">{order.items.length} items</p>
                  </div>
                  
                  <button className="p-2 rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm text-primary-700">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}