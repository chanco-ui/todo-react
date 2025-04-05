import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList({taskList, setTaskList}: {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}) {

    const handleCompleted = (id: number) => {
        setTaskList(taskList.map((task) => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }

    const handleDelete = (id: number) => {
        setTaskList(taskList.filter((task) => task.id !== id));
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

export default TodoList