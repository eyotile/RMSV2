import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChefHat, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { useAuthStore } from '../../store/auth.store';
import { cn } from '../../lib/utils';
import { cashierNavItems, adminNavItems } from './sidebar/nav-items';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function NavItem({ to, icon: Icon, children }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-2 p-3 rounded-lg transition-colors',
        'hover:bg-white/20',
        isActive && 'bg-white/30 text-primary-900 font-medium',
        !isActive && 'text-primary-700'
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
}

export function Sidebar() {
  const { logout } = useAuth();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = user?.role === 'admin' ? adminNavItems : cashierNavItems;

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6 min-h-screen flex flex-col"
    >
      <div className="flex items-center gap-2 mb-8">
        <ChefHat className="w-8 h-8 text-primary-600" />
        <span className="text-xl font-bold text-primary-900">RMS</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.path} to={item.path} icon={item.icon}>
            {item.label}
          </NavItem>
        ))}
      </nav>

      <div className="pt-4 border-t border-white/20">
        <div className="p-4 bg-white/10 rounded-lg mb-4">
          <p className="text-sm font-medium text-primary-900">{user?.name}</p>
          <p className="text-xs text-primary-600 capitalize">{user?.role}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-2 p-3 text-primary-600 hover:text-primary-700 hover:bg-white/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}