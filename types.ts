// types.ts
export interface Entry {
  id: number;
  name: string;
  comment: string;
  amount: number;
  currency: string;
  date: string;
  category: {
    id: number;
    name: string;
  };
}
