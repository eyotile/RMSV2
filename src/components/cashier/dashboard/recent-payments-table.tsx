import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../ui/glass-card';
import { formatDate } from '../../../lib/date-utils';

interface Payment {
  id: string;
  amount: number;
  orderCode: string;
  date: Date;
}

interface RecentPaymentsTableProps {
  payments: Payment[];
}

export function RecentPaymentsTable({ payments }: RecentPaymentsTableProps) {
  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-primary-900">Recent Payments</h2>
        <button className="text-sm text-primary-600 hover:text-primary-700">
          See all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-primary-600">
              <th className="pb-3 px-2">Code</th>
              <th className="pb-3 px-2">Amount</th>
              <th className="pb-3 px-2">Order Code</th>
              <th className="pb-3 px-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <motion.tr
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm"
              >
                <td className="py-2 px-2">{payment.id}</td>
                <td className="py-2 px-2">${payment.amount.toFixed(2)}</td>
                <td className="py-2 px-2">{payment.orderCode}</td>
                <td className="py-2 px-2">{formatDate(payment.date)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}