export type { Project, ProjectCategory, ProjectStatus } from '@/types';

export interface CreateProjectDTO {
  name: string;
  description: string;
  key: string;
  color: string;
  category: 'work' | 'personal' | 'side-project' | 'learning';
  dueDate?: string;
}

export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {
  status?: 'active' | 'on-hold' | 'completed' | 'archived';
}
