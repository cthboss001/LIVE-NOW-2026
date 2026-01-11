'use client';

import { useEffect, useState } from 'react';
import { PriorityStatus } from '@/components/dashboard/priority-status';
import { StatsOverview } from '@/components/dashboard/stats-overview';
import { AcademicTasksList } from '@/components/tasks/academic-tasks-list';
import { SecondaryTasksList } from '@/components/tasks/secondary-tasks-list';
import { AcademicTask, SecondaryTask } from '@/lib/types';
import { isToday, isThisWeek } from 'date-fns';

export default function Home() {
  const [academicTasks, setAcademicTasks] = useState<AcademicTask[]>([]);
  const [secondaryTasks, setSecondaryTasks] = useState<SecondaryTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const [academicRes, secondaryRes] = await Promise.all([
        fetch('/api/academic-tasks'),
        fetch('/api/secondary-tasks'),
      ]);

      const academic = await academicRes.json();
      const secondary = await secondaryRes.json();

      setAcademicTasks(academic);
      setSecondaryTasks(secondary);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAcademicToggle = async (id: string, completed: boolean) => {
    try {
      const response = await fetch('/api/academic-tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed }),
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error updating academic task:', error);
    }
  };

  const handleSecondaryToggle = async (id: string, completed: boolean) => {
    try {
      const response = await fetch('/api/secondary-tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed }),
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error updating secondary task:', error);
    }
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
