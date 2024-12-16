import React, { useState } from 'react';
import { MenuGrid } from '../components/orders/menu-grid';
import { OrderSummary } from '../components/orders/order-summary';
import type { MenuItem, OrderItem } from '../types/order';

// Sample menu items (in a real app, this would come from an API)
const SAMPLE_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    price: 12.99,
    category: 'Pizza',
    description: 'Fresh tomatoes, mozzarella, and basil',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Classic Burger',
    price: 9.99,
    category: 'Burgers',
    description: 'Beef patty with lettuce, tomato, and cheese',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    price: 8.99,
    category: 'Salads',
    description: 'Romaine lettuce, croutons, and Caesar dressing',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=60',
  },
];

export function OrdersPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleItemSelect = (menuItem: MenuItem) => {
    setOrderItems((current) => {
      const existingItem = current.find(
        (item) => item.menuItem.id === menuItem.id
      );

      if (existingItem) {
        return current.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { menuItem, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, change: number) => {
    setOrderItems((current) =>
      current.map((item) =>
        item.menuItem.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setOrderItems((current) =>
      current.filter((item) => item.menuItem.id !== itemId)
    );
  };

  const handleSubmitOrder = () => {
    // TODO: Implement order submission logic
    console.log('Submitting order:', orderItems);
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold text-primary-900 mb-6">Menu</h1>
        <MenuGrid items={SAMPLE_MENU_ITEMS} onItemSelect={handleItemSelect} />
      </div>
      <div>
        <OrderSummary
          items={orderItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onSubmitOrder={handleSubmitOrder}
        />
      </div>
    </div>
  );
}