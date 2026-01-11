import { AcademicTask, SecondaryTask } from './types';

// Academic Tasks
export const getAcademicTasks = (): AcademicTask[] => {
  if (typeof window === 'undefined') return [];
  const tasks = localStorage.getItem('academicTasks');
  if (!tasks) return [];
  
  // Parse and convert date strings back to Date objects
  const parsed = JSON.parse(tasks);
  return parsed.map((task: any) => ({
    ...task,
    dueDate: new Date(task.dueDate),
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
  }));
};

export const saveAcademicTasks = (tasks: AcademicTask[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('academicTasks', JSON.stringify(tasks));
};

export const addAcademicTask = (task: Omit<AcademicTask, 'id' | 'createdAt' | 'updatedAt'>): AcademicTask => {
  const tasks = getAcademicTasks();
  const newTask: AcademicTask = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  saveAcademicTasks(tasks);
  return newTask;
};

export const updateAcademicTask = (id: string, updates: Partial<AcademicTask>): void => {
  const tasks = getAcademicTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date() };
    saveAcademicTasks(tasks);
  }
};

export const deleteAcademicTask = (id: string): void => {
  const tasks = getAcademicTasks();
  saveAcademicTasks(tasks.filter(t => t.id !== id));
};

// Secondary Tasks
export const getSecondaryTasks = (): SecondaryTask[] => {
  if (typeof window === 'undefined') return [];
  const tasks = localStorage.getItem('secondaryTasks');
  if (!tasks) return [];
  
  // Parse and convert date strings back to Date objects
  const parsed = JSON.parse(tasks);
  return parsed.map((task: any) => ({
    ...task,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
  }));
};

export const saveSecondaryTasks = (tasks: SecondaryTask[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('secondaryTasks', JSON.stringify(tasks));
};

export const addSecondaryTask = (task: Omit<SecondaryTask, 'id' | 'createdAt' | 'updatedAt'>): SecondaryTask => {
  const tasks = getSecondaryTasks();
  const newTask: SecondaryTask = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  saveSecondaryTasks(tasks);
  return newTask;
};

export const updateSecondaryTask = (id: string, updates: Partial<SecondaryTask>): void => {
  const tasks = getSecondaryTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date() };
    saveSecondaryTasks(tasks);
  }
};

export const deleteSecondaryTask = (id: string): void => {
  const tasks = getSecondaryTasks();
  saveSecondaryTasks(tasks.filter(t => t.id !== id));
};