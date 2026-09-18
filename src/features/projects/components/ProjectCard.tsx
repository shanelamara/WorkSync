import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  taskCount?: number;
  completedTaskCount?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  taskCount = 0,
  completedTaskCount = 0,
}) => {
  const progress = taskCount > 0 ? Math.round((completedTaskCount / taskCount) * 100) : 0;

  return (
    <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card interactive style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '4px',
                backgroundColor: project.color,
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                fontWeight: 600,
              }}
            >
              {project.key}
            </span>
          </div>
          <Badge label={project.status} variant="neutral" />
        </div>

        <h3
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {project.name}
          <ArrowUpRight size={16} style={{ color: 'var(--text-muted)' }} />
        </h3>

        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: '1.25rem',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Progress bar */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Progress</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{progress}%</span>
          </div>
          <div
            style={{
              height: '5px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: project.color,
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={13} />
            <span>{formatDate(project.dueDate)}</span>
          </div>
          <span>
            {completedTaskCount}/{taskCount} tasks
          </span>
        </div>
      </Card>
    </Link>
  );
};
