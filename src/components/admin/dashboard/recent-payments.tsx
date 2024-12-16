import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { formatDate } from '../../../lib/date-utils';

interface Payment {
  code: string;
  amount: number;
  orderCode: string;
  date: Date;
}

interface RecentPaymentsProps {
  payments: Payment[];
}

export function RecentPayments({ payments }: RecentPaymentsProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary-900">Recent Payments</h2>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
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
              <th className="pb-3 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <motion.tr
                key={payment.code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm"
              >
                <td className="py-2 px-2">{payment.code}</td>
                <td className="py-2 px-2">${payment.amount.toFixed(2)}</td>
                <td className="py-2 px-2">{payment.orderCode}</td>
                <td className="py-2 px-2">{formatDate(payment.date)}</td>
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