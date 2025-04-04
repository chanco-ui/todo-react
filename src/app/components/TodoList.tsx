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
    <div className='flex justify-center items-center'>
        <div>
            {taskList.map((task) => (
                <div key={task.id} className='flex items-center'>
                <div className='flex items-center border border-gray-300 p-2 y-10 bg-white text-gray-600'>
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.text}
                    </span>
                </div>
                <div className='ml-2 text-xs'>
                    <button className='mr-2'
                        onClick={() => handleCompleted(task.id)} >
                        <FontAwesomeIcon icon={faCircleCheck} />button
                    </button>
                    <button onClick={() => handleDelete(task.id)}>
                        <FontAwesomeIcon icon={faTrashCan} />trash
                    </button>
                </div>
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default TodoList