import { TaskPriority, TaskStatus } from '@/types';

/**
 * Combines conditional CSS class names into a single string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generates a unique, URL-safe random identifier
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
}

/**
 * Formats a date string into human-friendly relative or calendar format
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return 'No due date';
  
  const target = new Date(dateString);
  const now = new Date();
  
  // Reset time portions for accurate day comparison
  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffDays = Math.round((targetDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `${Math.abs(diffDays)}d overdue`;
  }
  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Tomorrow';
  }
  if (diffDays < 7) {
    return `In ${diffDays} days`;
  }

  return target.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Maps task priority to UI color styling token
 */
export function getPriorityMeta(priority: TaskPriority) {
  switch (priority) {
    case 'urgent':
      return { label: 'Urgent', colorClass: 'badge-urgent', dotColor: '#ef4444' };
    case 'high':
      return { label: 'High', colorClass: 'badge-high', dotColor: '#f97316' };
    case 'medium':
      return { label: 'Medium', colorClass: 'badge-medium', dotColor: '#eab308' };
    case 'low':
      return { label: 'Low', colorClass: 'badge-low', dotColor: '#3b82f6' };
    default:
      return { label: priority, colorClass: 'badge-default', dotColor: '#94a3b8' };
  }
}

/**
 * Maps task status to readable meta information
 */
export function getStatusMeta(status: TaskStatus) {
  switch (status) {
    case 'backlog':
      return { label: 'Backlog', color: '#64748b' };
    case 'todo':
      return { label: 'To Do', color: '#38bdf8' };
    case 'in-progress':
      return { label: 'In Progress', color: '#818cf8' };
    case 'review':
      return { label: 'Review', color: '#c084fc' };
    case 'done':
      return { label: 'Done', color: '#34d399' };
    default:
      return { label: status, color: '#94a3b8' };
  }
}
