import { create } from 'zustand';

const useTodoValStore = create<{
  todoVal: string;
  filterVal: string;
  setTodoVal: (value: string) => void;
  setFilterVal: (value: string) => void;
}>((set) => ({
  todoVal: '',
  filterVal: 'All',
  setTodoVal: (value: string) => set({ todoVal: value }),
  setFilterVal: (value: string) => set({ filterVal: value }),
}));

export default useTodoValStore;
