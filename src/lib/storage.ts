import { Project, Task, UserPreferences, ProductivitySummary } from '@/types';
import { INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_PREFERENCES, INITIAL_PRODUCTIVITY } from '@/data/seedData';

const STORAGE_KEYS = {
  PROJECTS: 'worksync_projects_v1',
  TASKS: 'worksync_tasks_v1',
  PREFERENCES: 'worksync_preferences_v1',
};

/**
 * Storage service providing offline-first local persistence
 * with immediate fallback to initial seed data.
 */
export const storage = {
  getProjects(): Project[] {
    if (typeof window === 'undefined') return INITIAL_PROJECTS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return data ? JSON.parse(data) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  },

  saveProjects(projects: Project[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  },

  getTasks(): Task[] {
    if (typeof window === 'undefined') return INITIAL_TASKS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  },

  saveTasks(tasks: Task[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  },

  getPreferences(): UserPreferences {
    if (typeof window === 'undefined') return INITIAL_PREFERENCES;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return data ? JSON.parse(data) : INITIAL_PREFERENCES;
    } catch {
      return INITIAL_PREFERENCES;
    }
  },

  savePreferences(prefs: UserPreferences): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    } catch (e) {
      console.error('Failed to save preferences to localStorage', e);
    }
  },

  getProductivity(): ProductivitySummary {
    return INITIAL_PRODUCTIVITY;
  }
};
