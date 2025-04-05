import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import type { Task } from '../types/task'

export default function TodoList({taskList, setTaskList}: {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
    const handleCompleted = async (id: number) => {
        try {
            const task = taskList.find(t => t.id === id);
            const response = await fetch('/api/tasks', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ id, completed: !task?.completed })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedTask = await response.json();
            setTaskList(taskList.map((task) => 
                task.id === id ? updatedTask : task
            ));
        } catch (error) {
            console.error('タスクの更新に失敗:', error);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch('/api/tasks', {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setTaskList(taskList.filter((task) => task.id !== id));
        } catch (error) {
            console.error('タスクの削除に失敗:', error);
        }
    }

  return (
    <div className='space-y-3'>
      {taskList.map((task) => (
        <div key={task.id} 
          className='flex items-center justify-between bg-white border border-gray-200
            rounded-lg shadow-sm hover:border-gray-300 transition-colors'>
          <div className='flex-1 p-4'>
            <span className={`text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.text}
            </span>
          </div>
          <div className='flex gap-2 p-4'>
            <button 
              className={`p-2 rounded-md transition-colors
                ${task.completed 
                  ? 'text-green-600' 
                  : 'text-gray-400 hover:text-green-600'}`}
              onClick={() => handleCompleted(task.id)}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
            </button>
            <button 
              className='p-2 text-gray-400 hover:text-red-600 rounded-md transition-colors'
              onClick={() => handleDelete(task.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}