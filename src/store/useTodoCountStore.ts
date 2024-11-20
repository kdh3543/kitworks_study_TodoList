import { create } from 'zustand';

interface countPropsType {
  checkedCount: number;
  totalCount: number;
  setCheckedCount: (num: number) => void;
  setTotalCount: (num: number) => void;
}

const useTodoCountStore = create<countPropsType>((set) => ({
  checkedCount: 0,
  totalCount: 0,
  setCheckedCount: (num: number) => set({ checkedCount: num }),
  setTotalCount: (num: number) => set({ totalCount: num }),
}));

export default useTodoCountStore;
