import { useState } from "react";

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
      { content: todoVal, checked: false, isEdit: false, editContent: todoVal },
      ...prev,
    ]);
    setTodoVal("");
  };

  const onChangeTodo = (index, type) => {
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

  const onDeleteTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const onUpdateTodo = (index) => {
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

  const onUpdateContent = (e, index) => {
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
            onKeyDown={(e) => e.key === "Enter" && onAddTodo()}
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
        {todos.map(({ checked, content, isEdit, editContent }, index) => (
          <div
            className="mt-5 flex justify-between text-center rounded-sm py-1 items-center"
            key={index}
          >
            <span className="w-[5%] text-xl">{index + 1}</span>
            {isEdit ? (
              <input
                type="text"
                defaultValue={editContent}
                className="border-gray-500 border-2 px-2 rounded-md w-[65%]"
                onChange={(e) => onUpdateContent(e, index)}
              />
            ) : (
              <span
                className={`w-[65%] text-xl
                ${checked && "line-through"}`}
              >
                {content}
              </span>
            )}

            <input
              type="checkbox"
              className={`w-[20px] h-[20px] ${
                isEdit ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onChange={() => onChangeTodo(index, "check")}
              checked={checked}
              disabled={isEdit}
            />

            <div className="w-[10%]">
              <button
                className="bg-red-500 h-6 w-6 rounded-full text-white active:bg-red-300 font-semibold"
                onClick={() => onDeleteTodo(index)}
              >
                X
              </button>
            </div>
            {isEdit ? (
              <div className="w-[10%]">
                <button
                  className={`${"bg-blue-500 active:bg-blue-300"} py-1 px-2 rounded-md text-white font-semibold`}
                  onClick={() => onUpdateTodo(index)}
                >
                  Confirm
                </button>
                <button
                  className={`${"bg-red-500 active:bg-red-300"} py-1 px-2 rounded-md text-white font-semibold mt-2`}
                  onClick={() => onChangeTodo(index, "edit")}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="w-[10%]">
                <button
                  className={`${"bg-blue-500 active:bg-blue-300"} py-1 px-2 rounded-md text-white font-semibold`}
                  onClick={() => onChangeTodo(index, "edit")}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
