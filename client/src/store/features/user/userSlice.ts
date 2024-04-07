import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  email: string;
  username?: string;
  isAdmin: boolean;
  sub: string;
  isConfirm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

// Action creator generated for the "setUser" case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
