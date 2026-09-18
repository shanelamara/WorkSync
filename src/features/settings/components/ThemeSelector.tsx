'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [accent, setAccent] = useState('#6366f1');

  const themes = [
    { id: 'dark', label: 'Dark Mode', icon: Moon },
    { id: 'light', label: 'Light Mode', icon: Sun },
    { id: 'system', label: 'System Default', icon: Monitor },
  ];

  const colors = [
    { label: 'Indigo', hex: '#6366f1' },
    { label: 'Cyan', hex: '#06b6d4' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Rose', hex: '#f43f5e' },
    { label: 'Amber', hex: '#f59e0b' },
    { label: 'Purple', hex: '#a855f7' },
  ];

  const handleThemeChange = (theme: 'dark' | 'light' | 'system') => {
    setCurrentTheme(theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '680px' }}>
      <Card>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          Interface Theme
        </h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Choose how WorkSync looks for your workflow.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id as 'dark' | 'light' | 'system')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-secondary)',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Icon size={20} style={{ color: isSelected ? 'var(--accent-primary)' : 'inherit' }} />
                <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{theme.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          Accent Color
        </h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Personalize highlights, buttons, and visual tags.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {colors.map((c) => {
            const isSelected = accent === c.hex;
            return (
              <button
                key={c.hex}
                onClick={() => setAccent(c.hex)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: c.hex,
                  border: isSelected ? '3px solid #ffffff' : 'none',
                  boxShadow: isSelected ? '0 0 10px rgba(255,255,255,0.4)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
                title={c.label}
              >
                {isSelected && <Check size={16} />}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
