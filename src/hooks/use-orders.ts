import { useState, useEffect } from 'react';
import { socketService } from '../lib/socket';
import { useAuthStore } from '../store/auth.store';
import type { Order } from '../types/order';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    // Subscribe to real-time order updates
    socketService.subscribeToOrders((newOrder) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    });

    // Subscribe to order status updates
    socketService.subscribeToKitchenUpdates((updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? { ...order, status: updatedOrder.status } : order
        )
      );
    });

    return () => {
      socketService.unsubscribeFromOrders();
      socketService.unsubscribeFromKitchenUpdates();
    };
  }, []);

  const submitOrder = async (order: Partial<Order>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await socketService.submitOrder({
        ...order,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      setOrders((prevOrders) => [...prevOrders, response]);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await socketService.updateOrderStatus(orderId, status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status');
      throw err;
    }
  };

  return {
    orders,
    isLoading,
    error,
    submitOrder,
    updateOrderStatus,
  };
}