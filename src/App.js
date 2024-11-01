import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoVal, setTodoVal] = useState("");

  const [error, setError] = useState("");

  const setTodo = (e) => {
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
      ...prev,
      { content: todoVal, checked: false, isEdit: false },
    ]);
    setTodoVal("");
  };

  const onCheckTodo = (index, type) => {
    setTodos((prev) =>
      prev.map(({ checked, ...rest }, i) => {
        return {
          ...rest,
          checked: i === index ? !checked : checked,
        };
      })
    );
  };

  const onDeleteTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const onChangeTodo = (index) => {
    setTodos((prev) =>
      prev.map(({ isEdit, ...rest }, i) => {
        return {
          ...rest,
          isEdit: i === index ? !isEdit : isEdit,
        };
      })
    );
  };

  return (
    <div className="w-[80%] h-[100%] m-auto ">
      <header className="mt-10 text-3xl font-semibold text-center">TODO</header>
      <div>
        <div className="mt-10 flex justify-between">
          <input
            type="text"
            className="border-2 border-gray-500 w-[85%] rounded-md px-2"
            placeholder="INPUT TODO"
            value={todoVal}
            onChange={(e) => setTodo(e)}
          />
          <button
            type="submit"
            className="bg-green-500 px-2 py-1 rounded-md w-[10%] text-white font-semibold active:bg-green-300"
            onClick={onAddTodo}
          >
            ADD
          </button>
        </div>
        <p className="text-red-500">{error}</p>
        <div className="my-10 flex justify-between text-center font-semibold border-b-black border-b-2 py-1 text-xl">
          <span className="w-[5%]">No.</span>
          <span className="w-[65%]">Content</span>
          <span className="w-[10%]">Check</span>
          <span className="w-[10%]">Delete</span>
          <span className="w-[10%]">Edit</span>
        </div>
        {todos.map(({ checked, content, isEdit }, index) => (
          <div
            className="mt-5 flex justify-between text-center rounded-sm py-1 items-center"
            key={index}
          >
            <span className="w-[5%] text-xl">{index + 1}</span>
            <span
              className={`w-[65%] text-xl
                ${checked && "line-through"}`}
            >
              {content}
            </span>
            <input
              type="checkbox"
              className="h-6 w-[10%] rounded-full cursor-pointer border-none"
              onChange={() => onCheckTodo(index)}
            />

            <div className="w-[10%]">
              <button
                className="bg-red-500 h-6 w-6 rounded-full text-white active:bg-red-300 font-semibold"
                onClick={() => onDeleteTodo(index)}
              >
                X
              </button>
            </div>
            <div className="w-[10%]">
              <button
                className={`${
                  isEdit
                    ? "bg-red-500 active:bg-red-300"
                    : "bg-blue-500 active:bg-blue-300"
                } py-1 px-2 rounded-md text-white  font-semibold`}
                onClick={() => onChangeTodo(index)}
              >
                {isEdit ? "Cancel" : "Change"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
