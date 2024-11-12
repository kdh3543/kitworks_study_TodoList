import { create } from 'zustand';
import { TodosType } from '../types';

const useTodosStore = create<{
  todos: TodosType[];
  setTodos: (value: TodosType[]) => void;
  onAddTodo: (todoVal: string) => void;
  onDeleteTodo: (index: number) => void;
  onUpdateTodo: (index: number) => void;
  onUpdateContent: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onDeleteCompleted: () => void;
  onChangeTodo: (index: number, type: string) => void;
}>((set) => ({
  todos: [],
  setTodos: (value: TodosType[]) => set({ todos: value }),
  onAddTodo: (todoVal: string) =>
    set((state) => ({
      todos: [
        { content: todoVal, checked: false, isEdit: false, editContent: todoVal },
        ...state.todos,
      ],
    })),
  onDeleteTodo: (index: number) =>
    set((state) => ({
      todos: state.todos.filter((_, i) => i !== index),
    })),
  onUpdateTodo: (index: number) =>
    set((state) => ({
      todos: state.todos.map(({ content, editContent, isEdit, ...rest }, i) => {
        return {
          ...rest,
          isEdit: i === index ? !isEdit : isEdit,
          content: editContent,
          editContent,
        };
      }),
    })),
  onUpdateContent: (e: React.ChangeEvent<HTMLInputElement>, index: number) =>
    set((state) => ({
      todos: state.todos.map(({ editContent, ...rest }, i) => {
        return {
          ...rest,
          editContent: i === index ? (editContent = e.target.value) : editContent,
        };
      }),
    })),
  onDeleteCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.checked),
    })),
  onChangeTodo: (index: number, type: string) =>
    set((state) => ({
      todos: state.todos.map(({ checked, isEdit, content, editContent, ...rest }, i) => {
        return {
          ...rest,
          checked: type === 'check' && i === index ? !checked : checked,
          isEdit: type === 'edit' && i === index ? !isEdit : isEdit,
          content,
          editContent,
        };
      }),
    })),
}));

export default useTodosStore;
