import { create } from 'zustand';

interface todoValPropsType {
  todoVal: string;
  filterVal: string;
  dateVal: string;
  setTodoVal: (value: string) => void;
  setFilterVal: (value: string) => void;
  setDateVal: (value: string) => void;
}

const useTodoValStore = create<todoValPropsType>((set) => ({
  todoVal: '',
  filterVal: 'All',
  dateVal: '',
  setTodoVal: (value: string) => set({ todoVal: value }),
  setFilterVal: (value: string) => set({ filterVal: value }),
  setDateVal: (value: string) => set({ dateVal: value }),
}));

export default useTodoValStore;
