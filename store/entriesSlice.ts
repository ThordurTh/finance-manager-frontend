// entriesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../types";

const initialState: Entry[] = [
  {
    id: 1,
    image: "groceries",
    companyName: "Netto",
    amount: 1000,
    currency: "dkk",
    date: new Date(),
  },
  {
    id: 2,
    image: "utilities",
    companyName: "Clean Energy",
    amount: 734,
    currency: "dkk",
    date: new Date(),
  },
  {
    id: 3,
    image: "entertainment",
    companyName: "Palads Theater",
    amount: 349,
    currency: "dkk",
    date: new Date(),
  },
  {
    id: 4,
    image: "subscriptions",
    companyName: "Netflix",
    amount: 99,
    currency: "dkk",
    date: new Date(),
  },
  {
    id: 5,
    image: "restaurant",
    companyName: "Stefanos Pizza",
    amount: 219,
    currency: "dkk",
    date: new Date(),
  },
  {
    id: 6,
    image: "transportation",
    companyName: "Rejsekort",
    amount: 100,
    currency: "dkk",
    date: new Date(),
  },
  {
    id: 7,
    image: "health",
    companyName: "Lægeklinik",
    amount: 100,
    currency: "dkk",
    date: new Date(),
  },
  {
    id: 8,
    image: "housing",
    companyName: "Leje",
    amount: 8000,
    currency: "dkk",
    date: new Date(),
  },
  {
    id: 9,
    image: "shopping",
    companyName: "H&M",
    amount: 430,
    currency: "dkk",
    date: new Date(),
  },
  {
    id: 10,
    image: "travel",
    companyName: "Icelandair",
    amount: 3700,
    currency: "dkk",
    date: new Date(),
  },
];

const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<Entry>) => {
      state.push(action.payload);
    },
  },
});

export const { addEntry } = entriesSlice.actions;

export default entriesSlice.reducer;
