import { create } from 'zustand';

const useTodoValStore = create<{ todoVal: string; setTodoVal: (value: string) => void }>((set) => ({
  todoVal: '',
  setTodoVal: (value: string) => set({ todoVal: value }),
}));

export default useTodoValStore;
