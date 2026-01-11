'use client';

import { useEffect, useState } from 'react';
import { PriorityStatus } from '@/components/dashboard/priority-status';
import { StatsOverview } from '@/components/dashboard/stats-overview';
import { AcademicTasksList } from '@/components/tasks/academic-tasks-list';
import { SecondaryTasksList } from '@/components/tasks/secondary-tasks-list';
import { AcademicTask, SecondaryTask } from '@/lib/types';
import { 
  getAcademicTasks, 
  getSecondaryTasks, 
  updateAcademicTask, 
  updateSecondaryTask 
} from '@/lib/storage';
import { isToday, isThisWeek } from 'date-fns';

export default function Home() {
  const [academicTasks, setAcademicTasks] = useState<AcademicTask[]>([]);
  const [secondaryTasks, setSecondaryTasks] = useState<SecondaryTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTasks = () => {
    if (typeof window !== 'undefined') {
      const academic = getAcademicTasks();
      const secondary = getSecondaryTasks();
      setAcademicTasks(academic);
      setSecondaryTasks(secondary);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAcademicToggle = (id: string, completed: boolean) => {
    updateAcademicTask(id, { completed });
    loadTasks();
  };

  const handleSecondaryToggle = (id: string, completed: boolean) => {
    updateSecondaryTask(id, { completed });
    loadTasks();
  };

  const pendingAcademicTasks = academicTasks.filter((task) => !task.completed);
  const hasAcademicTasks = pendingAcademicTasks.length > 0;

  const completedToday = academicTasks.filter(
    (task) => task.completed && isToday(new Date(task.updatedAt))
  ).length;

  const dueThisWeek = pendingAcademicTasks.filter((task) =>
    isThisWeek(new Date(task.dueDate))
  ).length;

  const pendingSecondaryTasks = secondaryTasks.filter((task) => !task.completed);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PriorityStatus 
          hasAcademicTasks={hasAcademicTasks} 
          pendingCount={pendingAcademicTasks.length} 
        />

        <StatsOverview
          totalAcademic={pendingAcademicTasks.length}
          completedToday={completedToday}
          dueThisWeek={dueThisWeek}
          totalSecondary={pendingSecondaryTasks.length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AcademicTasksList
            tasks={academicTasks}
            onToggleComplete={handleAcademicToggle}
            onAdd={() => alert('Add academic task functionality - to be implemented')}
          />

          <SecondaryTasksList
            tasks={secondaryTasks}
            isLocked={hasAcademicTasks}
            onToggleComplete={handleSecondaryToggle}
            onAdd={() => alert('Add secondary task functionality - to be implemented')}
          />
        </div>
      </div>
    </main>
  );
}
