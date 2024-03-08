// types.ts
export interface Entry {
  id: number;
  name: string;
  comment: string;
  amount: number;
  currency: string;
  date: string;
  incomeExpense: "income" | "expense";
  category: {
    id: number;
    name: string;
  };
}
