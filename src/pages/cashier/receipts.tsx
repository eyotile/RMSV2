import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Printer } from 'lucide-react';
import { GlassCard } from '../../components/ui/glass-card';

interface Receipt {
  id: string;
  orderCode: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  date: Date;
}

const SAMPLE_RECEIPTS: Receipt[] = [
  {
    id: 'RCP001',
    orderCode: 'ORD001',
    customerName: 'John Doe',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
      { name: 'Coca Cola', quantity: 2, price: 2.50 },
    ],
    total: 17.99,
    date: new Date(),
  },
  {
    id: 'RCP002',
    orderCode: 'ORD002',
    customerName: 'Jane Smith',
    items: [
      { name: 'Chicken Burger', quantity: 1, price: 8.99 },
      { name: 'French Fries', quantity: 1, price: 3.99 },
    ],
    total: 12.98,
    date: new Date(),
  },
];

export function ReceiptsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReceipts = SAMPLE_RECEIPTS.filter(receipt =>
    receipt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = (receipt: Receipt) => {
    // Implement print functionality
    console.log('Printing receipt:', receipt.id);
  };

  const handleDownload = (receipt: Receipt) => {
    // Implement download functionality
    console.log('Downloading receipt:', receipt.id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-900">Receipts</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
        <input
          type="text"
          placeholder="Search receipts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="grid gap-4">
        {filteredReceipts.map((receipt) => (
          <motion.div
            key={receipt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h3 className="font-medium text-primary-900">{receipt.id}</h3>
                  <p className="text-sm text-primary-600">Order: {receipt.orderCode}</p>
                  <p className="text-sm text-primary-600">Customer: {receipt.customerName}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePrint(receipt)}
                    className="p-2 rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(receipt)}
                    className="p-2 rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-primary-600">
                      <th className="text-left py-2">Item</th>
                      <th className="text-center py-2">Qty</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt.items.map((item, index) => (
                      <tr key={index} className="border-t border-white/20">
                        <td className="py-2">{item.name}</td>
                        <td className="text-center py-2">{item.quantity}</td>
                        <td className="text-right py-2">${item.price.toFixed(2)}</td>
                        <td className="text-right py-2">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-white/20 font-bold">
                      <td colSpan={3} className="text-right py-2">Total:</td>
                      <td className="text-right py-2">${receipt.total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}