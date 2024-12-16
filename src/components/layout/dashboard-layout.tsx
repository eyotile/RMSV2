import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from './sidebar';

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-100 to-primary-300">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/50 backdrop-blur-lg"
      >
        <Menu className="w-6 h-6 text-primary-600" />
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}