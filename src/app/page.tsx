'use client'

import { useState } from "react";
import InputForm from "./components/InputForm";
import Title from "./components/Title";
import TodoList from "./components/TodoList";


export default function Home() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Title />
        <InputForm taskList={taskList} setTaskList={setTaskList}/>
        <TodoList taskList={taskList} setTaskList={setTaskList}/>
      </div>
    </div>
  );
}

