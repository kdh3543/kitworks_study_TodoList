import React, { Fragment, useState } from "react";
import { FaCirclePlus, FaRegCircleXmark } from "react-icons/fa6";
import { IoTrash } from "react-icons/io5";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

interface TodosType {
  content: string;
  checked: boolean;
  isEdit: boolean;
  editContent: string;
}

function App() {
  const [todos, setTodos] = useState<TodosType[]>([]);
  const [todoVal, setTodoVal] = useState("");
  const [error, setError] = useState("");

  const setTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodoVal(value);
  };

  const onAddTodo = () => {
    if (!todoVal) {
      setError("There is nothing Todo");
      return;
    }
    setError("");
    setTodos((prev) => [
      { content: todoVal, checked: false, isEdit: false, editContent: todoVal },
      ...prev,
    ]);
    setTodoVal("");
  };

  const onChangeTodo = (index: number, type: string) => {
    setTodos((prev) =>
      prev.map(({ content, isEdit, checked, ...rest }, i) => {
        return {
          ...rest,
          checked: type === "check" && i === index ? !checked : checked,
          isEdit: type === "edit" && i === index ? !isEdit : isEdit,
          content,
          editContent: content,
        };
      })
    );
  };

  const onDeleteTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const onUpdateTodo = (index: number) => {
    setTodos((prev) =>
      prev.map(({ content, editContent, isEdit, ...rest }, i) => {
        return {
          ...rest,
          isEdit: i === index ? !isEdit : isEdit,
          content: editContent,
          editContent,
        };
      })
    );
  };

  const onUpdateContent = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setTodos((prev) =>
      prev.map(({ editContent, ...rest }, i) => {
        return {
          ...rest,
          editContent: i === index ? (editContent = value) : editContent,
        };
      })
    );
  };

  return (
    <div className="w-[30%] m-auto border-2 bg-white p-5 mt-40 rounded-2xl shadow-lg shadow-[#537c9b] relative">
      <header className="mt-10 text-3xl font-semibold text-center">
        TO-DO
      </header>
      <div>
        <div className="mt-10 flex justify-between">
          <input
            type="text"
            className="border-2 border-customBlue-80 w-[100%] rounded-md px-2"
            placeholder="INPUT TODO"
            value={todoVal}
            onChange={(e) => setTodo(e)}
            onKeyDown={(e) => e.key === "Enter" && onAddTodo()}
          />
        </div>
        <p className="text-red-500">{error}</p>
        <hr className="border-1 border-black my-5" />
        {todos.map(({ checked, content, isEdit, editContent }, index) => (
          <div
            className="mt-5 w-[100%] flex text-center rounded-sm py-1 items-center"
            key={index}
          >
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
            <div className="w-[60%] overflow-hidden">
              {isEdit ? (
                <input
                  type="text"
                  defaultValue={editContent}
                  className="border-customBlue border-2 px-2 rounded-md"
                  onChange={(e) => onUpdateContent(e, index)}
                />
              ) : (
                <span className={`text-xl ${checked && "line-through"} `}>
                  {content}
                </span>
              )}
            </div>

            <div className="w-[10%] flex items-center justify-center">
              <IoTrash
                className="text-red-400 cursor-pointer w-7 h-7"
                onClick={() => onDeleteTodo(index)}
              />
            </div>
            <div className="w-[20%] flex justify-around">
              {isEdit ? (
                <Fragment>
                  <FaRegCheckCircle
                    className="cursor-pointer text-customerPurple w-7 h-7"
                    onClick={() => onUpdateTodo(index)}
                  />
                  <FaRegCircleXmark
                    className="cursor-pointer text-red-500 w-7 h-7"
                    onClick={() => onChangeTodo(index, "edit")}
                  />
                </Fragment>
              ) : (
                <MdOutlineModeEditOutline
                  onClick={() => onChangeTodo(index, "edit")}
                  className="cursor-pointer w-7 h-7"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5 relative">
        <FaCirclePlus
          className="bg-white rounded-full text-4xl cursor-pointer text-customerPurple active:text-customerPurple-60"
          onClick={onAddTodo}
        />
      </div>
    </div>
  );
}

export default App;
