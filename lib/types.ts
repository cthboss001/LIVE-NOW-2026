export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskType = 'ASSIGNMENT' | 'EXAM' | 'PROJECT' | 'LAB' | 'OTHER';
export type Category = 'CP' | 'PROJECT' | 'LEARNING';

export interface AcademicTask {
  id: string;
  title: string;
  course: string;
  description?: string | null;
  dueDate: Date;
  priority: Priority;
  type: TaskType;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecondaryTask {
  id: string;
  title: string;
  category: Category;
  description?: string | null;
  goal?: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
