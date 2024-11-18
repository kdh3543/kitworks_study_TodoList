import React from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { IoTrash } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { MdOutlineModeEditOutline } from "react-icons/md";
import useTodosStore from "../store/useTodosStore";
import useTodoValStore from "../store/useTodoValStore";

export default function TodoContent() {
  const { todos, onChangeTodo, onUpdateTodo, onUpdateContent, onDeleteTodo } =
    useTodosStore();
  const { filterVal } = useTodoValStore();

  const filteredTodo = todos.filter((v) => {
    switch (filterVal) {
      case "All":
        return v;
      case "Complete":
        return v.checked;
      case "Not Complete":
        return !v.checked;
    }
  });

  const onUpdateContentHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const trimmedVal = e.target.value.trim();
    if (!trimmedVal) return;
    onUpdateContent(trimmedVal, index);
  };

  return (
    <div className="h-[60%] overflow-y-auto">
      <div className="mb-2">
        {filteredTodo.length === 0 ? (
          <div className="font-semibold text-customerPurple text-2xl text-center">
            There is no Content
          </div>
        ) : (
          filteredTodo
            .sort((a: any, b: any) => a.checked - b.checked)
            .map(({ checked, content, isEdit, editContent }, index) => (
              <div
                className="mb-3 w-[100%] flex text-center rounded-sm py-1 items-center"
                key={index}
              >
                {!isEdit && (
                  <div className="w-[10%] flex items-center justify-center">
                    {checked ? (
                      <RiCheckboxCircleFill
                        className="w-[30px] h-[30px] text-customerPurple cursor-pointer"
                        onClick={() => onChangeTodo(index, "check")}
                      />
                    ) : (
                      <RiCheckboxBlankCircleLine
                        className="w-[30px] h-[30px] text-customerPurple cursor-pointer"
                        onClick={() => onChangeTodo(index, "check")}
                      />
                    )}
                  </div>
                )}

                <div className={`w-[70%]`}>
                  {isEdit ? (
                    <input
                      type="text"
                      defaultValue={editContent}
                      className="border-customBlue border-2 px-2 rounded-md w-[100%]"
                      onChange={(e) => onUpdateContentHandler(e, index)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && onUpdateTodo(index)
                      }
                    />
                  ) : (
                    <span className={`text-xl ${checked && "line-through"} `}>
                      {content.length > 12
                        ? content.slice(0, 10) + "..."
                        : content}
                    </span>
                  )}
                </div>

                <div className="w-[10%] flex items-center justify-center">
                  <IoTrash
                    className="text-red-500 icon"
                    onClick={() => onDeleteTodo(index)}
                  />
                </div>
                <div className="w-[20%] flex justify-around">
                  {isEdit ? (
                    <>
                      <FaRegCheckCircle
                        className="text-customerPurple icon"
                        onClick={() => onUpdateTodo(index)}
                      />

                      <FaRegCircleXmark
                        className="text-red-500 icon"
                        onClick={() => onChangeTodo(index, "edit")}
                      />
                    </>
                  ) : (
                    <MdOutlineModeEditOutline
                      onClick={() => onChangeTodo(index, "edit")}
                      className={"icon"}
                    />
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
