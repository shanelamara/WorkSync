import React from 'react';
import { ThemeSelector } from '@/features/settings/components/ThemeSelector';

export default function SettingsPage() {
  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
          Workspace Settings
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Personalize your interface, custom priority levels, and workflow rules.
        </p>
      </div>

      <ThemeSelector />
    </div>
  );
}
