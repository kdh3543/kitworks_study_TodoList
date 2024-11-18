interface TodosType {
  content: string;
  checked: boolean;
  isEdit: boolean;
  editContent: string;
  id?: string;
  date?: Date;
}

export type { TodosType };
