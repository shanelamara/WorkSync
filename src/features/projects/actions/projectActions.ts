'use server';

import { Project } from '@/types';
import { CreateProjectDTO, UpdateProjectDTO } from '../types';
import { generateId } from '@/lib/utils';
import { INITIAL_PROJECTS } from '@/data/seedData';

// Simulated persistent in-memory repository (extensible to Prisma/SQLite)
let projectsStore: Project[] = [...INITIAL_PROJECTS];

export async function getProjectsAction(): Promise<Project[]> {
  return projectsStore;
}

export async function getProjectByIdAction(id: string): Promise<Project | null> {
  const project = projectsStore.find((p) => p.id === id);
  return project || null;
}

export async function createProjectAction(dto: CreateProjectDTO): Promise<Project> {
  const newProject: Project = {
    id: generateId('proj'),
    name: dto.name,
    description: dto.description,
    key: dto.key.toUpperCase(),
    color: dto.color,
    category: dto.category,
    status: 'active',
    dueDate: dto.dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  projectsStore = [newProject, ...projectsStore];
  return newProject;
}

export async function updateProjectAction(id: string, dto: UpdateProjectDTO): Promise<Project | null> {
  const index = projectsStore.findIndex((p) => p.id === id);
  if (index === -1) return null;

  projectsStore[index] = {
    ...projectsStore[index],
    ...dto,
    updatedAt: new Date().toISOString(),
  };

  return projectsStore[index];
}

export async function deleteProjectAction(id: string): Promise<boolean> {
  const initialLen = projectsStore.length;
  projectsStore = projectsStore.filter((p) => p.id !== id);
  return projectsStore.length < initialLen;
}
