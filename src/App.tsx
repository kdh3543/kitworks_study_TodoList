import React, { useEffect } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoFooter from './components/TodoFooter';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import useTodoValStore from './store/useTodoValStore';
import TodoContent from './components/TodoContent';

function App() {
  const { dateVal } = useTodoValStore();
  useEffect(() => {
    if (dateVal) {
      getDoc(doc(db, 'todo', dateVal)).then((docs) => {
        if (!docs.exists()) {
          setDoc(doc(db, 'todo', dateVal), {
            hasData: true,
          });
        }
      });
    }
  }, [dateVal]);

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
