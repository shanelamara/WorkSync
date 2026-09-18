export type { Task, Subtask, TaskPriority, TaskStatus } from '@/types';

export interface CreateTaskDTO {
  title: string;
  description?: string;
  projectId: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  status?: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  dueDate?: string;
  tags?: string[];
  timeEstimateHours?: number;
}

export interface UpdateTaskDTO extends Partial<CreateTaskDTO> {
  timeSpentHours?: number;
  subtasks?: { id: string; title: string; completed: boolean }[];
}
