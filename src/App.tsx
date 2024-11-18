import React, { useEffect } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoContent from './components/TodoContent';
import TodoFooter from './components/TodoFooter';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  useEffect(() => {
    console.log(db);
    getData();
  }, []);

  const getData = async () => {
    console.log(db, '1');
    const data = await getDocs(collection(db, 'todo'));
    if (data) {
      data.forEach((v) => {
        console.log(v.data());
        console.log(v.id);
      });
    }
  };
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <div className="w-[100%] xl:w-[30%] md:w-[30%] sm:w-[80%] h-[600px] border-2 bg-white p-5 rounded-2xl shadow-lg shadow-[#537c9b] relative">
        <TodoHeader />
        <hr className="border-1 border-black h-[5%] mt-2" />
        <TodoContent />
        <TodoFooter />
      </div>
    </div>
  );
}

export default App;
