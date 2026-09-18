'use server';

import { Task, TaskStatus } from '@/types';
import { CreateTaskDTO, UpdateTaskDTO } from '../types';
import { generateId } from '@/lib/utils';
import { INITIAL_TASKS } from '@/data/seedData';

let tasksStore: Task[] = [...INITIAL_TASKS];

export async function getTasksAction(): Promise<Task[]> {
  return tasksStore;
}

export async function getTasksByProjectAction(projectId: string): Promise<Task[]> {
  return tasksStore.filter((t) => t.projectId === projectId);
}

export async function createTaskAction(dto: CreateTaskDTO): Promise<Task> {
  const newTask: Task = {
    id: generateId('task'),
    title: dto.title,
    description: dto.description,
    status: dto.status || 'todo',
    priority: dto.priority || 'medium',
    projectId: dto.projectId,
    dueDate: dto.dueDate,
    tags: dto.tags || [],
    timeEstimateHours: dto.timeEstimateHours,
    timeSpentHours: 0,
    subtasks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasksStore = [newTask, ...tasksStore];
  return newTask;
}

export async function updateTaskStatusAction(id: string, status: TaskStatus): Promise<Task | null> {
  const task = tasksStore.find((t) => t.id === id);
  if (!task) return null;

  task.status = status;
  task.updatedAt = new Date().toISOString();
  return task;
}

export async function updateTaskAction(id: string, dto: UpdateTaskDTO): Promise<Task | null> {
  const task = tasksStore.find((t) => t.id === id);
  if (!task) return null;

  Object.assign(task, dto, { updatedAt: new Date().toISOString() });
  return task;
}

export async function deleteTaskAction(id: string): Promise<boolean> {
  const initialLen = tasksStore.length;
  tasksStore = tasksStore.filter((t) => t.id !== id);
  return tasksStore.length < initialLen;
}
