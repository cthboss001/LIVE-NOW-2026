'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface PriorityStatusProps {
  hasAcademicTasks: boolean;
  pendingCount: number;
}

export function PriorityStatus({ hasAcademicTasks, pendingCount }: PriorityStatusProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative mb-8"
    >
      <motion.div
        animate={{
          backgroundColor: hasAcademicTasks
            ? 'rgb(239, 68, 68)'
            : 'rgb(34, 197, 94)',
        }}
        className="rounded-2xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: hasAcademicTasks ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5, repeat: hasAcademicTasks ? Infinity : 0, repeatDelay: 3 }}
            >
              {hasAcademicTasks ? (
                <AlertCircle className="h-16 w-16" />
              ) : (
                <CheckCircle2 className="h-16 w-16" />
              )}
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {hasAcademicTasks ? '🔴 ACADEMIC MODE' : '🟢 FREE MODE'}
              </h1>
              <p className="text-xl opacity-90">
                {hasAcademicTasks
                  ? `${pendingCount} academic ${pendingCount === 1 ? 'task' : 'tasks'} pending`
                  : 'All academic tasks completed! Time for personal projects.'}
              </p>
            </div>
          </div>
          
          {hasAcademicTasks && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl font-bold opacity-50"
            >
              {pendingCount}
            </motion.div>
          )}
        </div>

        {/* Progress indicator */}
        {hasAcademicTasks && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            className="mt-6 h-2 bg-white/30 rounded-full overflow-hidden"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="h-full w-1/3 bg-white rounded-full"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
