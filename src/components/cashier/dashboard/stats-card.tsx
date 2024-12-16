import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../ui/glass-card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, icon, className }: StatsCardProps) {
  return (
    <GlassCard className={className}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-primary-600 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-primary-900 mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-primary-100 rounded-full">
          {icon}
        </div>
      </div>
    </GlassCard>
  );
}