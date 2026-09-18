export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  dueDate?: string; // ISO date string YYYY-MM-DD
  tags: string[];
  timeEstimateHours?: number;
  timeSpentHours?: number;
  subtasks: Subtask[];
  createdAt: string;
  updatedAt: string;
}

export type ProjectCategory = 'work' | 'personal' | 'side-project' | 'learning';

export type ProjectStatus = 'active' | 'on-hold' | 'completed' | 'archived';

export interface Project {
  id: string;
  name: string;
  description: string;
  key: string; // e.g. "WS" or "PRJ"
  color: string; // hex or CSS color token
  category: ProjectCategory;
  status: ProjectStatus;
  icon?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  accentColor: string;
  defaultView: 'kanban' | 'list' | 'calendar';
  dailyFocusHoursGoal: number;
  pomodoroMinutes: number;
}

export interface ProductivitySummary {
  tasksCompletedToday: number;
  tasksDueThisWeek: number;
  activeProjectsCount: number;
  currentStreakDays: number;
  completionRatePercent: number;
  weeklyVelocity: number[];
}
