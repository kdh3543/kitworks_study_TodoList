import React, { useEffect, useState } from 'react';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
import { IoTrash } from 'react-icons/io5';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import useTodosStore from '../store/useTodosStore';
import useTodoValStore from '../store/useTodoValStore';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TodosType } from '../types';
import useFirebase from '../hooks/useFirebase';
import useTodoCountStore from '../store/useTodoCountStore';

export default function TodoContent() {
  const { setCount } = useTodoCountStore();
  const { filterVal } = useTodoValStore();
  const { deleteTodo, changeTodoState, updateTodo, updateTodoEditContent } = useFirebase();

  const [todos, setTodos] = useState<TodosType[]>([]);

  useEffect(() => {
    getDataByDB();
  }, []);

  const getDataByDB = async () => {
    onSnapshot(collection(db, 'todo'), (todoList) => {
      const todoArr: TodosType[] = [];

      todoList.forEach((list) => {
        const { checked, content, editContent, isEdit } = list.data();
        const param = {
          checked,
          content,
          editContent,
          isEdit,
          id: list.id,
          date: new Date(),
        };
        todoArr.push(param);
      });
      setCount(todoArr.filter((v) => v.checked).length);
      setTodos(todoArr);
    });
  };

  const filteredTodo = todos.filter((v) => {
    switch (filterVal) {
      case 'All':
        return v;
      case 'Complete':
        return v.checked;
      case 'Not Complete':
        return !v.checked;
    }
  });

  const onUpdateContentHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const trimmedVal = e.target.value.trim();
    if (!trimmedVal) return;
    updateTodoEditContent(id, trimmedVal);
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
            .map(({ checked, content, isEdit, editContent, id = '' }, index) => (
              <div
                className="mb-3 w-[100%] flex text-center rounded-sm py-1 items-center"
                key={index}
              >
                {!isEdit && (
                  <div className="w-[10%] flex items-center justify-center">
                    {checked ? (
                      <RiCheckboxCircleFill
                        className="w-[30px] h-[30px] text-customerPurple cursor-pointer"
                        onClick={() => changeTodoState(id, 'check', checked)}
                      />
                    ) : (
                      <RiCheckboxBlankCircleLine
                        className="w-[30px] h-[30px] text-customerPurple cursor-pointer"
                        onClick={() => changeTodoState(id, 'check', checked)}
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
                      onChange={(e) => onUpdateContentHandler(e, id)}
                      onKeyDown={(e) => e.key === 'Enter' && updateTodo(id, editContent)}
                    />
                  ) : (
                    <span className={`text-xl ${checked && 'line-through'} `}>
                      {content.length > 12 ? content.slice(0, 10) + '...' : content}
                    </span>
                  )}
                </div>

                <div className="w-[10%] flex items-center justify-center">
                  <IoTrash className="text-red-500 icon" onClick={() => deleteTodo(id)} />
                </div>
                <div className="w-[20%] flex justify-around">
                  {isEdit ? (
                    <>
                      <FaRegCheckCircle
                        className="text-customerPurple icon"
                        onClick={() => updateTodo(id, editContent)}
                      />

                      <FaRegCircleXmark
                        className="text-red-500 icon"
                        onClick={() => changeTodoState(id, 'edit', isEdit)}
                      />
                    </>
                  ) : (
                    <MdOutlineModeEditOutline
                      onClick={() => changeTodoState(id, 'edit', isEdit)}
                      className={'icon'}
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
