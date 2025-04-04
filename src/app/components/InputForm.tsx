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
    <div className='flex flex-col items-center justify-center'>
        <form className='flex items-center' onSubmit={handleSubmit}>
            <input type="text" className='border border-gray-300 p-2 y-10'
                onChange={handleChange} value={inputText}
            />
            <button className='ml-2'> 
                <FontAwesomeIcon icon={faCirclePlus} />add
            </button>
        </form>
    </div>
  )
}