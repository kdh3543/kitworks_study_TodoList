import React, { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import useTodoValStore from '../store/useTodoValStore';
import useTodosStore from '../store/useTodosStore';

import useFirebase from '../hooks/useFirebase';

export default function TodoHeader() {
  const [error, setError] = useState('');

  const { todoVal, setTodoVal, setFilterVal } = useTodoValStore();
  const { onAddTodo } = useTodosStore();
  const now = new Date();
  const { addTodo } = useFirebase();

  const optionList = ['All', 'Complete', 'Not Complete'];

  const setTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodoVal(value);
  };

  const onAddTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedVal = todoVal.trim();
    if (!trimmedVal) {
      setError('there is nothing!');
      setTodoVal('');
      return;
    }
    const param = {
      checked: false,
      isEdit: false,
      editContent: trimmedVal,
      content: trimmedVal,
      date: new Date(),
    };

    addTodo(param);
    setError('');
    // onAddTodo(trimmedVal);
    setTodoVal('');
  };

  return (
    <div className="h-[25%]">
      <div className="flex justify-between">
        <span className="text-xl font-semibold">
          {now.getMonth() + 1}. {now.getDate()}
        </span>
        <select
          className="border-customBlue border-2 ml-2 rounded-md px-1 font-semibold cursor-pointer"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterVal(e.target.value)}
        >
          {optionList.map((option, i) => (
            <option value={option} key={i} className="cursor-pointer font-semibold">
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 text-3xl font-semibold text-center">
        <span>TO-DO</span>
      </div>
      <form className="flex justify-between items-center" onSubmit={(e) => onAddTodoHandler(e)}>
        <input
          type="text"
          className="border-2 border-customBlue-80 w-[100%] rounded-md px-2"
          placeholder="INPUT TODO"
          value={todoVal}
          onChange={(e) => setTodo(e)}
        />
        <button type="submit">
          <FaCirclePlus className="bg-white rounded-full text-4xl cursor-pointer text-customerPurple active:text-customerPurple-60 ml-2 active:scale-90" />
        </button>
      </form>
      <p className="text-red-500">{error}</p>
    </div>
  );
}
