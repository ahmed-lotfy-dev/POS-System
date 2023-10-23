import { createSlice } from "@reduxjs/toolkit";

export type CategoryState = {
  categoryId: string;
};

const initialState: CategoryState = {
  categoryId: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.categoryId = action.payload.categoryId;
    },
  },
});

export const { setActiveCategory } = categorySlice.actions;

export default categorySlice.reducer;
