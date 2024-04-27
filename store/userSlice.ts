import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types";
import { UserQueries } from "../api/userQueries";
import * as SecureStore from "expo-secure-store";

interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

//  const baseUrl = "https://honestly-grateful-honeybee.ngrok-free.app/auth/"

export const login = createAsyncThunk(
  "user/login",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await UserQueries.login(
        credentials.username,
        credentials.password
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.user;
        state.token = action.payload.access_token;
        // secure storage save the token
        SecureStore.setItemAsync("token", action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // .addCase(signup.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    // })
    // .addCase(signup.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.user = action.payload;
    //     // state.token = action.payload.token;
    // })
    // .addCase(signup.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    // });
  },
});
export default userSlice.reducer;
