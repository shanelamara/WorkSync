import { NextResponse } from 'next/server';
import { INITIAL_TASKS } from '@/data/seedData';
import { generateId } from '@/lib/utils';
import { Task } from '@/types';

let tasks: Task[] = [...INITIAL_TASKS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');

  if (projectId) {
    return NextResponse.json(tasks.filter((t) => t.projectId === projectId));
  }
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTask: Task = {
      id: generateId('task'),
      title: body.title || 'Untitled Task',
      description: body.description || '',
      status: body.status || 'todo',
      priority: body.priority || 'medium',
      projectId: body.projectId || 'proj_worksync_core',
      dueDate: body.dueDate,
      tags: body.tags || [],
      subtasks: body.subtasks || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks = [newTask, ...tasks];
    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 400 });
  }
}
