'use client'

import { useState } from "react";
import InputForm from "./components/InputForm";
import Title from "./components/Title";
import TodoList from "./components/TodoList";


export default function Home() {

  const [taskList, setTaskList] = useState([]);

  return (
    <div className="bg-gradient-to-r from-pink-500 to-yellow-500">
      <Title />
      <InputForm taskList={taskList} setTaskList={setTaskList}/>
      <TodoList taskList={taskList} setTaskList={setTaskList}/>
    </div>
  );
}

