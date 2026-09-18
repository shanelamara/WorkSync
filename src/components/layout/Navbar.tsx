'use client';

import React, { useState } from 'react';
import { Search, Plus, Bell, Command, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

interface NavbarProps {
  onOpenQuickAdd?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuickAdd }) => {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleOpen = () => {
    if (onOpenQuickAdd) onOpenQuickAdd();
    else setIsQuickAddOpen(true);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    alert(`Task "${taskTitle}" queued!`);
    setTaskTitle('');
    setIsQuickAddOpen(false);
  };

  return (
    <>
      <header
        style={{
          height: '64px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          flexShrink: 0,
        }}
      >
        {/* Search & Quick Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '380px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem 0.85rem',
              width: '100%',
              color: 'var(--text-muted)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            <Search size={15} />
            <span style={{ flex: 1 }}>Search tasks, projects, tags...</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.15rem',
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '0.15rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <Command size={10} /> K
            </span>
          </div>
        </div>

        {/* Action Controls & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={handleOpen}>
            New Task
          </Button>

          <button
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Bell size={16} />
          </button>

          {/* User Avatar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              paddingLeft: '0.5rem',
              borderLeft: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              WS
            </div>
          </div>
        </div>
      </header>

      {/* Quick Add Modal */}
      <Modal isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} title="Quick Create Task">
        <form onSubmit={handleQuickSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            label="Task Name"
            placeholder="e.g., Update system documentation"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            autoFocus
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Button variant="ghost" type="button" onClick={() => setIsQuickAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
