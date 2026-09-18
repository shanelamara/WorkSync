import React from 'react';
import { cn } from '@/lib/utils';
import { TaskPriority } from '@/types';

interface BadgeProps {
  label: string;
  variant?: 'urgent' | 'high' | 'medium' | 'low' | 'neutral' | 'accent';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  dot = false,
  className,
}) => {
  return (
    <span className={cn('badge', `badge-${variant}`, className)}>
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
      {label}
    </span>
  );
};
