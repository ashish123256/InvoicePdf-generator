import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
interface User {
  name:string;
  email: string;
  password: string;
  avatar:string;
}

interface UserState {
  currentUser: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
   
    signOutStart: (state) => {
      state.loading = false;
  },
  signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
  },
  signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
  }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure
} = userSlice.actions;

export default userSlice.reducer;
