'use client';

import React from 'react';
import { Task, TaskStatus } from '@/types';
import { TaskCard } from '@/features/tasks/components/TaskCard';
import { TaskQuickAdd } from '@/features/tasks/components/TaskQuickAdd';
import { getStatusMeta } from '@/lib/utils';

interface KanbanBoardProps {
  tasks: Task[];
  projectId: string;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  onAddTask?: (title: string, status: TaskStatus) => void;
}

const COLUMNS: TaskStatus[] = ['backlog', 'todo', 'in-progress', 'review', 'done'];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  projectId,
  onStatusChange,
  onAddTask,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(280px, 1fr))',
        gap: '1.25rem',
        overflowX: 'auto',
        paddingBottom: '1.5rem',
      }}
    >
      {COLUMNS.map((columnStatus) => {
        const columnTasks = tasks.filter((t) => t.status === columnStatus);
        const meta = getStatusMeta(columnStatus);

        return (
          <div
            key={columnStatus}
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.45)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 'calc(100vh - 220px)',
            }}
          >
            {/* Column Header */}
            <div
              style={{
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: meta.color,
                  }}
                />
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {meta.label}
                </h3>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.1rem 0.45rem',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                {columnTasks.length}
              </span>
            </div>

            {/* Cards Container */}
            <div
              style={{
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                overflowY: 'auto',
                flex: 1,
              }}
            >
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleStatus={() => {
                    const next = task.status === 'done' ? 'todo' : 'done';
                    onStatusChange && onStatusChange(task.id, next);
                  }}
                />
              ))}

              {columnTasks.length === 0 && (
                <div
                  style={{
                    padding: '1.5rem 0.5rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                  }}
                >
                  No tasks in {meta.label.toLowerCase()}
                </div>
              )}
            </div>

            {/* Quick Add at bottom of column */}
            <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <TaskQuickAdd
                projectId={projectId}
                defaultStatus={columnStatus}
                onAddTask={(title) => onAddTask && onAddTask(title, columnStatus)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
