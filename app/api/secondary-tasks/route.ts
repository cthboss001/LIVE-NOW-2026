import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.secondaryTask.findMany({
      orderBy: [{ completed: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching secondary tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const task = await prisma.secondaryTask.create({
      data: {
        title: body.title,
        category: body.category,
        description: body.description,
        goal: body.goal,
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating secondary task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    const task = await prisma.secondaryTask.update({
      where: { id },
      data,
    });
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating secondary task:', error);
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
    
    await prisma.secondaryTask.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting secondary task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
