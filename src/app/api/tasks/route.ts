import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'タスクの取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: '無効な入力です' },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        text,
        completed: false,
        createdAt: new Date()
      }
    });
    
    console.log('Created task:', task);
    return NextResponse.json(task);
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'タスクの作成に失敗しました' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, completed } = await request.json();
    const task = await prisma.task.update({
      where: { id },
      data: { completed }
    });
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'タスクの更新に失敗しました' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.task.delete({
      where: { id }
    });
    return NextResponse.json({ message: '削除しました' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'タスクの削除に失敗しました' }, { status: 500 });
  }
} 