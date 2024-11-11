import React from 'react';
import useTodosStore from '../store/useTodosStore';

export default function TodoFooter() {
  const { todos, onDeleteCompleted } = useTodosStore();
  return (
    <div className="h-[10%] flex items-end justify-between font-semibold">
      <span>{todos.filter((v) => !v.checked).length} Tasks</span>
      <span
        className={`${
          todos.filter((v) => v.checked).length === 0
            ? 'text-gray-500 disabled:cursor-not-allowed'
            : 'text-red-500 cursor-pointer active:scale-90'
        }`}
        onClick={onDeleteCompleted}
      >
        Delete Completed
      </span>
    </div>
  );
}
