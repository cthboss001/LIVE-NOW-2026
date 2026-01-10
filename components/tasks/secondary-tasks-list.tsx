'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Lock, Unlock, Code, Folder, BookOpen, Plus, Sparkles } from 'lucide-react';
import { SecondaryTask } from '@/lib/types';

interface SecondaryTasksListProps {
  tasks: SecondaryTask[];
  isLocked: boolean;
  onToggleComplete: (id: string, completed: boolean) => void;
  onAdd: () => void;
}

export function SecondaryTasksList({ tasks, isLocked, onToggleComplete, onAdd }: SecondaryTasksListProps) {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'CP':
        return <Code className="h-4 w-4" />;
      case 'PROJECT':
        return <Folder className="h-4 w-4" />;
      case 'LEARNING':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'CP':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'PROJECT':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'LEARNING':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div
      animate={{
        opacity: isLocked ? 0.5 : 1,
        filter: isLocked ? 'blur(2px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {isLocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg border-2 border-dashed border-yellow-500/50"
        >
          <div className="text-center p-8">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Lock className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">🔒 Section Locked</h3>
            <p className="text-muted-foreground max-w-md">
              Complete all academic tasks first! Secondary activities are only accessible when your
              academic responsibilities are done.
            </p>
          </div>
        </motion.div>
      )}

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {isLocked ? (
                <Lock className="h-6 w-6 text-yellow-500" />
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Unlock className="h-6 w-6 text-green-500" />
                </motion.div>
              )}
              Secondary Tasks
              {!isLocked && pendingTasks.length > 0 && (
                <Badge variant="secondary">{pendingTasks.length} goals</Badge>
              )}
            </CardTitle>
            {!isLocked && (
              <Button onClick={onAdd} size="sm" variant="secondary" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Goal
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLocked && tasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No secondary goals yet. Add your personal goals and projects!</p>
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
                    className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => !isLocked && onToggleComplete(task.id, true)}
                        className="mt-1 text-muted-foreground hover:text-green-500 transition-colors disabled:opacity-50"
                        disabled={isLocked}
                      >
                        <Circle className="h-5 w-5" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <Badge className={getCategoryColor(task.category)} variant="outline">
                            <span className="flex items-center gap-1">
                              {getCategoryIcon(task.category)}
                              {task.category}
                            </span>
                          </Badge>
                        </div>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        )}
                        {task.goal && (
                          <p className="text-xs text-muted-foreground">
                            🎯 Goal: {task.goal}
                          </p>
                        )}
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
                            onClick={() => !isLocked && onToggleComplete(task.id, false)}
                            className="text-green-500"
                            disabled={isLocked}
                          >
                            <CheckCircle2 className="h-5 w-5" />
                          </button>
                          <div className="flex-1">
                            <p className="line-through">{task.title}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              {getCategoryIcon(task.category)}
                              {task.category}
                            </p>
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
    </motion.div>
  );
}
