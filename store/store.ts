import { configureStore, Action } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import entriesReducer from "./entriesSlice";
import usersReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    entries: entriesReducer,
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
