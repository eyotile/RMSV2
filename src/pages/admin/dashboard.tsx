import React from 'react';
import { Users, ShoppingBag, DollarSign, Utensils } from 'lucide-react';
import { StatsCard } from '../../components/admin/dashboard/stats-card';
import { RecentOrders } from '../../components/admin/dashboard/recent-orders';
import { RecentPayments } from '../../components/admin/dashboard/recent-payments';
import { SalesChart } from '../../components/admin/dashboard/sales-chart';

// Sample data - In a real app, this would come from an API
const sampleOrders = [
  {
    code: 'ORD-001',
    customer: 'John Doe',
    items: 3,
    total: 45.99,
    status: 'completed' as const,
    date: new Date(),
  },
  {
    code: 'ORD-002',
    customer: 'Jane Smith',
    items: 2,
    total: 29.99,
    status: 'pending' as const,
    date: new Date(),
  },
];

const samplePayments = [
  {
    code: 'PAY-001',
    amount: 45.99,
    orderCode: 'ORD-001',
    date: new Date(),
  },
  {
    code: 'PAY-002',
    amount: 29.99,
    orderCode: 'ORD-002',
    date: new Date(),
  },
];

const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [1200, 1900, 1500, 2100, 1800, 2300],
};

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-900">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Customers"
          value="150"
          icon={<Users className="w-6 h-6 text-primary-600" />}
        />
        <StatsCard
          title="Orders"
          value="28"
          icon={<ShoppingBag className="w-6 h-6 text-primary-600" />}
        />
        <StatsCard
          title="Sales"
          value="$2,890.00"
          icon={<DollarSign className="w-6 h-6 text-primary-600" />}
        />
        <StatsCard
          title="Products"
          value="32"
          icon={<Utensils className="w-6 h-6 text-primary-600" />}
        />
      </div>

      {/* Sales Chart */}
      <SalesChart data={salesData} />

      {/* Recent Orders & Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={sampleOrders} />
        <RecentPayments payments={samplePayments} />
      </div>
    </div>
  );
}