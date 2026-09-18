'use client';

import React from 'react';
import { Task } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatDate, getPriorityMeta, getStatusMeta } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

interface TaskTableProps {
  tasks: Task[];
  onToggleStatus?: (taskId: string) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks, onToggleStatus }) => {
  return (
    <div
      className="glass-panel"
      style={{
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
        <thead>
          <tr
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <th style={{ padding: '0.75rem 1rem', width: '40px' }}>Done</th>
            <th style={{ padding: '0.75rem 1rem' }}>Task Title</th>
            <th style={{ padding: '0.75rem 1rem', width: '120px' }}>Status</th>
            <th style={{ padding: '0.75rem 1rem', width: '100px' }}>Priority</th>
            <th style={{ padding: '0.75rem 1rem', width: '140px' }}>Due Date</th>
            <th style={{ padding: '0.75rem 1rem', width: '120px' }}>Subtasks</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const isDone = task.status === 'done';
            const priority = getPriorityMeta(task.priority);
            const status = getStatusMeta(task.status);
            const completedSubs = task.subtasks.filter((s) => s.completed).length;

            return (
              <tr
                key={task.id}
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  transition: 'background var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td style={{ padding: '0.75rem 1rem' }}>
                  <button
                    onClick={() => onToggleStatus && onToggleStatus(task.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: isDone ? 'var(--accent-emerald)' : 'var(--text-muted)',
                      display: 'flex',
                    }}
                  >
                    {isDone ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  </button>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: isDone ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                  <span style={{ textDecoration: isDone ? 'line-through' : 'none' }}>
                    {task.title}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: status.color,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: status.color }} />
                    {status.label}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <Badge label={priority.label} variant={task.priority} dot />
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                  {formatDate(task.dueDate)}
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                  {task.subtasks.length > 0 ? `${completedSubs}/${task.subtasks.length}` : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
