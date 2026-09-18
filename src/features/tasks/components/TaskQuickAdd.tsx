'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TaskQuickAddProps {
  projectId: string;
  defaultStatus?: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  onAddTask: (title: string) => void;
}

export const TaskQuickAdd: React.FC<TaskQuickAddProps> = ({
  onAddTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title.trim());
    setTitle('');
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.55rem 0.75rem',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-subtle)',
          backgroundColor: 'transparent',
          color: 'var(--text-muted)',
          fontSize: '0.8125rem',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-strong)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
          e.currentTarget.style.color = 'var(--text-muted)';
        }}
      >
        <Plus size={14} />
        <span>Add a task...</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--accent-primary)',
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: '0.8125rem',
          outline: 'none',
        }}
      />
      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setTitle('');
            setIsEditing(false);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm">
          Add
        </Button>
      </div>
    </form>
  );
};
