import React from 'react';
import Link from 'next/link';
import { INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_PRODUCTIVITY } from '@/data/seedData';
import { ProductivityStats } from '@/features/analytics/components/ProductivityStats';
import { ProjectCard } from '@/features/projects/components/ProjectCard';
import { TaskCard } from '@/features/tasks/components/TaskCard';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Plus } from 'lucide-react';

export default function DashboardPage() {
  const urgentTasks = INITIAL_TASKS.filter((t) => t.priority === 'urgent' || t.priority === 'high');

  return (
    <div>
      {/* Welcome Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Sparkles size={16} style={{ color: 'var(--accent-amber)' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-amber)' }}>
              Welcome back
            </span>
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
            Personal Command Center
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Here is your daily snapshot and prioritized focus list.
          </p>
        </div>

        <Link href="/projects" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="sm" icon={<Plus size={16} />}>
            New Project
          </Button>
        </Link>
      </div>

      {/* Productivity Stats Scorecards */}
      <ProductivityStats stats={INITIAL_PRODUCTIVITY} />

      {/* Active Projects Grid */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Active Projects
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Workspaces requiring your focus
            </span>
          </div>
          <Link
            href="/projects"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {INITIAL_PROJECTS.map((project) => {
            const projectTasks = INITIAL_TASKS.filter((t) => t.projectId === project.id);
            const completed = projectTasks.filter((t) => t.status === 'done');
            return (
              <ProjectCard
                key={project.id}
                project={project}
                taskCount={projectTasks.length}
                completedTaskCount={completed.length}
              />
            );
          })}
        </div>
      </div>

      {/* Urgent Tasks Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Priority Action Items
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Tasks flagged as Urgent or High priority
            </span>
          </div>
          <Link
            href="/tasks"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            All Tasks <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {urgentTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
