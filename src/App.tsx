import React, { Fragment } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoContent from './components/TodoContent';
import TodoFooter from './components/TodoFooter';

function App() {
  return (
    <Fragment>
      <div className="w-[100%] h-[100vh] flex justify-center items-center">
        <div className="w-[30%] h-[600px] border-2 bg-white p-5 rounded-2xl shadow-lg shadow-[#537c9b] relative">
          <TodoHeader />
          <hr className="border-1 border-black h-[5%] mt-2" />
          <TodoContent />
          <TodoFooter />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
