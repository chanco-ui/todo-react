'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function InputForm({ taskList, setTaskList }: {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
    const [inputText, setInputText] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTaskList([
            ...taskList,
            {
                id: Date.now(),
                text: inputText,
                completed: false
            }
        ])
        setInputText("")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

  return (
    <div className='mb-8'>
      <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="新しいタスクを入力"
          className='flex-1 border border-gray-200 text-gray-800 p-3 rounded-lg
            focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400'
          onChange={handleChange} 
          value={inputText}
        />
        <button className='bg-gray-800 text-white px-6 py-3 rounded-lg
          hover:bg-gray-700 transition-colors'> 
          <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
          追加
        </button>
      </form>
    </div>
  )
}