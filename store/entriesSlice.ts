// entriesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Entry } from "../types";
import axios from "axios";

interface EntriesState {
  entries: Entry[];
  loading: boolean;
  error: string | null;
  categoryCounts: number[];
}

const initialState: EntriesState = {
  entries: [],
  loading: false,
  error: null,
  categoryCounts: Array(11).fill(0),
};

export const fetchEntries = createAsyncThunk("data/fetchData", async () => {
  try {
    const response = await axios.get(
      "https://honestly-grateful-honeybee.ngrok-free.app/entry"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteEntry = createAsyncThunk(
  "data/deleteEntry",
  async (entryId: number) => {
    try {
      await axios.delete(
        `https://honestly-grateful-honeybee.ngrok-free.app/entry/${entryId}`
      );
      return entryId;
    } catch (error) {
      throw error;
    }
  }
);

const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    updateCategoryCounts: (state, action) => {
      state.categoryCounts = action.payload;
    },
  },
  extraReducers: (builder) => {
    // GET
    builder.addCase(fetchEntries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.entries = action.payload.sort(
        (a: Entry, b: Entry) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
    builder.addCase(fetchEntries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred.";
    });
    // DELETE
    builder.addCase(deleteEntry.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEntry.fulfilled, (state, action) => {
      const deletedEntryId = action.payload; // Convert payload to number
      state.loading = false;
      state.entries = state.entries.filter(
        (entry) => entry.id !== deletedEntryId
      );
    });
    builder.addCase(deleteEntry.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "An error occurred while deleting the entry.";
    });
  },
});

export const { updateCategoryCounts } = entriesSlice.actions;

export default entriesSlice.reducer;

// export const entriesSlice = createSlice({
//   name: "entries",
//   initialState,
//   reducers: {
//     fetchEntriesStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchEntriesSuccess: (state, action: PayloadAction<Entry[]>) => {
//       state.loading = false;
//       state.entries = action.payload;
//     },
//     fetchEntriesFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     removeEntry: (state, action: PayloadAction<number>) => {
//       state.entries = state.entries.filter(
//         (entry) => entry.id !== action.payload
//       );
//     },
//   },
// });

// export const {
//   fetchEntriesStart,
//   fetchEntriesSuccess,
//   fetchEntriesFailure,
//   removeEntry,
// } = entriesSlice.actions;

// // Async action to delete an entry
// export const deleteEntry =
//   (entryId: number): AppThunk =>
//   async (dispatch, getState) => {
//     try {
//       // Perform deletion operation on the server
//       await fetch(`https://honestly-grateful-honeybee.ngrok-free.app/${entryId}`, {
//         method: "DELETE",
//       });

//       // Dispatch the action to remove the entry from the state after successful deletion
//       dispatch(removeEntry(entryId));
//     } catch (error) {
//       console.error("Error deleting entry:", error);
//       // Handle error if deletion fails
//     }
//   };

// // Async action to fetch data from the backend
// export const fetchEntries = (): AppThunk => async (dispatch) => {
//   dispatch(fetchEntriesStart());
//   try {
//     const response = await fetch(
//       "https://honestly-grateful-honeybee.ngrok-free.app"
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch entries");
//     }
//     const data = await response.json();
//     dispatch(fetchEntriesSuccess(data));
//   } catch (error: any) {
//     dispatch(fetchEntriesFailure(error.message));
//   }
// };

// // Selector to access entries from the Redux store
// export const selectEntries = (state: RootState) => state.entries.entries;

// export default entriesSlice.reducer;

// OLD
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
