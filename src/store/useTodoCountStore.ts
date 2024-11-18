import { create } from 'zustand';

interface countPropsType {
  count: number;
  setCount: (value: number) => void;
}

const useTodoCountStore = create<countPropsType>((set) => ({
  count: 0,
  setCount: (value: number) => set({ count: value }),
}));

export default useTodoCountStore;
