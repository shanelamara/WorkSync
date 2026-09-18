import React from 'react';
import { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, Plus, Settings2, BarChart2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ProjectHeaderProps {
  project: Project;
  activeView: 'kanban' | 'list' | 'calendar' | 'timeline';
  onViewChange: (view: 'kanban' | 'list' | 'calendar' | 'timeline') => void;
  onNewTask?: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  activeView,
  onViewChange,
  onNewTask,
}) => {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '3px',
                backgroundColor: project.color,
              }}
            />
            <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              {project.key}
            </span>
            <Badge label={project.status} variant="neutral" />
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>•</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Due {formatDate(project.dueDate)}
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
            {project.name}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.35rem', maxWidth: '650px' }}>
            {project.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Button variant="secondary" size="sm" icon={<Settings2 size={15} />}>
            Project Settings
          </Button>
          <Button variant="primary" size="sm" icon={<Plus size={15} />} onClick={onNewTask}>
            Add Task
          </Button>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.5rem',
          marginTop: '1.25rem',
        }}
      >
        {(['kanban', 'list', 'calendar', 'timeline'] as const).map((view) => {
          const isActive = activeView === view;
          return (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              style={{
                background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                padding: '0.4rem 0.85rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              {view} View
            </button>
          );
        })}
      </div>
    </div>
  );
};
