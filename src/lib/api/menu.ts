import type { MenuItem } from '../../types/order';

// In-memory store for menu items (simulating a database)
let menuItems: MenuItem[] = [
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
];

export const menuApi = {
  getAll: async (): Promise<MenuItem[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return menuItems;
  },

  add: async (item: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItem: MenuItem = {
      ...item,
      id: `${Date.now()}`,
    };
    
    menuItems.push(newItem);
    return newItem;
  },

  update: async (id: string, item: Partial<MenuItem>): Promise<MenuItem> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = menuItems.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Menu item not found');
    
    menuItems[index] = { ...menuItems[index], ...item };
    return menuItems[index];
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    menuItems = menuItems.filter(item => item.id !== id);
  },
};