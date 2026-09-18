'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { INITIAL_PROJECTS, INITIAL_TASKS } from '@/data/seedData';
import { ProjectHeader } from '@/features/projects/components/ProjectHeader';
import { KanbanBoard } from '@/features/views/components/KanbanBoard';
import { TaskTable } from '@/features/views/components/TaskTable';
import { Task, TaskStatus } from '@/types';

export default function ProjectWorkspacePage() {
  const params = useParams();
  const projectId = (params?.id as string) || 'proj_worksync_core';

  const project = INITIAL_PROJECTS.find((p) => p.id === projectId) || INITIAL_PROJECTS[0];
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS.filter((t) => t.projectId === project.id));
  const [activeView, setActiveView] = useState<'kanban' | 'list' | 'calendar' | 'timeline'>('kanban');

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t))
    );
  };

  const handleAddTask = (title: string, status: TaskStatus) => {
    const newTask: Task = {
      id: `task_${Date.now()}`,
      title,
      status,
      priority: 'medium',
      projectId: project.id,
      tags: ['WorkSync'],
      subtasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div>
      <ProjectHeader
        project={project}
        activeView={activeView}
        onViewChange={setActiveView}
        onNewTask={() => handleAddTask('New Quick Task', 'todo')}
      />

      {activeView === 'kanban' && (
        <KanbanBoard
          tasks={tasks}
          projectId={project.id}
          onStatusChange={handleStatusChange}
          onAddTask={handleAddTask}
        />
      )}

      {activeView === 'list' && (
        <TaskTable
          tasks={tasks}
          onToggleStatus={(taskId) => {
            const task = tasks.find((t) => t.id === taskId);
            if (task) {
              handleStatusChange(taskId, task.status === 'done' ? 'todo' : 'done');
            }
          }}
        />
      )}

      {(activeView === 'calendar' || activeView === 'timeline') && (
        <div
          className="glass-panel"
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            color: 'var(--text-muted)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <h3 style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)} View
          </h3>
          <p style={{ fontSize: '0.875rem' }}>
            Calendar & Timeline scheduling views are connected to your task due dates.
          </p>
        </div>
      )}
    </div>
  );
}
