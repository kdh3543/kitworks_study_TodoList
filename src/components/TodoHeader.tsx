import React, { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import useTodoValStore from '../store/useTodoValStore';
import useTodosStore from '../store/useTodosStore';

export default function TodoHeader() {
  const [error, setError] = useState('');

  const { todoVal, setTodoVal } = useTodoValStore();
  const { onAddTodo } = useTodosStore();
  const now = new Date();

  const setTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodoVal(value);
  };

  const onAddTodoHandler = () => {
    if (!todoVal) {
      setError('there is nothing!');
      return;
    }
    setError('');
    onAddTodo(todoVal);
    setTodoVal('');
  };
  return (
    <div className="h-[25%]">
      <span className="text-xl font-semibold">
        {now.getMonth() + 1}. {now.getDate()}
      </span>
      <div className="mt-5 text-3xl font-semibold text-center">
        <span>TO-DO</span>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          className="border-2 border-customBlue-80 w-[100%] rounded-md px-2"
          placeholder="INPUT TODO"
          value={todoVal}
          onChange={(e) => setTodo(e)}
          onKeyDown={(e) => e.key === 'Enter' && onAddTodoHandler()}
        />
        <FaCirclePlus
          className="bg-white rounded-full text-4xl cursor-pointer text-customerPurple active:text-customerPurple-60 ml-2 active:scale-90"
          onClick={onAddTodoHandler}
        />
      </div>
      <p className="text-red-500">{error}</p>
    </div>
  );
}
