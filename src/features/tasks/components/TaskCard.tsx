import React from 'react';
import { Task } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Circle, Clock, CheckSquare, Tag } from 'lucide-react';
import { formatDate, getPriorityMeta } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggleStatus?: (taskId: string) => void;
  onShiftStage?: (taskId: string, direction: -1 | 1) => void;
  onClick?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleStatus,
  onShiftStage,
  onClick,
}) => {
  const isDone = task.status === 'done';
  const priorityMeta = getPriorityMeta(task.priority);
  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;

  return (
    <Card
      interactive
      onClick={() => onClick && onClick(task)}
      style={{
        padding: '0.9rem 1rem',
        opacity: isDone ? 0.7 : 1,
        border: isDone ? '1px solid var(--border-subtle)' : undefined,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
        {/* Completion Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus && onToggleStatus(task.id);
          }}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            marginTop: '2px',
            color: isDone ? 'var(--accent-emerald)' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h4
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: isDone ? 'var(--text-muted)' : 'var(--text-primary)',
              textDecoration: isDone ? 'line-through' : 'none',
              lineHeight: 1.4,
              marginBottom: '0.35rem',
            }}
          >
            {task.title}
          </h4>

          {task.description && (
            <p
              style={{
                fontSize: '0.775rem',
                color: 'var(--text-muted)',
                marginBottom: '0.65rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {task.description}
            </p>
          )}

          {/* Metadata Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.45rem',
              marginTop: '0.5rem',
            }}
          >
            <Badge
              label={priorityMeta.label}
              variant={task.priority}
              dot
            />

            {task.dueDate && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.725rem',
                  color: 'var(--text-muted)',
                }}
              >
                <Clock size={12} />
                {formatDate(task.dueDate)}
              </span>
            )}

            {task.subtasks.length > 0 && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.725rem',
                  color: 'var(--text-muted)',
                }}
              >
                <CheckSquare size={12} />
                {completedSubtasks}/{task.subtasks.length}
              </span>
            )}

            {task.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {onShiftStage && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.35rem',
                marginTop: '0.65rem',
                paddingTop: '0.5rem',
                borderTop: '1px dashed var(--border-subtle)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.15rem 0.45rem',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                }}
                onClick={() => onShiftStage(task.id, -1)}
                title="Move to previous stage"
              >
                ← Prev
              </button>
              <button
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.15rem 0.45rem',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                }}
                onClick={() => onShiftStage(task.id, 1)}
                title="Move to next stage"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

