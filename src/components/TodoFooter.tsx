import React from "react";
import useTodosStore from "../store/useTodosStore";

export default function TodoFooter() {
  const { todos, onDeleteCompleted } = useTodosStore();
  return (
    <div className="h-[10%] flex items-end justify-between font-semibold">
      <span>{todos.filter((v) => !v.checked).length} Tasks</span>
      <button
        disabled={todos.length === 0}
        className={`px-2 text-white rounded-lg  ${
          todos.filter((v) => v.checked).length === 0
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-red-500 cursor-pointer active:scale-90"
        }`}
        onClick={onDeleteCompleted}
      >
        Delete Completed
      </button>
    </div>
  );
}
