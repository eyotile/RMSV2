import React, { useState } from 'react';
import { AddStaffForm } from '../../components/admin/staff/add-staff-form';
import { StaffList } from '../../components/admin/staff/staff-list';
import { useUserManagement } from '../../hooks/use-user-management';

const DEMO_STAFF = [
  { id: '1', name: 'John Doe', username: 'cashier', role: 'cashier', lastActive: '2024-03-10' },
  { id: '2', name: 'Jane Smith', username: 'kitchen', role: 'kitchen', lastActive: '2024-03-10' },
  { id: '3', name: 'Admin User', username: 'admin', role: 'admin', lastActive: '2024-03-10' },
];

export function StaffManagementPage() {
  const [staff, setStaff] = useState(DEMO_STAFF);
  const { addUser, isLoading } = useUserManagement();

  const handleAddStaff = async (data: { username: string; password: string; role: string; name: string }) => {
    try {
      await addUser({ username: data.username, password: data.password, role: data.role });
      setStaff([...staff, { 
        id: Date.now().toString(),
        name: data.name,
        username: data.username,
        role: data.role,
        lastActive: new Date().toISOString().split('T')[0]
      }]);
    } catch (error) {
      console.error('Failed to add staff member:', error);
    }
  };

  const handleEditStaff = (member: any) => {
    // Implement edit functionality
    console.log('Edit staff member:', member);
  };

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-primary-900">Staff Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AddStaffForm onSubmit={handleAddStaff} isLoading={isLoading} />
        
        <div>
          <h2 className="text-xl font-semibold text-primary-900 mb-6">Current Staff</h2>
          <StaffList 
            staff={staff}
            onEdit={handleEditStaff}
            onDelete={handleDeleteStaff}
          />
        </div>
      </div>
    </div>
  );
}