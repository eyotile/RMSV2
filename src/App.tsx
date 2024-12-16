import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { DashboardLayout } from './components/layout/dashboard-layout';
import { OrdersPage } from './pages/orders';
import { KitchenPage } from './pages/kitchen';
import { AdminDashboard } from './pages/admin/dashboard';
import { CashierDashboard } from './pages/cashier/dashboard';
import { PaymentsPage } from './pages/cashier/payments';
import { ReceiptsPage } from './pages/cashier/receipts';
import { OrderHistoryPage } from './pages/cashier/order-history';
import { MenuManagementPage } from './pages/admin/menu';
import { StaffManagementPage } from './pages/admin/staff';
import { SettingsPage } from './pages/admin/settings';
import { ProtectedRoute } from './components/auth/protected-route';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Cashier Routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={['cashier']}>
                <CashierDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="payments"
            element={
              <ProtectedRoute allowedRoles={['cashier']}>
                <PaymentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="receipts"
            element={
              <ProtectedRoute allowedRoles={['cashier']}>
                <ReceiptsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="order-history"
            element={
              <ProtectedRoute allowedRoles={['cashier']}>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="menu"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MenuManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <StaffManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* Shared Routes */}
          <Route
            path="orders"
            element={
              <ProtectedRoute allowedRoles={['admin', 'cashier']}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="kitchen"
            element={
              <ProtectedRoute allowedRoles={['admin', 'kitchen']}>
                <KitchenPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}