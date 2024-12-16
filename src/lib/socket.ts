import { io, Socket } from 'socket.io-client';
import type { Order } from '../types/order';

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect(token: string) {
    if (this.socket?.connected) return;

    this.socket = io('http://localhost:3001', {
      auth: { token },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  // Order-related methods
  submitOrder(order: Partial<Order>): Promise<Order> {
    return new Promise((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error('Not connected to server'));
        return;
      }

      this.socket.emit('submit_order', order, (response: { order: Order } | { error: string }) => {
        if ('error' in response) {
          reject(new Error(response.error));
        } else {
          resolve(response.order);
        }
      });
    });
  }

  updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error('Not connected to server'));
        return;
      }

      this.socket.emit('update_order_status', { orderId, status }, (response: { error?: string }) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve();
        }
      });
    });
  }

  // Subscription methods
  subscribeToOrders(callback: (order: Order) => void) {
    this.socket?.on('new_order', callback);
  }

  subscribeToKitchenUpdates(callback: (order: Order) => void) {
    this.socket?.on('order_status_updated', callback);
  }

  unsubscribeFromOrders() {
    this.socket?.off('new_order');
  }

  unsubscribeFromKitchenUpdates() {
    this.socket?.off('order_status_updated');
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const socketService = SocketService.getInstance();