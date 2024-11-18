import React, { useEffect, useState } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoContent from "./components/TodoContent";
import TodoFooter from "./components/TodoFooter";

function App() {
  const [id, setId] = useState(0);
  const url = "http://localhost:4000/test";
  useEffect(() => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setId(data[0].content);
        console.log(data);
      });
  }, [url]);

  const addTest = () => {
    const param = {
      title: "1234",
      content: 1234,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    });
  };
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <div className="w-[100%] xl:w-[30%] md:w-[30%] sm:w-[80%] h-[600px] border-2 bg-white p-5 rounded-2xl shadow-lg shadow-[#537c9b] relative">
        <button onClick={addTest}>add</button>
        <TodoHeader />
        <hr className="border-1 border-black h-[5%] mt-2" />
        <TodoContent />
        <TodoFooter />
      </div>
    </div>
  );
}

export default App;
