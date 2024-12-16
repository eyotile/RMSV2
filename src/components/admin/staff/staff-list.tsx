import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { GlassCard } from '../../ui/glass-card';

interface StaffMember {
  id: string;
  name: string;
  username: string;
  role: string;
  lastActive: string;
}

interface StaffListProps {
  staff: StaffMember[];
  onEdit: (member: StaffMember) => void;
  onDelete: (id: string) => void;
}

export function StaffList({ staff, onEdit, onDelete }: StaffListProps) {
  return (
    <div className="space-y-4">
      {staff.map((member) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-primary-900">{member.name}</h3>
              <p className="text-sm text-primary-600">@{member.username}</p>
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full capitalize">
                {member.role}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(member)}
                className="p-2 hover:bg-primary-100 rounded-full transition-colors"
              >
                <Edit2 className="w-4 h-4 text-primary-600" />
              </button>
              <button
                onClick={() => onDelete(member.id)}
                className="p-2 hover:bg-red-100 rounded-full transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}