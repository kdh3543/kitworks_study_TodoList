import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TodosType } from '../types';

export default function useFirebase() {
  const addTodo = (param: TodosType, dateVal: string) => {
    addDoc(collection(db, 'todo'), param);
    // addDoc(collection(db, 'todo', dateVal, 'list'), param);
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, 'todo', id));
  };

  const deleteCompletedTodos = (list: TodosType[]) => {
    list.forEach((v) => {
      v.checked && deleteDoc(doc(db, 'todo', v.id || ''));
    });
  };

  const changeTodoState = (id: string, type: string, state: boolean) => {
    if (type === 'check') {
      updateDoc(doc(db, 'todo', id), {
        checked: !state,
      });
    } else {
      updateDoc(doc(db, 'todo', id), {
        isEdit: !state,
      });
    }
  };

  const updateTodo = (id: string, editContent: string) => {
    updateDoc(doc(db, 'todo', id), {
      content: editContent,
      isEdit: false,
    });
  };

  const updateTodoEditContent = (id: string, val: string) => {
    updateDoc(doc(db, 'todo', id), {
      editContent: val,
    });
  };

  return {
    addTodo,
    deleteTodo,
    changeTodoState,
    updateTodo,
    updateTodoEditContent,
    deleteCompletedTodos,
  };
}
