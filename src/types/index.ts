export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Subject {
  id: string;
  name: string;
  code?: string;
  color: string;
  icon?: string;
  professor?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  subject: Subject;
  dueDate: Date;
  priority: Priority;
  status: TaskStatus;
  tags: string[];
  estimatedTime?: number;
  actualTime?: number;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  todayTasks: number;
  productivity: number;
}