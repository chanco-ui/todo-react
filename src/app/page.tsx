'use client'

import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import Title from "./components/Title";
import TodoList from "./components/TodoList";
import type { Task } from "./types/task";

export default function Home() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const tasks = await response.json();
      setTaskList(tasks);
    } catch (error) {
      console.error('タスクの取得に失敗:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>読み込み中...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Title />
        <InputForm taskList={taskList} setTaskList={setTaskList} />
        <TodoList taskList={taskList} setTaskList={setTaskList} />
      </div>
    </div>
  );
}

