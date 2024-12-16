import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { GlassCard } from '../ui/glass-card';
import type { MenuItem } from '../../types/order';

interface MenuListProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export function MenuList({ items, onEdit, onDelete }: MenuListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-primary-900">{item.name}</h3>
                  <p className="text-sm text-primary-600">{item.category}</p>
                </div>
                <span className="text-lg font-bold text-primary-700">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              
              <p className="text-sm text-primary-700 mb-4">{item.description}</p>
              
              <div className="flex justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200"
                >
                  <Pencil className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDelete(item.id)}
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}