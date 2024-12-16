import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Settings, 
  Receipt, 
  CreditCard,
  History,
  ChefHat,
  Utensils
} from 'lucide-react';

export const cashierNavItems = [
  { 
    path: '/dashboard', 
    icon: LayoutDashboard, 
    label: 'Dashboard' 
  },
  { 
    path: '/orders', 
    icon: ShoppingCart, 
    label: 'New Order' 
  },
  { 
    path: '/payments', 
    icon: CreditCard, 
    label: 'Payments' 
  },
  { 
    path: '/receipts', 
    icon: Receipt, 
    label: 'Receipts' 
  },
  { 
    path: '/order-history', 
    icon: History, 
    label: 'Order History' 
  }
];

export const adminNavItems = [
  { 
    path: '/admin', 
    icon: LayoutDashboard, 
    label: 'Dashboard' 
  },
  { 
    path: '/orders', 
    icon: ShoppingCart, 
    label: 'Orders' 
  },
  { 
    path: '/kitchen', 
    icon: ChefHat, 
    label: 'Kitchen' 
  },
  { 
    path: '/menu', 
    icon: Utensils, 
    label: 'Menu Items' 
  },
  { 
    path: '/users', 
    icon: Users, 
    label: 'Staff Management' 
  },
  { 
    path: '/settings', 
    icon: Settings, 
    label: 'Settings' 
  }
];