import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, icon, className }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/20",
        "hover:bg-white/40 transition-all duration-300",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-primary-600 text-sm font-medium uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-bold text-primary-900 mt-2">
            {value}
          </p>
        </div>
        <div className="p-3 bg-white/50 rounded-full">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}