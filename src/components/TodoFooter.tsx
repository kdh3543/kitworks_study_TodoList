import React from 'react';
import useTodosStore from '../store/useTodosStore';
import useTodoCountStore from '../store/useTodoCountStore';

export default function TodoFooter() {
  const { onDeleteCompleted } = useTodosStore();
  const { checkedCount, totalCount } = useTodoCountStore();
  return (
    <div className="h-[10%] flex items-end justify-between font-semibold">
      <span>{totalCount - checkedCount} Tasks</span>
      <button
        disabled={checkedCount === 0}
        className={`px-2 text-white rounded-lg  ${
          checkedCount === 0
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
