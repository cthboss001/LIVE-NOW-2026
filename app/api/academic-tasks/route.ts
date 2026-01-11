import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.academicTask.findMany({
      orderBy: [{ completed: 'asc' }, { dueDate: 'asc' }],
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching academic tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const task = await prisma.academicTask.create({
      data: {
        title: body.title,
        course: body.course,
        description: body.description,
        dueDate: new Date(body.dueDate),
        priority: body.priority,
        type: body.type,
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating academic task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    if (data.dueDate) {
      data.dueDate = new Date(data.dueDate);
    }
    
    const task = await prisma.academicTask.update({
      where: { id },
      data,
    });
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating academic task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }
    
    await prisma.academicTask.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting academic task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
