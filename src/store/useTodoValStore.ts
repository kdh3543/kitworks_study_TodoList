import { create } from "zustand";

interface todoValPropsType {
  todoVal: string;
  filterVal: string;
  setTodoVal: (value: string) => void;
  setFilterVal: (value: string) => void;
}

const useTodoValStore = create<todoValPropsType>((set) => ({
  todoVal: "",
  filterVal: "All",
  setTodoVal: (value: string) => set({ todoVal: value }),
  setFilterVal: (value: string) => set({ filterVal: value }),
}));

export default useTodoValStore;
