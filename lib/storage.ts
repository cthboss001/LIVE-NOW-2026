// Browser localStorage utilities for Academic Priority Tracker

export interface AcademicTask {
  id: string;
  title: string;
  description: string;
  course: string;
  dueDate: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  type: 'ASSIGNMENT' | 'EXAM' | 'PROJECT' | 'LAB' | 'OTHER';
  completed: boolean;
  createdAt: string;
}

export interface SecondaryTask {
  id: string;
  title: string;
  description: string;
  category: 'CP' | 'PROJECT' | 'LEARNING';
  completed: boolean;
  createdAt: string;
}

const ACADEMIC_TASKS_KEY = 'academic_tasks';
const SECONDARY_TASKS_KEY = 'secondary_tasks';

// Academic Tasks
export const getAcademicTasks = (): AcademicTask[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(ACADEMIC_TASKS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveAcademicTask = (task: Omit<AcademicTask, 'id' | 'createdAt'>): AcademicTask => {
  const tasks = getAcademicTasks();
  const newTask: AcademicTask = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  localStorage.setItem(ACADEMIC_TASKS_KEY, JSON.stringify(tasks));
  return newTask;
};

export const updateAcademicTask = (id: string, updates: Partial<AcademicTask>): AcademicTask | null => {
  const tasks = getAcademicTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  tasks[index] = { ...tasks[index], ...updates };
  localStorage.setItem(ACADEMIC_TASKS_KEY, JSON.stringify(tasks));
  return tasks[index];
};

export const deleteAcademicTask = (id: string): boolean => {
  const tasks = getAcademicTasks();
  const filtered = tasks.filter(t => t.id !== id);
  localStorage.setItem(ACADEMIC_TASKS_KEY, JSON.stringify(filtered));
  return filtered.length < tasks.length;
};

// Secondary Tasks
export const getSecondaryTasks = (): SecondaryTask[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(SECONDARY_TASKS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveSecondaryTask = (task: Omit<SecondaryTask, 'id' | 'createdAt'>): SecondaryTask => {
  const tasks = getSecondaryTasks();
  const newTask: SecondaryTask = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  localStorage.setItem(SECONDARY_TASKS_KEY, JSON.stringify(tasks));
  return newTask;
};

export const updateSecondaryTask = (id: string, updates: Partial<SecondaryTask>): SecondaryTask | null => {
  const tasks = getSecondaryTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  tasks[index] = { ...tasks[index], ...updates };
  localStorage.setItem(SECONDARY_TASKS_KEY, JSON.stringify(tasks));
  return tasks[index];
};

export const deleteSecondaryTask = (id: string): boolean => {
  const tasks = getSecondaryTasks();
  const filtered = tasks.filter(t => t.id !== id);
  localStorage.setItem(SECONDARY_TASKS_KEY, JSON.stringify(filtered));
  return filtered.length < tasks.length;
};

// Initialize with demo data if empty
export const initializeDemoData = () => {
  if (typeof window === 'undefined') return;
  
  const academicTasks = getAcademicTasks();
  const secondaryTasks = getSecondaryTasks();
  
  if (academicTasks.length === 0) {
    saveAcademicTask({
      title: 'Data Structures Assignment 3',
      description: 'Implement AVL Tree with rotations',
      course: 'CSE-301',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'HIGH',
      type: 'ASSIGNMENT',
      completed: false,
    });
    
    saveAcademicTask({
      title: 'Database Lab Report',
      description: 'Submit ER diagram and SQL queries',
      course: 'CSE-401',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'MEDIUM',
      type: 'LAB',
      completed: false,
    });
  }
  
  if (secondaryTasks.length === 0) {
    saveSecondaryTask({
      title: 'Solve 5 LeetCode Problems',
      description: 'Focus on dynamic programming',
      category: 'CP',
      completed: false,
    });
    
    saveSecondaryTask({
      title: 'Build Portfolio Website',
      description: 'Showcase projects and skills',
      category: 'PROJECT',
      completed: false,
    });
  }
};