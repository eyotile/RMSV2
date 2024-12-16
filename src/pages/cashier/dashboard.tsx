import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, DollarSign, Utensils } from 'lucide-react';
import { StatsCard } from '../../components/cashier/dashboard/stats-card';
import { RecentOrdersTable } from '../../components/cashier/dashboard/recent-orders-table';
import { RecentPaymentsTable } from '../../components/cashier/dashboard/recent-payments-table';
import { useOrders } from '../../hooks/use-orders';

export function CashierDashboard() {
  const { orders } = useOrders();
  
  // Calculate statistics
  const totalCustomers = new Set(orders.map(o => o.customerName)).size;
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = new Set(orders.flatMap(o => o.items.map(i => i.menuItem.id))).size;

  // Mock payments data
  const recentPayments = orders.map(order => ({
    id: `PAY-${order.id}`,
    amount: order.total,
    orderCode: order.id,
    date: order.createdAt
  }));

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-primary-900"
      >
        Cashier Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Customers"
          value={totalCustomers}
          icon={<Users className="w-6 h-6 text-primary-600" />}
        />
        <StatsCard
          title="Orders"
          value={totalOrders}
          icon={<ShoppingBag className="w-6 h-6 text-primary-600" />}
        />
        <StatsCard
          title="Sales"
          value={`$${totalSales.toFixed(2)}`}
          icon={<DollarSign className="w-6 h-6 text-primary-600" />}
        />
        <StatsCard
          title="Products"
          value={totalProducts}
          icon={<Utensils className="w-6 h-6 text-primary-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrdersTable orders={orders.slice(0, 5)} />
        <RecentPaymentsTable payments={recentPayments.slice(0, 5)} />
      </div>
    </div>
  );
}