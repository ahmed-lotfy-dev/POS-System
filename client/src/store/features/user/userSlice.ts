import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Role } from "@/types/globals";

export interface User {
  id: string;
  email: string;
  username?: string;
  role: Role;
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
