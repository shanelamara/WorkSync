'use client';

import React, { useState } from 'react';
import { INITIAL_TASKS } from '@/data/seedData';
import { TaskTable } from '@/features/views/components/TaskTable';
import { Button } from '@/components/ui/Button';
import { Plus, CheckCircle2, ListFilter } from 'lucide-react';
import { Task, TaskPriority } from '@/types';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredTasks = tasks.filter((t) => {
    if (filterPriority === 'all') return true;
    return t.priority === filterPriority;
  });

  const handleToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: t.status === 'done' ? 'todo' : 'done', updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
            My Tasks
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Unified personal inbox and prioritized action items across all projects.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={<Plus size={16} />}>
          Add Task
        </Button>
      </div>

      {/* Priority Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {['all', 'urgent', 'high', 'medium', 'low'].map((p) => {
          const isSelected = filterPriority === p;
          return (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                cursor: 'pointer',
                border: isSelected ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-subtle)',
                backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-secondary)',
                color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                transition: 'all var(--transition-fast)',
              }}
            >
              {p} Priority
            </button>
          );
        })}
      </div>

      <TaskTable tasks={filteredTasks} onToggleStatus={handleToggle} />
    </div>
  );
}
