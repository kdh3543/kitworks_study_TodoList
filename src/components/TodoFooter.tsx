import React from 'react';
import useTodosStore from '../store/useTodosStore';
import useTodoCountStore from '../store/useTodoCountStore';

export default function TodoFooter() {
  const { todos, onDeleteCompleted } = useTodosStore();
  const { count } = useTodoCountStore();
  return (
    <div className="h-[10%] flex items-end justify-between font-semibold">
      <span>{count} Tasks</span>
      <button
        disabled={count === 0}
        className={`px-2 text-white rounded-lg  ${
          count === 0
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-red-500 cursor-pointer active:scale-90'
        }`}
        onClick={onDeleteCompleted}
      >
        Delete Completed
      </button>
    </div>
  );
}
