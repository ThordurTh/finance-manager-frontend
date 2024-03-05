import { configureStore, Action } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import entriesReducer from "./entriesSlice";
import { ThunkAction } from "redux-thunk";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    entries: entriesReducer,
  },
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
