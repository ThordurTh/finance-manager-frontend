// entriesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";
import { Entry } from "../types";

interface EntriesState {
  entries: Entry[];
  loading: boolean;
  error: string | null;
}

const initialState: EntriesState = {
  entries: [],
  loading: false,
  error: null,
};

export const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    fetchEntriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEntriesSuccess: (state, action: PayloadAction<Entry[]>) => {
      state.loading = false;
      state.entries = action.payload;
    },
    fetchEntriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchEntriesStart, fetchEntriesSuccess, fetchEntriesFailure } =
  entriesSlice.actions;

// Async action to fetch data from the backend
export const fetchEntries = (): AppThunk => async (dispatch) => {
  dispatch(fetchEntriesStart());
  try {
    const response = await fetch(
      "https://5703-87-61-177-51.ngrok-free.app/entry"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch entries");
    }
    const data = await response.json();
    dispatch(fetchEntriesSuccess(data));
  } catch (error: any) {
    dispatch(fetchEntriesFailure(error.message));
  }
};

// Selector to access entries from the Redux store
export const selectEntries = (state: RootState) => state.entries.entries;

export default entriesSlice.reducer;

// const initialState: Entry[] = [
//   // {
//   //   id: 1,
//   //   image: "groceries",
//   //   companyName: "Netto",
//   //   amount: 1000,
//   //   currency: "dkk",
//   //   date: new Date().toISOString(),
//   // },
//   // {
//   //   id: 2,
//   //   image: "utilities",
//   //   companyName: "Clean Energy",
//   //   amount: 734,
//   //   currency: "dkk",
//   //   date: new Date().toISOString(),
//   // },
//   // {
//   //   id: 3,
//   //   image: "entertainment",
//   //   companyName: "Palads Theater",
//   //   amount: 349,
//   //   currency: "dkk",
//   //   date: new Date().toISOString(),
//   // },
//   // {
//   //   id: 4,
//   //   image: "subscriptions",
//   //   companyName: "Netflix",
//   //   amount: 99,
//   //   currency: "dkk",
//   //   date: new Date("2024-03-03").toISOString(),
//   // },
//   // {
//   //   id: 5,
//   //   image: "restaurant",
//   //   companyName: "Stefanos Pizza",
//   //   amount: 219,
//   //   currency: "dkk",
//   //   date: new Date("2024-03-03").toISOString(),
//   // },
//   // {
//   //   id: 6,
//   //   image: "transportation",
//   //   companyName: "Rejsekort",
//   //   amount: 100,
//   //   currency: "dkk",
//   //   date: new Date("2024-03-02").toISOString(),
//   // },
//   // {
//   //   id: 7,
//   //   image: "health",
//   //   companyName: "Lægeklinik",
//   //   amount: 100,
//   //   currency: "dkk",
//   //   date: new Date("2024-02-30").toISOString(),
//   // },
//   // {
//   //   id: 8,
//   //   image: "housing",
//   //   companyName: "Leje",
//   //   amount: 8000,
//   //   currency: "dkk",
//   //   date: new Date("2024-02-29").toISOString(),
//   // },
//   // {
//   //   id: 9,
//   //   image: "shopping",
//   //   companyName: "H&M",
//   //   amount: 430,
//   //   currency: "dkk",
//   //   date: new Date("2024-02-28").toISOString(),
//   // },
//   // {
//   //   id: 10,
//   //   image: "travel",
//   //   companyName: "Icelandair",
//   //   amount: 3700,
//   //   currency: "dkk",
//   //   date: new Date("2024-02-25").toISOString(),
//   // },
// ];

// const entriesSlice = createSlice({
//   name: "entries",
//   initialState,
//   reducers: {
//     addEntry: (state, action: PayloadAction<Entry>) => {
//       state.push(action.payload);
//     },
//   },
// });

// export const { addEntry } = entriesSlice.actions;

// export default entriesSlice.reducer;
