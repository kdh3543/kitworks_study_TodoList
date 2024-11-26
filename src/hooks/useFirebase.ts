import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TodosType } from '../types';

export default function useFirebase() {
  const addTodo = (param: TodosType, dateVal: string) => {
    const docRef = doc(collection(db, 'todo', dateVal, 'date'));
    setDoc(docRef, param);
  };

  const deleteTodo = async (id: string, dateVal: string) => {
    await deleteDoc(doc(db, 'todo', dateVal, 'date', id));
  };

  const deleteCompletedTodos = (list: TodosType[], dateVal: string) => {
    list.forEach((v) => {
      v.checked && deleteDoc(doc(db, 'todo', dateVal, 'date', v.id || ''));
    });
  };

  const changeTodoState = (id: string, type: string, state: boolean, dateVal: string) => {
    const docRef = doc(db, 'todo', dateVal, 'date', id);
    if (type === 'check') {
      updateDoc(docRef, {
        checked: !state,
      });
    } else {
      updateDoc(docRef, {
        isEdit: !state,
      });
    }
  };

  const updateTodo = (id: string, editContent: string, dateVal: string) => {
    updateDoc(doc(db, 'todo', dateVal, 'date', id), {
      content: editContent,
      isEdit: false,
    });
  };

  const updateTodoEditContent = (id: string, val: string, dateVal: string) => {
    updateDoc(doc(db, 'todo', dateVal, 'date', id), {
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
