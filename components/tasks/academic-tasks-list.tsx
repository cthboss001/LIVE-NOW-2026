'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock, Calendar, Book, Plus } from 'lucide-react';
import { format, differenceInDays, isPast, isToday, isTomorrow } from 'date-fns';
import { AcademicTask } from '@/lib/types';

interface AcademicTasksListProps {
  tasks: AcademicTask[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onAdd: () => void;
}

export function AcademicTasksList({ tasks, onToggleComplete, onAdd }: AcademicTasksListProps) {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const getUrgencyColor = (dueDate: Date) => {
    const date = new Date(dueDate);
    if (isPast(date) && !isToday(date)) return 'text-red-500 border-red-500';
    if (isToday(date)) return 'text-orange-500 border-orange-500';
    if (isTomorrow(date)) return 'text-yellow-500 border-yellow-500';
    if (differenceInDays(date, new Date()) <= 7) return 'text-blue-500 border-blue-500';
    return 'text-muted-foreground border-border';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'MEDIUM':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'LOW':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    return <Book className="h-4 w-4" />;
  };

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-red-500" />
            Academic Tasks
            {pendingTasks.length > 0 && (
              <Badge variant="destructive">{pendingTasks.length} pending</Badge>
            )}
          </CardTitle>
          <Button onClick={onAdd} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingTasks.length === 0 && completedTasks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No academic tasks yet. Add your first task to get started!</p>
          </div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {pendingTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`p-4 rounded-lg border-2 bg-card hover:bg-accent/50 transition-colors ${getUrgencyColor(
                    task.dueDate
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleComplete(task.id, true)}
                      className="mt-1 text-muted-foreground hover:text-green-500 transition-colors"
                    >
                      <Circle className="h-5 w-5" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        <Badge className={getPriorityColor(task.priority)} variant="outline">
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.course}</p>
                      {task.description && (
                        <p className="text-sm mb-2">{task.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          {getTypeIcon(task.type)}
                          {task.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                          {isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && (
                            <span className="text-red-500 font-semibold ml-1">(OVERDUE)</span>
                          )}
                          {isToday(new Date(task.dueDate)) && (
                            <span className="text-orange-500 font-semibold ml-1">(TODAY)</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {completedTasks.length > 0 && (
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Completed ({completedTasks.length})
                </h4>
                <div className="space-y-2">
                  {completedTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      className="p-3 rounded-lg bg-muted/50 opacity-60"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onToggleComplete(task.id, false)}
                          className="text-green-500"
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </button>
                        <div className="flex-1">
                          <p className="line-through">{task.title}</p>
                          <p className="text-xs text-muted-foreground">{task.course}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
