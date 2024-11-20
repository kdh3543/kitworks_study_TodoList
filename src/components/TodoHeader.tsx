import React, { useEffect, useState } from 'react';
import { FaCirclePlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import useTodoValStore from '../store/useTodoValStore';
import useFirebase from '../hooks/useFirebase';
import useTodoCountStore from '../store/useTodoCountStore';

export default function TodoHeader() {
  const { totalCount } = useTodoCountStore();
  const { todoVal, dateVal, setTodoVal, setFilterVal, setDateVal } = useTodoValStore();
  const { addTodo } = useFirebase();

  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date());

  const oneDay = 1 * 24 * 60 * 60 * 1000;
  const optionList = ['All', 'Complete', 'Not Complete'];

  useEffect(() => {
    const dateStr = date.getTime().toString();
    setDateVal(dateStr);
  }, [date]);

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

    addTodo(param, dateVal);
    setError('');
    setTodoVal('');
  };

  return (
    <div className="h-[25%]">
      <div>
        <div className="flex justify-around items-center">
          <button
            className="active:scale-90"
            onClick={() => setDate(new Date(date.getTime() - oneDay))}
          >
            <FaChevronLeft />
          </button>
          <span className="text-xl font-semibold">
            {date.getFullYear()}. {date.getMonth() + 1}. {date.getDate()}
          </span>
          <button
            className="active:scale-90"
            onClick={() => setDate(new Date(date.getTime() + oneDay))}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="mt-3 flex justify-end">
          <select
            className={`border-customBlue border-2 ml-2 rounded-md px-1 font-semibold  ${
              totalCount === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterVal(e.target.value)}
            disabled={totalCount === 0}
          >
            {optionList.map((option, i) => (
              <option value={option} key={i} className="cursor-pointer font-semibold">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-2 text-3xl font-semibold text-center">
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
