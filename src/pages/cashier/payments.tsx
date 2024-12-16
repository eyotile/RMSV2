import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { GlassCard } from '../../components/ui/glass-card';

interface Payment {
  id: string;
  orderCode: string;
  amount: number;
  method: 'cash' | 'card' | 'mobile';
  status: 'completed' | 'pending' | 'failed';
  date: Date;
}

const SAMPLE_PAYMENTS: Payment[] = [
  {
    id: 'PAY001',
    orderCode: 'ORD001',
    amount: 45.99,
    method: 'cash',
    status: 'completed',
    date: new Date(),
  },
  {
    id: 'PAY002',
    orderCode: 'ORD002',
    amount: 32.50,
    method: 'card',
    status: 'completed',
    date: new Date(),
  },
];

export function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState<string>('all');

  const filteredPayments = SAMPLE_PAYMENTS.filter(payment => {
    const matchesSearch = payment.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMethod === 'all' || payment.method === filterMethod;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-900">Payments</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-primary-600" />
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="p-2 rounded-lg bg-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Methods</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredPayments.map((payment) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-medium text-primary-900">{payment.id}</h3>
                <p className="text-sm text-primary-600">Order: {payment.orderCode}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-primary-900">${payment.amount.toFixed(2)}</p>
                  <p className="text-sm text-primary-600 capitalize">{payment.method}</p>
                </div>

                <span className={`px-3 py-1 rounded-full text-sm ${
                  payment.status === 'completed' ? 'bg-green-100 text-green-700' :
                  payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {payment.status}
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}