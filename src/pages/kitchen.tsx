import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { OrderList } from '../components/kitchen/order-list';
import { StatusFilter } from '../components/kitchen/status-filter';
import { OrderNotification } from '../components/orders/order-notification';
import { useOrders } from '../hooks/use-orders';
import type { Order } from '../types/order';

export function KitchenPage() {
  const { orders, updateOrderStatus } = useOrders();
  const [filter, setFilter] = React.useState<Order['status'] | 'all'>('all');
  const [notification, setNotification] = React.useState<Order | null>(null);

  const filteredOrders = orders.filter(
    (order) => filter === 'all' || order.status === filter
  );

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    ready: orders.filter((o) => o.status === 'ready').length,
    completed: orders.filter((o) => o.status === 'completed').length,
  };

  React.useEffect(() => {
    // Show notification for new pending orders
    const lastOrder = orders[orders.length - 1];
    if (lastOrder?.status === 'pending') {
      setNotification(lastOrder);
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [orders]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-900 mb-6">Kitchen Display</h1>
      
      <StatusFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        counts={counts}
      />
      
      <AnimatePresence>
        {notification && (
          <OrderNotification
            order={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>
      
      <OrderList
        orders={filteredOrders}
        onStatusChange={updateOrderStatus}
      />
    </div>
  );
}