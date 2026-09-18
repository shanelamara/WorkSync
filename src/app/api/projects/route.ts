import { NextResponse } from 'next/server';
import { INITIAL_PROJECTS } from '@/data/seedData';
import { generateId } from '@/lib/utils';
import { Project } from '@/types';

let projects: Project[] = [...INITIAL_PROJECTS];

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProject: Project = {
      id: generateId('proj'),
      name: body.name || 'Untitled Project',
      description: body.description || '',
      key: (body.key || 'PRJ').toUpperCase(),
      color: body.color || '#6366f1',
      category: body.category || 'personal',
      status: 'active',
      dueDate: body.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projects = [newProject, ...projects];
    return NextResponse.json(newProject, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 400 });
  }
}
